/* galerie.js : mesure chaque image de la galerie pour que la mosaïque
   respecte sa proportion d'origine (paysage, carré, portrait). */
(function () {
  function mesurer(img) {
    var carte = img.closest('.card');
    if (!carte || !img.naturalWidth || !img.naturalHeight) return;
    carte.style.setProperty('--r', (img.naturalWidth / img.naturalHeight).toFixed(4));
  }

  var images = document.querySelectorAll('.grid .card img');
  for (var i = 0; i < images.length; i++) {
    (function (img) {
      if (img.complete) { mesurer(img); }
      else { img.addEventListener('load', function () { mesurer(img); }); }
    })(images[i]);
  }
})();
