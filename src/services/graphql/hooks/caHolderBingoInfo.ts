import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CaHolderBingoInfoQueryVariables = Types.Exact<{
  dto?: Types.InputMaybe<Types.GetBingoDto>;
}>;

export type CaHolderBingoInfoQuery = {
  __typename?: 'Query';
  caHolderBingoInfo?: {
    __typename?: 'BingoResultDto';
    totalRecordCount: number;
    data?: Array<{
      __typename?: 'CAHolderBingoInfoDto';
      award: number;
      amount: number;
      isComplete: boolean;
      playId: string;
      bingoId: string;
      dices: Array<string | null>;
      playerAddress: string;
      playTime: number;
      bingoTime: number;
      bingoType: number;
      playBlockHeight: number;
      bingoBlockHeight: number;
      playBlockHash: string;
      bingoBlockHash: string;
      playTransactionFee?: { __typename?: 'TransactionFee'; symbol?: string | null; amount: number } | null;
      bingoTransactionFee?: { __typename?: 'TransactionFee'; symbol?: string | null; amount: number } | null;
    } | null> | null;
    statics?: Array<{
      __typename?: 'StaticsDto';
      totalWins: number;
      totalPlays: number;
      award: number;
      amount: number;
      playerAddress: string;
    } | null> | null;
  } | null;
};

export const CaHolderBingoInfoDocument = gql`
  query caHolderBingoInfo($dto: GetBingoDto) {
    caHolderBingoInfo(dto: $dto) {
      totalRecordCount
      data {
        award
        amount
        isComplete
        playId
        bingoId
        dices
        playerAddress
        playTime
        bingoTime
        bingoType
        playBlockHeight
        bingoBlockHeight
        playBlockHash
        bingoBlockHash
        playTransactionFee {
          symbol
          amount
        }
        bingoTransactionFee {
          symbol
          amount
        }
      }
      statics {
        totalWins
        totalPlays
        award
        amount
        playerAddress
      }
    }
  }
`;

/**
 * __useCaHolderBingoInfoQuery__
 *
 * To run a query within a React component, call `useCaHolderBingoInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useCaHolderBingoInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCaHolderBingoInfoQuery({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useCaHolderBingoInfoQuery(
  baseOptions?: Apollo.QueryHookOptions<CaHolderBingoInfoQuery, CaHolderBingoInfoQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CaHolderBingoInfoQuery, CaHolderBingoInfoQueryVariables>(CaHolderBingoInfoDocument, options);
}
export function useCaHolderBingoInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CaHolderBingoInfoQuery, CaHolderBingoInfoQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CaHolderBingoInfoQuery, CaHolderBingoInfoQueryVariables>(
    CaHolderBingoInfoDocument,
    options,
  );
}
export type CaHolderBingoInfoQueryHookResult = ReturnType<typeof useCaHolderBingoInfoQuery>;
export type CaHolderBingoInfoLazyQueryHookResult = ReturnType<typeof useCaHolderBingoInfoLazyQuery>;
export type CaHolderBingoInfoQueryResult = Apollo.QueryResult<CaHolderBingoInfoQuery, CaHolderBingoInfoQueryVariables>;
