# Token Adapter

Support `ICRC1` `ICRC2` `EXT` `DIP20`

**Note** Approve method is not implemented for `EXT` and `DIP20`

### Usage

```ts
import { Token } from "@alpaca-icp/token-adapter";
import { HttpAgent } from "@dfinity/agent";

const agent = new HttpAgent({ host: "https://ic0.app" });

const token = new Token({
  canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai",
  agent,
  tokenStandard: "ICP",
});

await token.balanceOf("wallet");
await token.getLogo();

// dip 20 token
const Dip20_token = new Token({
  canisterId: "whdfs-saaaa-aaaao-awh4a-cai",
  agent,
  tokenStandard: "DIP20",
});
await Dip20_token.balanceOf("wallet");
await Dip20_token.getLogo();
```

### Token Standard

- EXT
- DIP20
- ICRC1
- ICRC2 // combination of ICRC1 and ICRC2
- ICP // icpswap standard for icp

### Token interface

```typescript
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
};

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
};

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
```
