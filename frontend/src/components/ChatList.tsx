import React from 'react'
import { useMutation, useSubscription, Provider } from 'urql'
import { nhost } from '../lib/nhost'
import { urqlClient } from '../lib/urql'
import { SUBSCRIBE_CHATS, CREATE_CHAT_WITH_PRESET, DELETE_CHAT } from '../graphql/queries'

export default function ChatList({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <Provider value={urqlClient()}>
      <ChatListInner onOpen={onOpen} />
    </Provider>
  )
}

function ChatListInner({ onOpen }: { onOpen: (id: string) => void }) {
  const [{ data }] = useSubscription({ query: SUBSCRIBE_CHATS })
  const [, createChat] = useMutation(CREATE_CHAT_WITH_PRESET)
  const [, deleteChat] = useMutation(DELETE_CHAT)

  const onCreate = async () => {
    await createChat({ title: 'New Chat' })
  }

  return (
    <div style={{ padding: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>My Chats</h2>
        <button onClick={onCreate}>+ New</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data?.chats?.map((c: any) => (
          <li key={c.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 4px', borderBottom: '1px solid #eee' }}>
            <button onClick={() => onOpen(c.id)} style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}>{c.title}</button>
            <button onClick={() => deleteChat({ id: c.id })} style={{ color: 'crimson' }}>×</button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 16 }}>
        <button onClick={() => nhost.auth.signOut()}>Sign Out</button>
      </div>
    </div>
  )
}
