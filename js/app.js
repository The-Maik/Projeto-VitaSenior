/**
 * VitaSênior v0.3.0 — Lógica do App
 * Navegação, questionário de saúde, geração de treino, lista de exercícios e cronômetro.
 * Depende de: exercises.js (variável global EXERCICIOS)
 */

// ==========================================
// ESTADO
// ==========================================
let perfilUsuario = '';
let categoriaAtual = '';
let filtroAtual = 'todos';
let etapaQuestionario = 0;
let detalheOrigem = 'lista';

let respostas = {
  dor: [],
  objetivos: [],
  limitacoes: []
};

// Estado do cronômetro
let cronometroIntervalo = null;
let cronometroSegundos = 0;
let cronometroRodando = false;

// ==========================================
// CONFIGURAÇÃO DO QUESTIONÁRIO
// ==========================================
const ETAPAS_QUESTIONARIO = [
  {
    id: 'dor',
    titulo: '🩹 Onde você sente dor ou desconforto?',
    subtitulo: 'Selecione todas as áreas que se aplicam (ou nenhuma).',
    opcoes: [
      { v: 'pescoco', l: 'Pescoço' },
      { v: 'ombros', l: 'Ombros' },
      { v: 'costas_superior', l: 'Costas (superior)' },
      { v: 'lombar', l: 'Lombar (costas baixa)' },
      { v: 'quadris', l: 'Quadris' },
      { v: 'joelhos', l: 'Joelhos' },
      { v: 'tornozelos', l: 'Tornozelos / Pés' },
      { v: 'nenhuma', l: 'Não sinto dores' }
    ]
  },
  {
    id: 'objetivos',
    titulo: '🎯 Qual seu objetivo principal?',
    subtitulo: 'Selecione um ou mais objetivos.',
    opcoes: [
      { v: 'vitalidade', l: '💪 Mais vitalidade e energia' },
      { v: 'longevidade', l: '🌱 Longevidade e saúde' },
      { v: 'dores', l: '🩹 Alívio de dores' },
      { v: 'mobilidade', l: '🚶 Melhorar mobilidade' },
      { v: 'equilibrio', l: '⚖️ Melhorar equilíbrio' },
      { v: 'relaxamento', l: '🧘 Relaxamento e bem-estar' }
    ]
  },
  {
    id: 'limitacoes',
    titulo: '⚠️ Possui alguma condição limitante?',
    subtitulo: 'Selecione todas que se aplicam (ou nenhuma).',
    opcoes: [
      { v: 'hernia_disco', l: 'Hérnia de disco (lombar)' },
      { v: 'hernia_cervical', l: 'Hérnia cervical' },
      { v: 'artrose', l: 'Artrose / Artrite' },
      { v: 'osteoporose', l: 'Osteoporose' },
      { v: 'problemas_cardiacos', l: 'Problemas cardíacos' },
      { v: 'labirintite', l: 'Labirintite / Vertigem' },
      { v: 'protese_joelho', l: 'Prótese no joelho' },
      { v: 'protese_quadril', l: 'Prótese no quadril' },
      { v: 'nenhuma', l: 'Nenhuma condição' }
    ]
  }
];

// ==========================================
// NAVEGAÇÃO
// ==========================================
function mostrarTela(nome) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + nome).classList.add('active');
  window.scrollTo(0, 0);
  pararCronometro();
}

