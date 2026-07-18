# PROTOCOLO OURO — Especificação original do app

> Cópia em texto do briefing original (`PROTOC_1.DOC`) enviado pelo usuário no
> início do projeto. Mantido aqui como referência — não editar, é histórico.

## 1. Visão geral e objetivo

Este é um app pessoal de treinamento mental e tático para um jogador de
futebol de 13-14 anos (categoria sub-14), atualmente afastado por lesão há
cerca de dois meses. O objetivo é dar estrutura ao período de recuperação:
trabalhar controle emocional e recuperação pós-erro (o problema central que
motivou o projeto — o jogador tende a desmoronar depois de cometer um erro
em campo), aprofundar conhecimento tático por posição, e preparar o retorno
ao time em melhores condições mentais e técnicas.

O app deve funcionar como um curso interativo, no estilo de apps de
aprendizado por lições (ex: Duolingo): lições organizadas em blocos,
progresso salvo por usuário, desbloqueio sequencial, e uma seção de consulta
rápida sempre disponível (dicas por posição), que não depende do progresso
nas lições.

## 2. Conteúdo-fonte

O conteúdo das lições vem de dois documentos já prontos, anexados ao
briefing original:

- **MENTALIDADE_ampliado.docx** — guia de mentalidade e controle emocional, 9
  seções esperadas (consciência e identidade, as 4 pílulas, erro agressivo
  vs. acerto covarde, ferramentas de controle emocional, treino
  invisível/nutrição, futebol de rua e alter ego, mentalidade por posição,
  autocompaixão, conclusão). **Nota:** o arquivo realmente recebido
  (`MENTALIDADE.docx`) só tinha 8 seções, sem a de autocompaixão — ver
  `DECISIONS.md` D003 para como isso foi resolvido.
- **POSIÇÕES.docx** — guia técnico e tático por posição (volante, lateral,
  meia, zagueiro/líbero), cada um com: função tática, fundamentos técnicos,
  erros comuns e correção, exercícios de treino, e aspectos mentais da
  posição.

Regra explícita: extrair o texto desses dois arquivos e usar como conteúdo
real das lições — não gerar conteúdo novo por conta própria nem resumir
demais. Em caso de dúvida, perguntar ao usuário antes de decidir sozinho.

## 3. Estrutura de conteúdo — 20 lições em 4 blocos

### Bloco 1 — Mentalidade (9 lições, do MENTALIDADE_ampliado.docx)
1. Consciência e identidade
2. As 4 pílulas para uma mente blindada
3. Erro agressivo vs. acerto covarde e os 6 segredos da performance
4. Ferramentas de controle emocional: respiração, escaneamento, visualização
5. Treino invisível: nutrição, fisiologia e rituais
6. Futebol de rua, instinto e o alter ego
7. Mentalidade por posição e dinâmica de grupo/torcida
8. Autocompaixão — a peça que falta na disciplina
9. Conclusão: o caminho da disciplina

### Bloco 2 — Posições (8 lições, do POSIÇÕES.docx)
10. Volante — função tática e fundamentos técnicos
11. Volante — erros comuns, treino e mentalidade da posição
12. Lateral — função tática e fundamentos técnicos
13. Lateral — erros comuns, treino e mentalidade da posição
14. Meia — função tática e fundamentos técnicos
15. Meia — erros comuns, treino e mentalidade da posição
16. Zagueiro/Líbero — função tática e fundamentos técnicos
17. Zagueiro/Líbero — erros comuns, treino e mentalidade da posição

O próprio POSIÇÕES.docx avisa que a cobertura de fontes é desigual (meia tem
mais material; zagueiro/líbero tem menos). Preservar esses avisos nas lições
16 e 17 em vez de disfarçar a lacuna.

### Bloco 3 — Momentos decisivos (2 lições, conteúdo novo)
18. Bola parada: cobrança de falta e escanteio
19. Liderança e capitania

### Bloco 4 — Retorno de lesão (1 lição, conteúdo novo)
20. Retorno de lesão: corpo e mente

## 4. Arquitetura de telas

- **Login / cadastro** — via Supabase Auth.
- **Dashboard (home)** — progresso geral, barra de progresso, atalho pra
  próxima lição desbloqueada, atalho pra página de Posições.
- **Página de Curso** — lista as 20 lições organizadas nos 4 blocos.
  Bloqueada / disponível / concluída. Termina com pergunta/exercício
  prático; marcar como concluída desbloqueia a próxima.
- **Página de Posições** — consulta rápida, sempre acessível.
- **(Opcional) Perfil** — metas pessoais + histórico de lições concluídas.

## 5. Modelo de dados (Supabase)

- `lessons`: id, block, order, title, content, exercise_prompt
- `user_progress`: user_id, lesson_id, completed_at
- `positions_content`: position, section, content
- Regra de desbloqueio: lição N só disponível quando lição N-1 concluída.

## 6. Identidade visual

Paleta preto e dourado — fundo escuro (#0a0a0a a #1c1c1c) com destaques em
dourado (#d4af37 / #f5d67a). Tipografia forte, mobile-first. Nome do
projeto: Protocolo Ouro.

## 7. Stack técnica

Frontend: Next.js, hospedado na Vercel. Backend/dados: Supabase (Postgres +
Auth). Deploy: Vercel, domínio padrão (sem custo de domínio próprio
necessário pra começar).

## 8. Fases sugeridas de construção

1. Schema no Supabase + autenticação básica.
2. Estrutura de páginas e navegação.
3. Popular as 20 lições com o conteúdo real.
4. Lógica de progresso e desbloqueio sequencial.
5. Identidade visual preto e dourado.
6. Deploy na Vercel e teste no celular.
