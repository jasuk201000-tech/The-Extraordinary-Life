/* Extraordinary Life — interactions */
(function () {
  'use strict';

  /* Progressive enhancement flag — enables collapsible structure via CSS */
  document.documentElement.classList.add('js');

  /* ---------------------------------------------------------------
     Interactive structure: click a staircase stage / session step.
     The heading is upgraded into a real <button> controlling the
     description panel — the correct disclosure pattern. Putting
     role="button" on the wrapping div (as this used to) flattens the
     heading and body text into a single button label for screen
     readers and destroys the document outline.
     --------------------------------------------------------------- */
  var uid = 0;
  document.querySelectorAll('.stair, .journey-step').forEach(function (item) {
    var heading = item.querySelector('h3');
    if (!heading) return;
    var panel = heading.nextElementSibling;
    if (!panel || panel.tagName !== 'P') return;

    var id = 'disclosure-' + (++uid);
    panel.id = id;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'disclosure-btn';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', id);
    while (heading.firstChild) btn.appendChild(heading.firstChild);
    heading.appendChild(btn);

    btn.addEventListener('click', function () {
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* Open the first item of each group so the pattern is discoverable */
  document.querySelectorAll('.stairs, .journey-track').forEach(function (group) {
    var first = group.querySelector('.stair, .journey-step');
    if (!first) return;
    first.classList.add('open');
    var btn = first.querySelector('.disclosure-btn');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  });

  /* Sticky header state */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------
     Mobile menu — with focus trap, Escape to close, and focus
     returned to the toggle on close.
     --------------------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (navToggle && menu) {
    const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const setOpen = (open) => {
      navToggle.classList.toggle('open', open);
      menu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.setAttribute('aria-hidden', String(!open));
      if (open) {
        const first = menu.querySelector(FOCUSABLE);
        if (first) first.focus();
      } else {
        navToggle.focus();
      }
    };

    navToggle.setAttribute('aria-controls', 'mobile-menu');
    menu.id = menu.id || 'mobile-menu';
    menu.setAttribute('aria-hidden', 'true');

    navToggle.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));

    document.addEventListener('keydown', (e) => {
      if (!menu.classList.contains('open')) return;

      if (e.key === 'Escape') { setOpen(false); return; }

      if (e.key === 'Tab') {
        const items = Array.from(menu.querySelectorAll(FOCUSABLE))
          .filter((el) => el.offsetParent !== null);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    });
  }

  /* Scroll reveal */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // close siblings for a cleaner feel
      const parent = item.closest('.faq-list');
      if (parent) parent.querySelectorAll('.faq-item.open').forEach((o) => {
        if (o !== item) { o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null; o.querySelector('.faq-q').setAttribute('aria-expanded','false'); }
      });
      item.classList.toggle('open', !isOpen);
      a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
      q.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ---------------------------------------------------------------
     Calendly booking popup on "Save your place" buttons.
     Calendly's ~90KB of JS + CSS is fetched on first interaction
     (click, or hover/focus as a head start) rather than on every page
     load — nobody pays for the widget unless they intend to book.
     If the widget is blocked or fails, the button's href still works.
     --------------------------------------------------------------- */
  (function () {
    // Profile URL shows the full list of event types and auto-updates as new ones are added.
    var CAL_URL = 'https://calendly.com/freeform-contacts?background_color=ffffff&text_color=1e2a27&primary_color=c9a24b&hide_gdpr_banner=1';
    var loading = false;

    function loadCalendly(onReady) {
      if (window.Calendly) { if (onReady) onReady(); return; }
      if (!document.querySelector('link[data-calendly-css]')) {
        var css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = 'https://assets.calendly.com/assets/external/widget.css';
        css.setAttribute('data-calendly-css', '');
        document.head.appendChild(css);
      }
      var existing = document.querySelector('script[data-calendly-js]');
      if (!existing) {
        var s = document.createElement('script');
        s.src = 'https://assets.calendly.com/assets/external/widget.js';
        s.async = true;
        s.setAttribute('data-calendly-js', '');
        if (onReady) s.addEventListener('load', onReady);
        document.head.appendChild(s);
        loading = true;
      } else if (onReady) {
        existing.addEventListener('load', onReady);
      }
    }

    var triggers = Array.prototype.filter.call(
      document.querySelectorAll('a.btn'),
      function (a) { return /save your place/i.test(a.textContent || ''); }
    );

    triggers.forEach(function (a) {
      a.setAttribute('data-calendly', '');
      // Warm the connection when intent is likely, so the click feels instant.
      ['pointerenter', 'focus'].forEach(function (evt) {
        a.addEventListener(evt, function () { if (!loading) loadCalendly(); }, { once: true });
      });
      a.addEventListener('click', function (e) {
        if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
          e.preventDefault();
          window.Calendly.initPopupWidget({ url: CAL_URL });
          return;
        }
        // Not loaded yet — fetch it, then open as soon as it lands.
        e.preventDefault();
        a.setAttribute('aria-busy', 'true');
        loadCalendly(function () {
          a.removeAttribute('aria-busy');
          if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
            window.Calendly.initPopupWidget({ url: CAL_URL });
          } else {
            window.location.href = a.href; // widget blocked — fall back
          }
        });
      });
    });
  })();

  /* Footer year */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
