import { Dispatch, SetStateAction } from 'react'
// キャラクターの型定義
export type CharacterType = {
    value: string
    label: string
    word: string
  }


// キャラクター選択の型定義
export type CharacterSelectProps = {
  setCharacter: Dispatch<SetStateAction<CharacterType>>
  playAudio: (text: string, speaker: string) => Promise<void>
}

export type MessageType = {
  text: string
  type: string
}

export type RoleType = 'system' | 'user' | 'assistant'

// ChatGPTのメッセージの型定義
export type newMessageType = {
  role: RoleType
  content: string
}