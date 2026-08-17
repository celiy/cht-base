# cht-base

Repositório base do frontend multi-cliente.

## O que é

O `cht-base` é o shell principal da aplicação em Vue + Vite.  
Ele define estrutura global, layouts, roteamento e integração com os demais pacotes do workspace.

## O que faz

- Inicializa a aplicação frontend.
- Carrega configuração do cliente ativo via variável `CLIENT` (lê `cht-client-<name>/cht.config.json`).
- Monta rotas de páginas do cliente (`@client/routes.ts`).
- Consome componentes do `cht-design-system` e utilitários do `cht-shared`.
- Mantém modo `dev` interno para desenvolvimento de telas/labs do base.
