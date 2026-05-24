// Menu mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('aberto');
    navLinks.classList.toggle('aberto');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('aberto');
      navLinks.classList.remove('aberto');
    });
  });
}

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
  if (hamburger && navLinks) {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('aberto');
      navLinks.classList.remove('aberto');
    }
  }
});

// Fade-in ao rolar
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visivel');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// Countdown — próxima promoção
function iniciarContagem() {
  const fim = new Date();
  fim.setDate(fim.getDate() + 3);
  fim.setHours(23, 59, 59, 0);

  function atualizar() {
    const agora = new Date();
    const diff = fim - agora;

    if (diff <= 0) {
      document.getElementById('dias').textContent = '00';
      document.getElementById('horas').textContent = '00';
      document.getElementById('minutos').textContent = '00';
      document.getElementById('segundos').textContent = '00';
      return;
    }

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, '0');

    if (document.getElementById('dias')) {
      document.getElementById('dias').textContent = pad(dias);
      document.getElementById('horas').textContent = pad(horas);
      document.getElementById('minutos').textContent = pad(minutos);
      document.getElementById('segundos').textContent = pad(segundos);
    }
  }

  atualizar();
  setInterval(atualizar, 1000);
}

if (document.getElementById('dias')) {
  iniciarContagem();
}

// Monte seu Setup — calculadora
const setupSelects = document.querySelectorAll('.setup-item select');
const totalValor = document.getElementById('totalSetup');

if (setupSelects.length > 0 && totalValor) {
  function calcularTotal() {
    let total = 0;
    setupSelects.forEach(select => {
      total += parseFloat(select.value) || 0;
    });
    totalValor.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  setupSelects.forEach(select => select.addEventListener('change', calcularTotal));
  calcularTotal();
}

// Formulário de contato
const form = document.getElementById('formContato');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById('msgSucesso');
    if (msg) {
      msg.style.display = 'block';
      form.reset();
      setTimeout(() => { msg.style.display = 'none'; }, 5000);
    }
  });
}
