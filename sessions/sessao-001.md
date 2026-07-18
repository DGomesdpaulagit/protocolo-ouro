# Sessão 001 — Build inicial completo do Protocolo Ouro

**Data:** 2026-07-17
**Versão:** — → 1.0.0
**Tipo:** Implementação (build do zero)

## O que foi feito

Construção completa do app a partir de três documentos enviados pelo
usuário (`PROTOC_1.DOC` — especificação; `MENTALIDADE.docx` e
`POSIÇÕES.docx` — conteúdo-fonte das lições):

1. Leitura e extração de texto dos três documentos (todos eram na verdade
   `.docx`/Word 2007+ apesar da extensão `.DOC` de um deles).
2. Criação do projeto Supabase `protocolo-ouro` (org existente do usuário,
   plano grátis, confirmado com o usuário antes via `confirm_cost`).
3. Schema completo: `lessons`, `user_progress`, `positions_content` + RLS.
4. Scaffold Next.js 16 (App Router, Tailwind v4, TypeScript) — feito numa
   pasta temporária (`npm` não aceita nomes com espaço/maiúscula) e depois
   movido pra raiz do projeto.
5. Cliente Supabase (browser/server/proxy) e proteção de rotas.
6. Tema visual preto/dourado conforme a spec (`globals.css`).
7. Páginas: Login (com cadastro), Dashboard, Curso (lista + detalhe de
   lição), Posições.
8. Lógica de progresso e desbloqueio sequencial (`src/lib/lessons.ts`).
9. Conteúdo de `positions_content` (21 linhas: 4 posições × 5 seções + 1
   nota geral) inserido com o texto real de `POSIÇÕES.docx`.
10. Lições 10-20 inseridas primeiro (Blocos 2, 3, 4).
11. Teste ponta a ponta no navegador (usuário de teste criado via SQL
    direto, sem depender do e-mail real) — encontrado e corrigido o bug
    B001 durante esse teste.
12. Lições 1-9 (Bloco 1, Mentalidade) inseridas por último, depois de uma
    pergunta ao usuário sobre a seção de Autocompaixão ausente (ver
    Decisões abaixo).
13. Segundo teste ponta a ponta confirmando as 20 lições na ordem certa.
14. Aplicação do método de registro e continuidade (este conjunto de
    arquivos), a pedido do usuário.

## Detalhes técnicos

- **Next.js 16 usa `proxy.ts`, não `middleware.ts`** — o build emitiu um
  warning de depreciação; migrado antes de seguir (ver D002).
- **Server actions** (`src/app/curso/[id]/actions.ts`) usados para marcar
  lição como concluída — `upsert` em `user_progress` (evita erro se o
  usuário já tiver concluído e clicar de novo).
- **Renderer de markdown leve** (`src/components/markdown-lite.tsx`) escrito
  do zero em vez de adicionar `react-markdown` como dependência — o
  conteúdo só usa `## headers`, `- listas` e `**negrito**`, não precisava de
  um parser completo.
- **Usuário de teste** criado via SQL direto (`auth.users` + `pgcrypto`)
  para testar o fluxo completo sem depender do e-mail real do usuário —
  removido do banco ao final de cada rodada de teste (ver
  `docs/SUPABASE_SETUP.md`).

## Verificação

- `npm run build` limpo (0 erros, sem warnings) nas duas rodadas.
- Testado no navegador (Browser pane): login → dashboard → lição → marcar
  concluída → desbloqueio da próxima → página de posições. Confirmado no
  banco (`select` em `user_progress`) que o progresso persiste.
- `select count(*) from lessons` = 20 confirmado depois da segunda rodada.
- Ordem das 20 lições em `/curso` conferida visualmente (texto da página),
  batendo com a spec original.

## Decisões técnicas

Ver `DECISIONS.md` para o registro completo. Resumo:

- **D001:** stack Next.js + Supabase + Vercel (vinha da spec original).
- **D002:** `proxy.ts` em vez de `middleware.ts` (convenção Next.js 16).
- **D003:** lição 8 (Autocompaixão) e lições 18-20 são conteúdo original
  escrito pelo Claude, não extraído dos documentos — porque o
  `MENTALIDADE.docx` recebido não tinha a seção de autocompaixão que a spec
  esperava, e as lições 18-20 nunca tiveram fonte. Usuário escolheu
  explicitamente "escrever a seção eu mesmo" entre as opções apresentadas.
- **D004:** versão do `package.json` sincronizada com `CHANGELOG.md`.
- **D005:** RLS — conteúdo legível por qualquer autenticado, progresso
  restrito ao dono.

## Bug encontrado e corrigido nesta sessão

- **B001:** lições do Bloco 2 apareciam fora de ordem em `/curso` (todas as
  "função tática" antes de todas as "erros comuns", em vez de 10→17
  sequencial). Causa: `order_in_block` copiado errado do padrão do Bloco 1
  (valores 6/7 repetidos em vez de sequencial 1-8). Corrigido com um
  `update` direto no Supabase. Ver `BUGS.md`.

## Arquivos alterados

| Arquivo | Mudança |
|---|---|
| `package.json` | nome do projeto, dependências Supabase |
| `src/app/layout.tsx` | título, lang="pt-BR", tema |
| `src/app/page.tsx` | redirect para `/dashboard` |
| `src/app/globals.css` | paleta preto/dourado |
| `src/app/login/page.tsx` | novo — login + cadastro |
| `src/app/dashboard/page.tsx` | novo — progresso geral |
| `src/app/curso/page.tsx` | novo — lista de lições |
| `src/app/curso/[id]/page.tsx` | novo — detalhe da lição |
| `src/app/curso/[id]/actions.ts` | novo — server action de progresso |
| `src/app/posicoes/page.tsx` | novo — consulta por posição |
| `src/components/*.tsx` | novos — nav, markdown-lite, complete-lesson-button, positions-view |
| `src/lib/lessons.ts` | novo — lógica de desbloqueio |
| `src/lib/supabase/*.ts` | novos — clientes Supabase |
| `src/proxy.ts` | novo — proteção de rotas |
| `.env.local` | novo — credenciais Supabase (não commitado) |
| `.claude/launch.json` | novo — config do preview local |
| Banco Supabase | schema + 20 lições + 21 linhas de `positions_content` |

## Status para retomar

- Build OK, app funcional em `npm run dev` (http://localhost:3000).
- Sem remoto Git configurado ainda — commits só locais por enquanto.
- Sem deploy — próximo passo natural quando o usuário quiser.
- Nenhum bug ativo conhecido.
- Roadmap da spec original 100% entregue, exceto página de Perfil (opcional)
  e deploy.
