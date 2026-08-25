document.addEventListener('DOMContentLoaded', function () {

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Preloader — plays once per browser session, only on the homepage
  --------------------------------------------------------------------- */
  var preloader = document.getElementById('preloader');
  if (preloader) {
    var alreadyShown = sessionStorage.getItem('smileWelcomeShown');
    if (alreadyShown || reducedMotion) {
      preloader.style.display = 'none';
    } else {
      sessionStorage.setItem('smileWelcomeShown', '1');
      window.setTimeout(function () {
        preloader.classList.add('is-hidden');
        window.setTimeout(function () { preloader.style.display = 'none'; }, 750);
      }, 2050);
    }
  }

  /* ---------------------------------------------------------------------
     Sticky nav shrink + mobile menu
  --------------------------------------------------------------------- */
  var navWrap = document.querySelector('.nav-wrap');
  var onScrollNav = function () {
    if (!navWrap) return;
    if (window.scrollY > 12) navWrap.classList.add('is-scrolled');
    else navWrap.classList.remove('is-scrolled');
  };
  document.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', mobileMenu.classList.contains('is-open'));
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
      });
    });
  }

  /* ---------------------------------------------------------------------
     Hero slideshow
  --------------------------------------------------------------------- */
  var slideshow = document.querySelector('.slideshow');
  if (slideshow) {
    var slides = Array.prototype.slice.call(slideshow.querySelectorAll('.slide'));
    var dotsWrap = slideshow.querySelector('.slide-dots');
    var current = 0;
    var timer = null;
    var interval = 4800;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Show slide ' + (i + 1));
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', function () { goTo(i); restart(); });
      if (dotsWrap) dotsWrap.appendChild(dot);
    });
    var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.children) : [];

    function goTo(index) {
      slides[current].classList.remove('is-active');
      if (dots[current]) dots[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      if (dots[current]) dots[current].classList.add('is-active');
      // restart Ken Burns animation
      var img = slides[current].querySelector('img');
      if (img) { img.style.animation = 'none'; void img.offsetWidth; img.style.animation = ''; }
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function restart() {
      clearInterval(timer);
      timer = setInterval(next, interval);
    }

    var nextBtn = slideshow.querySelector('.slide-next');
    var prevBtn = slideshow.querySelector('.slide-prev');
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });

    slideshow.addEventListener('mouseenter', function () { clearInterval(timer); });
    slideshow.addEventListener('mouseleave', restart);

    restart();
  }

  /* ---------------------------------------------------------------------
     Scroll reveal
  --------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------------------------------------------------------------
     Gallery lightbox
  --------------------------------------------------------------------- */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  var lightbox = document.querySelector('.lightbox');
  if (galleryItems.length && lightbox) {
    var lbImg = lightbox.querySelector('img');
    var lbIndex = 0;

    function openLightbox(i) {
      lbIndex = i;
      var img = galleryItems[i].querySelector('img');
      lbImg.src = img.getAttribute('data-full') || img.src;
      lbImg.alt = img.alt;
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    function showRelative(delta) {
      lbIndex = (lbIndex + delta + galleryItems.length) % galleryItems.length;
      openLightbox(lbIndex);
    }

    galleryItems.forEach(function (item, i) {
      item.addEventListener('click', function () { openLightbox(i); });
    });
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn2 = lightbox.querySelector('.lightbox-prev');
    var nextBtn2 = lightbox.querySelector('.lightbox-next');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn2) prevBtn2.addEventListener('click', function () { showRelative(-1); });
    if (nextBtn2) nextBtn2.addEventListener('click', function () { showRelative(1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showRelative(1);
      if (e.key === 'ArrowLeft') showRelative(-1);
    });
  }

  /* ---------------------------------------------------------------------
     Back to top
  --------------------------------------------------------------------- */
  var toTop = document.querySelector('.to-top');
  if (toTop) {
    document.addEventListener('scroll', function () {
      if (window.scrollY > 500) toTop.classList.add('is-visible');
      else toTop.classList.remove('is-visible');
    }, { passive: true });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  }
});
