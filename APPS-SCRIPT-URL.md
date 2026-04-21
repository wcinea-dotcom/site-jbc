# 🔐 URL Apps Script — JBC Pétition

**Déployée le :** 20 avril 2026

## URL du Web App (à donner à Netlify)

```
https://script.google.com/macros/s/AKfycbzXdDw12efpXHz9NpCoiJ5ERmbVU9lW7vJyWLNcWhFFeY6oHfCBNQWprhZrl0YnjEk/exec
```

## ID du déploiement

```
AKfycbzXdDw12efpXHz9NpCoiJ5ERmbVU9lW7vJyWLNcWhFFeY6oHfCBNQWprhZrl0YnjEk
```

## Configuration du déploiement

- **Exécuter en tant que** : Moi (wcinea@gmail.com)
- **Qui a accès** : Tout le monde
- **Type** : Application Web

## Fonctions gérées

- `handleSignature(data, lang)` : enregistre signature dans Google Sheet "Signatures" + envoie email de remerciement
- `handlePdfRequest(data, lang)` : enregistre demande PDF dans Sheet + envoie accusé de réception

## 6 formulaires à connecter (Netlify webhooks)

1. `petition-signatures-fr` → `handleSignature` (fr)
2. `petition-signatures-en` → `handleSignature` (en)
3. `petition-signatures-ht` → `handleSignature` (ht)
4. `demande-pdf-dossier-fr` → `handlePdfRequest` (fr)
5. `demande-pdf-dossier-en` → `handlePdfRequest` (en)
6. `demande-pdf-dossier-ht` → `handlePdfRequest` (ht)

## ⚠️ Re-déploiement

Si tu modifies le code Apps Script plus tard, tu dois **re-déployer** :
1. Déployer → Gérer les déploiements
2. Icône crayon ✏️ sur le déploiement actif
3. Version → Nouvelle version
4. Déployer

**L'URL reste la même** (pas besoin de reconfigurer Netlify).
