/**
 * VitaSênior v0.2.0 — Lógica do App
 * Navegação, questionário de saúde e geração de treino personalizado.
 * Depende de: exercises.js (variável global EXERCICIOS)
 */

// ==========================================
// ESTADO
// ==========================================
let perfilUsuario = '';
let etapaQuestionario = 0;

let respostas = {
  dor: [],
  objetivos: [],
  limitacoes: []
};

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
  // Reunir todos os exercícios
  const todosExercicios = [];
  Object.keys(EXERCICIOS).forEach(cat => {
    EXERCICIOS[cat].itens.forEach(ex => {
      todosExercicios.push({ ...ex, cat });
    });
  });

  const limitacoes = respostas.limitacoes.filter(l => l !== 'nenhuma');
  const areasDeDor = respostas.dor.filter(p => p !== 'nenhuma');
  const objetivos = respostas.objetivos;

  // Passo 1: Filtrar exercícios contraindicados
  let seguros = todosExercicios.filter(ex => {
    return !ex.contraindicacoes.some(c => limitacoes.includes(c));
  });

  // Passo 2: Pontuar por relevância
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

  // Passo 3: Ordenar por pontuação e pegar os 6 melhores
  seguros.sort((a, b) => b.pontuacao - a.pontuacao);
  const plano = seguros.slice(0, 6);

  // Passo 4: Renderizar o plano
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
        </div>`;
    });
  }

  html += `
    <button class="cat-btn" onclick="mostrarTela('home')" style="margin-top:20px;justify-content:center;width:100%">
      <span class="emoji">🏠</span>
      <span class="label">Explorar todos os exercícios</span>
    </button>
    <div class="version-tag" style="margin:20px 0">VitaSênior v0.2.0 — Projeto universitário de Impacto Social</div>`;

  container.innerHTML = html;
}
