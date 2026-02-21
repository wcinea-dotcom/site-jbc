// Attendre que la page commence à charger
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Charger le Header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            
            // Allumer l'onglet actif dynamiquement
            highlightActiveMenu();
            
            // Initialiser les clics du menu
            initMenu();
        })
        .catch(error => console.error('Erreur de chargement du header:', error));

    // 2. Charger le Footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Erreur de chargement du footer:', error));
});

// --- Fonction pour mettre l'onglet actuel en vert ---
function highlightActiveMenu() {
    // Récupère le nom du fichier actuel (ex: "education.html")
    let currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "") currentPage = "index.html"; // Par défaut si on est sur la racine

    // Cherche le lien correspondant dans la barre de navigation
    const activeLinks = document.querySelectorAll(`nav a[href="${currentPage}"], .drawer a[href="${currentPage}"]`);
    
    activeLinks.forEach(link => {
        link.style.color = "var(--deep)"; // Applique la couleur verte
    });
}

// --- Fonction pour faire fonctionner les menus déroulants et le mobile ---
function initMenu() {
    const dropAccueil = document.getElementById('dropAccueil');
    const btnAccueil = document.getElementById('btnAccueil');
    const dropNature = document.getElementById('dropNature');
    const btnNature = document.getElementById('btnNature');
    const burger = document.getElementById('burger');
    const drawer = document.getElementById('drawer');
    const dBtnAccueil = document.getElementById('drawerAccueilBtn');
    const dSubAccueil = document.getElementById('drawerAccueilSub');
    const dBtnNature = document.getElementById('drawerNatureBtn');
    const dSubNature = document.getElementById('drawerNatureSub');

    // Menus desktop
    if(dropAccueil && btnAccueil){
        btnAccueil.addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation();
            if(dropNature) dropNature.classList.remove('open');
            const open = dropAccueil.classList.toggle('open');
            btnAccueil.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    if(dropNature && btnNature){
        btnNature.addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation();
            if(dropAccueil) dropAccueil.classList.remove('open');
            const open = dropNature.classList.toggle('open');
            btnNature.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    // Menu mobile (Burger)
    if(burger && drawer){
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            const open = drawer.classList.toggle('open');
            burger.setAttribute('aria-expanded', open ? 'true' : 'false');
            if(!open){
                if(dSubAccueil) dSubAccueil.classList.remove('open');
                if(dSubNature) dSubNature.classList.remove('open');
            }
        });
    }

    // Sous-menus mobile
    if(dBtnAccueil && dSubAccueil){
        dBtnAccueil.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); dSubAccueil.classList.toggle('open'); });
    }

    if(dBtnNature && dSubNature){
        dBtnNature.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); dSubNature.classList.toggle('open'); });
    }

    // Fermer quand on clique en dehors
    document.addEventListener('click', () => {
        if(dropAccueil){ dropAccueil.classList.remove('open'); btnAccueil && btnAccueil.setAttribute('aria-expanded','false'); }
        if(dropNature){ dropNature.classList.remove('open'); btnNature && btnNature.setAttribute('aria-expanded','false'); }
        if(drawer){ drawer.classList.remove('open'); }
        if(burger){ burger.setAttribute('aria-expanded','false'); }
        if(dSubAccueil){ dSubAccueil.classList.remove('open'); }
        if(dSubNature){ dSubNature.classList.remove('open'); }
    });

    // Empêcher la fermeture si on clique DANS le menu
    if(dropAccueil) dropAccueil.addEventListener('click', (e) => e.stopPropagation());
    if(dropNature) dropNature.addEventListener('click', (e) => e.stopPropagation());
    if(drawer) drawer.addEventListener('click', (e) => e.stopPropagation());
}