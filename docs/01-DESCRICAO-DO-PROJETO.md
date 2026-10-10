# Documento 1 — Descrição do Projeto

## Nome e integrantes

**VitaSênior — gestão de atividades educativas de bem-estar.** Integrante: Maycon Rodrigues da Silva.

## Negócio e necessidade

Uma organização que oferece encontros educativos presenciais para pessoas idosas precisa publicar sua agenda, controlar vagas e permitir inscrições. Planilhas isoladas dificultam a consulta da disponibilidade e a atualização de participantes.

## Objetivo e público-alvo

O sistema permite ao responsável administrar atividades e consultar inscrições. Participantes usam o aplicativo móvel para consultar a agenda, inscrever-se e administrar a própria inscrição por código. O público-alvo são organizadores e participantes de encontros educativos. Não há avaliação de saúde, prescrição ou prontuário.

## Solução e papel de cada módulo

| Módulo | Função |
| --- | --- |
| Web Java, JSP e Servlets | Área administrativa protegida por senha; CRUD de atividades; consulta de inscrições. |
| Flutter | Lista de atividades e vagas; criação, consulta, alteração do nome e cancelamento de inscrição. |
| Banco SQL | Tabelas relacionadas de atividades e inscrições, restrições e persistência das operações de ambos os módulos. |
| Biblioteca HTML existente | Conteúdo educativo público; preservado como página inicial da solução. |

## Tecnologias

Java 17, Jakarta Servlets 6, JSP, JDBC, SQLite, Flutter/Dart, HTML e CSS. Hospedagem: Oracle Cloud Always Free, Tomcat e Caddy. O servidor e o arquivo de banco ficam na mesma instância; o app móvel acessa apenas a API HTTPS.
