import { atom } from 'recoil';

// ユーザー情報の型定義
type User = {
  id: number;
  name: string;
  email: string;
  avatar_url?: string;
  line_sub?: string; 
  provider?: string; 
};

// AuthStateの型定義
type AuthState = {
  isAuthenticated: boolean;
  user: User | null; // user は null か User オブジェクト
};

// authStateの定義
export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isAuthenticated: false,
    user: null, // ログインしていない場合は null
  },
});
