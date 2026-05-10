/**
 * VitaSênior v0.0.1 — Dados dos Exercícios
 * 
 * Cada exercício contém:
 * - Informações básicas (nome, dificuldade, duração)
 * - Séries e tempo de descanso entre séries
 * - Passos detalhados, benefícios e avisos
 * - Fonte científica conceituada
 * - Áreas de dor relacionadas (para personalização)
 * - Objetivos relacionados (para personalização)
 * - Contraindicações (para filtrar exercícios inseguros)
 */

const EXERCICIOS = {
  alongamento: {
    titulo: '🧘 Alongamento',
    itens: [
      {
        id: 'a1',
        emoji: '🙆',
        nome: 'Alongamento do pescoço',
        dificuldade: 'Fácil',
        duracao: '5 min',
        descanso: 30,
        series: 3,
        passos: [
          'Sente-se ereto em uma cadeira com os pés no chão.',
          'Incline lentamente a cabeça para o lado direito, levando a orelha ao ombro.',
          'Segure por 15 segundos.',
          'Repita para o lado esquerdo.',
          'Faça 3 repetições de cada lado.'
        ],
        beneficios: [
          'Reduz tensão no pescoço',
          'Melhora a postura',
          'Alivia dores de cabeça'
        ],
        aviso: 'Nunca force o movimento. Pare se sentir dor.',
        fonte: 'ACSM — Guidelines for Exercise Testing and Prescription, 11ª ed., Wolters Kluwer, 2021.',
        areasDeDor: ['pescoco', 'ombros'],
        objetivos: ['dores', 'vitalidade'],
        contraindicacoes: ['hernia_cervical']
      },
      {
        id: 'a2',
        emoji: '💪',
        nome: 'Alongamento dos ombros',
        dificuldade: 'Fácil',
        duracao: '5 min',
        descanso: 30,
        series: 3,
        passos: [
          'Fique em pé ou sentado.',
          'Leve o braço direito cruzado na frente do peito.',
          'Use o braço esquerdo para pressionar levemente.',
          'Segure por 20 segundos.',
          'Repita com o outro braço.'
        ],
        beneficios: [
          'Aumenta mobilidade dos ombros',
          'Previne lesões',
          'Alivia tensão'
        ],
        aviso: 'Movimento suave e controlado. Respire normalmente.',
        fonte: 'OMS — Diretrizes sobre Atividade Física e Comportamento Sedentário, Genebra, 2020.',
        areasDeDor: ['ombros', 'costas_superior'],
        objetivos: ['dores', 'mobilidade', 'vitalidade'],
        contraindicacoes: []
      },
      {
        id: 'a3',
        emoji: '🦵',
        nome: 'Alongamento da panturrilha',
        dificuldade: 'Fácil',
        duracao: '5 min',
        descanso: 30,
        series: 3,
        passos: [
          'Fique em pé próximo a uma parede.',
          'Apoie as mãos na parede.',
          'Dê um passo para trás com o pé direito.',
          'Mantenha o calcanhar no chão e sinta o alongamento.',
          'Segure 20 segundos e troque o pé.'
        ],
        beneficios: [
          'Melhora circulação nas pernas',
          'Previne câimbras',
          'Facilita a caminhada'
        ],
        aviso: 'Use a parede para apoio. Não curve os joelhos.',
        fonte: 'National Institute on Aging (NIA) — Exercise & Physical Activity: Your Everyday Guide, NIH, 2022.',
        areasDeDor: ['joelhos', 'tornozelos'],
        objetivos: ['mobilidade', 'vitalidade', 'longevidade'],
        contraindicacoes: []
      },
      {
        id: 'a4',
        emoji: '🪑',
        nome: 'Alongamento das costas sentado',
        dificuldade: 'Médio',
        duracao: '8 min',
        descanso: 45,
        series: 3,
        passos: [
          'Sente-se em uma cadeira firme.',
          'Cruze os braços sobre o peito.',
          'Gire lentamente o tronco para a direita.',
          'Segure por 15 segundos.',
          'Retorne ao centro e repita para o lado esquerdo.'
        ],
        beneficios: [
          'Alivia dor lombar',
          'Aumenta flexibilidade da coluna',
          'Melhora postura'
        ],
        aviso: 'Movimento lento e controlado. Não force além do confortável.',
        fonte: 'Sociedade Brasileira de Geriatria e Gerontologia (SBGG) — Tratado de Geriatria e Gerontologia, 5ª ed., Guanabara Koogan, 2019.',
        areasDeDor: ['costas_superior', 'lombar'],
        objetivos: ['dores', 'mobilidade'],
        contraindicacoes: ['hernia_disco']
      }
    ]
  },

  equilibrio: {
    titulo: '⚖️ Equilíbrio',
    itens: [
      {
        id: 'e1',
        emoji: '🦩',
        nome: 'Ficar em um pé',
        dificuldade: 'Médio',
        duracao: '5 min',
        descanso: 30,
        series: 5,
        passos: [
          'Fique em pé perto de uma cadeira ou parede para apoio.',
          'Levante lentamente o pé direito do chão.',
          'Tente manter o equilíbrio por 10 segundos.',
          'Apoie o pé e repita com o esquerdo.',
          'Faça 5 repetições cada pé.'
        ],
        beneficios: [
          'Fortalece tornozelos',
          'Melhora o equilíbrio',
          'Previne quedas'
        ],
        aviso: 'Sempre tenha apoio por perto. Não faça em superfícies escorregadias.',
        fonte: 'ACSM — Guidelines for Exercise Testing and Prescription, 11ª ed., Wolters Kluwer, 2021.',
        areasDeDor: ['tornozelos', 'joelhos'],
        objetivos: ['equilibrio', 'longevidade'],
        contraindicacoes: ['labirintite', 'protese_joelho']
      },
      {
        id: 'e2',
        emoji: '🚶',
        nome: 'Caminhada no calcanhar',
        dificuldade: 'Fácil',
        duracao: '5 min',
        descanso: 30,
        series: 3,
        passos: [
          'Escolha um corredor livre de obstáculos.',
          'Levante os dedos dos pés do chão.',
          'Caminhe apoiando apenas os calcanhares.',
          'Dê 20 passos devagar.',
          'Descanse e repita 3 vezes.'
        ],
        beneficios: [
          'Fortalece a parte frontal da perna',
          'Melhora estabilidade ao caminhar'
        ],
        aviso: 'Caminhe devagar. Tenha alguém por perto na primeira vez.',
        fonte: 'National Institute on Aging (NIA) — Exercise & Physical Activity: Your Everyday Guide, NIH, 2022.',
        areasDeDor: ['tornozelos'],
        objetivos: ['equilibrio', 'mobilidade', 'vitalidade'],
        contraindicacoes: ['labirintite']
      },
      {
        id: 'e3',
        emoji: '↔️',
        nome: 'Transferência de peso lateral',
        dificuldade: 'Fácil',
        duracao: '5 min',
        descanso: 30,
        series: 3,
        passos: [
          'Fique em pé com os pés afastados na largura dos quadris.',
          'Transfira lentamente o peso para o pé direito.',
          'Levante levemente o pé esquerdo.',
          'Segure 5 segundos.',
          'Repita para o outro lado. Faça 10 repetições.'
        ],
        beneficios: [
          'Melhora coordenação motora',
          'Fortalece quadris',
          'Previne quedas laterais'
        ],
        aviso: 'Use uma parede próxima para segurança. Movimentos lentos.',
        fonte: 'OMS — Diretrizes sobre Atividade Física e Comportamento Sedentário, Genebra, 2020.',
        areasDeDor: ['quadris'],
        objetivos: ['equilibrio', 'mobilidade'],
        contraindicacoes: []
      },
      {
        id: 'e4',
        emoji: '🪑',
        nome: 'Sentar e levantar da cadeira',
        dificuldade: 'Médio',
        duracao: '8 min',
        descanso: 45,
        series: 3,
        passos: [
          'Sente-se em uma cadeira firme sem braços.',
          'Coloque os pés no chão afastados na largura dos ombros.',
          'Incline levemente o tronco para frente.',
          'Levante-se devagar sem usar as mãos.',
          'Sente-se novamente com controle. Repita 10 vezes.'
        ],
        beneficios: [
          'Fortalece coxas e glúteos',
          'Melhora capacidade funcional',
          'Aumenta independência'
        ],
        aviso: 'Tenha uma parede ou apoio ao alcance. Pause se sentir tontura.',
        fonte: 'Revista Brasileira de Fisioterapia — Exercícios funcionais para idosos, vol. 24, n. 3, SciELO, 2020.',
        areasDeDor: ['joelhos', 'quadris', 'lombar'],
        objetivos: ['vitalidade', 'longevidade', 'mobilidade'],
        contraindicacoes: ['protese_joelho', 'protese_quadril']
      }
    ]
  },

  respiracao: {
    titulo: '🌬️ Respiração',
    itens: [
      {
        id: 'r1',
        emoji: '🫁',
        nome: 'Respiração diafragmática',
        dificuldade: 'Fácil',
        duracao: '5 min',
        descanso: 20,
        series: 5,
        passos: [
          'Sente-se confortavelmente ou deite-se.',
          'Coloque uma mão no peito e outra na barriga.',
          'Inspire pelo nariz contando até 4, sentindo a barriga subir.',
          'Expire pela boca contando até 6, sentindo a barriga descer.',
          'Repita por 5 minutos.'
        ],
        beneficios: [
          'Reduz ansiedade',
          'Melhora oxigenação',
          'Fortalece o diafragma',
          'Auxilia o sono'
        ],
        aviso: 'Se sentir tontura, faça uma pausa e respire normalmente.',
        fonte: 'ACSM — Guidelines for Exercise Testing and Prescription, 11ª ed., Wolters Kluwer, 2021.',
        areasDeDor: [],
        objetivos: ['relaxamento', 'longevidade', 'vitalidade'],
        contraindicacoes: []
      },
      {
        id: 'r2',
        emoji: '🔢',
        nome: 'Respiração 4-7-8',
        dificuldade: 'Médio',
        duracao: '5 min',
        descanso: 20,
        series: 4,
        passos: [
          'Sente-se ereto com a coluna alinhada.',
          'Expire completamente pela boca.',
          'Inspire pelo nariz contando até 4.',
          'Segure a respiração contando até 7.',
          'Expire pela boca contando até 8. Repita 4 ciclos.'
        ],
        beneficios: [
          'Reduz estresse',
          'Melhora qualidade do sono',
          'Diminui pressão arterial'
        ],
        aviso: 'Iniciantes podem sentir leve tontura. Reduza para 2 ciclos no início.',
        fonte: 'Sociedade Brasileira de Geriatria e Gerontologia (SBGG) — Tratado de Geriatria e Gerontologia, 5ª ed., Guanabara Koogan, 2019.',
        areasDeDor: [],
        objetivos: ['relaxamento', 'longevidade'],
        contraindicacoes: ['problemas_cardiacos']
      },
      {
        id: 'r3',
        emoji: '👃',
        nome: 'Respiração nasal alternada',
        dificuldade: 'Médio',
        duracao: '5 min',
        descanso: 20,
        series: 4,
        passos: [
          'Sente-se confortavelmente.',
          'Use o polegar direito para fechar a narina direita.',
          'Inspire pela narina esquerda contando até 4.',
          'Feche a narina esquerda com o dedo anelar.',
          'Expire pela narina direita contando até 4. Alterne por 5 minutos.'
        ],
        beneficios: [
          'Equilibra o sistema nervoso',
          'Melhora foco e concentração',
          'Reduz ansiedade'
        ],
        aviso: 'Não force a respiração. Se tiver gripe ou rinite, evite este exercício.',
        fonte: 'OMS — Diretrizes sobre Atividade Física e Comportamento Sedentário, Genebra, 2020.',
        areasDeDor: [],
        objetivos: ['relaxamento', 'vitalidade'],
        contraindicacoes: []
      },
      {
        id: 'r4',
        emoji: '🙌',
        nome: 'Respiração com movimento de braços',
        dificuldade: 'Fácil',
        duracao: '5 min',
        descanso: 20,
        series: 5,
        passos: [
          'Fique em pé com os braços ao lado do corpo.',
          'Inspire lentamente levantando os braços até a altura dos ombros.',
          'Segure 2 segundos com os braços estendidos.',
          'Expire abaixando os braços devagar.',
          'Repita 10 vezes em ritmo suave.'
        ],
        beneficios: [
          'Melhora capacidade pulmonar',
          'Mobiliza ombros',
          'Promove relaxamento'
        ],
        aviso: 'Movimentos lentos e sincronizados com a respiração. Não prenda o ar.',
        fonte: 'National Institute on Aging (NIA) — Exercise & Physical Activity: Your Everyday Guide, NIH, 2022.',
        areasDeDor: ['ombros'],
        objetivos: ['relaxamento', 'mobilidade', 'vitalidade'],
        contraindicacoes: []
      }
    ]
  }
};
