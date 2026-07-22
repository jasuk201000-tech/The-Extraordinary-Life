/* Extraordinary Life — interactions */
(function () {
  'use strict';

  /* Progressive enhancement flag — enables collapsible structure via CSS */
  document.documentElement.classList.add('js');

  /* Interactive structure: click a staircase stage / session step to reveal it */
  var expandables = document.querySelectorAll('.stair, .journey-step');
  expandables.forEach(function (item) {
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-expanded', 'false');
    var toggle = function () {
      var open = item.classList.toggle('open');
      item.setAttribute('aria-expanded', String(open));
    };
    item.addEventListener('click', toggle);
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); toggle(); }
    });
  });
  /* Open the first item of each group so the pattern is discoverable */
  document.querySelectorAll('.stairs, .journey-track').forEach(function (group) {
    var first = group.querySelector('.stair, .journey-step');
    if (first) { first.classList.add('open'); first.setAttribute('aria-expanded', 'true'); }
  });

  /* Sticky header state */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    const setOpen = (open) => {
      toggle.classList.toggle('open', open);
      menu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
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

  /* Application / contact form (front-end only demo) */
  document.querySelectorAll('form[data-demo]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = form.parentElement.querySelector('.form-success');
      if (success) {
        form.style.display = 'none';
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  /* Newsletter (footer) */
  document.querySelectorAll('form[data-news]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      form.innerHTML = '<p style="font-size:0.9rem;color:var(--sage-deep);font-weight:600;">Thank you — keep an eye on your inbox. 🌱</p>';
    });
  });

  /* ---- Calendly booking popup on "Save your place" buttons ---- */
  (function () {
    var CAL_URL = 'https://calendly.com/jasuk201000/self-belief-session-1?background_color=ffffff&text_color=1e2a27&primary_color=c9a24b&hide_gdpr_banner=1';
    // Load Calendly's assets once (shared across every page via this script)
    if (!document.querySelector('link[data-calendly-css]')) {
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://assets.calendly.com/assets/external/widget.css';
      css.setAttribute('data-calendly-css', '');
      document.head.appendChild(css);
    }
    if (!window.Calendly && !document.querySelector('script[data-calendly-js]')) {
      var s = document.createElement('script');
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.async = true;
      s.setAttribute('data-calendly-js', '');
      document.head.appendChild(s);
    }
    // Any "Save your place" button opens the booking popup; if the widget
    // hasn't loaded (or is blocked), the button's normal href still works.
    document.querySelectorAll('a.btn').forEach(function (a) {
      if (!/save your place/i.test(a.textContent || '')) return;
      a.setAttribute('data-calendly', '');
      a.addEventListener('click', function (e) {
        if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
          e.preventDefault();
          window.Calendly.initPopupWidget({ url: CAL_URL });
        }
      });
    });
  })();

  /* Footer year */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
