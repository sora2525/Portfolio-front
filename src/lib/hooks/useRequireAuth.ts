'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { authState } from '@/lib/atom/authAtom';

export const useRequireAuth = () => {
  const auth = useRecoilValue(authState);
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push('/sign_in'); // 未ログインならログイン画面へ遷移
    }
  }, [auth.isAuthenticated, router]);

  return auth;
};
