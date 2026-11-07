# Versionamento

Cada repositório do workspace tem um arquivo `version` na raiz, em texto simples. A primeira linha é a versão do próprio repositório.

```text
version 1.0.8
versionCheckUrl https://github.com/<org>/<repo>/blob/main/version
```

`versionCheckUrl` é opcional. É o endereço que o app consulta para avisar que existe uma versão nova.

## O arquivo version do cliente

O `version` do cliente fica na pasta do cliente, ao lado do `cht.config`. Além da versão do cliente, ele registra a versão de cada repositório do núcleo com que o cliente foi buildado:

```text
version 1.0.8
versionCheckUrl https://github.com/<org>/cht-client-<name>/blob/main/version
cht-shared 1.2.0
cht-base 1.2.1
cht-design-system 1.2.1
```

Cada linha `cht-*` é um pin. É a mesma convenção do `version` do `cht-main`.

## O que o build faz

`npx chtmain build <name>`, depois de exportar o artefato, faz o seguinte:

1. Cria o `version` na pasta do cliente se ele não existir, começando em `version 1.0.0`.
2. Lê a versão local de `cht-shared`, `cht-base` e `cht-design-system`, ou seja, o `version` de cada pasta no workspace.
3. Grava essas versões como pins. Um pin que já existe é atualizado na própria linha, e um que falta é adicionado ao final. O mesmo repositório nunca aparece duas vezes.

As outras linhas do arquivo, como `version` e `versionCheckUrl`, não mudam. Se o build falhar, o arquivo não é tocado. `npx chtmain build dev` também não toca em nada, porque não há cliente.

Um cliente com `version.json` em vez de `version` não é alterado. O build só mostra um aviso.

Para buildar sem criar nem atualizar o arquivo, use `--skip-version-bump`:

```bash
npx chtmain build <name> --skip-version-bump
```

## Versões no modo dev

Com `npx chtmain dev --client:<name>`, o canto inferior direito mostra uma linha com a versão de cada repositório do núcleo:

```text
cht-shared 1.2.0 - cht-base 1.2.1 (local: 1.2.2) - cht-design-system 1.2.1
```

- O número depois do nome é o pin do `version` do cliente, ou seja, a versão do último build.
- `(local: ...)` aparece quando o repositório do workspace está numa versão diferente. No exemplo, o cliente foi buildado com `cht-base` 1.2.1, mas o `cht-base` local já está em 1.2.2.
- `sem version` aparece quando o arquivo ainda não tem o pin, por exemplo num cliente que nunca foi buildado.

A linha é lida quando o servidor de dev sobe. Depois de um build, reinicie o `dev` para ver os pins novos. Ela só aparece quando o botão de debug está ligado (veja [Modo dev](/docs/dev-mode)). Clicar nela abre esta página.

## Lançar uma versão do cliente

1. Rode `npx chtmain build <name> --bump`. O `--bump` sobe a versão do cliente antes do build (`1.0.8` vira `1.0.9`), sem precisar dizer qual repositório. Sem a flag, a versão do cliente não muda.
2. O mesmo build grava os pins do núcleo, então eles refletem as versões usadas nele.
3. Commite o `version` junto com o resto da release no repositório do cliente.

`--bump` só muda a linha `version`. Os pins só mudam no build. `electron build` aceita o mesmo `--bump`.
