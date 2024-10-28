"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtToken = void 0;
const principal_1 = require("@dfinity/principal");
const icp_1 = require("./icp");
class ExtToken {
    actor;
    decimals = 1e8;
    constructor({ canisterId, agent }) {
        this.actor = icp_1.EXT.createActor({
            agent,
            canisterId,
        });
    }
    async supportedStandards() {
        return ["EXT"];
    }
    // TODO: Implement the following methods
    approve(_input) {
        throw new Error("Method not implemented.");
    }
    transfer(_input) {
        throw new Error("Method not implemented.");
    }
    async getDecimals() {
        const metadata = await this.actor.metadata();
        if ("ok" in metadata && "fungible" in metadata.ok) {
            return metadata.ok.fungible.decimals;
        }
        else {
            throw new Error("getDecimals error occured");
        }
    }
    async balanceOf(address) {
        const balance = await this.actor.balance({
            token: "",
            user: {
                principal: principal_1.Principal.fromText(address),
            },
        });
        return Number(balance) / this.decimals;
    }
    async name() {
        const metadata = await this.actor.metadata();
        if ("ok" in metadata && "fungible" in metadata.ok) {
            return metadata.ok.fungible.name;
        }
        else if ("err" in metadata) {
            throw new Error("error occured");
        }
        throw new Error("error occured");
    }
    async symbol() {
        const metadata = await this.actor.metadata();
        if ("ok" in metadata && "fungible" in metadata.ok) {
            return metadata.ok.fungible.symbol;
        }
        else if ("err" in metadata) {
            throw new Error("error occured");
        }
        throw new Error("error occured");
    }
    async totalSupply() {
        const totalSupplyBigInt = await this.actor.supply();
        if ("err" in totalSupplyBigInt) {
            throw new Error("error occured");
        }
        if ("ok" in totalSupplyBigInt) {
            return Number(totalSupplyBigInt.ok) / this.decimals;
        }
        throw new Error("error occured");
    }
    async getFee() {
        const fee = await this.actor.getFee();
        if ("err" in fee) {
            throw new Error("error occured");
        }
        if ("ok" in fee) {
            return fee.ok;
        }
        throw new Error("error occured");
    }
    async getBurnedAmountInDeadWallet() {
        throw new Error("Method not implemented.");
    }
    async getBurnedAmmount() {
        throw new Error("Method not implemented.");
    }
    async holdPercentage(address) {
        const totalSupply = await this.totalSupply();
        const balance = await this.balanceOf(address);
        return balance / totalSupply;
    }
    async getMetadata() {
        const metadata = await this.actor.metadata();
        if ("ok" in metadata) {
            return metadata.ok;
        }
        throw new Error("error occured");
    }
    async getLogo() {
        const result = await this.actor.logo();
        if ("ok" in result) {
            return result.ok;
        }
        throw new Error("error occured");
    }
}
exports.ExtToken = ExtToken;
