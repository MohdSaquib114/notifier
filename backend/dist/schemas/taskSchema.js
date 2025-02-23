"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskSchema = void 0;
const zod_1 = require("zod");
exports.taskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().optional(),
    status: zod_1.z.enum(['To Do', 'In Progress', 'Completed'], {
        required_error: 'Status is required',
    }),
    priority: zod_1.z.enum(['Low', 'Medium', 'High'], {
        required_error: 'Priority is required',
    }),
    dueDate: zod_1.z.string().optional(),
});
