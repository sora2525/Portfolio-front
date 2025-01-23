'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { authState } from '@/lib/atom/authAtom';
import { useAuth } from '@/lib/hooks/useAuth'; 

export const useRequireAuth = () => {
  const auth = useRecoilValue(authState);
  const { checkAuthStatus } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuthStatus();
      setChecked(true); 
    };

    if (!auth.isAuthenticated && !checked) {
      verifyAuth();
    } else {
      if (auth.isAuthenticated && !checked) {
        setChecked(true);
      }
    }
  }, [auth.isAuthenticated, checkAuthStatus, checked]);

  useEffect(() => {
    if (checked && !auth.isAuthenticated) {
      router.push("/sign_in?redirected=true");
    }
  }, [checked, auth.isAuthenticated, router]);

  return auth;
};
