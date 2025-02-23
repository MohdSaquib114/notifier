"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string(),
    username: zod_1.z.string().min(4, "Username must be at least 4 characters long"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
});