// ==========================================
// BEM-VINDO / SELEÇÃO DE PERFIL
// ==========================================
function selecionarPerfil(el, perfil) {
  perfilUsuario = perfil;
  document.querySelectorAll('#role-opts .q-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}

function iniciarQuestionario() {
  if (!perfilUsuario) {
    alert('Por favor, selecione quem vai usar o app.');
    return;
  }
  etapaQuestionario = 0;
  respostas = { dor: [], objetivos: [], limitacoes: [] };
  renderizarEtapa();
  mostrarTela('quiz');
}

// ==========================================
// QUESTIONÁRIO
// ==========================================
function renderizarEtapa() {
  const etapa = ETAPAS_QUESTIONARIO[etapaQuestionario];
  const container = document.getElementById('quiz-content');

  // Atualizar barra de progresso
  const progresso = ((etapaQuestionario + 1) / ETAPAS_QUESTIONARIO.length) * 100;
  document.getElementById('prog-fill').style.width = progresso + '%';

  // Construir opções
  let html = `<div class="q-step">
    <h2>${etapa.titulo}</h2>
    <p style="color:#888;margin-bottom:16px">${etapa.subtitulo}</p>
    <div class="q-options" id="qopts">`;

  etapa.opcoes.forEach(opc => {
    const selecionada = respostas[etapa.id].includes(opc.v) ? ' selected' : '';
    html += `<div class="q-opt${selecionada}" onclick="alternarOpcao(this,'${etapa.id}','${opc.v}')">
      <span class="q-check"></span>${opc.l}
    </div>`;
  });

  html += '</div></div>';

  // Botões de navegação
  const ehUltima = etapaQuestionario >= ETAPAS_QUESTIONARIO.length - 1;
  html += '<div style="display:flex;gap:12px">';

  if (etapaQuestionario > 0) {
    html += '<button class="btn-next" onclick="etapaAnterior()" style="background:#888;flex:1">← Anterior</button>';
  }

  const acaoProxima = ehUltima ? 'finalizarQuestionario()' : 'proximaEtapa()';
  const rotuloProximo = ehUltima ? 'Ver meu treino ✨' : 'Próximo →';
  html += `<button class="btn-next" onclick="${acaoProxima}" style="flex:1">${rotuloProximo}</button>`;
  html += '</div>';

  container.innerHTML = html;
}

function alternarOpcao(el, campo, val) {
  // "Nenhuma" limpa todas as outras
  if (val === 'nenhuma') {
    respostas[campo] = ['nenhuma'];
    document.querySelectorAll('#qopts .q-opt').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    return;
  }

  // Remover "nenhuma" ao selecionar uma opção específica
  respostas[campo] = respostas[campo].filter(v => v !== 'nenhuma');

  // Alternar a opção selecionada
  if (respostas[campo].includes(val)) {
    respostas[campo] = respostas[campo].filter(v => v !== val);
    el.classList.remove('selected');
  } else {
    respostas[campo].push(val);
    el.classList.add('selected');
  }

  // Desmarcar "nenhuma" visualmente
  document.querySelectorAll('#qopts .q-opt').forEach(o => {
    if (o.textContent.includes('Nenhum') || o.textContent.includes('Não sinto')) {
      o.classList.remove('selected');
    }
  });
}

function proximaEtapa() {
  etapaQuestionario++;
  renderizarEtapa();
}

function etapaAnterior() {
  etapaQuestionario--;
  renderizarEtapa();
}

function finalizarQuestionario() {
  gerarPlano();
  mostrarTela('plan');
}

// ==========================================
// GERAÇÃO DE TREINO PERSONALIZADO
// ==========================================
function gerarPlano() {
  const todosExercicios = [];
  Object.keys(EXERCICIOS).forEach(cat => {
    EXERCICIOS[cat].itens.forEach(ex => {
      todosExercicios.push({ ...ex, cat });
    });
  });

  const limitacoes = respostas.limitacoes.filter(l => l !== 'nenhuma');
  const areasDeDor = respostas.dor.filter(p => p !== 'nenhuma');
  const objetivos = respostas.objetivos;

  let seguros = todosExercicios.filter(ex => {
    return !ex.contraindicacoes.some(c => limitacoes.includes(c));
  });

  seguros.forEach(ex => {
    let pontuacao = 0;
    if (areasDeDor.length > 0 && ex.areasDeDor.some(p => areasDeDor.includes(p))) {
      pontuacao += 3;
    }
    if (objetivos.some(o => ex.objetivos.includes(o))) {
      pontuacao += 2;
    }
    if (ex.dificuldade === 'Fácil') {
      pontuacao += 1;
    }
    ex.pontuacao = pontuacao;
  });

  seguros.sort((a, b) => b.pontuacao - a.pontuacao);
  const plano = seguros.slice(0, 6);

  const container = document.getElementById('plan-content');
  const rotuloPerfil = perfilUsuario === 'self' ? 'seu' : 'do(a) praticante';
  const textoLimitacoes = limitacoes.length
    ? limitacoes.map(l => l.replace(/_/g, ' ')).join(', ')
    : 'Nenhuma';
  const textoDor = areasDeDor.length
    ? areasDeDor.map(p => p.replace(/_/g, ' ')).join(', ')
    : 'Nenhuma dor relatada';
  const textoObjetivos = objetivos.length
    ? objetivos.map(o => o.replace(/_/g, ' ')).join(', ')
    : 'Nenhum selecionado';
  const excluidos = todosExercicios.length - seguros.length;

  let html = `
    <div class="plan-summary">
      <h2>🌿 Treino Personalizado</h2>
      <p>Montado com base no ${rotuloPerfil} perfil de saúde</p>
    </div>
    <div class="section-block">
      <h2>📊 Resumo da Avaliação</h2>
      <p><strong>Áreas de dor:</strong> ${textoDor}</p>
      <p><strong>Objetivos:</strong> ${textoObjetivos}</p>
      <p><strong>Limitações:</strong> ${textoLimitacoes}</p>
      ${excluidos > 0 ? `<p style="color:#e65100;margin-top:8px">⚠️ ${excluidos} exercício(s) excluído(s) por incompatibilidade com suas condições.</p>` : ''}
    </div>`;

  if (plano.length === 0) {
    html += `
      <div class="section-block warning-block">
        <h2>⚠️ Atenção</h2>
        <p>Com base nas suas condições, recomendamos consultar um fisioterapeuta antes de iniciar exercícios. 
        Nenhum exercício do nosso catálogo atual é totalmente seguro para o seu perfil.</p>
      </div>`;
  } else {
    html += `<h2 style="margin:20px 0 12px">Exercícios recomendados (${plano.length}):</h2>`;

    plano.forEach((ex, i) => {
      const classeInsignia = ex.dificuldade === 'Fácil' ? 'badge-easy' : 'badge-medium';
      const tituloCategoria = EXERCICIOS[ex.cat].titulo;
      html += `
        <div class="plan-card">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
            <span style="font-size:32px">${ex.emoji}</span>
            <div>
              <h3>${i + 1}. ${ex.nome}</h3>
              <p style="font-size:14px;margin:0">${tituloCategoria}</p>
            </div>
          </div>
          <div class="card-meta">
            <span class="badge ${classeInsignia}">${ex.dificuldade}</span>
            <span class="duration">⏱ ${ex.duracao}</span>
            <span class="duration">🔄 ${ex.series} séries</span>
            <span class="duration">😴 ${ex.descanso}s descanso</span>
          </div>
          <button class="btn-view" onclick="abrirDetalheDoPlano('${ex.cat}','${ex.id}')" style="margin-top:8px">
            Ver exercício
          </button>
        </div>`;
    });
  }

  html += `
    <button class="cat-btn" onclick="mostrarTela('home')" style="margin-top:20px;justify-content:center;width:100%">
      <span class="emoji">🏠</span>
      <span class="label">Explorar todos os exercícios</span>
    </button>
    <div class="version-tag" style="margin:20px 0">VitaSênior v0.3.0 — Projeto universitário de Impacto Social</div>`;

  container.innerHTML = html;
}

function abrirDetalheDoPlano(cat, id) {
  categoriaAtual = cat;
  abrirDetalhe(cat, id, 'plano');
}

// ==========================================
// LISTA DE CATEGORIAS
// ==========================================
function abrirCategoria(cat) {
  categoriaAtual = cat;
  filtroAtual = 'todos';
  document.getElementById('list-title').textContent = EXERCICIOS[cat].titulo;
  renderizarCartoes(cat);

  // Resetar botões de filtro
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.filter-btn').classList.add('active');

  mostrarTela('list');
}

function renderizarCartoes(cat) {
  const grade = document.getElementById('cards-grid');
  grade.innerHTML = '';

  EXERCICIOS[cat].itens.forEach(ex => {
    const deveEsconder = filtroAtual !== 'todos' && ex.dificuldade.toLowerCase() !== filtroAtual;
    const classeInsignia = ex.dificuldade === 'Fácil' ? 'badge-easy' : 'badge-medium';

    const cartao = document.createElement('div');
    cartao.className = 'card';
    cartao.dataset.difficulty = ex.dificuldade.toLowerCase();
    if (deveEsconder) cartao.style.display = 'none';

    cartao.innerHTML = `
      <span class="card-emoji">${ex.emoji}</span>
      <h3>${ex.nome}</h3>
      <div class="card-meta">
        <span class="badge ${classeInsignia}">${ex.dificuldade}</span>
        <span class="duration">⏱ ${ex.duracao}</span>
      </div>
      <button class="btn-view" onclick="abrirDetalhe('${cat}','${ex.id}','lista')">Ver exercício</button>`;

    grade.appendChild(cartao);
  });
}

function filtrarDificuldade(nivel, btn) {
  filtroAtual = nivel;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.card').forEach(cartao => {
    const corresponde = nivel === 'todos' || cartao.dataset.difficulty === nivel;
    cartao.style.display = corresponde ? '' : 'none';
  });
}

