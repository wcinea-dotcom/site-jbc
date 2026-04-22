# Guide correctifs pétition — à faire AVANT le lancement

## Ce qui a été corrigé dans le code (déjà poussé)

### Pages HTML (FR, EN, HT)
- **Bouton désactivé après clic** → plus de 4× Natacha qui se répètent
- **Géolocalisation persistée dans localStorage** → la ville détectée une fois reste disponible pour les visites suivantes
- **Fallback 2e API** (ipwho.is) si ipapi.co est bloqué
- **Champ `langue` ajouté** au formulaire → Apps Script sait envoyer l'email dans la bonne langue
- **Anti double-submit** en JS → un seul envoi par clic

## Ce que VOUS devez faire MAINTENANT (5 min)

### 1. Mettre à jour le code Apps Script

Ouvrez votre Google Sheet `JBC-PETITION-SIGNATURES`, puis :

1. **Extensions → Apps Script**
2. **Supprimez tout le code existant**
3. **Copiez-collez le contenu du fichier** `apps-script-petition.gs` (à la racine du repo)
4. **Sauvegardez** (icône disquette)
5. **Déployer → Gérer les déploiements**
6. Icône crayon ✏️ sur le déploiement actif
7. **Version → Nouvelle version**
8. **Déployer**

L'URL reste la même — **pas besoin de reconfigurer Netlify**.

### 2. Pourquoi ces fixes règlent vos 4 problèmes

| Problème signalé | Cause | Fix |
|---|---|---|
| Natacha signe 4× | Bouton pas désactivé | Bouton `disabled` après 1er clic + flag `_submitted` |
| Ville vide dans Sheet | Géo async pas finie au submit | localStorage cache la ville entre visites |
| "Passione de la nature" dans Ville | Apps Script mappait par position | Nouveau script lit par NOM (`fields.ville`, `fields.profession`) |
| Email va en spam | `MailApp.sendEmail` basique | Nouveau script : from name propre, sujet neutre, HTML + texte alternatif, replyTo |

### 3. Vérifier après déploiement

1. Ouvrez `https://jardinbotaniquecayeshaiti.org/sos-petition-fr.html`
2. Signez avec vos vraies coordonnées
3. Dans les 10 secondes :
   - ✅ Une ligne apparaît dans la Sheet — colonnes dans le BON ordre
   - ✅ Email reçu (vérifiez aussi les spams — la 1re fois Gmail peut hésiter)
4. Si l'email est dans les spams : **marquez "Pas un spam"** — Gmail apprend
5. Re-cliquez "Signer" → le bouton reste bloqué (= anti doublon marche)

## Si l'email reste en spam après le fix

C'est normal au début pour un envoi depuis `wcinea@gmail.com`. Solutions par ordre d'impact :

1. **Court terme (aujourd'hui)** : demander aux signataires de vérifier leurs spams — le texte du formulaire peut le mentionner
2. **Moyen terme** : configurer un **Google Workspace** avec domaine `@jardinbotaniquecayeshaiti.org` et envoyer depuis cette adresse (SPF/DKIM automatiques)
3. **Long terme** : passer par un service d'email transactionnel (Brevo, Resend) — gratuit jusqu'à 300 emails/jour

## Support

Si quelque chose casse après le déploiement :
1. Ouvrez Apps Script → onglet **Exécutions** (gauche)
2. Regardez les erreurs rouges
3. Envoyez-moi une capture d'écran
