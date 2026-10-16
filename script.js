(function () {
  // Scroll reveal
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Nav border on scroll
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu
  var toggle = document.querySelector('.nav__toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('nav--open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
        nav.classList.remove('nav--open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Gallery lightbox
  var box = document.getElementById('lightbox');
  var figs = Array.prototype.slice.call(document.querySelectorAll('#gallery .g'));
  if (box && figs.length) {
    var boxImg = box.querySelector('img');
    var boxCap = box.querySelector('figcaption');
    var current = 0, lastFocus = null;

    var show = function (i) {
      current = (i + figs.length) % figs.length;
      var img = figs[current].querySelector('img');
      boxImg.src = img.src;
      boxImg.alt = img.alt;
      boxCap.textContent = Array.prototype.map.call(
        figs[current].querySelectorAll('figcaption span'),
        function (s) { return s.textContent; }
      ).join('  ·  ');
    };
    var open = function (i) {
      lastFocus = document.activeElement;
      show(i);
      box.hidden = false;
      document.body.style.overflow = 'hidden';
      box.querySelector('.lightbox__close').focus();
    };
    var close = function () {
      box.hidden = true;
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };

    figs.forEach(function (fig, i) {
      fig.querySelector('button').addEventListener('click', function () { open(i); });
    });
    box.querySelector('.lightbox__close').addEventListener('click', close);
    box.querySelector('.lightbox__nav--prev').addEventListener('click', function () { show(current - 1); });
    box.querySelector('.lightbox__nav--next').addEventListener('click', function () { show(current + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
    });

    // Swipe on touch screens
    var startX = null;
    box.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    });
  }

  // Downloadable vCard
  var save = document.getElementById('save-contact');
  if (save) {
    save.addEventListener('click', function () {
      var vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'N:Odongo;Peter;Agak;;',
        'FN:Peter Agak Odongo',
        'ORG:Lokari Africa',
        'TITLE:Founder',
        'TEL;TYPE=CELL:+254710320637',
        'EMAIL;TYPE=INTERNET:peteragak61@gmail.com',
        'URL:https://www.lokari.co.ke/',
        'URL:https://www.linkedin.com/in/peter-odongo-0024b2290',
        'END:VCARD'
      ].join('\r\n');
      var blob = new Blob([vcard], { type: 'text/vcard' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'Peter-Agak-Odongo.vcf';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0);
    });
  }
})();
