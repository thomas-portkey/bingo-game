import useSWRMutation from 'swr/mutation';
import { bingoAddress } from '@/constants/network';
import { useApprove } from './useApprove';
import { useContract } from './useContract';
import { SendMethods } from '@/type';
import { useAppContext } from './useAppContext';

export const useRegister = () => {
  const { trigger: approve } = useApprove();
  const { callSendMethod } = useContract();
  const { isRegistered, setIsRegistered } = useAppContext();

  return useSWRMutation('register', async () => {
    if (isRegistered) return true;

    const registerResult = await callSendMethod<any, { error: { message: string } }>({
      methodName: SendMethods.Register,
      contractAddress: bingoAddress,
      args: {},
    });
    if (!registerResult.error || registerResult.error.message?.includes('already registered')) {
      await approve();
      setIsRegistered(true);

      return true;
    } else {
      throw registerResult.error;
    }
  });
};
