export type UUID = string
export type Timestamptz = string

export interface Message {
  id: UUID
  chat_id: UUID
  sender: 'user' | 'bot'
  content: string
  created_at: Timestamptz
}

export interface Chat {
  id: UUID
  user_id: UUID
  title: string
  created_at: Timestamptz
  messages?: Message[]
}
