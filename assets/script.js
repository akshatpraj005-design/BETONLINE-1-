// =========================================================
// Klangwerk — script.js
// Mobile nav toggle, cookie consent, active link highlight,
// smooth scrolling for internal anchors.
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile navigation toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('site-nav--open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  /* ---------- Active link highlighting ---------- */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.site-nav__link, .site-footer__link');

  navLinks.forEach(function (link) {
    var linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentPath) {
      link.classList.add('site-nav__link--active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ---------- Smooth scrolling for internal anchors ---------- */
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------- Cookie consent banner ---------- */
  var banner = document.querySelector('.cookie-banner');
  var acceptBtn = document.querySelector('.js-cookie-accept');
  var declineBtn = document.querySelector('.js-cookie-decline');
  var CONSENT_KEY = 'klangwerk-cookie-consent';

  if (banner) {
    var stored = null;
    try { stored = window.localStorage.getItem(CONSENT_KEY); } catch (err) { stored = null; }

    if (!stored) {
      banner.classList.add('cookie-banner--visible');
    }

    function setConsent(value) {
      try { window.localStorage.setItem(CONSENT_KEY, value); } catch (err) { /* storage unavailable */ }
      banner.classList.remove('cookie-banner--visible');
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () { setConsent('accepted'); });
    }
    if (declineBtn) {
      declineBtn.addEventListener('click', function () { setConsent('declined'); });
    }
  }

});
