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
exports.Token = void 0;
const dip20_1 = require("./dip20");
const icrc1_1 = require("./icrc1");
const ext_1 = require("./ext");
class Token {
    constructor({ canisterId, agent, tokenStandard }) {
        switch (tokenStandard) {
            case "DIP20":
                this.token = new dip20_1.Dip20Token({
                    canisterId,
                    agent,
                });
                break;
            case "EXT":
                this.token = new ext_1.ExtToken({
                    canisterId,
                    agent,
                });
                break;
            case "ICRC1":
            case "ICRC2":
            case "ICP":
                this.token = new icrc1_1.ICRC1Token({
                    agent,
                    canisterId,
                });
                break;
            default:
                throw new Error("Invalid token standard");
        }
    }
    getDecimals() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.token.getDecimals();
        });
    }
    balanceOf(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.token.balanceOf(address);
        });
    }
    name() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.token.name();
        });
    }
    symbol() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.token.symbol();
        });
    }
    totalSupply() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.token.totalSupply();
        });
    }
    getFee() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.token.getFee();
        });
    }
    getMetadata() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.token.getMetadata();
        });
    }
    getLogo() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.token.getLogo();
        });
    }
    approve(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.token.approve(input);
        });
    }
    transfer(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.token.transfer(input);
        });
    }
}
exports.Token = Token;
