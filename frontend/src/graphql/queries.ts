import { gql } from 'urql'

export const SUBSCRIBE_CHATS = gql`
  subscription MyChats {
    chats(order_by: { created_at: desc }) {
      id
      title
      created_at
    }
  }
`

export const SUBSCRIBE_MESSAGES = gql`
  subscription ChatMessages($chat_id: uuid!) {
    messages(where: { chat_id: { _eq: $chat_id } }, order_by: { created_at: asc }) {
      id
      chat_id
      sender
      content
      created_at
    }
  }
`

// Requires Hasura Insert Preset for chats.user_id = x-hasura-user-id
export const CREATE_CHAT_WITH_PRESET = gql`
  mutation CreateChat($title: String!) {
    insert_chats_one(object: { title: $title }) { id }
  }
`

export const DELETE_CHAT = gql`
  mutation DeleteChat($id: uuid!) { delete_chats_by_pk(id: $id) { id } }
`

export const SEND_MESSAGE_ACTION = gql`
  mutation SendMessage($chat_id: uuid!, $content: String!) {
    sendMessage(chat_id: $chat_id, content: $content) {
      id
      chat_id
      sender
      content
      created_at
    }
  }
`
