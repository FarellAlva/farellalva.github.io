// =====================================================
//  KOFI SENJA — script.js
// =====================================================

/* ---- Smooth scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navH = document.getElementById('navbar').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top, behavior: 'smooth' });
    closeMobileMenu();
  });
});

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ---- Hero parallax ---- */
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (!heroBg) return;
  heroBg.style.transform = `translateY(${window.scrollY * 0.22}px)`;
}, { passive: true });

/* ---- Mobile menu ---- */
const hamburger = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  setTimeout(() => { mobileMenu.style.display = ''; }, 350);
}

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    hamburger.classList.add('open');
    mobileMenu.style.display = 'flex';
    requestAnimationFrame(() => mobileMenu.classList.add('open'));
  }
});

/* ---- Intersection Observer scroll-reveal ---- */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      revealObs.unobserve(el.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Add reveal class and observe
['.menu-row', '.lokasi-item', '.lokasi-map', '.reservasi-grid', '.section-intro'].forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('will-reveal');
    el.style.transitionDelay = `${i * 0.08}s`;
    revealObs.observe(el);
  });
});

/* ---- Reservasi Form ---- */
const form = document.getElementById('reservasi-form');
const toast = document.getElementById('toast');

function showToast(msg, type = 'success') {
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  setTimeout(() => { toast.className = 'toast'; }, 5000);
}

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nama  = document.getElementById('f-nama').value.trim();
    const telp  = document.getElementById('f-telp').value.trim();
    const tanggal = document.getElementById('f-tanggal').value;
    const jam   = document.getElementById('f-jam').value;
    const tamu  = document.getElementById('f-tamu').value;

    if (!nama || !telp || !tanggal || !jam || !tamu) {
      showToast('Mohon lengkapi semua field yang wajib diisi.', 'error');
      return;
    }

    const btn = document.getElementById('submit-reservasi');
    btn.textContent = 'Mengirim...';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      document.getElementById('f-tamu').value = '2';
      btn.innerHTML = 'Kirim Reservasi &nbsp;→';
      btn.disabled = false;
      showToast(`Terima kasih, ${nama}! Reservasi Anda telah kami terima. Kami akan segera menghubungi Anda.`);
    }, 1200);
  });
}
