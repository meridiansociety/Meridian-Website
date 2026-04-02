/**
 * The Meridian Society — Shared Site Script
 *
 * Runs on every page. Modules:
 *   1. Registration URL  — single source of truth for all [data-register] links
 *   2. Scroll handler    — RAF-batched: nav state, progress bar, arc button, sticky join (optional)
 *   3. Scroll reveal     — IntersectionObserver for .rv elements
 *   4. Mobile menu       — open/close/focus/Escape
 *   5. Pull-to-dismiss   — swipe-right gesture on mobile drawer
 */
'use strict';

// ─────────────────────────────────────────────────────────────────
// 1. REGISTRATION URL
// Update here to change every registration link across the whole site
// ─────────────────────────────────────────────────────────────────
var REGISTER_URL = 'https://docs.google.com/forms/d/1qThcXHxzfuW4uNVkZbHGhHwlDsy8x-YGtpHpOLnqTl4/viewform';

document.querySelectorAll('a[data-register]').forEach(function(el) {
  el.href = REGISTER_URL;
});

// ─────────────────────────────────────────────────────────────────
// 2. SCROLL HANDLER
// All scroll side-effects batched into a single rAF callback.
// stickyJoin / heroEl / registerEl are optional — only active on index.html.
// ─────────────────────────────────────────────────────────────────
(function() {
  var ticking    = false;
  var nav        = document.getElementById('mainNav');
  var bar        = document.getElementById('progressBar');
  var arcBtn     = document.getElementById('arcBtn');
  var arcFill    = document.getElementById('arcFill');
  var stickyJoin = document.getElementById('stickyJoin');
  var heroEl     = document.querySelector('.hero');
  var registerEl = document.getElementById('register');

  var CIRC = 2 * Math.PI * 22;
  arcFill.style.strokeDasharray  = String(CIRC);
  arcFill.style.strokeDashoffset = String(CIRC);

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function() {
        var h   = document.documentElement.scrollHeight - window.innerHeight;
        var pct = h > 0 ? window.scrollY / h : 0;

        nav.classList.toggle('scrolled', window.scrollY > 40);
        bar.style.width = (pct * 100) + '%';
        arcFill.style.strokeDashoffset = String(CIRC * (1 - pct));
        arcBtn.classList.toggle('visible', window.scrollY > 200);

        if (stickyJoin && heroEl && registerEl) {
          stickyJoin.classList.toggle('visible',
            heroEl.getBoundingClientRect().bottom < 0 &&
            registerEl.getBoundingClientRect().bottom > 0
          );
        }

        ticking = false;
      });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  arcBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) ticking = false;
  });
})();

// ─────────────────────────────────────────────────────────────────
// 3. SCROLL REVEAL
// ─────────────────────────────────────────────────────────────────
(function() {
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.01, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.rv').forEach(function(el) { obs.observe(el); });
})();

// ─────────────────────────────────────────────────────────────────
// 4. MOBILE MENU
// ─────────────────────────────────────────────────────────────────
(function() {
  var mobileMenu = document.getElementById('mobileMenu');
  var backdrop   = document.getElementById('menuBackdrop');
  var burger     = document.getElementById('burgerBtn');

  function openMenu() {
    mobileMenu.classList.add('open');
    backdrop.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var firstLink = mobileMenu.querySelector('a, button');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    backdrop.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    burger.focus();
  }

  window.closeMenu = closeMenu;

  burger.addEventListener('click', function() {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });
  backdrop.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
  });
})();

// ─────────────────────────────────────────────────────────────────
// 5. PULL-TO-DISMISS (swipe-right gesture on mobile drawer)
// ─────────────────────────────────────────────────────────────────
(function() {
  var drawer  = document.getElementById('mobileMenu');
  var startX  = 0;
  var startY  = 0;
  var dragging = false;

  drawer.addEventListener('touchstart', function(e) {
    if (!drawer.classList.contains('open')) return;
    startX   = e.touches[0].clientX;
    startY   = e.touches[0].clientY;
    dragging = true;
    drawer.style.transition = 'none';
  }, { passive: true });

  drawer.addEventListener('touchmove', function(e) {
    if (!dragging) return;
    var dx = e.touches[0].clientX - startX;
    var dy = Math.abs(e.touches[0].clientY - startY);
    if (dx > 0 && dx > dy) drawer.style.transform = 'translateX(' + dx + 'px)';
  }, { passive: true });

  drawer.addEventListener('touchend', function(e) {
    if (!dragging) return;
    var dx = e.changedTouches[0].clientX - startX;
    dragging = false;
    drawer.style.transition = '';
    if (dx > 72) { drawer.style.transform = ''; window.closeMenu(); }
    else drawer.style.transform = '';
  }, { passive: true });

  drawer.addEventListener('touchcancel', function() {
    dragging = false;
    drawer.style.transition = '';
    drawer.style.transform  = '';
  }, { passive: true });
})();
