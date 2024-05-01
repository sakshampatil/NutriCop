"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const schedule_1 = require("./schedule");
dotenv_1.default.config();
//weekly scheduled cron job
(0, schedule_1.weeklySchedule)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.PORT || 3001;
//routes
(0, routes_1.routes)(app);
//starting server
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`serving is up and running on port:${port}`);
});
