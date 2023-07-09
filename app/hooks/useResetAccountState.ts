import { CHAIN_ID, MAIN_CHAIN_ID } from '@/constants/network';
import { useAppContext } from './useAppContext';
import { useBalance } from './useBalance';
import { EGameState } from './useAppContext/type';
import { useAccountOwner } from './useAccountOwner';

export const useResetAccountState = () => {
  const { setIsRegistered, setGameState } = useAppContext();
  const { mutate: mutateBalance } = useBalance(CHAIN_ID);
  const { mutate: mutateMainBalance } = useBalance(MAIN_CHAIN_ID);
  const { mutate: getAccountOwner } = useAccountOwner(CHAIN_ID);

  return {
    resetAccountState: async () => {
      await getAccountOwner(undefined, { revalidate: false });
      await mutateBalance(undefined, { revalidate: false });
      await mutateMainBalance(undefined, { revalidate: false });
      setIsRegistered(false);
      setGameState(EGameState.Playing);
    },
  };
};
