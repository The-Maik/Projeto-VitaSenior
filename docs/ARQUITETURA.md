# Decisões de implementação

## Aplicação estática

A base já usava HTML, CSS e JavaScript. Mantivemos uma entrega estática, sem framework ou dependência de produção. Módulos separam conteúdo, domínio e DOM; um servidor HTTP é necessário para carregar módulos. Caminhos relativos permitem hospedagem em subdiretórios.

A fonte única da biblioteca é `js/content.js`. Textos são inseridos com `textContent` e nós DOM; a busca nunca entra em HTML. Links de referência são constantes do catálogo. A CSP bloqueia scripts inline, conexões de API, formulários, objetos e bases de URL externas. No GitHub Pages ela é entregue por meta; diretivas que exigem cabeçalhos, como `frame-ancestors`, precisam ser configuradas numa hospedagem que os suporte se necessárias.

## Estado e privacidade

Favoritos e marcações são conjuntos de IDs em memória. Não há persistência, cookies, exportação de saúde ou backend. Busca e filtros não vão para URLs. O evento `pagehide` limpa marcações e cronômetro; restauração pelo bfcache reinicia filtros e ajustes. Não há sincronização entre abas, intencionalmente.

Esse desenho não controla registros de hospedagem, histórico do navegador, extensões, cópias de tela ou conteúdo já mostrado em aparelhos compartilhados. A documentação evita a promessa de anonimato absoluto.

## Acessibilidade

Botões reais, grupos de filtros com `aria-pressed`, rótulos de busca e timer, região de resultados anunciada e progresso semântico. `dialog` nativo fornece modalidade e Escape; a aplicação restaura foco no acionador, com alternativa se um favorito removido desaparece da lista. O timer não anuncia cada segundo, apenas alterações relevantes. Texto pode ser ampliado sem persistência. Há regra de movimento reduzido e estilos de impressão.

## Temporizador

`ReadingTimer` usa um prazo em `performance.now()` e calcula o restante por diferença. A atualização de 250 ms apenas redesenha o visor; atrasos de intervalos em abas ocultas não prolongam a contagem. Pausar preserva milissegundos. Reiniciar e mudar duração cancelam o intervalo atual. Não há sons, vibração ou retomada automática.

## Evolução

Uma versão clínica não deve reutilizar o antigo mecanismo de pontuação como decisão de segurança. Ela exigiria requisitos próprios de profissionais, validação clínica, enquadramento, base legal, autenticação/autorização, segurança, auditoria e operação. Não incluímos uma infraestrutura que simule resolver essas obrigações.
