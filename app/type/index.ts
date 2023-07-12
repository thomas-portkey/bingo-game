export interface SideProps {
  uaString?: string;
}

export enum BetType {
  SMALL,
  BIG,
}

export enum ViewMethods {
  GetAllowance = 'GetAllowance',
  GetBalance = 'GetBalance',
  GetBoutInformation = 'GetBoutInformation',
}

export enum SendMethods {
  Approve = 'Approve',
  Bingo = 'Bingo',
  Play = 'Play',
  Register = 'Register',
}