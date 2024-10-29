// ロールの型定義
export type RoleType = 'system' | 'user' | 'assistant'

// ChatGPTのメッセージの型定義
export type newMessageType = {
  role: RoleType
  content: string
}

export type MessageType = {
    text: string
    type: string
  }
  