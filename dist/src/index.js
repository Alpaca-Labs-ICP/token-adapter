"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const dip20_1 = require("./dip20");
const icrc1_1 = require("./icrc1");
const ext_1 = require("./ext");
__exportStar(require("./dip20"), exports);
__exportStar(require("./icrc1"), exports);
__exportStar(require("./ext"), exports);
class Token {
    token;
    constructor({ canisterId, agent, tokenStandard, }) {
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
    async getDecimals() {
        return this.token.getDecimals();
    }
    async balanceOf(address) {
        return this.token.balanceOf(address);
    }
    async supportedStandards() {
        return this.token.supportedStandards();
    }
    async name() {
        return this.token.name();
    }
    async symbol() {
        return this.token.symbol();
    }
    async totalSupply() {
        return this.token.totalSupply();
    }
    async getFee() {
        return this.token.getFee();
    }
    async getMetadata() {
        return this.token.getMetadata();
    }
    async getLogo() {
        return this.token.getLogo();
    }
    async approve(input) {
        return this.token.approve(input);
    }
    async transfer(input) {
        return this.token.transfer(input);
    }
}
exports.Token = Token;
