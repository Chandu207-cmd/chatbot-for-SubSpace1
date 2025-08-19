import React from 'react'

export default function MessageInput({ onSend }: { onSend: (content: string) => void }) {
  const [text, setText] = React.useState('')
  const submit = () => {
    if (!text.trim()) return
    onSend(text)
    setText('')
  }
  return (
    <div style={{ display: 'flex', gap: 8, padding: 8 }}>
      <input
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        style={{ flex: 1, padding: 10 }}
      />
      <button onClick={submit}>Send</button>
    </div>
  )
}
