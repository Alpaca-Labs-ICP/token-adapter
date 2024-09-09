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
exports.ExtToken = void 0;
const principal_1 = require("@dfinity/principal");
const icp_1 = require("./icp");
class ExtToken {
    constructor({ canisterId, agent }) {
        this.decimals = 1e8;
        this.actor = icp_1.EXT.createActor({
            agent,
            canisterId,
        });
    }
    // TODO: Implement the following methods
    approve(input) {
        throw new Error("Method not implemented.");
    }
    transfer(input) {
        throw new Error("Method not implemented.");
    }
    getDecimals() {
        return __awaiter(this, void 0, void 0, function* () {
            const metadata = yield this.actor.metadata();
            if ("ok" in metadata && "fungible" in metadata.ok) {
                return metadata.ok.fungible.decimals;
            }
            else {
                throw new Error("getDecimals error occured");
            }
        });
    }
    balanceOf(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const balance = yield this.actor.balance({
                token: "",
                user: {
                    principal: principal_1.Principal.fromText(address),
                },
            });
            return Number(balance) / this.decimals;
        });
    }
    name() {
        return __awaiter(this, void 0, void 0, function* () {
            const metadata = yield this.actor.metadata();
            if ("ok" in metadata && "fungible" in metadata.ok) {
                return metadata.ok.fungible.name;
            }
            else if ("err" in metadata) {
                throw new Error("error occured");
            }
            throw new Error("error occured");
        });
    }
    symbol() {
        return __awaiter(this, void 0, void 0, function* () {
            const metadata = yield this.actor.metadata();
            if ("ok" in metadata && "fungible" in metadata.ok) {
                return metadata.ok.fungible.symbol;
            }
            else if ("err" in metadata) {
                throw new Error("error occured");
            }
            throw new Error("error occured");
        });
    }
    totalSupply() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalSupplyBigInt = yield this.actor.supply();
            if ("err" in totalSupplyBigInt) {
                throw new Error("error occured");
            }
            if ("ok" in totalSupplyBigInt) {
                return Number(totalSupplyBigInt.ok) / this.decimals;
            }
            throw new Error("error occured");
        });
    }
    getFee() {
        return __awaiter(this, void 0, void 0, function* () {
            const fee = yield this.actor.getFee();
            if ("err" in fee) {
                throw new Error("error occured");
            }
            if ("ok" in fee) {
                return fee.ok;
            }
            throw new Error("error occured");
        });
    }
    getBurnedAmountInDeadWallet() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getBurnedAmmount() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
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
            const metadata = yield this.actor.metadata();
            if ("ok" in metadata) {
                return metadata.ok;
            }
            throw new Error("error occured");
        });
    }
    getLogo() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.actor.logo();
            if ("ok" in result) {
                return result.ok;
            }
            throw new Error("error occured");
        });
    }
}
exports.ExtToken = ExtToken;
