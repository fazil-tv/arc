// components/GoogleSignInButton.tsx
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { useGoogleSignInMutation } from '@/redux/user/userApi';
import { error } from 'console';

const GoogleSignInButton: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const router = useRouter();

  const [googleRegister, { isLoading: isgoogleRegister }] = useGoogleSignInMutation();

  const handleGoogleSubmit = useGoogleLogin({


    onSuccess: async (codeResponse) => {

      console.log(codeResponse, "coderesponce");

      try {
        const res = await googleRegister(codeResponse).unwrap();

        if (res.success) {
          onClose();
          router.push('/');
        }

      } catch (err) {
        console.log(err);
      }
    },
    onError: (error) => {
      console.log("Login Failed:", error);
    },
  });

  const handleClick = () => {
    handleGoogleSubmit()
  };


  return (
    <button onClick={handleClick}>Sign in with Google</button>
  );
};

export default GoogleSignInButton;
