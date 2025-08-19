# Nhost + Hasura + n8n + OpenRouter – Chatbot App (GraphQL-only)

This is a complete assessment-ready template:
- Email auth via **Nhost**
- **chats/messages** schema with **Row Level Security**
- GraphQL-only using **urql** (queries, mutations, subscriptions)
- Hasura **Action** → **n8n** webhook → **OpenRouter** → save bot reply → return to action
- Frontend: **Vite + React + TypeScript**
- Deploy: **Netlify**

## 1) Prerequisites
- Nhost project (gives Hasura + Postgres + Auth)
- n8n instance (self-hosted or cloud)
- OpenRouter API key
- Node 18+

## 2) Database & Permissions
Run SQL in Hasura → Data → SQL:
- `backend/sql/001_schema.sql`
- `backend/sql/002_rls.sql`

### Hasura Permissions (role: `user`)
- **chats**: select/insert/update/delete with row checks `user_id = X-Hasura-User-Id`
- **messages**: select/insert with row checks ensuring parent chat belongs to user

> Tip: In Hasura **Insert Preset** for `chats.user_id`, set `x-hasura-user-id` so clients don't send user_id.

## 3) Hasura Action: `sendMessage`
Create Action in Console:
- Definition: `mutation sendMessage($chat_id: uuid!, $content: String!)`
- Output Type `MessageResponse` (id, chat_id, sender, content, created_at)
- Handler: `https://<your-n8n-host>/webhook/send-message`
- Forward client headers: ON
- Role `user`: allowed

## 4) n8n Workflow
Import `n8n/chatbot-workflow.json` and set env vars in n8n:
- `N8N_HASURA_GRAPHQL_URL`, `N8N_HASURA_ADMIN_SECRET`
- `N8N_OPENROUTER_API_KEY`, `N8N_OPENROUTER_MODEL`

Flow:
1. Validate `chat_id` belongs to caller (compare `x-hasura-user-id` with chat.user_id)
2. Insert user message
3. Call OpenRouter
4. Insert bot message
5. Return bot message payload to Action

## 5) Frontend Setup
```
cd frontend
npm i
# Create .env.local with your values
echo "VITE_NHOST_SUBDOMAIN=your-subdomain
VITE_NHOST_REGION=ap-south-1
VITE_HASURA_GRAPHQL_URL=https://<subdomain>.nhost.run/v1/graphql
VITE_HASURA_GRAPHQL_WS=wss://<subdomain>.nhost.run/v1/graphql
VITE_HASURA_ACTION_SENDMESSAGE=sendMessage" > .env.local

npm run dev
```

## 6) Deploy to Netlify
- Create new site from Git
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `dist`
- Add the same **VITE_*** env vars in Netlify

## 7) Demo Steps
1. Sign up with email/password in the app
2. Create a new chat (left panel)
3. Open the chat and send a message
4. Your message appears instantly (saved via GraphQL). The Action triggers n8n, which calls OpenRouter, saves the bot reply, and you see it live via subscription.

## 8) Submission Format
Name: Your Name  
Contact: 9xxxxxxxxx  
Deployed: https://<your-netlify-site>.netlify.app/

## 9) Quick GitHub Push
```
git init
git add .
git commit -m "feat: nhost/hasura/n8n/openrouter chatbot"
git branch -M main
git remote add origin https://github.com/<you>/chatbot-app.git
git push -u origin main
```


---

## 10) One-command Push (prelinked)
Run ONE command from the project folder:

### macOS/Linux
```bash
bash push.sh
```

### Windows (PowerShell or CMD)
```
push.bat
```

It will push to: **https://github.com/Chandu207-cmd/chatbot-app.git**
