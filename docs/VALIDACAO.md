# Validação da reformulação

Validação local realizada em 16/09/2026, com Node.js 24.19.0, Playwright 1.63.0 / Chromium e axe-core 4.13.0.

## Resultado

- 7 testes unitários aprovados: busca, isolamento/limpeza de estado, referências do catálogo e comportamento do cronômetro.
- 17 cenários de navegador aprovados, incluindo os três testes de páginas informativas e o cenário de subdiretório executados separadamente após ajustes dos próprios testes.
- Nenhuma violação encontrada pelo axe nas páginas e estados testados: inicial, leitura, configurações, texto ampliado com alto contraste, privacidade, termos e fontes.
- Nenhuma requisição a outra origem, erro de execução ou violação de CSP no fluxo inicial/leitura testado.
- Sem rolagem horizontal nas larguras de 320, 390, 768 e 1440 px, incluindo texto ampliado. Inspeção visual realizada em desktop e celular.
- Fluxo de navegação por teclado, foco circular em modal, fechamento com Escape e retorno ao acionador verificados.
- Busca, favoritos, leitura, limpeza, recarga e retorno da navegação verificados. Armazenamento local, armazenamento de sessão e cookies vazios no cenário testado.
- Pausa, retomada, conclusão, reinício e troca de duração do cronômetro verificados com relógio controlado.
- Execução em subdiretório `/Projeto-VitaSenior/` simulada para conferir os caminhos do GitHub Pages.
- Análise de sintaxe, formatação e `git diff --check` executadas.

Durante a validação foram corrigidos reflow em 320 px, foco circular dos modais e acesso alternativo à biblioteca quando o JavaScript não inicia. Os testes tiveram ajustes de seletores acessíveis e de configuração do navegador; não foram desativadas regras de acessibilidade para ocultar falhas.

## Prévia

- [Desktop](preview-desktop.png)
- [Celular](preview-mobile.png)

## Limites

Os testes automatizados cobrem Chromium. Ainda é necessário validar Safari/Firefox, leitores de tela e navegação com pessoas idosas. Não foi realizada certificação de acessibilidade, auditoria de infraestrutura, pesquisa com participantes ou validação clínica. A revisão editorial humana e as definições jurídicas indicadas em `REVISAO_JURIDICA.md` continuam pendentes para uma operação com usuários reais.

A prévia é desta implementação local; ela não demonstra publicação no endereço histórico do projeto.

## Automação remota

O envio do workflow foi recusado pelo GitHub por ausência do escopo OAuth `workflow`. A configuração foi preservada como `docs/github-actions-ci.yml`, ainda não ativada. Não há resultado de CI remoto nesta entrega.

## Validação do Trabalho Integrador (10/10/2026)

Na instância OCI `web-db-01`, o WAR Java compilou com Maven e o fluxo HTTPS foi executado contra o banco SQLite da VM: login administrativo; criação e alteração de atividade; listagem pela API; criação, consulta, alteração de nome e cancelamento de inscrição; exclusão de atividade. A contagem de inscritos foi conferida após criação e cancelamento. Um segundo cadastro numa atividade com uma vaga retornou HTTP 400 e a contagem permaneceu em um. Registros de teste foram removidos.

O app Flutter passou em `flutter analyze` sem problemas. O APK de release foi compilado, passou na verificação de integridade ZIP e a assinatura APK v2 foi validada por `apksigner`; pacote `br.edu.vitasenior.mobile`, versão `1.0.0`, Android mínimo 7.0 (API 24). SHA-256: `f1175f47bf6599df94b95531c78517fd6792ced189295af2947e52133e7d605a`. A execução em aparelho físico ainda precisa ser verificada. A versão de demonstração usa a chave de depuração padrão do Flutter.
