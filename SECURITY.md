# Segurança

Não inclua senhas, documentos, prontuários, diagnósticos ou dados pessoais em issues públicas. O canal privado de segurança do responsável ainda precisa ser definido antes de uma operação pública; esta versão é uma demonstração acadêmica.

O aplicativo publicado usa apenas ativos estáticos locais. Não há formulários de saúde, contas, backend, chaves de API ou persistência no navegador. A política CSP restringe scripts e estilos à própria origem e bloqueia conexões da aplicação. O servidor `scripts/serve.mjs` é apenas para desenvolvimento local, ligado a `127.0.0.1`, com lista de arquivos e pastas públicas; não publique esse servidor.

Antes de publicar, revise os arquivos efetivamente servidos, use HTTPS, revise permissões do repositório e mantenha dependências de teste atualizadas. O aplicativo não controla registros do provedor de hospedagem.
