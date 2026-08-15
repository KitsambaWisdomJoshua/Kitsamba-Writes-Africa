(() => {
  const STORAGE_KEY = 'kitsamba-writes-theme';
  const root = document.documentElement;

  const sunIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"></path>
    </svg>`;

  const moonIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"></path>
    </svg>`;

  function readTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'light' || saved === 'dark' ? saved : 'dark';
    } catch (_) {
      return 'dark';
    }
  }

  function saveTheme(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (_) {}
  }

  function applyTheme(theme) {
    const isLight = theme === 'light';
    root.classList.toggle('kw-light', isLight);
    root.classList.toggle('kw-dark', !isLight);
    root.dataset.kwTheme = theme;
    root.style.colorScheme = theme;

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isLight ? '#f7f1e8' : '#090909');

    const button = document.getElementById('kw-theme-toggle');
    if (button) {
      button.innerHTML = `${isLight ? sunIcon : moonIcon}<span>${isLight ? 'Light' : 'Dark'}</span>`;
      button.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
      button.setAttribute('title', `Switch to ${isLight ? 'dark' : 'light'} mode`);
      button.setAttribute('aria-pressed', String(isLight));
    }
  }

  // Apply immediately so pages do not flash the wrong theme while loading.
  applyTheme(readTheme());

  const css = `
    :root {
      --kw-gold: #d8ac56;
      --kw-gold-light: #f2cf83;
      --kw-light-bg: #f7f1e8;
      --kw-light-surface: #fffaf2;
      --kw-light-surface-2: #f0e7d9;
      --kw-light-text: #211c17;
      --kw-light-muted: #6f6458;
      --kw-light-border: rgba(72, 54, 34, .16);
    }

    #kw-theme-toggle {
      position: fixed;
      right: 22px;
      bottom: 22px;
      z-index: 99999;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      min-width: 106px;
      height: 46px;
      padding: 0 15px;
      border-radius: 999px;
      border: 1px solid rgba(216, 172, 86, .45);
      background: rgba(15, 15, 15, .94);
      color: #fff;
      box-shadow: 0 12px 35px rgba(0, 0, 0, .28);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      font-family: "DM Sans", Arial, sans-serif;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: .2px;
      cursor: pointer;
      transition: transform .2s ease, background .25s ease, color .25s ease, border-color .25s ease;
    }

    #kw-theme-toggle:hover { transform: translateY(-2px); border-color: var(--kw-gold); }
    #kw-theme-toggle:focus-visible { outline: 3px solid rgba(216, 172, 86, .35); outline-offset: 3px; }
    #kw-theme-toggle svg {
      width: 19px;
      height: 19px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.9;
      stroke-linecap: round;
      stroke-linejoin: round;
      flex: 0 0 auto;
    }

    html.kw-light #kw-theme-toggle {
      background: rgba(255, 250, 242, .96);
      color: #2a2118;
      border-color: rgba(116, 82, 38, .30);
      box-shadow: 0 12px 35px rgba(70, 49, 24, .16);
    }

    html.kw-light {
      --black: #f7f1e8 !important;
      --dark: #fffaf2 !important;
      --card: #fffaf2 !important;
      --card2: #f0e7d9 !important;
      --bg: #f7f1e8 !important;
      --panel: #fffaf2 !important;
      --surface: #fffaf2 !important;
      --surface-2: #f0e7d9 !important;
      --muted: #6f6458 !important;
      --gray: #6f6458 !important;
      --line: rgba(72,54,34,.14) !important;
      --border: rgba(122,88,42,.23) !important;
      --goldline: rgba(122,88,42,.24) !important;
      --gl: rgba(122,88,42,.24) !important;
    }

    html.kw-light body {
      background: var(--kw-light-bg) !important;
      color: var(--kw-light-text) !important;
    }

    html.kw-light body,
    html.kw-light body * {
      scrollbar-color: #c7ad83 #eee3d3;
    }

    html.kw-light header,
    html.kw-light .header,
    html.kw-light .site-header,
    html.kw-light .navbar,
    html.kw-light .topbar,
    html.kw-light .nav-links,
    html.kw-light .navlinks,
    html.kw-light .main-menu,
    html.kw-light .menu-dropdown,
    html.kw-light .dropdown-menu {
      background-color: rgba(255, 250, 242, .96) !important;
      color: var(--kw-light-text) !important;
      border-color: var(--kw-light-border) !important;
    }

    html.kw-light header a,
    html.kw-light nav a,
    html.kw-light .nav-link,
    html.kw-light .navlinks a,
    html.kw-light .brand,
    html.kw-light .logo {
      color: var(--kw-light-text) !important;
    }

    html.kw-light .active,
    html.kw-light .nav-link.active,
    html.kw-light .navlinks .active,
    html.kw-light header a:hover,
    html.kw-light nav a:hover {
      color: #17120c !important;
    }

    html.kw-light main,
    html.kw-light .page,
    html.kw-light .page-content,
    html.kw-light .content,
    html.kw-light .library,
    html.kw-light .discover,
    html.kw-light .reader-shell,
    html.kw-light .articles,
    html.kw-light .blog,
    html.kw-light .lifestyle,
    html.kw-light .contact-section,
    html.kw-light .about-section {
      color: var(--kw-light-text) !important;
    }

    html.kw-light .author-card,
    html.kw-light .book,
    html.kw-light .book-card,
    html.kw-light .novel-card,
    html.kw-light .article-card,
    html.kw-light .blog-card,
    html.kw-light .post-card,
    html.kw-light .feature-card,
    html.kw-light .info-card,
    html.kw-light .contact-card,
    html.kw-light .form-card,
    html.kw-light .login-card,
    html.kw-light .settings-card,
    html.kw-light .hero-panel,
    html.kw-light .side-card,
    html.kw-light .sidebar-card,
    html.kw-light .library-help,
    html.kw-light .book-item,
    html.kw-light .book-list > *,
    html.kw-light .card {
      background-color: var(--kw-light-surface) !important;
      color: var(--kw-light-text) !important;
      border-color: var(--kw-light-border) !important;
      box-shadow: 0 16px 38px rgba(66, 45, 22, .08) !important;
    }

    html.kw-light footer,
    html.kw-light .footer {
      background: #e9dfd0 !important;
      color: #2a231c !important;
      border-color: var(--kw-light-border) !important;
    }

    html.kw-light footer a,
    html.kw-light footer p,
    html.kw-light footer span,
    html.kw-light .footer a,
    html.kw-light .footer p { color: #655b50 !important; }

    html.kw-light input,
    html.kw-light textarea,
    html.kw-light select {
      background: #fffdf8 !important;
      color: #231d17 !important;
      border-color: #cfbea7 !important;
    }

    html.kw-light input::placeholder,
    html.kw-light textarea::placeholder { color: #8b7d6c !important; }

    html.kw-light button:not(#kw-theme-toggle),
    html.kw-light .menu-btn,
    html.kw-light .menu,
    html.kw-light .control,
    html.kw-light .page-btn,
    html.kw-light .nav-btn,
    html.kw-light .filter:not(.active) {
      border-color: #cbb99f !important;
    }

    html.kw-light p,
    html.kw-light li,
    html.kw-light small,
    html.kw-light .summary,
    html.kw-light .intro,
    html.kw-light .description,
    html.kw-light .subtitle,
    html.kw-light .meta,
    html.kw-light .author-top p,
    html.kw-light .section-title p,
    html.kw-light .section-heading p {
      color: var(--kw-light-muted) !important;
    }

    html.kw-light h1,
    html.kw-light h2,
    html.kw-light h3,
    html.kw-light h4,
    html.kw-light h5,
    html.kw-light h6,
    html.kw-light strong { color: var(--kw-light-text); }

    /* Keep readable paper pages warm and book-like in both modes. */
    html.kw-light .reader-card,
    html.kw-light .paper {
      background: #fffaf0 !important;
      color: #211c16 !important;
      box-shadow: 0 25px 65px rgba(82, 56, 28, .16) !important;
    }

    html.kw-light .reader-card *,
    html.kw-light .paper * { color: inherit; }
    html.kw-light .chapter-label,
    html.kw-light .eyebrow,
    html.kw-light .country,
    html.kw-light .open { color: #9b6d25 !important; }

    html.kw-light .notice,
    html.kw-light .rights-note,
    html.kw-light .editorial,
    html.kw-light .copyright {
      background: #efe6d8 !important;
      color: #6f6458 !important;
      border-color: var(--kw-light-border) !important;
    }

    html.kw-light .search input,
    html.kw-light .search-box input { background: #fffaf2 !important; }

    html.kw-light .filter.active,
    html.kw-light .btn-gold,
    html.kw-light .primary,
    html.kw-light .submit-nav,
    html.kw-light .nav-cta {
      background: var(--kw-gold) !important;
      color: #17120c !important;
    }

    body, header, footer, main, section, article, aside, nav, input, textarea, select,
    .card, .book, .author-card, .reader-card, .paper {
      transition: background-color .28s ease, color .28s ease, border-color .28s ease, box-shadow .28s ease;
    }

    @media (max-width: 640px) {
      #kw-theme-toggle {
        right: 14px;
        bottom: 14px;
        width: 46px;
        min-width: 46px;
        padding: 0;
      }
      #kw-theme-toggle span { display: none; }
    }

    @media (prefers-reduced-motion: reduce) {
      #kw-theme-toggle, body, header, footer, main, section, article, aside, nav { transition: none !important; }
    }
  `;

  function mount() {
    if (!document.getElementById('kw-theme-style')) {
      const style = document.createElement('style');
      style.id = 'kw-theme-style';
      style.textContent = css;
      document.head.appendChild(style);
    }

    if (!document.getElementById('kw-theme-toggle')) {
      const button = document.createElement('button');
      button.id = 'kw-theme-toggle';
      button.type = 'button';
      button.addEventListener('click', () => {
        const next = root.classList.contains('kw-light') ? 'dark' : 'light';
        saveTheme(next);
        applyTheme(next);
      });
      document.body.appendChild(button);
    }

    applyTheme(readTheme());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
