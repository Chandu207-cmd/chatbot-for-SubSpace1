import { useAuthenticationStatus } from '@nhost/react'
import Auth from './components/Auth'
import ChatList from './components/ChatList'
import ChatWindow from './components/ChatWindow'
import React from 'react'

export default function App() {
  const { isAuthenticated } = useAuthenticationStatus()
  const [activeChatId, setActiveChatId] = React.useState<string | null>(null)

  if (!isAuthenticated) return <Auth />

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', height: '100vh' }}>
      <ChatList onOpen={(id) => setActiveChatId(id)} />
      <div style={{ borderLeft: '1px solid #e5e7eb' }}>
        {activeChatId ? (
          <ChatWindow chatId={activeChatId} />
        ) : (
          <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
            <p>Select or create a chat</p>
          </div>
        )}
      </div>
    </div>
  )
}
