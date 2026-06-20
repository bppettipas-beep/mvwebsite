// ── Nav scroll shadow ──
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── Active nav link ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href').split('#')[0] || 'index.html';
  if (href === currentPage) a.classList.add('active');
});

// ── Mobile menu ──
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  document.querySelectorAll('.nav-mobile a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── IP copy button ──
const ipBtn = document.getElementById('ip-copy');
if (ipBtn) {
  ipBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('mostlyvanilla.net').then(() => {
      const txt = ipBtn.querySelector('.ip-text');
      const icon = ipBtn.querySelector('.copy-icon');
      txt.textContent = 'Copied!';
      icon.innerHTML = '<polyline points="20,6 9,17 4,12"/>';
      ipBtn.style.borderColor = 'var(--green-500)';
      ipBtn.style.background = 'var(--green-100)';
      setTimeout(() => {
        txt.textContent = 'mostlyvanilla.net';
        icon.innerHTML = '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>';
        ipBtn.style.borderColor = '';
        ipBtn.style.background = '';
      }, 2200);
    });
  });
}

// ── Tagline rotator ──
const taglines = [
  'No nonsense. Just Minecraft.',
  'Build. Explore. Survive.',
  'Survival · Community · Vanilla',
  'Where every block matters.',
  'Mostly vanilla, fully adventure.',
];
const taglineEl = document.getElementById('tagline');
if (taglineEl) {
  let idx = 0;
  taglineEl.textContent = taglines[0];
  taglineEl.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
  setInterval(() => {
    taglineEl.style.opacity = '0';
    taglineEl.style.transform = 'translateY(8px)';
    setTimeout(() => {
      idx = (idx + 1) % taglines.length;
      taglineEl.textContent = taglines[idx];
      taglineEl.style.opacity = '1';
      taglineEl.style.transform = 'translateY(0)';
    }, 300);
  }, 3800);
}

// ── Live server status ──
const statusEl = document.getElementById('server-status');
if (statusEl) {
  const dot = statusEl.querySelector('.status-dot');
  const label = statusEl.querySelector('.status-label');
  fetch('https://api.mcsrvstat.us/3/mostlyvanilla.net')
    .then(r => r.json())
    .then(d => {
      if (d.online) {
        dot.classList.add('online');
        label.textContent = `${d.players.online} / ${d.players.max} players online`;
      } else {
        dot.classList.add('offline');
        label.textContent = 'Server offline';
      }
    })
    .catch(() => {
      statusEl.style.display = 'none';
    });
}

