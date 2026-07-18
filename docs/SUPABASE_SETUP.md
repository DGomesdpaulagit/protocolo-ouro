# Supabase Setup — Protocolo Ouro

Guia de configuração do Supabase para este projeto. Não é sobre progresso,
é manual — atualizar só quando a infraestrutura mudar.

## Projeto

- **Nome:** `protocolo-ouro`
- **Ref:** `pbbzozeztqrenpfnhylp`
- **Org:** `mbgjntfcclvtwcojrpun`
- **Região:** us-east-2
- **URL da API:** `https://pbbzozeztqrenpfnhylp.supabase.co`
- **Plano:** Grátis (US$0/mês)

## Variáveis de ambiente (`.env.local`, na raiz do projeto — NUNCA commitar)

```
NEXT_PUBLIC_SUPABASE_URL=https://pbbzozeztqrenpfnhylp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable key>
```

Para pegar a publishable key de novo: dashboard do Supabase → Project
Settings → API → "Publishable key" (ou `sb_publishable_...`). Se usar o MCP
do Supabase, é a ferramenta `get_publishable_keys`.

## Autenticação

Email/senha padrão do Supabase Auth, **com confirmação por e-mail ativada**
(comportamento default, não foi desativado). Fluxo:

1. Usuário cria conta na tela de login (`/login`, botão "Criar uma conta").
2. Supabase manda e-mail de confirmação para o endereço cadastrado.
3. Usuário clica no link do e-mail.
4. Usuário faz login normalmente em `/login`.

Não há tela de "esqueci minha senha" implementada ainda — se precisar,
usar `supabase.auth.resetPasswordForEmail()`.

## Schema

Ver `MEMORY.md` seção 4 para o SQL completo das 3 tabelas e das políticas
RLS. Para recriar do zero em um projeto novo, aplicar essas migrations na
ordem: schema (DDL) → seed de `positions_content` → seed de `lessons`.

## Como adicionar/editar uma lição

```sql
-- editar conteúdo de uma lição existente
update lessons set content = $$...$$, exercise_prompt = $$...$$ where id = N;

-- adicionar lição nova (cuidado: id deve ser sequencial, ver MEMORY.md seção 5)
insert into lessons (id, block, order_in_block, title, content, exercise_prompt)
values (21, 4, 2, 'Título', $$conteúdo$$, $$exercício$$);
```

Usar `$tag$...$tag$` (dollar-quoting do Postgres) em vez de aspas simples
para o conteúdo — evita ter que escapar aspas/acentos manualmente.

## Testar localmente sem usar e-mail real

Para criar um usuário de teste já confirmado (sem precisar do fluxo de
e-mail), via SQL direto (requer extensão `pgcrypto`):

```sql
create extension if not exists pgcrypto;

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at, confirmation_token, recovery_token,
  email_change_token_new, email_change
) values (
  '00000000-0000-0000-0000-000000000000', gen_random_uuid(),
  'authenticated', 'authenticated', 'teste.local@exemplo.dev',
  crypt('senha-de-teste', gen_salt('bf')), now(),
  '{"provider":"email","providers":["email"]}', '{}', now(), now(),
  '', '', '', ''
);
```

**Sempre apagar** esse usuário de teste depois (`delete from auth.users
where email = '...'`, e o `user_progress` correspondente antes, por causa da
foreign key) — não deixar usuários de teste soltos no banco de produção.
