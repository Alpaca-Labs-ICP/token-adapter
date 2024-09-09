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
exports.createActor = void 0;
const agent_1 = require("@dfinity/agent");
const token_did_1 = require("./token.did");
/**
 * description: Create actor instance
 */
const createActor = ({ agent, canisterId, }) => {
    // Creates an actor with using the candid interface and the HttpAgent
    return agent_1.Actor.createActor(token_did_1.idlFactory, {
        agent,
        canisterId,
    });
};
exports.createActor = createActor;
__exportStar(require("./token.did"), exports);
__exportStar(require("./token.type"), exports);
