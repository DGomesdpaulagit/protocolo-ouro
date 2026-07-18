# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/).

## [1.0.0] — 2026-07-17 — Build inicial completo

**Detalhes em `sessions/sessao-001.md`.**

### Adicionado
- Projeto Supabase `protocolo-ouro` (schema `lessons`, `user_progress`, `positions_content` + RLS)
- Scaffold Next.js 16 (App Router, Tailwind v4, TypeScript), tema preto/dourado
- Autenticação (login/cadastro via Supabase Auth)
- Páginas: Dashboard, Curso (lista + detalhe de lição), Posições
- Lógica de progresso e desbloqueio sequencial das 20 lições
- 20 lições populadas nos 4 blocos (Mentalidade, Posições, Momentos decisivos, Retorno de lesão)
- Conteúdo de Posições (4 posições × 5 seções)
- Método de registro e continuidade entre sessões (este conjunto de arquivos)

### Corrigido
- B001 — ordem de exibição das lições do Bloco 2 no `/curso` (ver `BUGS.md`)
