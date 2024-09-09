"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dip20Token = void 0;
const principal_1 = require("@dfinity/principal");
const icp_1 = require("./icp");
class Dip20Token {
    constructor({ canisterId, agent }) {
        this.decimals = 1e8;
        this.actor = icp_1.DIP20.createActor({
            agent,
            canisterId,
        });
    }
    approve(input) {
        throw new Error("Method not implemented.");
    }
    transfer(input) {
        throw new Error("Method not implemented.");
    }
    getDecimals() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.actor.decimals();
        });
    }
    balanceOf(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const balance = yield this.actor.balanceOf(principal_1.Principal.fromText(address));
            return Number(balance) / this.decimals;
        });
    }
    name() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.actor.name();
        });
    }
    symbol() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.actor.symbol();
        });
    }
    totalSupply() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalSupplyBigInt = yield this.actor.totalSupply();
            return Number(totalSupplyBigInt) / this.decimals;
        });
    }
    getFee() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.actor.getTokenFee();
        });
    }
    getBurnedAmountInDeadWallet() {
        return __awaiter(this, void 0, void 0, function* () {
            const burnedAmount = yield this.balanceOf("aaaaa-aa");
            return Number(burnedAmount);
        });
    }
    getBurnedAmmount() {
        return __awaiter(this, void 0, void 0, function* () {
            const burnedDeadWallet = yield this.getBurnedAmountInDeadWallet();
            return burnedDeadWallet;
        });
    }
    holdPercentage(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalSupply = yield this.totalSupply();
            const balance = yield this.balanceOf(address);
            return balance / totalSupply;
        });
    }
    getMetadata() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.actor.getMetadata();
        });
    }
    getLogo() {
        return __awaiter(this, void 0, void 0, function* () {
            const logo = yield this.actor.logo();
            return logo;
        });
    }
}
exports.Dip20Token = Dip20Token;
