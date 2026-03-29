/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  JARDIN BOTANIQUE DES CAYES — Google Apps Script                    ║
 * ║  Formulaires → Google Sheets + Emails automatiques                  ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 *
 * INSTRUCTIONS D'INSTALLATION (5 minutes) :
 * ─────────────────────────────────────────
 * 1. Aller sur https://script.google.com/
 * 2. Cliquer "Nouveau projet"
 * 3. Copier-coller TOUT ce code dans l'éditeur
 * 4. Modifier les 2 constantes ci-dessous (JBC_EMAIL et SHEET_ID)
 * 5. Cliquer "Déployer" → "Nouveau déploiement"
 *    - Type : Application Web
 *    - Exécuter en tant que : Moi
 *    - Accès : Tout le monde
 * 6. Copier l'URL du déploiement
 * 7. Dans _includes/form-handler.html, remplacer la valeur de GAS_URL
 *    par cette URL.
 * 8. Commit + push.
 */

// ── CONFIGURATION ──────────────────────────────────────────────────────

/** Email qui reçoit les notifications (toutes les soumissions) */
const JBC_EMAIL = "adm@jardinbotaniquecayeshaiti.org";

/**
 * ID du Google Sheet où stocker les données.
 * Créer un Sheet vide sur drive.google.com,
 * puis copier l'ID depuis l'URL :
 * https://docs.google.com/spreadsheets/d/[ICI-L-ID]/edit
 */
const SHEET_ID = "REMPLACER_PAR_LIDENTIFIANT_DE_VOTRE_SHEET";

// ── POINT D'ENTRÉE POST ─────────────────────────────────────────────────

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    storeInSheet(data);
    sendNotificationToJBC(data);
    if (data.email) {
      sendThankYouToSubmitter(data);
    }
    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Répondre aux requêtes GET (test de santé)
function doGet(e) {
  return ContentService
    .createTextOutput("JBC Forms Web App — OK")
    .setMimeType(ContentService.MimeType.TEXT);
}

// ── STOCKER DANS GOOGLE SHEETS ──────────────────────────────────────────

function storeInSheet(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheetName = sanitizeSheetName(data._form_name || "Formulaire");

  // Créer l'onglet s'il n'existe pas
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  // Construire la ligne
  const row = [
    data._timestamp || new Date().toISOString(),
    data._form_name || "",
    data._page || "",
    data.nom || data.name || "",
    data.prenom || data.firstname || "",
    data.email || "",
    data.telephone || data.phone || "",
    data.message || data.objet || data.details || "",
    JSON.stringify(data)   // Toutes les données en JSON
  ];

  // Ajouter en-têtes si première ligne
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Date", "Formulaire", "Page", "Nom", "Prénom", "Email", "Téléphone", "Message", "Données complètes"]);
  }

  sheet.appendRow(row);
}

function sanitizeSheetName(name) {
  return name.replace(/[\/\[\]\*\?:]/g, "-").substring(0, 100);
}

// ── EMAIL NOTIFICATION JBC ──────────────────────────────────────────────

function sendNotificationToJBC(data) {
  const formName = data._form_name || "Formulaire";
  const submitter = data.nom || data.name || data.email || "Inconnu";
  const email = data.email || "Non fourni";

  const subject = "🌿 Nouvelle soumission JBC — " + formName;

  let body = "Nouvelle soumission sur le site du Jardin Botanique des Cayes.\n\n";
  body += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  body += "Formulaire : " + formName + "\n";
  body += "Page       : " + (data._page || "N/A") + "\n";
  body += "Date       : " + new Date().toLocaleString("fr-HT") + "\n";
  body += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

  // Afficher toutes les données reçues
  Object.keys(data).forEach(function(key) {
    if (!key.startsWith("_")) {
      body += key + " : " + data[key] + "\n";
    }
  });

  body += "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  body += "Répondre à : " + email + "\n";

  MailApp.sendEmail({
    to: JBC_EMAIL,
    subject: subject,
    body: body,
    replyTo: email
  });
}

// ── EMAIL MERCI AU SOUMETTEUR ───────────────────────────────────────────

function sendThankYouToSubmitter(data) {
  const name = data.prenom || data.nom || data.name || "cher(e) visiteur(se)";
  const formName = data._form_name || "formulaire";

  const subject = "✅ Confirmation — Jardin Botanique des Cayes";

  const body =
    "Bonjour " + name + ",\n\n" +
    "Merci pour votre message. Nous avons bien reçu votre soumission (" + formName + ").\n\n" +
    "Notre équipe vous répondra dans les 24 heures.\n\n" +
    "─────────────────────────────────\n" +
    "Jardin Botanique des Cayes\n" +
    "Les Cayes, Haïti\n" +
    "adm@jardinbotaniquecayeshaiti.org\n" +
    "https://wcinea-dotcom.github.io/site-jbc/\n" +
    "─────────────────────────────────\n\n" +
    "Thank you for contacting the Cayes Botanical Garden.\n" +
    "We will reply within 24 hours.\n\n" +
    "Mèsi pou kontakte Jaden Botanik des Cayes.\n" +
    "N ap reponn ou nan 24 èdtan.\n";

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    body: body,
    replyTo: JBC_EMAIL
  });
}
