// assets/js/site.js
function setupDropdown(btnId, dropId) {
  const btn = document.getElementById(btnId);
  const drop = document.getElementById(dropId);

  if (!btn || !drop) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    document.querySelectorAll('.drop').forEach(d => {
      if (d !== drop) d.classList.remove('open');
    });

    drop.classList.toggle('open');
  });
}

function setupDrawerSub(btnId, subId) {
  const btn = document.getElementById(btnId);
  const sub = document.getElementById(subId);
  if (!btn || !sub) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    document.querySelectorAll('.drawer-sub').forEach(s => {
      if (s !== sub) s.classList.remove('open');
    });

    sub.classList.toggle('open');
  });
}

setupDropdown('btnAccueil', 'dropAccueil');
setupDropdown('btnNature', 'dropNature');
setupDrawerSub('drawerAccueilBtn', 'drawerAccueilSub');
setupDrawerSub('drawerNatureBtn', 'drawerNatureSub');

const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');

if (burger && drawer) {
  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    drawer.classList.toggle('open');
  });
}

document.addEventListener('click', () => {
  document.querySelectorAll('.drop').forEach(d => d.classList.remove('open'));
  document.querySelectorAll('.drawer-sub').forEach(s => s.classList.remove('open'));
  if (drawer) drawer.classList.remove('open');
});

document.querySelectorAll('.drop, .drawer').forEach(el => {
  el.addEventListener('click', (e) => e.stopPropagation());
});
