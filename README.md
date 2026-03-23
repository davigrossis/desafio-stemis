# desafio-stemis

Editor visual de funil de vendas com nodes conectáveis, CRUD de etapas e persistência local.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- React Flow (`@xyflow/react`)
- Shadcn/ui + Tailwind CSS

## Execução local

```bash
cd funnel-builder
npm install
npm run dev
```

App local: `http://localhost:3000`

## Scripts

- `npm run dev` - desenvolvimento
- `npm run build` - build de produção
- `npm run start` - servidor de produção
- `npm run lint` - lint com ESLint

## Rotas

- `/` - tela principal do construtor de funil
- `/favicon.ico` - asset padrão

Observação: não existem rotas de API (`route.ts`) neste projeto.

## Arquivos principais (objetivo)

- `funnel-builder/app/page.tsx` - orquestra estado global (`nodes`/`edges`), CRUD de node e persistência.
- `funnel-builder/app/layout.tsx` - layout raiz, metadata e fontes globais.
- `funnel-builder/app/globals.css` - tokens visuais e cores por categoria de node.
- `funnel-builder/components/header/header.tsx` - cabeçalho e gatilho para criar novo node.
- `funnel-builder/components/funnel/funnel-builder.tsx` - container do canvas e passagem de props.
- `funnel-builder/components/funnel/interactivity.tsx` - configuração do React Flow, `nodeTypes`, conexões e estado inicial.
- `funnel-builder/components/funnel/nodes/funnel-custom-node.tsx` - render do node customizado (badge, métricas e ações editar/excluir).
- `funnel-builder/components/modals/create-node-dialog.tsx` - modal de criação/edição de node.
- `funnel-builder/components/modals/delete-node-dialog.tsx` - modal de confirmação de exclusão.
- `funnel-builder/components/modals/node-form-fields.tsx` - campos reutilizáveis do formulário de node.
- `funnel-builder/lib/funnel-node.ts` - tipos de domínio, categorias, cores e geração de métricas simuladas.
- `funnel-builder/lib/funnel-node-content.ts` - regras de título/descrição
- `funnel-builder/lib/funnel-graph.ts` - regras de criação, atualização e remoção de nodes/handles.
- `funnel-builder/lib/funnel-node-guards.ts` - validações defensivas de node/métricas no carregamento.
- `funnel-builder/lib/funnel-storage.ts` - leitura e escrita no `localStorage`.

## Fluxo funcional

1. Usuário cria node pelo header.
2. Node é adicionado ao grafo com posição incremental e métricas simuladas.
3. Usuário conecta nodes no canvas (React Flow).
4. Edição/exclusão é acionada no menu de ações do node.
5. Estado é salvo automaticamente no `localStorage` e hidratado no reload.

## Persistência

- Chaves: `funnel-builder:nodes` e `funnel-builder:edges`.
