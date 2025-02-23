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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const notification_1 = require("../modal/notification");
const notification_json_1 = __importDefault(require("../data/notification.json"));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, db_1.default)();
            console.log("Database connected");
            yield notification_1.Notification.deleteMany({});
            console.log("Clear database \n Adding new data");
            yield notification_1.Notification.insertMany(notification_json_1.default);
            console.log("Database updated");
            process.exit(1);
        }
        catch (error) {
            console.log(error);
        }
    });
})();
