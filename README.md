# VitaSênior — Bem-estar no seu ritmo

Aplicação web acadêmica de educação em bem-estar para pessoas idosas, reformulada a partir do projeto [The-Maik/Projeto-VitaSenior](https://github.com/The-Maik/Projeto-VitaSenior). Interface em português, responsiva, com biblioteca de leituras e referências verificáveis.

**Escopo desta versão:** demonstração acadêmica no Brasil. Não oferece avaliação de saúde, prescrição de exercícios, atendimento ou reabilitação. A definição de uso público/comercial e da instituição responsável ainda depende do mantenedor. Não é uma declaração de conformidade jurídica ou certificação clínica.

## Executar

Requer Node.js 22 ou superior. Não há dependências de produção nem etapa de compilação.

```sh
npm start
```

Abra **http://127.0.0.1:4173**. Os módulos JavaScript precisam de HTTP; não abra `index.html` diretamente por `file://`. Alternativamente, use um servidor estático com a raiz nesta pasta.

Prévia visual: [desktop](docs/preview-desktop.png) · [celular](docs/preview-mobile.png). Veja o [registro de validação](docs/VALIDACAO.md).

## O que funciona

- Seis leituras educativas, organizadas por assunto, com busca que ignora acentos.
- Favoritos e marcações de leitura somente em memória, descartados ao sair/recarregar.
- Temporizador de pausa de leitura com início, pausa, retomada e reinício.
- Texto ampliado, alto contraste, foco de teclado, modal acessível e movimento reduzido.
- Privacidade, limites de uso e referências em páginas acessíveis também sem JavaScript.
- Interface sem CDN, fonte remota, rastreadores, cookies, armazenamento persistente ou requisições de API.

O filtro usa assunto e texto pesquisado; não infere condições de saúde. O progresso indica **leitura**, não realização de exercícios. O cronômetro não define séries ou ciclos respiratórios.

## Validação

```sh
npm ci
npx playwright install chromium
npm run check
npm test
npm run test:e2e
```

Em Linux, se faltarem bibliotecas do navegador: `npx playwright install --with-deps chromium`.

Os testes verificam navegação, busca, favoritos, descarte de estado, cronômetro, modais, ausência de requisições externas, páginas informativas, dimensões móveis e verificações automatizadas de acessibilidade com axe. Isso não substitui testes manuais com pessoas idosas e leitores de tela, nem certificação WCAG.

### Automação de testes no GitHub

O modelo pronto está em [docs/github-actions-ci.yml](docs/github-actions-ci.yml). A conexão usada nesta entrega não tem o escopo `workflow`; o GitHub recusou a criação de `.github/workflows/ci.yml`. Por isso a automação **não está instalada**. Para ativá-la, um mantenedor com permissão apropriada pode mover o modelo para `.github/workflows/ci.yml` e enviá-lo ao repositório. O arquivo somente executa verificações; não publica o site. Os testes desta entrega foram executados localmente.

## Estrutura

```text
index.html                Página principal
privacidade.html          Tratamento de dados e limites da demonstração
termos.html               Finalidade, limites e responsabilidades
fontes.html               Referências e autoria
css/styles.css            Estilos e modos de acessibilidade
assets/                   Ilustrações e ícones vetoriais originais
js/content.js             Conteúdo editorial e referências
js/model.js               Busca e estado transitório
js/timer.js               Temporizador independente da interface
js/app.js                 Interações e renderização segura do DOM
scripts/serve.mjs          Servidor apenas de desenvolvimento, ligado ao loopback
tests/                    Testes unitários e no navegador
docs/                     Decisões, análise jurídica e roteiro de validação
```

## Publicação

Os arquivos usam caminhos relativos, compatíveis com `/Projeto-VitaSenior/` no GitHub Pages. A versão reformulada não foi publicada automaticamente. Para uma demonstração autorizada, publique os arquivos HTML, `css/`, `js/`, `assets/` e `.nojekyll` em uma hospedagem estática HTTPS. O endereço histórico do projeto não implica que estas alterações já estejam nele.

O GitHub Pages pode registrar IPs dos visitantes: a ausência de telemetria no aplicativo não significa ausência de tratamento pela hospedagem. Veja `privacidade.html` e [a documentação do GitHub](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

Antes de oferecer a usuários reais, complete as decisões e revisões em [docs/REVISAO_JURIDICA.md](docs/REVISAO_JURIDICA.md). Uma futura versão clínica deve ter projeto e avaliação regulatória próprios; acrescentar um aviso não valida um algoritmo de prescrição.

## Autoria e licença

O histórico original foi preservado. Esta reformulação contou com assistência de IA e deve seguir as regras de autoria e declaração de uso da instituição de ensino. Não foi presumida autorização para relicenciar contribuições anteriores. A titularidade e a licença de distribuição precisam ser decididas pelos titulares; consulte [NOTICE.md](NOTICE.md).
