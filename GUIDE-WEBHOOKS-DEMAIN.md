# 📋 Guide Webhooks Netlify — À suivre demain

## ✅ Ce qui est déjà fait (1 sur 6)

- [x] `petition-signatures-fr` → connecté

## 📝 Ce qu'il reste à faire (5 webhooks)

- [ ] `petition-signatures-en`
- [ ] `petition-signatures-ht`
- [ ] `demande-pdf-dossier-fr`
- [ ] `demande-pdf-dossier-en`
- [ ] `demande-pdf-dossier-ht`

---

## 🔄 Pour chaque webhook — mêmes 5 clics

### ÉTAPE 1 : Aller à la page
URL : https://app.netlify.com/projects/jardinbotaniquedescayes/configuration/notifications/#form-submission-notifications

### ÉTAPE 2 : Cliquer
- Dans la section **"Form submission notifications"**
- Cliquer **"Add notification"** ▼
- Choisir **"HTTP POST request"**

### ÉTAPE 3 : Remplir les 3 champs

| Champ | Valeur |
|-------|--------|
| **Event to listen for** | `Form submission` (par défaut) |
| **URL to notify** | *(voir ci-dessous — copier-coller)* |
| **Form** | `petition-signatures-en` *(changer à chaque fois)* |

### URL à coller (LA MÊME pour les 5 webhooks)

```
https://script.google.com/macros/s/AKfycbzXdDw12efpXHz9NpCoiJ5ERmbVU9lW7vJyWLNcWhFFeY6oHfCBNQWprhZrl0YnjEk/exec
```

### ÉTAPE 4 : Cliquer "Save"

### ÉTAPE 5 : Vérifier
- Vous devez voir une nouvelle ligne apparaître dans la section
- Format : "Post to https://script.google.com/... on new submission from [nom-formulaire]"

**Répéter 5 fois** avec les 5 noms de formulaires différents.

---

## 🎯 3 façons de vérifier votre travail

### VÉRIFICATION #1 — Visuel sur Netlify
À la fin, la section "Form submission notifications" doit afficher **6 lignes** :
- Post to ... on new submission from `petition-signatures-fr` ✓
- Post to ... on new submission from `petition-signatures-en` ✓
- Post to ... on new submission from `petition-signatures-ht` ✓
- Post to ... on new submission from `demande-pdf-dossier-fr` ✓
- Post to ... on new submission from `demande-pdf-dossier-en` ✓
- Post to ... on new submission from `demande-pdf-dossier-ht` ✓

📸 **Capture d'écran** : envoyez-la-moi, je valide.

### VÉRIFICATION #2 — Test réel sur le site
1. Aller sur https://jardinbotaniquecayeshaiti.org/sos-petition-fr.html
2. Remplir le formulaire de signature avec **vos propres infos**
3. Cliquer "Signer"
4. **Attendre 10 secondes**

Puis vérifier :
- ✅ Votre Google Sheet "JBC — Pétition SOS" → onglet "Signatures" → **nouvelle ligne** avec vos infos
- ✅ Votre boîte Gmail → **email de remerciement** de "Jardin Botanique des Cayes"

Si les 2 arrivent, **ÇA MARCHE !** 🎉

Si seulement le Sheet marche mais pas l'email, ou l'inverse, dites-moi quoi exactement.

### VÉRIFICATION #3 — Logs Netlify
Netlify garde un historique des webhooks envoyés :
1. Sur la page des notifications, cliquer **"Options"** à droite d'un webhook
2. Choisir **"Event log"** ou **"View deliveries"**
3. Vous verrez chaque tentative : ✅ succès (code 200) ou ❌ échec (code 4xx/5xx)

---

## ⚠️ Si un webhook ne marche pas

**Symptôme** : Vous remplissez le formulaire sur le site, mais rien n'apparaît dans le Google Sheet.

**Diagnostic** :
1. Ouvrir l'onglet "Event log" du webhook (VÉRIFICATION #3)
2. Regarder le code de statut
   - **200** : OK, Apps Script a reçu. Le problème est dans Apps Script (re-déployer peut-être)
   - **401 / 403** : Problème d'autorisation Apps Script → vérifier que le déploiement est "Anyone"
   - **404** : URL fausse → re-copier l'URL
   - **5xx** : Apps Script en panne → attendre 5 min et re-tester

**Si vous êtes bloqué** : m'envoyer une capture du log + le message d'erreur, je vous débloque en 2 min.

---

## 💪 Ordre conseillé pour demain

1. ☕ Faire les 5 webhooks (10-15 minutes)
2. 📸 M'envoyer une capture finale
3. 🧪 Faire le test réel sur le site
4. 🎊 Célébrer — la pétition est LIVE !

Ensuite on s'attaquera au **dashboard Google Sheet** (tâche #18) pour afficher joliment les signatures.

---

## 📞 Si besoin d'aide rapide demain

Envoyez-moi simplement :
- Capture d'écran + "où je bloque"
- Ou description en 1 phrase du problème

Je vous débloque tout de suite. 💪
