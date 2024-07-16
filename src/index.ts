import { HttpAgent } from "@dfinity/agent";
import { IToken } from "./types/IToken";
import { Dip20Token } from "./dip20";
import { ICRC1Token } from "./icrc1";
import { ExtToken } from "./ext";
import { DIP20 } from "./icp";
import { Principal } from "@dfinity/principal";

export type TokenStandard = "DIP20" | "ICRC1" | "EXT" | "ICRC2" | "ICP";
export class Token {
    private token: IToken;

    constructor(
        {
            canisterId,
            agent,
            tokenStandard
        }: {
            canisterId: string;
            agent: HttpAgent;
            tokenStandard: TokenStandard;
        }
    ) {
        switch (tokenStandard) {
            case "DIP20":
                this.token = new Dip20Token({
                    canisterId,
                    agent,
                });
                break;
            case "EXT":
                this.token = new ExtToken({
                    canisterId,
                    agent,
                });
                break;
            case "ICRC1":
            case "ICRC2":
            case "ICP":
                this.token = new ICRC1Token({
                    agent,
                    canisterId,
                });
                break;
            default:
                throw new Error("Invalid token standard");
        }
    }

    public async getDecimals(): Promise<number> {
        return this.token.getDecimals();
    }

    public async balanceOf(address: string | { owner: Principal; subaccount: [] | [Uint8Array | number[]]; }): Promise<number> {
        return this.token.balanceOf(address);
    }

    public async name(): Promise<string> {
        return this.token.name();
    }

    public async symbol(): Promise<string> {
        return this.token.symbol();
    }

    public async totalSupply(): Promise<number> {
        return this.token.totalSupply();
    }

    public async getFee(): Promise<bigint> {
        return this.token.getFee();
    }

    public async getMetadata(): Promise<any> {
        return this.token.getMetadata();
    }

    public async getLogo(): Promise<string> {
        return this.token.getLogo();
    }

    public async approve(input: {
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
    }): Promise<bigint> {
        return this.token.approve(input);
    }

    public async transfer(input: {
        to: {
            owner: Principal;
            subaccount: [] | [Uint8Array | number[]];
        };
        amount: bigint;
        fee: [bigint] | [];
        memo: [Uint8Array | number[]] | [];
        from_subaccount: [] | [Uint8Array | number[]];
        created_at_time: [bigint] | [];
    }): Promise<bigint> {
        return this.token.transfer(input);
    }


}