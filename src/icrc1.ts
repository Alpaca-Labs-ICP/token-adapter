import { Principal } from "@dfinity/principal";
import { IToken } from "./types/IToken";
import { ICRC1Actor } from "./types/TokenStandardActor";
import { MetadataValue } from "./icp/icrc1";
import { HttpAgent } from "@dfinity/agent";
import { ICRC1 } from "./icp";
import { safeParseJSON } from "./utils/safeParseJSON";

export class ICRC1Token implements IToken {
  public readonly actor: ICRC1Actor;
  public readonly decimals: number = 1e8;

  constructor({ canisterId, agent }: { canisterId: string; agent: HttpAgent }) {
    this.actor = ICRC1.createActor({
      agent,
      canisterId,
    });
  }
  async approve(input: {
    fee: [bigint] | [];
    memo: [] | [Uint8Array | number[]];
    from_subaccount: [] | [Uint8Array | number[]];
    created_at_time: [bigint] | [];
    amount: bigint;
    expected_allowance: [bigint] | [];
    expires_at: [bigint] | [];
    spender: { owner: Principal; subaccount: [] | [Uint8Array | number[]] };
  }): Promise<bigint> {
    const result = await this.actor.icrc2_approve({
      fee: input.fee,
      memo: input.memo,
      from_subaccount: input.from_subaccount,
      created_at_time: input.created_at_time,
      amount: input.amount,
      expected_allowance: input.expected_allowance,
      expires_at: input.expires_at,
      spender: input.spender,
    });

    if ("Ok" in result) {
      return result.Ok;
    } else if ("Err" in result) {
      throw new Error(safeParseJSON(result.Err));
    }

    throw new Error("unknown error");
  }

  async transfer(input: {
    to: {
      owner: Principal;
      subaccount: [Uint8Array | number[]] | [];
    };
    amount: bigint;
    fee: [bigint] | [];
    memo: [Uint8Array | number[]] | [];
    from_subaccount: [Uint8Array | number[]] | [];
    created_at_time: [bigint] | [];
  }): Promise<bigint> {
    const result = await this.actor.icrc1_transfer({
      to: input.to,
      amount: input.amount,
      fee: input.fee,
      memo: input.memo,
      from_subaccount: input.from_subaccount,
      created_at_time: input.created_at_time,
    });

    if ("Ok" in result) {
      return result.Ok;
    } else if ("Err" in result) {
      throw new Error(safeParseJSON(result.Err));
    }
    throw new Error("");
  }

  async getDecimals(): Promise<number> {
    return await this.actor.icrc1_decimals();
  }
  async balanceOf(
    address:
      | string
      | {
          owner: Principal;
          subaccount: [Uint8Array | number[]] | [];
        }
  ): Promise<number> {
    let balance;
    if (typeof address === "string") {
      balance = await this.actor.icrc1_balance_of({
        owner: Principal.fromText(address),
        subaccount: [],
      });
    } else {
      balance = await this.actor.icrc1_balance_of({
        owner: address.owner,
        subaccount: address.subaccount,
      });
    }
    return Number(balance) / this.decimals;
  }
  async name(): Promise<string> {
    return await this.actor.icrc1_name();
  }
  async symbol(): Promise<string> {
    return await this.actor.icrc1_symbol();
  }
  async totalSupply(): Promise<number> {
    const totalSupplyBigInt = await this.actor.icrc1_total_supply();
    return Number(totalSupplyBigInt) / this.decimals;
  }
  async getFee(): Promise<bigint> {
    return await this.actor.icrc1_fee();
  }
  async getBurnedAmountInDeadWallet(): Promise<number> {
    const burnedAmount = await this.balanceOf("aaaaa-aa");
    return Number(burnedAmount);
  }
  async getBurnedAmmount(): Promise<number> {
    const burnedDeadWallet = await this.getBurnedAmountInDeadWallet();
    return burnedDeadWallet;
  }
  async holdPercentage(address: string): Promise<number> {
    const totalSupply = await this.totalSupply();
    const balance = await this.balanceOf(address);
    return balance / totalSupply;
  }

  async getMetadata(): Promise<Array<[string, MetadataValue]>> {
    return await this.actor.icrc1_metadata();
  }

  async getLogo(): Promise<string> {
    const metadata = await this.getMetadata();
    for (const meta of metadata) {
      if (meta[0] === "icrc1:logo" && "Text" in meta[1] && meta[1].Text) {
        return meta[1].Text;
      }
    }
    return "";
  }
}