// ==========================================
// DETALHE DO EXERCÍCIO
// ==========================================
function abrirDetalhe(cat, id, origem) {
  detalheOrigem = origem || 'lista';
  const ex = EXERCICIOS[cat].itens.find(e => e.id === id);
  if (!ex) return;

  document.getElementById('detail-header-title').textContent = ex.nome;
  const classeInsignia = ex.dificuldade === 'Fácil' ? 'badge-easy' : 'badge-medium';

  const htmlPassos = ex.passos.map(s => `<li>${s}</li>`).join('');
  const htmlBeneficios = ex.beneficios.map(b => `<li>${b}</li>`).join('');

  document.getElementById('detail-content').innerHTML = `
    <span class="detail-emoji">${ex.emoji}</span>
    <h1>${ex.nome}</h1>
    <div class="detail-meta">
      <span class="badge ${classeInsignia}">${ex.dificuldade}</span>
      <span class="duration">⏱ ${ex.duracao}</span>
      <span class="duration">🔄 ${ex.series} séries</span>
    </div>

    <div class="section-block">
      <h2>📝 Como fazer:</h2>
      <ol>${htmlPassos}</ol>
    </div>

    <div class="section-block">
      <h2>💚 Benefícios:</h2>
      <ul>${htmlBeneficios}</ul>
    </div>

    <div class="section-block warning-block">
      <h2>⚠️ Atenção:</h2>
      <p>${ex.aviso}</p>
    </div>

    <div class="timer-box">
      <h2 style="margin-bottom:4px">⏱ Descanso entre séries</h2>
      <p style="color:#888;font-size:16px">Tempo recomendado: ${ex.descanso} segundos</p>
      <div class="timer-display" id="timer-display">${formatarTempo(ex.descanso)}</div>
      <div class="timer-controls">
        <button class="timer-btn play" onclick="iniciarCronometro(${ex.descanso})" id="btn-play">▶ Iniciar</button>
        <button class="timer-btn pause" onclick="pausarCronometro()" id="btn-pause" style="display:none">⏸ Pausar</button>
        <button class="timer-btn stop" onclick="reiniciarCronometro(${ex.descanso})" id="btn-stop" style="display:none">⏹ Parar</button>
      </div>
    </div>

    <div class="section-block source-block">
      <h2>📚 Fonte:</h2>
      <p>${ex.fonte}</p>
    </div>

    <button class="btn-done" id="btn-done" onclick="marcarConcluido(this)">✅ Concluí esse exercício!</button>`;

  mostrarTela('detail');
}

