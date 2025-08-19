import React from 'react'
import { Provider, useMutation, useSubscription } from 'urql'
import { urqlClient } from '../lib/urql'
import { SUBSCRIBE_MESSAGES, SEND_MESSAGE_ACTION } from '../graphql/queries'
import MessageInput from './MessageInput'

export default function ChatWindow({ chatId }: { chatId: string }) {
  return (
    <Provider value={urqlClient()}>
      <ChatWindowInner chatId={chatId} />
    </Provider>
  )
}

function ChatWindowInner({ chatId }: { chatId: string }) {
  const [{ data }] = useSubscription({ query: SUBSCRIBE_MESSAGES, variables: { chat_id: chatId } })
  const [, sendMessage] = useMutation(SEND_MESSAGE_ACTION)

  const onSend = async (content: string) => {
    if (!content.trim()) return
    await sendMessage({ chat_id: chatId, content })
  }

  return (
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: '1fr auto' }}>
      <div style={{ padding: 16, overflowY: 'auto' }}>
        {(data?.messages || []).map((m: any) => (
          <div key={m.id} style={{ marginBottom: 8, display: 'flex', justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: 560, padding: '8px 12px', borderRadius: 10, background: m.sender === 'user' ? '#2563eb' : '#e5e7eb', color: m.sender === 'user' ? 'white' : 'black' }}>
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid #e5e7eb' }}>
        <MessageInput onSend={onSend} />
      </div>
    </div>
  )
}
