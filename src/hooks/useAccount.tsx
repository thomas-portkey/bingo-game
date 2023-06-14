import { SignInInterface } from '@portkey/did-ui-react';
import { useState, useRef } from 'react';

const useAccount = () => {
  const [showUnlock, setShowUnlock] = useState<boolean>(false);
  const signInRef = useRef<SignInInterface | null>(null);

  const setSignRef = (ref: SignInInterface) => {
    signInRef.current = ref;
  };
  const setShowLogin = (show: boolean) => {
    signInRef.current?.setOpen(show);
  };
  return { showUnlock, setShowUnlock, setSignRef, setShowLogin };
};

export default useAccount;
