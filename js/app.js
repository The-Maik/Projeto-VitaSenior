/**
 * VitaSênior v0.1.0 — Lógica do App
 * Navegação básica e seleção de perfil.
 */

// ==========================================
// ESTADO
// ==========================================
let perfilUsuario = '';

// ==========================================
// NAVEGAÇÃO
// ==========================================
function mostrarTela(nome) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + nome).classList.add('active');
  window.scrollTo(0, 0);
}

// ==========================================
// BEM-VINDO / SELEÇÃO DE PERFIL
// ==========================================
function selecionarPerfil(el, perfil) {
  perfilUsuario = perfil;
  document.querySelectorAll('#role-opts .q-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}

function irParaHome() {
  if (!perfilUsuario) {
    alert('Por favor, selecione quem vai usar o app.');
    return;
  }
  mostrarTela('home');
}
