import { Principal } from "@dfinity/principal";
import { TokenActor } from "./TokenStandardActor";

export type ApproveInput = {
  fee: [] | [bigint];
  memo: [] | [Uint8Array | number[]];
  from_subaccount: [] | [Uint8Array | number[]];
  created_at_time: [] | [bigint];
  amount: bigint;
  expected_allowance: [] | [bigint];
  expires_at: [] | [bigint];
  spender: {
    owner: Principal;
    subaccount: [] | [Uint8Array | number[]];
  };
}

export type TransferInput = {
  to: {
    owner: Principal;
    subaccount: [] | [Uint8Array | number[]];
  };
  amount: bigint;
  fee: [bigint] | [];
  memo: [Uint8Array | number[]] | [];
  from_subaccount: [] | [Uint8Array | number[]];
  created_at_time: [bigint] | [];
}


export interface IToken {
  actor: TokenActor;
  getDecimals(): Promise<number>;
  balanceOf(
    address:
      | string
      | {
        owner: Principal;
        subaccount: [] | [Uint8Array | number[]];
      }
  ): Promise<number>;
  name(): Promise<string>;
  symbol(): Promise<string>;
  totalSupply(): Promise<number>;
  getFee(): Promise<bigint>;
  getMetadata(): Promise<any>;
  getLogo(): Promise<string>;
  /**
   * 
   *  @description This method only work with EXT, ICRC2+ and DIP20 tokens
   */
  approve(input: ApproveInput): Promise<bigint>;

  getFee(): Promise<bigint>;
  transfer(input: TransferInput): Promise<bigint>;
}
