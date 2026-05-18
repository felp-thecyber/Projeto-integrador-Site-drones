document.getElementById('input-fone').addEventListener('input', function () {
  let v = this.value.replace(/\D/g, '').slice(0, 11);
  v = v.replace(/^(\d{2})(\d)/, '($1) $2');
  v = v.replace(/(\d{5})(\d)/, '$1-$2');
  this.value = v;
});

const overlay = document.getElementById('nc-modal-overlay');

function abrirModal() {
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('nc-modal-close').addEventListener('click', fecharModal);
document.getElementById('nc-modal-fechar').addEventListener('click', fecharModal);
overlay.addEventListener('click', function (e) {
  if (e.target === overlay) fecharModal();
});

document.getElementById('nc-btn-solicitar').addEventListener('click', function () {
  const campos = [
    document.getElementById('input-empresa'),
    document.getElementById('input-fone'),
    document.getElementById('input-email-nc'),
    document.getElementById('nc-estado'),
    document.getElementById('nc-cidade')
  ];

  let valido = true;
  campos.forEach(c => {
    if (!c.value.trim()) {
      c.style.boxShadow = '0 0 0 3px rgba(248,113,113,.6)';
      valido = false;
    } else {
      c.style.boxShadow = '';
    }
  });

  if (!valido) return;
  abrirModal();
});

document.querySelectorAll('.nc-card__img').forEach(img => {
  const check = () => { if (img.naturalWidth > 0) img.classList.add('loaded'); };
  if (img.complete) check();
  else { img.addEventListener('load', check); img.addEventListener('error', () => {}); }
});
