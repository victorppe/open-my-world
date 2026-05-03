// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav
const nav = document.querySelector('.nav');
document.getElementById('navToggle').addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav__links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.section, .hero__inner, .card, .work').forEach(el => {
  el.classList.add('reveal'); io.observe(el);
});

// Counter animation
const counters = document.querySelectorAll('[data-count]');
const cIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    const dur = 1400; const start = performance.now();
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      el.textContent = Math.floor(p * target) + (p === 1 ? '+' : '');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    cIO.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => cIO.observe(c));

// Form
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  if (!data.nome || !data.email.includes('@') || !data.mensagem) {
    msg.textContent = 'Por favor, preencha todos os campos corretamente.';
    msg.classList.remove('success'); return;
  }
  msg.textContent = `Obrigado, ${data.nome}! Recebemos sua mensagem.`;
  msg.classList.add('success');
  form.reset();
});
