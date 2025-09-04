
# FacilitaMed — Wire-up do Dashboard (React Router)

Este pacote corrige o ponto de entrada do app para renderizar o `App` com as rotas do dashboard.

## O que contém
- `src/main.tsx`: cria a raiz React e renderiza `<App />`.
- `src/firebase.ts`: inicializa o Firebase (usa variáveis VITE_*).
- `index.html`: garante o `<div id="root">` e carrega `main.tsx`.
- `vercel.json`: força SPA rewrites na Vercel, permitindo navegação de rotas (`/app`, etc.).

## Como aplicar
1. **Faça backup** dos seus arquivos atuais (especialmente `src/main.tsx` e `index.html`).
2. Copie o conteúdo deste zip para a raiz do seu `frontend/`.
3. Garanta as variáveis no Vercel (ou .env.local):
   ```env
   VITE_API_BASE=https://facilitamed-backend-3.onrender.com
   VITE_FIREBASE_API_KEY=...           # já usados
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_APP_ID=...
   ```
4. Dependências necessárias:
   ```bash
   npm i react-router-dom firebase
   ```
5. Commit & push. A Vercel vai redeployar. Acesse `/` (login) e depois `/app` (dashboard).

## Dica de troubleshooting
- Se continuar vendo a página antiga, é porque o bundle ainda renderiza outro entry point.
  Verifique se o **seu** `main.tsx` está igual a este e se o Vite está apontando para ele.
- Confira no DevTools console erros de import. Quaisquer erros me manda que ajusto.
