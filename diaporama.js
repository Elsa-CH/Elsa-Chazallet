/* Diaporama d'images (boutique)
   Fonctionne avec le code HTML des pages du dossier "boutique/".
   - défilement au doigt, à la souris ou au clavier (flèches gauche/droite)
   - flèches, points et compteur "1 / 4"
   Sans JavaScript, les photos restent consultables en faisant défiler. */
(function () {
  var diaporamas = document.querySelectorAll('[data-diapo]');
  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  diaporamas.forEach(function (diapo) {
    var piste = diapo.querySelector('.diapo-piste');
    var slides = diapo.querySelectorAll('.diapo-slide');
    var prec = diapo.querySelector('.diapo-prec');
    var suiv = diapo.querySelector('.diapo-suiv');
    var zonePoints = diapo.querySelector('.diapo-points');
    var compteur = diapo.querySelector('.diapo-compteur');

    if (!piste || slides.length < 2) {
      diapo.classList.add('diapo--seule');
      return;
    }

    var points = [];

    function indexActuel() {
      return Math.round(piste.scrollLeft / piste.clientWidth);
    }

    function aller(i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      piste.scrollTo({ left: i * piste.clientWidth, behavior: reduit ? 'auto' : 'smooth' });
    }

    function miseAJour() {
      var i = indexActuel();
      points.forEach(function (p, k) {
        p.classList.toggle('est-actif', k === i);
        if (k === i) { p.setAttribute('aria-current', 'true'); }
        else { p.removeAttribute('aria-current'); }
      });
      if (compteur) { compteur.textContent = (i + 1) + ' / ' + slides.length; }
      if (prec) { prec.disabled = (i === 0); }
      if (suiv) { suiv.disabled = (i === slides.length - 1); }
    }

    // Un point par photo
    if (zonePoints) {
      slides.forEach(function (s, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'diapo-point';
        b.setAttribute('aria-label', 'Photo ' + (i + 1) + ' sur ' + slides.length);
        b.addEventListener('click', function () { aller(i); });
        zonePoints.appendChild(b);
        points.push(b);
      });
    }

    if (prec) { prec.addEventListener('click', function () { aller(indexActuel() - 1); }); }
    if (suiv) { suiv.addEventListener('click', function () { aller(indexActuel() + 1); }); }

    piste.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); aller(indexActuel() - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); aller(indexActuel() + 1); }
    });

    piste.addEventListener('scroll', function () {
      window.requestAnimationFrame(miseAJour);
    }, { passive: true });
    window.addEventListener('resize', miseAJour);

    diapo.classList.add('est-pret');
    miseAJour();
  });
})();
