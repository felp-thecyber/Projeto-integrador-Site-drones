const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

(function () {
  const step1 = document.getElementById('form-step-1');
  const step2 = document.getElementById('form-step-2');
  const step3 = document.getElementById('form-step-3');
  const dots  = document.querySelectorAll('.form-step-dot');
  const locationDisplay = document.getElementById('form-location-display');
  const locationText    = document.getElementById('form-location-text');
  const formSubStep3    = document.getElementById('form-sub-step3');

  function setStep(n) {
    [step1, step2, step3].forEach((s, i) => {
      s.style.display = i + 1 === n ? 'block' : 'none';
    });
    dots.forEach((d, i) => {
      d.classList.remove('active', 'done');
      if (i + 1 < n)  d.classList.add('done');
      if (i + 1 === n) d.classList.add('active');
    });
  }

  document.getElementById('btn-step-1').addEventListener('click', () => {
    const estado = document.getElementById('select-estado').value;
    const cidade = document.getElementById('input-cidade').value.trim();
    if (!estado || !cidade) return;
    locationText.textContent = cidade + ', ' + estado;
    locationDisplay.style.display = 'flex';
    setStep(2);
  });

  document.getElementById('btn-step-2').addEventListener('click', () => {
    const nome = document.getElementById('input-nome').value.trim();
    if (!nome) return;
    formSubStep3.innerHTML = 'Quase lá, <strong style="color:var(--green)">' + nome + '</strong>! Para finalizar e garantir uma experiência ainda mais personalizada, informe seu email e telefone';
    setStep(3);
  });

  document.getElementById('btn-step-3').addEventListener('click', () => {
    const emailInput    = document.getElementById('input-email');
    const telefoneInput = document.getElementById('input-telefone');
    const errorEmail    = document.getElementById('error-email');
    const errorTelefone = document.getElementById('error-telefone');
    const formSuccess   = document.getElementById('form-success');
    const btnStep3      = document.getElementById('btn-step-3');

    const emailValido    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    const telefoneValido = telefoneInput.value.trim().length >= 8;

    emailInput.classList.toggle('invalid', !emailValido);
    errorEmail.classList.toggle('visible', !emailValido);

    telefoneInput.classList.toggle('invalid', !telefoneValido);
    errorTelefone.classList.toggle('visible', !telefoneValido);

    if (!emailValido || !telefoneValido) return;

    formSuccess.style.display = 'inline-flex';
    btnStep3.style.display = 'none';
  });
})();


function formatNumber(n) {
  return new Intl.NumberFormat('pt-BR').format(Math.round(n));
}

function animateCounter(el, target, duration) {
  const start = performance.now();
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    el.textContent = formatNumber(target * ease(progress));
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(document.getElementById('stat-hectares'), 10000, 2800);
      animateCounter(document.getElementById('stat-cidades'),  40,    2200);
      statsObserver.disconnect();
    }
  });
}, { threshold: .3 });

statsObserver.observe(document.querySelector('.hero__stats'));
