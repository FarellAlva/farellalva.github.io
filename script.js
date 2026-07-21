// =====================================================
//  KOFI SENJA — script.js
// =====================================================

/* ---- Smooth scroll for all anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = document.getElementById('navbar').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top, behavior: 'smooth' });
    // Close mobile menu if open
    closeMobileMenu();
  });
});

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ---- Mobile menu toggle ---- */
const hamburger = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  mobileMenu.style.display = '';
}

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    hamburger.classList.add('open');
    mobileMenu.style.display = 'flex';
    requestAnimationFrame(() => {
      mobileMenu.classList.add('open');
    });
  }
});

/* ---- Hero image subtle parallax / scale ---- */
const heroBg = document.querySelector('.hero-img-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const speed = 0.25;
    heroBg.style.transform = `scale(1.05) translateY(${scrollY * speed}px)`;
  }, { passive: true });
}

/* ---- Intersection Observer for scroll-reveal ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Observe menu blocks, section headers, lokasi/reservasi grids
document.querySelectorAll('.menu-block, .lokasi-item, .reservasi-grid').forEach(el => {
  revealObserver.observe(el);
});

// Generic reveal class
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- Staggered lokasi item reveal ---- */
const lokasiItems = document.querySelectorAll('.lokasi-item');
lokasiItems.forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.12}s`;
  item.classList.add('reveal');
  revealObserver.observe(item);
});

/* ---- Section headers reveal ---- */
document.querySelectorAll('.section-header, .reservasi-form-col').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ---- Reservasi form submission (static, shows toast) ---- */
const form = document.getElementById('reservasi-form');
const toast = document.getElementById('toast');

function showToast(msg, type = 'success') {
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  setTimeout(() => {
    toast.className = 'toast';
  }, 5000);
}

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const nama = document.getElementById('field-nama').value.trim();
    const telepon = document.getElementById('field-telepon').value.trim();
    const tanggal = document.getElementById('field-tanggal').value;
    const jam = document.getElementById('field-jam').value;
    const tamu = document.getElementById('field-tamu').value;

    if (!nama || !telepon || !tanggal || !jam || !tamu) {
      showToast('Mohon lengkapi semua field yang wajib diisi.', 'error');
      return;
    }

    // Simulate loading state
    const submitBtn = document.getElementById('submit-reservasi');
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      document.getElementById('field-tamu').value = '2';
      submitBtn.textContent = 'Kirim Reservasi →';
      submitBtn.disabled = false;
      showToast(`Terima kasih, ${nama}! Reservasi Anda telah kami terima. Kami akan segera menghubungi Anda.`);
    }, 1200);
  });
}

/* ---- Active nav link highlighting on scroll ---- */
const sections = [
  { id: 'menu',      navId: 'nav-menu'      },
  { id: 'lokasi',    navId: 'nav-lokasi'    },
  { id: 'reservasi', navId: 'nav-reservasi' },
];

const navHighlightObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const navId = sections.find(s => s.id === entry.target.id)?.navId;
    const navEl = document.getElementById(navId);
    if (!navEl) return;
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-link').forEach(l => l.style.color = '');
      navEl.style.color = 'var(--brown-dark)';
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => {
  const el = document.getElementById(s.id);
  if (el) navHighlightObserver.observe(el);
});

/* ---- Hero image fallback if no image ---- */
window.addEventListener('DOMContentLoaded', () => {
  const heroBg = document.querySelector('.hero-img-bg');
  if (heroBg) {
    const testImg = new Image();
    testImg.onload = () => heroBg.classList.add('loaded');
    testImg.onerror = () => heroBg.classList.add('no-image');
    testImg.src = 'img/hero-coffeeshop.jpg';
  }
});
