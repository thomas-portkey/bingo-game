export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Long: number;
};

export type TransactionFee = {
  __typename?: 'TransactionFee';
  amount: Scalars['Long'];
  symbol?: Maybe<Scalars['String']>;
};

export type StaticsDto = {
  __typename?: 'StaticsDto';
  amount: Scalars['Long'];
  award: Scalars['Long'];
  playerAddress: Scalars['String'];
  totalPlays: Scalars['Int'];
  totalWins: Scalars['Int'];
};

export type GetBingoDto = {
  caAddresses?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  maxResultCount: Scalars['Int'];
  playId?: InputMaybe<Scalars['String']>;
  skipCount: Scalars['Int'];
};

export type CaHolderBingoInfoDto = {
  __typename?: 'CAHolderBingoInfoDto';
  amount: Scalars['Long'];
  award: Scalars['Long'];
  bingoBlockHeight: Scalars['Long'];
  bingoId: Scalars['String'];
  bingoTime: Scalars['Long'];
  bingoType: Scalars['Int'];
  bingoTransactionFee?: Maybe<TransactionFee>;
  dices: Array<Maybe<Scalars['String']>>;
  isComplete: Scalars['Boolean'];
  playBlockHeight: Scalars['Long'];
  playId: Scalars['String'];
  playTime: Scalars['Long'];
  playBlockHash: Scalars['String'];
  bingoBlockHash: Scalars['String'];
  playTransactionFee?: Maybe<TransactionFee>;
  playerAddress: Scalars['String'];
};

export type BingoResultDto = {
  __typename?: 'BingoResultDto';
  data?: Maybe<Array<Maybe<CaHolderBingoInfoDto>>>;
  statics?: Maybe<Array<Maybe<StaticsDto>>>;
  totalRecordCount: Scalars['Long'];
};

export type Query = {
  __typename?: 'Query';
  caHolderBingoInfo?: Maybe<BingoResultDto>;
};

export type QueryCaHolderBingoInfoArgs = {
  dto?: InputMaybe<GetBingoDto>;
};
