import { Principal } from "@dfinity/principal";
import { IToken } from "./types/IToken";
import { DIP20Actor } from "./types/TokenStandardActor";
import { Metadata } from "./icp/dip20";
import { HttpAgent } from "@dfinity/agent";
import { DIP20 } from "./icp";

export class Dip20Token implements IToken {
  public readonly actor: DIP20Actor;
  public readonly decimals: number = 1e8;

  constructor({ canisterId, agent }: { canisterId: string; agent: HttpAgent }) {
    this.actor = DIP20.createActor({
      agent,
      canisterId,
    });
  }

  approve(input: {
    fee: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    from_subaccount: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
    amount: bigint;
    expected_allowance: [] | [bigint];
    expires_at: [] | [bigint];
    spender: { owner: Principal; subaccount: [] | [Uint8Array | number[]] };
  }): Promise<bigint> {
    throw new Error("Method not implemented.");
  }

  transfer(input: {
    to: { owner: Principal; subaccount: [] | [Uint8Array | number[]] };
    amount: bigint;
    fee: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    from_subaccount: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
  }): Promise<bigint> {
    throw new Error("Method not implemented.");
  }

  async getDecimals(): Promise<number> {
    return this.actor.decimals();
  }
  async balanceOf(address: string): Promise<number> {
    const balance = await this.actor.balanceOf(Principal.fromText(address));
    return Number(balance) / this.decimals;
  }
  async name(): Promise<string> {
    return await this.actor.name();
  }
  async symbol(): Promise<string> {
    return await this.actor.symbol();
  }
  async totalSupply(): Promise<number> {
    const totalSupplyBigInt = await this.actor.totalSupply();
    return Number(totalSupplyBigInt) / this.decimals;
  }
  async getFee(): Promise<bigint> {
    return await this.actor.getTokenFee();
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
  async getMetadata(): Promise<Metadata> {
    return await this.actor.getMetadata();
  }

  async getLogo(): Promise<string> {
    const logo = await this.actor.logo();
    return logo;
  }
}
