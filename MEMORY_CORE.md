# ⚡ MEMORY_CORE.md — Estado Atual do Projeto

> Atualizar a cada sessão. Manter pequeno e rápido de ler.

## 📍 ESTADO ATUAL

**Data:** 2026-07-18
**Versão:** 1.4.0 — nome de usuário, layout de Posições corrigido, narração em áudio
**Status:** ⏸️ **PROJETO PAUSADO** a pedido do usuário. Projeto Supabase
(`pbbzozeztqrenpfnhylp`) pausado (`pause_project`) pra liberar vaga no
limite de 2 projetos ativos do plano grátis — o usuário tem outros
projetos pra terminar primeiro. Como o app depende do Supabase em tempo
de execução, **o site em produção (https://the-one-porcent.vercel.app)
vai ficar fora do ar** (erros de conexão) enquanto o banco estiver
pausado — isso é esperado, não é um bug. Repositório:
`DGomesdpaulagit/the-one-porcent`.

## ▶️ COMO RETOMAR

1. Restaurar o banco: `restore_project` no projeto Supabase
   `pbbzozeztqrenpfnhylp` (MCP do Supabase) — leva alguns minutos, dados
   preservados, nada se perde.
2. Conferir que o site voltou (recarregar https://the-one-porcent.vercel.app).
3. Retomar o item pendente da sessão 006: vídeo piloto da posição Volante
   (ver seção "Vídeo piloto" abaixo) — usuário estava sem créditos na
   ferramenta de geração (Higgsfield), precisa assinar um plano (Plus,
   ~$49/mês/1000 créditos, ou Ultra) ou usar o teste grátis de 3 dias
   (100 créditos, pede cartão, renova automático) antes de continuar essa
   parte específica. O resto do app está 100% funcional sem isso.

## ✅ O QUE ESTÁ PRONTO

- [x] Projeto Supabase `protocolo-ouro` (ref `pbbzozeztqrenpfnhylp`, região us-east-2) criado, plano grátis
- [x] Schema: tabelas `lessons`, `user_progress`, `positions_content` + RLS
- [x] Scaffold Next.js 16 (App Router, Tailwind v4, TypeScript), tema preto/dourado, mobile-first
- [x] Auth via Supabase (login/cadastro com confirmação por e-mail)
- [x] 20 lições populadas nos 4 blocos, com o texto real de `MENTALIDADE.docx` e `POSIÇÕES.docx` (exceto lição 8 e lições 18-20, ver `DECISIONS.md` D003)
- [x] Posições: 4 posições × 5 seções, texto real de `POSIÇÕES.docx`
- [x] Páginas: Login, Dashboard, Curso (lista + detalhe de lição), Posições
- [x] Lógica de progresso e desbloqueio sequencial (lição N só abre se N-1 concluída)
- [x] Testado ponta a ponta no navegador com usuário de teste (criado e removido do banco depois)
- [x] Método de registro/continuidade (este arquivo e os outros da lista) aplicado
- [x] Repositório GitHub público criado e conectado
- [x] Deploy na Vercel configurado com integração Git (auto-deploy) + env vars do Supabase
- [x] Página de Perfil (agora parte de Configurações): metas pessoais + histórico de lições por data
- [x] Redesign completo: sidebar (desktop) / barra de abas (mobile), dashboard em painéis (progresso radial animado, progresso por bloco, atalhos de posições, metas em destaque), animações framer-motion em todo o app
- [x] Página de Configurações consolidando conta, metas, histórico e informações do app
- [x] Diagrama de campo animado (SVG) na página de Posições, com marcadores clicáveis por posição
- [x] Rebrand in-app para "THE ONE PORCENT" (título, sidebar, login, package.json)
- [x] Favicon "1%" dourado gerado via `icon.tsx` (Next.js `ImageResponse`)
- [x] Página `/metas` dedicada: metas com plano de coaching (etapas sequenciais desbloqueáveis + práticas contínuas), templates para "capitão" e "cobrador de bola parada", fallback genérico para qualquer outra meta
- [x] Streak (sequência de dias) no dashboard, calculada a partir de `user_progress.completed_at`
- [x] Som de sucesso (Web Audio API, sintetizado) ao concluir uma lição
- [x] Loading states (skeleton) em todas as rotas autenticadas via `loading.tsx`
- [x] Posições redesenhado como carrossel passo a passo (uma seção por vez, setas + pontos de navegação) com animações contextuais no diagrama de campo por tipo de seção
- [x] Nome de usuário editável (campo no cadastro + edição em Configurações, via `user_metadata.display_name` do Supabase Auth) — dashboard usa o nome em vez do prefixo do e-mail
- [x] Layout de Posições corrigido: campo de futebol fica fixo (sticky) enquanto o texto rola, e vira coluna lateral no desktop — resolve a reclamação de "não consigo ver o campo enquanto leio"
- [x] Narração em áudio automática por etapa em Posições (Web Speech API, voz pt-BR, sem custo), com botão de mudo

## 🎯 PRÓXIMA SESSÃO

Roadmap funcional, rebrand e polish 100% entregues, tudo em produção
(quando o Supabase for restaurado). Projeto pausado a pedido do usuário
em 2026-07-18 — sem tarefa obrigatória pendente além de retomar quando
ele voltar. Ver "COMO RETOMAR" acima.

### Vídeo piloto — decisões já tomadas (não perguntar de novo)

Todo o Phase 0 do fluxo `video-explainer` (MCP Higgsfield/`4b8fed24-...`)
já foi decidido com o usuário na sessão 006 — só falta executar quando ele
tiver créditos:

- **Posição piloto:** Volante (só essa, pra avaliar antes das outras 3)
- **Estilo:** "Whiteboard Doodle" (`preset_id: b347d852-98fc-4013-92b7-6b0219fb21be`,
  `media_id` já resolvido: `24a3bc5d-4f1e-40e3-b07a-d8f11dc3de21` — pode
  ter expirado, reconferir/re-resolver se necessário)
- **Duração:** 1 minuto = 6 blocos de 10s
- **Personagem:** sem mascote (faceless, só cenas de campo/tática)
- **Legenda:** ligada, fonte `patrick`
- **Idioma da narração:** português (pt-BR)
- **Custo estimado:** ~181 créditos (180 vídeo + ~1 áudio/legenda) — o
  usuário estava com 0 créditos (plano grátis) na Higgsfield; precisa de
  Plus (~$49/mês, 1000 créditos) ou Ultra, ou o teste grátis de 3 dias
  (100 créditos, não cobre o piloto inteiro sozinho)
- Narração (6 blocos, PT-BR) e estrutura de cena por bloco já foram
  rascunhadas na sessão 006 cobrindo: intro/papel do volante, função
  tática, fundamentos técnicos, erros comuns, treino, aspectos mentais —
  reconstruir a partir do conteúdo real de `positions_content` (position
  = 'volante') se for retomar, já que não foram salvas em arquivo.

## 🐛 BUGS CONHECIDOS

Nenhum ativo. Ver `BUGS.md` para o histórico (3 bugs resolvidos — B001, B002, B003).

## ⚠️ Observação sobre teste no navegador (sessão 005)

O Browser pane usado pra testar (Claude_Browser) ficou instável durante
essa sessão — cliques por `ref` frequentemente resolviam pra coordenada
`(0,0)` e não registravam, mesmo em elementos comuns (botões de nav,
formulários). Não é um bug do app: abrir uma aba nova geralmente resolve;
quando o clique continuou falhando, a validação foi feita inserindo dados
de teste direto via SQL e conferindo a renderização com `read_page`, que
funcionou normalmente o tempo todo. Se isso acontecer de novo, tentar aba
nova primeiro antes de assumir que é regressão no código.

## 🔑 ARQUIVOS CRÍTICOS

| Arquivo | Importância |
|---|---|
| `src/lib/lessons.ts` | Lógica de desbloqueio sequencial — mexer com cuidado |
| `src/lib/supabase/{client,server,middleware}.ts` | Clientes Supabase (browser/server/proxy) |
| `src/proxy.ts` | Proteção de rotas (redireciona não-autenticado para `/login`) — convenção Next.js 16, não `middleware.ts` |
| `.env.local` | `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` — nunca commitar (já no `.gitignore`) |
| `docs/SUPABASE_SETUP.md` | Como recriar/entender a config do Supabase deste projeto |

## Projeto Supabase

- **Nome:** protocolo-ouro
- **Ref:** `pbbzozeztqrenpfnhylp`
- **URL:** `https://pbbzozeztqrenpfnhylp.supabase.co`
- **Org:** `mbgjntfcclvtwcojrpun`
- Detalhes completos de schema em `MEMORY.md`.
