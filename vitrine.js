/* Vitrine de la boutique : flèches et clavier (gauche / droite).
   Le défilement au doigt et à la souris fonctionne sans ce fichier. */
(function () {
  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-vitrine]').forEach(function (vitrine) {
    var piste = vitrine.querySelector('.vitrine-piste');
    var slides = vitrine.querySelectorAll('.vitrine-slide');
    var prec = vitrine.querySelector('.vitrine-prec');
    var suiv = vitrine.querySelector('.vitrine-suiv');
    var n = slides.length;

    if (!piste || n < 2) { return; }

    function indexActuel() {
      return Math.round(piste.scrollLeft / piste.clientWidth);
    }

    /* Boucle : après le dernier objet, on revient au premier (et inversement) */
    function aller(i) {
      i = (i + n) % n;
      piste.scrollTo({ left: i * piste.clientWidth, behavior: reduit ? 'auto' : 'smooth' });
    }

    if (prec) { prec.addEventListener('click', function () { aller(indexActuel() - 1); }); }
    if (suiv) { suiv.addEventListener('click', function () { aller(indexActuel() + 1); }); }

    vitrine.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); aller(indexActuel() - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); aller(indexActuel() + 1); }
    });

    vitrine.classList.add('est-pret');
  });
})();
