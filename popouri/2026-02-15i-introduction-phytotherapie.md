/* =========================
   ✅ 2 PILIERS — MODÈLE KEW
   (ne change pas le background du site)
   ========================= */
.piliers-kew{ padding:78px 0 86px; }
.piliers-kew .p-head{
  text-align:center;
  max-width:980px;
  margin:0 auto 40px;
}
.piliers-kew .p-head h2{
  font-size:clamp(2.2rem, 3.2vw, 3.2rem);
  margin-bottom:10px;
  letter-spacing:.02em;
  color:rgba(18,24,30,.92);
}
.piliers-kew .p-head p{
  color:var(--muted);
  font-size:1.08rem;
  line-height:1.85;
}

/* grille 2 colonnes */
.piliers-kew-grid{
  display:grid;
  grid-template-columns:repeat(2, 1fr);
  gap:28px;
  align-items:stretch;
}

/* carte : photo + bloc blanc */
.pilier-kew{
  position:relative;
  border-radius:22px;
  overflow:hidden;
  box-shadow:0 18px 60px rgba(0,0,0,.12);
  background:#e9efe7;
  min-height:520px;
  border:1px solid rgba(0,0,0,.06);
}

/* ✅ photo plein écran (z-index ajouté) */
.pilier-kew img{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:cover;
  transform:scale(1.02);
  transition:.55s ease;
  filter:saturate(1.05);
  z-index:0;               /* ✅ IMPORTANT */
  display:block;
}
.pilier-kew:hover img{ transform:scale(1.06); }

/* ✅ voile léger (z-index ajouté) */
.pilier-kew::after{
  content:"";
  position:absolute;
  inset:0;
  background:linear-gradient(180deg,
    rgba(0,0,0,.05) 0%,
    rgba(0,0,0,.18) 52%,
    rgba(0,0,0,.28) 100%);
  z-index:1;               /* ✅ IMPORTANT */
  pointer-events:none;
}

/* ✅ bloc blanc au-dessus */
.pilier-kew-white{
  position:absolute;
  left:0; right:0; bottom:0;
  background:#fff;
  color:var(--ink);
  z-index:2;               /* ✅ IMPORTANT */
  padding:26px 22px 22px;
  min-height:210px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  text-align:center;
}

.pilier-kew-kicker{
  font-weight:900;
  letter-spacing:.12em;
  text-transform:uppercase;
  font-size:.72rem;
  color:rgba(47,93,47,.95);
  margin-bottom:8px;
}
.pilier-kew-white h3{
  font-family:"Playfair Display", serif;
  font-size:1.85rem;
  margin:0 0 10px;
  color:rgba(18,24,30,.92);
}
.pilier-kew-line{
  width:86px;
  height:3px;
  background:rgba(94,143,58,.85);
  margin:0 auto 12px;
  border-radius:999px;
}
.pilier-kew-white p{
  margin:0 auto 14px;
  max-width:560px;
  color:rgba(31,42,51,.75);
  line-height:1.75;
  font-size:1.03rem;
}

/* boutons carrés style TNC */
.pilier-kew-actions{
  display:flex;
  justify-content:center;
  gap:12px;
  flex-wrap:wrap;
}
.btn-tnc{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  padding:12px 16px;
  border-radius:12px;
  font-weight:900;
  letter-spacing:.08em;
  text-transform:uppercase;
  font-size:.84rem;
  border:1px solid rgba(0,0,0,.10);
  background:var(--deep);
  color:#fff;
  box-shadow:0 14px 36px rgba(0,0,0,.14);
  transition:.18s ease;
}
.btn-tnc:hover{ background:var(--botanical); transform:translateY(-1px); }
.btn-tnc.alt{
  background:#fff;
  color:var(--deep);
  border:1px solid rgba(47,93,47,.25);
  box-shadow:0 14px 36px rgba(0,0,0,.10);
}
.btn-tnc.alt:hover{ background:rgba(47,93,47,.06); }

@media (max-width: 1040px){
  .piliers-kew-grid{ grid-template-columns:1fr; }
  .pilier-kew{ min-height:500px; }
} /* ✅ IMPORTANT : il manquait cette accolade */



