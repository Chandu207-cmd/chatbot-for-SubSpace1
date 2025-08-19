#!/usr/bin/env bash
set -euo pipefail

# initialize and push in one go
git init
git add .
git commit -m "Initial commit - Chatbot app with Nhost, Hasura, n8n, OpenRouter"
git branch -M main
git remote add origin https://github.com/Chandu207-cmd/chatbot-app.git
git push -u origin main

echo "✅ Pushed to: https://github.com/Chandu207-cmd/chatbot-app.git"
