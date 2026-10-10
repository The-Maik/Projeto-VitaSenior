# Documento 2 — Especificação de Requisitos

## Requisitos funcionais

| ID | Descrição | Módulo |
| --- | --- | --- |
| RF01 | Autenticar o administrador por senha. | Web |
| RF02 | Cadastrar atividades com título, descrição, data/hora, local e vagas. | Web |
| RF03 | Listar atividades e quantidade de inscritos. | Web e Mobile |
| RF04 | Alterar atividades e validar capacidade mínima igual às inscrições existentes. | Web |
| RF05 | Excluir atividades e suas inscrições associadas. | Web |
| RF06 | Consultar inscrições associadas a atividades. | Web |
| RF07 | Criar inscrição se houver vaga e retornar código único. | Mobile/API |
| RF08 | Consultar, alterar o nome e cancelar uma inscrição mediante código. | Mobile/API |
| RF09 | Navegar entre lista de atividades, inscrição e consulta da inscrição. | Mobile |

## Requisitos não funcionais

| ID | Descrição |
| --- | --- |
| RNF01 | Web em Java com JSP, Servlet e classes de domínio/acesso a dados. |
| RNF02 | Mobile em Flutter para Android. |
| RNF03 | Banco relacional SQL com chaves, relacionamento e restrições. |
| RNF04 | Validação de campos no cliente e servidor, com SQL parametrizado. |
| RNF05 | Comunicação móvel somente por HTTPS na implantação pública. |
| RNF06 | Dados de inscrição limitados a nome/apelido e código; sem dados de saúde. |
| RNF07 | Interface em português e com controles de tamanho acessível. |
| RNF08 | Código de reserva aleatório de 128 bits. |

## Critérios da demonstração

1. No Web, cadastrar atividade, consultar, alterar e consultar de novo.
2. No Mobile, listar a mesma atividade, inscrever um nome e guardar o código.
3. No Web, confirmar a inscrição e a contagem de vagas.
4. No Mobile, consultar, alterar nome e cancelar pelo código.
5. No Web, confirmar o cancelamento e excluir a atividade.
