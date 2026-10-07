# cht-base

Repositório base do frontend multi-cliente.

## O que é

O `cht-base` é o shell principal da aplicação em Vue + Vite.  
Ele define estrutura global, layouts, roteamento e integração com os demais pacotes do workspace.

## O que faz

- Inicializa a aplicação frontend.
- Carrega configuração do cliente ativo via variável `CLIENT` (lê o `cht.config.ts` ou `cht.config.json` da pasta do cliente, ao lado do `cht-base`; se existirem os dois, o `.ts` ganha).
- Monta rotas de páginas do cliente (`@client/routes.ts`).
- Consome componentes do `cht-design-system` e utilitários do `cht-shared`.
- Mantém modo `dev` interno para desenvolvimento de telas/labs do base.
- Pode ser executado como app desktop Electron (`electron/`), iniciando o backend do cliente em paralelo com o frontend.

## Estrutura

| Pasta | Conteúdo |
| --- | --- |
| `src/main.ts` | Boot da aplicação: plugins do design system, toast, `$project` e `$http`, auth guard do cliente, router e realtime. |
| `src/project.ts` | Objeto global `$project`: tema ativo, rótulos, viewport (mobile/tablet), estado de backend e de update no Electron. |
| `src/http/` | Cliente HTTP (`$http`). Resolve a URL da API e, com backend, procura a porta que responde `GET /health`. Não grava token em storage. |
| `src/realtime/` | Cliente WebSocket na mesma origem da API (`/ws`). Só liga se o cliente tem backend. |
| `src/devTools/` | Botão de debug e sino de repos atualizados (só em desenvolvimento). |
| `src/directives/` | Diretiva `v-tooltip`. |
| `src/electron/` | Tela de arranque do app desktop. |
| `src/css/` | Estilo global, reset e temas (`style.css`, `style-hodiernus.css`, `style-simplicia.css`). |
| `src/devApp/` | App de documentação (`/docs`): páginas de cada componente, guias e catálogo de prontidão. |
| `configs/` | Leitura e validação do `cht.config` e dos temas. |
| `vite-plugins/` | Plugins Vite: fonte do cliente, tema, favicon, plugin Tailwind do cliente, override de CSS e `repo-updates`. |
| `electron/` | Processo principal do app desktop, gestor do backend, atualizador e configuração do `electron-builder`. |
| `template/client-template/` | Modelo copiado por `npx chtmain create`. |

## Cliente ativo

Um repositório torna-se cliente quando tem `cht.config.ts` (ou `.json`) na raiz e está ao lado do `cht-base`. O campo `name` é o identificador usado em `--client:`. Campos principais: `siteTitle`, `api` (URL por alvo: `dev`, `web`, `electron`, `mobile`), `backend`, `frontend`, `devTools`, `lan` e `theme`. A referência completa está na página `/docs/cht-config` do modo dev.

O cliente fornece, no mínimo: `src/routes.ts`, `src/App.vue`, `src/bootstrap.ts` e `src/theme.config.json`. Opcionalmente `src/override.css` e `src/tailwind.plugin.js`.

## Scripts

```bash
npm run dev            # Vite
npm run build          # vue-tsc + vite build
npm run build:client   # idem, para o cliente em CLIENT
npm run electron:compile
npm run electron
npm run electron:build
```

No dia a dia, use o runner da raiz (`npx chtmain dev --client:<nome>`, `npx chtmain build <nome>`, `npx chtmain electron ...`); ele define `CLIENT`, as portas e o backend.

## Documentação interna

Com `npx chtmain dev`, o Vite extra do `devApp` serve `/docs`: instalação, criação de cliente, `cht.config`, temas, `$http`, `$project`, websocket e uma página por componente do design system, cada uma com o estado de prontidão (`src/devApp/data/componentReadiness.json`).

## Regras

- O `cht-base` não importa código de clientes. Clientes dependem dele, nunca o contrário.
- Mudanças em contratos públicos (`$http`, `$project`, rotas e props documentadas) seguem o [CONTRIBUTING.md](../CONTRIBUTING.md).
