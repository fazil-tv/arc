"use client";
import { useEffect } from 'react';  
import { useRouter } from 'next/navigation';  
import { useSelector } from 'react-redux';  
import { RootState } from '@/redux/store';  

const useAuth = () => {  

  const router = useRouter();  
  const { Token } = useSelector((state: RootState) => state.user);

  useEffect(() => {  
    if (!Token) {  
      router.push('/admin/login');  
    }  
  }, [Token, router]);  

};

export default useAuth;
