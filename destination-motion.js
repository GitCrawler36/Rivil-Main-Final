/* ==========================================================================
   Rivil International — shared destination-page motion library
   Generic motion helpers callable from any "Study in <Country>" page.
   Plain vanilla JavaScript. No dependencies.

   Every function checks prefers-reduced-motion and skips animation
   entirely (keeping the static end-state) when the user has it set.
   ========================================================================== */

(function () {
  'use strict';

  function reducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* Slow Ken Burns drift on the hero background: scale(1) → scale(1.06)
     over 25s, ease-in-out, alternating forever. The dest-kenburns
     keyframes live in destination-theme.css. */
  window.initKenBurnsHero = function (selector) {
    var el = document.querySelector(selector);
    if (!el || reducedMotion()) return;
    el.style.animation = 'dest-kenburns 25s ease-in-out infinite alternate';
  };

  /* Parallax on the hero background: translateY at ~0.4x scroll speed,
     batched through requestAnimationFrame rather than firing per pixel. */
  window.initParallaxHero = function (selector) {
    var el = document.querySelector(selector);
    if (!el || reducedMotion()) return;

    var ticking = false;

    function update() {
      el.style.transform = 'translate3d(0, ' + (window.scrollY * 0.4).toFixed(1) + 'px, 0)';
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });

    update();
  };

  /* Subtle hover lift + border brighten for glass panels. The 0.3s ease
     transition comes from .dest-glass-panel in destination-theme.css. */
  window.initGlassHoverEffects = function (selector) {
    if (reducedMotion()) return;
    document.querySelectorAll(selector).forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        el.style.transform = 'translateY(-4px)';
        el.style.borderColor = 'rgba(255, 255, 255, 0.24)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = '';
        el.style.borderColor = '';
      });
    });
  };

  /* Arrow-button horizontal scrolling for a gallery strip. `selector`
     matches a wrapper containing a .dest-gallery track and buttons with
     data-gallery-dir="-1" / "1". Scrolls one card-width per click; under
     reduced motion the jump is instant instead of smooth. */
  window.initGalleryScroll = function (selector) {
    var wrap = document.querySelector(selector);
    if (!wrap) return;
    var track = wrap.querySelector('.dest-gallery');
    if (!track) return;

    var behavior = reducedMotion() ? 'auto' : 'smooth';

    function cardWidth() {
      var item = track.querySelector('.dest-gallery-item');
      if (!item) return track.clientWidth;
      var gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
      return item.getBoundingClientRect().width + gap;
    }

    wrap.querySelectorAll('[data-gallery-dir]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dir = parseInt(btn.getAttribute('data-gallery-dir'), 10) || 1;
        track.scrollBy({ left: dir * cardWidth(), behavior: behavior });
      });
    });
  };
})();
