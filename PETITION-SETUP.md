# 🌿 Configuration de la Pétition Professionnelle

## Ce que j'ai créé pour vous:

✅ **petition-form.html** — Page de formulaire professionnelle avec barre de progression (X/5000)  
✅ **google-apps-script.gs** — Code pour collecter les signatures dans Google Sheets  

---

## ⚙️ Configuration (5 minutes):

### **ÉTAPE 1: Créer une Google Sheet**
1. Allez à https://sheets.google.com
2. Créez un nouveau tableur: "JBC Petition Signatures"
3. Dans la ligne 1, ajoutez les en-têtes:
   - A1: `Timestamp`
   - B1: `Prénom`
   - C1: `Nom`
   - D1: `Email`
   - E1: `Pays`

### **ÉTAPE 2: Déployer le Google Apps Script**
1. Dans votre Google Sheet, cliquez: **Extensions → Apps Script**
2. Supprimez le code par défaut
3. Collez ce code:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const timestamp = new Date();
  const firstname = e.parameter.firstname;
  const lastname = e.parameter.lastname;
  const email = e.parameter.email;
  const country = e.parameter.country;
  
  sheet.appendRow([timestamp, firstname, lastname, email, country]);
  const totalRows = sheet.getLastRow() - 1;
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    total: totalRows
  })).setMimeType(ContentService.MimeType.JSON);
}

function getSignatureCount() {
  const sheet = SpreadsheetApp.getActiveSheet();
  return sheet.getLastRow() - 1;
}
```

4. Cliquez: **Deploy → New Deployment**
5. Type: **Web app**
6. Execute as: Your email
7. Who has access: **Anyone**
8. **Deploy** — Copiez l'URL (ex: `https://script.google.com/macros/d/xxxxx/userweb`)

### **ÉTAPE 3: Connecter le formulaire à Google Sheets**
1. Ouvrez `petition-form.html` (sur votre site)
2. Trouvez cette ligne (vers ligne 120):
```javascript
// TODO: Envoyer à Google Sheets via Apps Script
```

3. Remplacez par:
```javascript
fetch('VOTRE_URL_APPS_SCRIPT', {
  method: 'POST',
  body: new URLSearchParams({
    firstname: firstname,
    lastname: lastname,
    email: email,
    country: country
  })
})
.then(r => r.json())
.then(data => {
  currentSignatures = data.total;
  updateProgress();
})
.catch(err => console.error(err));
```

4. Remplacez `VOTRE_URL_APPS_SCRIPT` par l'URL que vous avez copiée à l'étape 2.8

### **ÉTAPE 4: Mettre à jour votre site**
- Téléchargez `petition-form.html` sur GitHub
- Attendez que Netlify se reconstruit (2 min)
- Accédez: `https://jardinbotaniquecayeshaiti.org/petition-form.html`

---

## ✨ Résultat:

📊 **Barre de progression en direct** — Montre X/5000 qui s'met à jour à chaque signature  
📋 **Google Sheet caché** — Vous seul voyez les signatures (noms, emails, pays)  
✍️ **Formulaire professionnel** — Comme change.org  
💰 **100% gratuit** — Pas de paiement jamais

---

## 📊 Voir vos signatures:
- Allez à votre Google Sheet
- Les nouvelles signatures apparaissent automatiquement
- Vous pouvez exporter/analyser les données quand vous voulez

---

## Questions?
Faites-moi signe — je corrigerai tout ce qui ne fonctionne pas.
