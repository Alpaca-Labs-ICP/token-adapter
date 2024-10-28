"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICRC1Token = void 0;
const principal_1 = require("@dfinity/principal");
const icp_1 = require("./icp");
const safeParseJSON_1 = require("./utils/safeParseJSON");
class ICRC1Token {
    actor;
    decimals = 1e8;
    constructor({ canisterId, agent }) {
        this.actor = icp_1.ICRC1.createActor({
            agent,
            canisterId,
        });
    }
    async supportedStandards() {
        const standards = await this.actor.icrc1_supported_standards();
        return standards.map((standard) => standard.name);
    }
    async approve(input) {
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
        }
        else if ("Err" in result) {
            throw new Error((0, safeParseJSON_1.safeParseJSON)(result.Err));
        }
        throw new Error("unknown error");
    }
    async transfer(input) {
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
        }
        else if ("Err" in result) {
            throw new Error((0, safeParseJSON_1.safeParseJSON)(result.Err));
        }
        throw new Error("");
    }
    async getDecimals() {
        return await this.actor.icrc1_decimals();
    }
    async balanceOf(address) {
        let balance;
        if (typeof address === "string") {
            balance = await this.actor.icrc1_balance_of({
                owner: principal_1.Principal.fromText(address),
                subaccount: [],
            });
        }
        else {
            balance = await this.actor.icrc1_balance_of({
                owner: address.owner,
                subaccount: address.subaccount,
            });
        }
        return Number(balance) / this.decimals;
    }
    async name() {
        return await this.actor.icrc1_name();
    }
    async symbol() {
        return await this.actor.icrc1_symbol();
    }
    async totalSupply() {
        const totalSupplyBigInt = await this.actor.icrc1_total_supply();
        return Number(totalSupplyBigInt) / this.decimals;
    }
    async getFee() {
        return await this.actor.icrc1_fee();
    }
    async getBurnedAmountInDeadWallet() {
        const burnedAmount = await this.balanceOf("aaaaa-aa");
        return Number(burnedAmount);
    }
    async getBurnedAmmount() {
        const burnedDeadWallet = await this.getBurnedAmountInDeadWallet();
        return burnedDeadWallet;
    }
    async holdPercentage(address) {
        const totalSupply = await this.totalSupply();
        const balance = await this.balanceOf(address);
        return balance / totalSupply;
    }
    async getMetadata() {
        return await this.actor.icrc1_metadata();
    }
    async getLogo() {
        const metadata = await this.getMetadata();
        for (const meta of metadata) {
            if (meta[0] === "icrc1:logo" && "Text" in meta[1] && meta[1].Text) {
                return meta[1].Text;
            }
        }
        return "";
    }
}
exports.ICRC1Token = ICRC1Token;