function voltarParaLista() {
  pararCronometro();
  if (detalheOrigem === 'plano') {
    mostrarTela('plan');
  } else {
    renderizarCartoes(categoriaAtual);
    mostrarTela('list');
  }
}

// ==========================================
// CRONÔMETRO
// ==========================================
function formatarTempo(totalSegundos) {
  const min = Math.floor(totalSegundos / 60);
  const seg = totalSegundos % 60;
  return (min > 0 ? min + ':' : '') + String(seg).padStart(2, '0');
}

function iniciarCronometro(total) {
  if (cronometroRodando) return;
  if (cronometroSegundos <= 0) cronometroSegundos = total;

  cronometroRodando = true;
  document.getElementById('btn-play').style.display = 'none';
  document.getElementById('btn-pause').style.display = '';
  document.getElementById('btn-stop').style.display = '';

  cronometroIntervalo = setInterval(() => {
    cronometroSegundos--;
    document.getElementById('timer-display').textContent = formatarTempo(cronometroSegundos);

    if (cronometroSegundos <= 0) {
      clearInterval(cronometroIntervalo);
      cronometroRodando = false;

      const visor = document.getElementById('timer-display');
      visor.textContent = '✅ Descansou!';
      visor.style.color = '#2e7d32';

      const btnIniciar = document.getElementById('btn-play');
      btnIniciar.style.display = '';
      btnIniciar.textContent = '🔄 Reiniciar';
      btnIniciar.onclick = () => reiniciarEIniciar(total);

      document.getElementById('btn-pause').style.display = 'none';
      document.getElementById('btn-stop').style.display = 'none';
    }
  }, 1000);
}

