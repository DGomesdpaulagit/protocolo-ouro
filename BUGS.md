# 🐛 BUGS.md

## ✅ RESOLVIDOS

| ID | Bug | Causa | Solução | Data |
|---|---|---|---|---|
| B001 | Lições do Bloco 2 apareciam fora de ordem em `/curso` (agrupadas por "tática" depois "erros", em vez de 10→17) | `order_in_block` foi preenchido com valores repetidos (6/7) copiados do padrão do Bloco 1, em vez de sequencial 1-8 dentro do bloco | `update lessons set order_in_block = id - 9 where id between 10 and 17` | 2026-07-17 |

## 🔴 ATIVOS

Nenhum.

## 📝 TEMPLATE

**ID:** BXXX
**Status:** Ativo / Resolvido
**Descrição:** ...
**Causa:** ...
**Solução:** ...
**Data:** YYYY-MM-DD
