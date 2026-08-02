(function(){
  document.addEventListener('click', function(e){
    var img = e.target.closest('.lesson-img img');
    if (!img) return;
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    var big = document.createElement('img');
    big.src = img.src;
    big.alt = img.alt || '';
    overlay.appendChild(big);
    overlay.addEventListener('click', function(){ overlay.remove(); });
    document.body.appendChild(overlay);
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      var ov = document.querySelector('.lightbox-overlay');
      if (ov) ov.remove();
    }
  });
})();
