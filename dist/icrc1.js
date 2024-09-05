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
exports.ICRC1Token = void 0;
const principal_1 = require("@dfinity/principal");
const icp_1 = require("./icp");
const safeParseJSON_1 = require("./utils/safeParseJSON");
class ICRC1Token {
    constructor({ canisterId, agent }) {
        this.decimals = 1e8;
        this.actor = icp_1.ICRC1.createActor({
            agent,
            canisterId,
        });
    }
    approve(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.actor.icrc2_approve({
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
        });
    }
    transfer(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.actor.icrc1_transfer({
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
        });
    }
    getDecimals() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.actor.icrc1_decimals();
        });
    }
    balanceOf(address) {
        return __awaiter(this, void 0, void 0, function* () {
            let balance;
            if (typeof address === "string") {
                balance = yield this.actor.icrc1_balance_of({
                    owner: principal_1.Principal.fromText(address),
                    subaccount: [],
                });
            }
            else {
                balance = yield this.actor.icrc1_balance_of({
                    owner: address.owner,
                    subaccount: address.subaccount,
                });
            }
            return Number(balance) / this.decimals;
        });
    }
    name() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.actor.icrc1_name();
        });
    }
    symbol() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.actor.icrc1_symbol();
        });
    }
    totalSupply() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalSupplyBigInt = yield this.actor.icrc1_total_supply();
            return Number(totalSupplyBigInt) / this.decimals;
        });
    }
    getFee() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.actor.icrc1_fee();
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
            return yield this.actor.icrc1_metadata();
        });
    }
    getLogo() {
        return __awaiter(this, void 0, void 0, function* () {
            const metadata = yield this.getMetadata();
            for (const meta of metadata) {
                if (meta[0] === "icrc1:logo" && "Text" in meta[1] && meta[1].Text) {
                    return meta[1].Text;
                }
            }
            return "";
        });
    }
}
exports.ICRC1Token = ICRC1Token;
