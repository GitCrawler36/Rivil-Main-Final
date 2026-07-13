/* ==========================================================================
   Rivil International — homepage rotating destination hero (index.html only)
   --------------------------------------------------------------------------
   Vanilla JS, no dependencies. Progressive enhancement: the markup already
   renders the static New Zealand slide with all fixed content + CTAs, so
   with JavaScript disabled the hero is fully usable. This script adds the
   crossfading Ken Burns rotation, the destination tabs and autoplay.

   Accessibility / performance:
     - Slide 1 (NZ) loads eagerly via the baked-in inline background; every
       other image is preloaded ONE slide ahead, never all seven upfront.
     - prefers-reduced-motion: reduce  → no autoplay, no Ken Burns; the static
       NZ slide shows and the tabs still switch slides on click.
     - Tabs are real <button>s with per-country aria-labels and focus rings;
       only the changing pill/link region is an aria-live="polite" region.
     - Autoplay pauses on hover, while a touch is held, and when the tab is
       hidden (visibilitychange).
   ========================================================================== */

(function () {
  'use strict';

  var hero = document.getElementById('home-hero');
  if (!hero) return;

  /* New Zealand is always first. All images are real local assets. */
  var SLIDES = [
    { slug: 'new-zealand', name: 'New Zealand',    img: 'assets/mount-cook-updated.jpg',                        page: 'study-new-zealand.html', pill: 'New Zealand — our specialty since 2004' },
    { slug: 'uk',          name: 'United Kingdom',  img: 'assets/destinations/uk/hero-london-thames.jpg',        page: 'study-uk.html',          pill: 'United Kingdom' },
    { slug: 'australia',   name: 'Australia',       img: 'assets/destinations/australia/hero-sydney-harbour.jpg', page: 'study-australia.html',   pill: 'Australia' },
    { slug: 'canada',      name: 'Canada',          img: 'assets/destinations/canada/hero-toronto-skyline.jpg',  page: 'study-canada.html',      pill: 'Canada' },
    { slug: 'malaysia',    name: 'Malaysia',        img: 'assets/destinations/malaysia/hero-kuala-lumpur.jpg',   page: 'study-malaysia.html',    pill: 'Malaysia' },
    { slug: 'singapore',   name: 'Singapore',       img: 'assets/destinations/singapore/hero-marina-bay.jpg',    page: 'study-singapore.html',   pill: 'Singapore' },
    { slug: 'dubai',       name: 'Dubai',           img: 'assets/destinations/dubai/hero-burj-khalifa-day.jpg',  page: 'study-dubai.html',       pill: 'Dubai' }
  ];

  var DURATION = 6000;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var layerA = document.getElementById('phero-layer-a');
  var layerB = document.getElementById('phero-layer-b');
  var meta = document.getElementById('phero-meta');
  var pill = document.getElementById('phero-pill');
  var explore = document.getElementById('phero-explore');
  var exploreLabel = document.getElementById('phero-explore-label');
  var tabsWrap = document.getElementById('phero-tabs');
  if (!layerA || !layerB || !tabsWrap) return;

  var loaded = {};
  function preload(src, cb) {
    if (loaded[src]) { if (cb) cb(); return; }
    var im = new Image();
    im.onload = im.onerror = function () { loaded[src] = true; if (cb) cb(); };
    im.src = src;
  }

  /* --- Destination tabs (real buttons) --- */
  var tabEls = SLIDES.map(function (s, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'phero-tab' + (i === 0 ? ' is-active' : '');
    b.textContent = s.name;
    b.setAttribute('aria-label', 'Show ' + s.name);
    if (i === 0) b.setAttribute('aria-current', 'true');
    b.addEventListener('click', function () { go(i); });
    tabsWrap.appendChild(b);
    return b;
  });

  function updateTabs(i) {
    tabEls.forEach(function (b, j) {
      var active = j === i;
      b.classList.toggle('is-active', active);
      if (active) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
  }

  var swapTimer;
  function setMeta(s) {
    if (meta) meta.classList.add('is-swapping');
    clearTimeout(swapTimer);
    swapTimer = setTimeout(function () {
      if (pill) pill.textContent = s.pill;
      if (exploreLabel) exploreLabel.textContent = 'Explore ' + s.name;
      if (explore) {
        explore.setAttribute('href', s.page);
        explore.setAttribute('aria-label', 'Explore study options in ' + s.name);
      }
      if (meta) meta.classList.remove('is-swapping');
    }, reduceMotion ? 0 : 300);
  }

  /* --- Autoplay timer with pause conditions --- */
  var timer = null;
  var paused = false;
  function schedule() {
    clearTimeout(timer);
    if (reduceMotion || paused || document.hidden) return;
    timer = setTimeout(function () { go((idx + 1) % SLIDES.length); }, DURATION);
  }

  /* --- Crossfade + Ken Burns between two stacked layers --- */
  var idx = 0;
  var front = layerA;
  var back = layerB;

  function go(i) {
    if (i === idx) { schedule(); return; }
    var s = SLIDES[i];
    preload(s.img, function () {
      back.style.backgroundImage = 'url("' + s.img + '")';
      back.classList.remove('is-zooming');
      void back.offsetWidth;               /* restart Ken Burns */
      back.classList.add('is-visible');
      if (!reduceMotion) back.classList.add('is-zooming');
      front.classList.remove('is-visible', 'is-zooming');

      var tmp = front; front = back; back = tmp;
      idx = i;

      updateTabs(i);
      setMeta(s);
      preload(SLIDES[(i + 1) % SLIDES.length].img); /* next slide only */
      schedule();
    });
  }

  /* --- Pause interactions --- */
  hero.addEventListener('mouseenter', function () { paused = true; clearTimeout(timer); });
  hero.addEventListener('mouseleave', function () { paused = false; schedule(); });
  hero.addEventListener('touchstart', function () { paused = true; clearTimeout(timer); }, { passive: true });
  hero.addEventListener('touchend', function () { paused = false; schedule(); }, { passive: true });
  hero.addEventListener('touchcancel', function () { paused = false; schedule(); }, { passive: true });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) clearTimeout(timer); else schedule();
  });

  /* --- Init: slide 0 is already painted in the HTML --- */
  loaded[SLIDES[0].img] = true;
  layerA.classList.add('is-visible');
  if (!reduceMotion) layerA.classList.add('is-zooming');
  preload(SLIDES[1].img);   /* warm the next slide only */
  schedule();
})();
