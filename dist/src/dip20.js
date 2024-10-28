"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dip20Token = void 0;
const principal_1 = require("@dfinity/principal");
const icp_1 = require("./icp");
class Dip20Token {
    actor;
    decimals = 1e8;
    constructor({ canisterId, agent }) {
        this.actor = icp_1.DIP20.createActor({
            agent,
            canisterId,
        });
    }
    async supportedStandards() {
        return ["DIP20"];
    }
    approve(_input) {
        throw new Error("Method not implemented.");
    }
    transfer(_input) {
        throw new Error("Method not implemented.");
    }
    async getDecimals() {
        return this.actor.decimals();
    }
    async balanceOf(address) {
        const balance = await this.actor.balanceOf(principal_1.Principal.fromText(address));
        return Number(balance) / this.decimals;
    }
    async name() {
        return await this.actor.name();
    }
    async symbol() {
        return await this.actor.symbol();
    }
    async totalSupply() {
        const totalSupplyBigInt = await this.actor.totalSupply();
        return Number(totalSupplyBigInt) / this.decimals;
    }
    async getFee() {
        return await this.actor.getTokenFee();
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
        return await this.actor.getMetadata();
    }
    async getLogo() {
        const logo = await this.actor.logo();
        return logo;
    }
}
exports.Dip20Token = Dip20Token;
