# 📐 DECISIONS.md — Architecture Decision Records

## D001 — Stack: Next.js + Supabase + Vercel

**Data:** 2026-07-17 · sessao-001
**Contexto:** Precisava de um app com auth, banco relacional simples e deploy fácil, para uso pessoal de um único usuário real.
**Decisão:** Next.js (App Router) no frontend, Supabase (Postgres + Auth) no backend, deploy planejado na Vercel.
**Motivo:** Definido na spec original do usuário (`docs/PROTOC_1_spec.md`) — combinação padrão, sem custo pra começar, e o usuário já tinha conta Supabase de outro projeto.
**Trade-off:** Nenhum custo hoje (tier grátis), mas amarra o projeto ao ecossistema Vercel/Supabase caso cresça muito.
**Revisitar quando:** Se o app precisar de múltiplos usuários reais ou volume que estoure o tier grátis.

## D002 — `src/proxy.ts` em vez de `middleware.ts`

**Data:** 2026-07-17 · sessao-001
**Contexto:** Next.js 16 emitiu warning de depreciação para o arquivo `middleware.ts`, recomendando a nova convenção `proxy.ts`.
**Decisão:** Renomear para `src/proxy.ts` com `export default async function proxy(...)`.
**Motivo:** Eliminar o warning agora, já que o projeto está começando do zero nesta versão do Next.js — mais barato migrar já do que depois.
**Trade-off:** Nenhum — mesma funcionalidade, só o nome do arquivo/export muda.
**Revisitar quando:** Nunca, a menos que o Next.js mude a convenção de novo.

## D003 — Lição 8 (Autocompaixão) e lições 18-20 são conteúdo original, não extraído dos documentos-fonte

**Data:** 2026-07-17 · sessao-001
**Contexto:** A spec original (`docs/PROTOC_1_spec.md`) esperava 9 seções no `MENTALIDADE_ampliado.docx` (incluindo uma seção de "Autocompaixão"), mas o arquivo `MENTALIDADE.docx` realmente enviado só tinha 8 seções — sem autocompaixão. Além disso, as lições 18-20 (bola parada, liderança, retorno de lesão) nunca tiveram fonte nos documentos — a spec já avisava isso.
**Decisão:** Perguntado ao usuário; ele escolheu que eu escrevesse a seção de Autocompaixão do zero, no mesmo estilo/tom do resto do documento, como lição 8 (empurrando a antiga seção 8 "Conclusão" para lição 9). Lições 18-20 também escritas do zero, com autorização prévia do usuário.
**Motivo:** Preferência explícita do usuário sobre as alternativas (usar só 8 lições, ou esperar o arquivo `_ampliado` real).
**Trade-off:** Esse conteúdo não vem de um vídeo/fonte real como o resto — é a "voz" do Claude imitando o tom do documento original, não uma transcrição.
**Revisitar quando:** Se o usuário conseguir o `MENTALIDADE_ampliado.docx` real com a seção de Autocompaixão original — nesse caso, substituir o conteúdo da lição 8 pelo texto real.

## D004 — Versão do `package.json` sincronizada com `CHANGELOG.md`

**Data:** 2026-07-17 · sessao-001
**Contexto:** O método de registro avisa que a versão do changelog pode divergir da versão do `package.json` se não for decidido explicitamente.
**Decisão:** Manter os dois sempre sincronizados — todo bump de versão no `CHANGELOG.md` deve ser acompanhado do mesmo bump em `package.json`.
**Motivo:** Projeto pequeno, um único mantenedor — não há ganho em versionar os dois de forma independente, só risco de confusão.
**Trade-off:** Nenhum relevante neste porte de projeto.
**Revisitar quando:** Nunca, a menos que o projeto vire algo com release process mais formal (ex.: publicado como pacote).

## D005 — RLS: conteúdo (`lessons`, `positions_content`) legível por qualquer autenticado; progresso restrito ao dono

**Data:** 2026-07-17 · sessao-001
**Contexto:** Definir as políticas de Row Level Security do Supabase para as três tabelas.
**Decisão:** `lessons` e `positions_content` têm `select` liberado para qualquer usuário autenticado (`using (true)`); `user_progress` tem `select`/`insert`/`delete` restritos a `auth.uid() = user_id`.
**Motivo:** O conteúdo do curso é o mesmo para todo mundo (não é dado sensível), só o progresso individual precisa ser privado.
**Trade-off:** Se um dia o app precisar de conteúdo diferente por usuário (ex.: múltiplos alunos com currículos distintos), esse modelo precisa mudar.
**Revisitar quando:** Se o app deixar de ser uso pessoal único e passar a ter múltiplos usuários com necessidades diferentes.
