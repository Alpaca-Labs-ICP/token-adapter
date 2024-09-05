"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeParseJSON = void 0;
const safeParseJSON = (arg) => {
    JSON.stringify(arg, (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );
};
exports.safeParseJSON = safeParseJSON;