function pausarCronometro() {
  if (!cronometroRodando) return;
  clearInterval(cronometroIntervalo);
  cronometroRodando = false;

  const btnIniciar = document.getElementById('btn-play');
  btnIniciar.style.display = '';
  btnIniciar.textContent = '▶ Continuar';
  document.getElementById('btn-pause').style.display = 'none';
}

function reiniciarCronometro(total) {
  pararCronometro();
  cronometroSegundos = total;

  const visor = document.getElementById('timer-display');
  if (visor) {
    visor.textContent = formatarTempo(total);
    visor.style.color = 'var(--green)';
  }

  const btnIniciar = document.getElementById('btn-play');
  if (btnIniciar) {
    btnIniciar.style.display = '';
    btnIniciar.textContent = '▶ Iniciar';
    btnIniciar.onclick = () => iniciarCronometro(total);
  }

  const btnPausar = document.getElementById('btn-pause');
  if (btnPausar) btnPausar.style.display = 'none';

  const btnParar = document.getElementById('btn-stop');
  if (btnParar) btnParar.style.display = 'none';
}

function reiniciarEIniciar(total) {
  reiniciarCronometro(total);
  iniciarCronometro(total);
}

function pararCronometro() {
  if (cronometroIntervalo) clearInterval(cronometroIntervalo);
  cronometroRodando = false;
  cronometroSegundos = 0;
}

// ==========================================
// CONCLUSÃO DO EXERCÍCIO
// ==========================================
function marcarConcluido(btn) {
  btn.classList.add('completed');
  btn.textContent = '🎉 Muito bem! Exercício concluído!';
  btn.disabled = true;

  const notificacao = document.getElementById('toast');
  notificacao.classList.add('show');
  setTimeout(() => notificacao.classList.remove('show'), 2500);
}
