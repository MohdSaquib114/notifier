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
const express_1 = require("express");
const notification_1 = require("../../modal/notification");
require("dotenv").config();
const route = (0, express_1.Router)();
route.put("/read", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notificationIds } = req.body;
        if (!notificationIds || !Array.isArray(notificationIds)) {
            return res.status(400).json({ error: "Invalid request. Provide an array of notification IDs." });
        }
        yield notification_1.Notification.updateMany({ _id: { $in: notificationIds }, isRead: false }, { isRead: true });
        res.json({ success: true, message: "Notifications marked as read" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
route.put("/:id/read", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const notification = yield notification_1.Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
        if (!notification)
            return res.status(404).json({ error: "Notification not found" });
        res.json({ success: true, message: "Notification marked as read", notification });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
route.get("/pagination", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chunk = parseInt(req.query.chunk) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (chunk - 1) * limit; // 
        const total = yield notification_1.Notification.countDocuments();
        const totalPages = Math.ceil(total / limit);
        if (chunk > totalPages) {
            return res.json({
                message: "No more notifications available",
                chunk,
                totalPages,
                totalNotifications: total,
                notifications: [],
            });
        }
        // Fetch paginated notifications
        const notifications = yield notification_1.Notification.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        res.json({
            chunk,
            totalPages,
            totalNotifications: total,
            notifications,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.default = route;
