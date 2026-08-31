# LFL Création — La Ferme de Longchamp

Site vitrine + boutique (démo) pour LFL Création : corbeilles, créations, crudités et jus de fruits.
Site **statique** (HTML/CSS/JS, sans build ni dépendance).

## Aperçu en local
```bash
cd ferme-longchamps
python3 -m http.server 5173
# puis http://localhost:5173
```

## Pages
- `index.html` — accueil (hero, best-sellers, deux univers, livraison, événements, histoire, avis, feed Instagram)
- `boutique.html` — catalogue (34 produits, filtres par catégorie, `?cat=Corbeilles|Créations|Crudités|Jus`)
- `produit.html?id=…` — fiche produit (tailles/prix, composition, conseil)
- `panier.html` — panier + passage de commande
- `evenements.html` · `entreprises.html` — pages événements / entreprises
- `compte.html` — espace client (inscription/connexion + commandes)
- `admin.html` — espace propriétaire (mot de passe démo : **lfl2024**)
- `a-propos.html` · `contact.html`

## Données & couleurs
- Catalogue : `assets/js/data.js` (noms, prix, options, descriptions).
- Couleurs : `assets/css/style.css` (`:root`). Accent vert **#2E7D46**.
- Logique (panier, comptes, commandes, admin) : `assets/js/main.js`.

## ⚠️ Démo côté navigateur
Panier, comptes clients et commandes sont stockés en **localStorage** (par navigateur, non chiffré).
Pour la production (commandes centralisées, comptes sécurisés, paiement), il faut un **backend**
(Supabase/Firebase, ou WooCommerce) — voir l'historique de conception.

## Mettre en ligne (gratuit)

### Option A — Netlify (le plus simple, sans compte git)
1. Créez un compte sur netlify.com.
2. Onglet **Sites → Add new site → Deploy manually**.
3. **Glissez-déposez le dossier `ferme-longchamps`** entier. C'est en ligne (URL `…netlify.app`).

### Option B — GitHub + Pages
```bash
cd ferme-longchamps
git init && git add -A && git commit -m "LFL Création — site"
# créez un dépôt vide sur github.com, puis :
git remote add origin git@github.com:VOTRE-COMPTE/lfl-creation.git
git branch -M main
git push -u origin main
# GitHub → Settings → Pages → Branch: main /(root) → Save
```

À la mise en ligne : ajouter vos vrais moyens de paiement + un backend pour les comptes/commandes.
