import useSWRMutation from 'swr/mutation';
import { ChainId } from '@portkey/types';
import { CHAIN_ID, bingoAddress } from '@/constants/network';
import { useContract } from './useContract';
import { SendMethods, ViewMethods } from '@/type';
import { TOKEN_UNIT } from '@/constants/global';

export const useApprove = (chainId: ChainId = CHAIN_ID) => {
  const { callViewMethod, callSendMethod, multiTokenContractAddress, owner } = useContract(chainId);

  return useSWRMutation(
    multiTokenContractAddress && owner ? [multiTokenContractAddress, owner, 'approve'] : undefined,
    async () => {
      const { allowance }: { allowance: number } = await callViewMethod({
        methodName: ViewMethods.GetAllowance,
        contractAddress: multiTokenContractAddress,
        args: {
          symbol: TOKEN_UNIT,
          owner: owner,
          spender: bingoAddress,
        },
      });

      if (allowance < 100) {
        await callSendMethod(
          {
            methodName: SendMethods.Approve,
            contractAddress: multiTokenContractAddress,
            args: {
              symbol: TOKEN_UNIT,
              spender: bingoAddress,
              amount: '100000000000000000000',
            },
          },
          undefined,
        );

        return true;
      }
    },
  );
};
