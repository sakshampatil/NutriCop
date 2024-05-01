"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.weeklySchedule = void 0;
const node_schedule_1 = __importDefault(require("node-schedule"));
const db_1 = require("./db");
const meals_1 = require("./schema/meals");
const days_1 = require("./schema/days");
const helper_1 = require("./service/helper");
const weeklySchedule = () => {
    node_schedule_1.default.scheduleJob("0 0 23 * * 7", async function () {
        await db_1.db.delete(meals_1.meals);
        await db_1.db.delete(days_1.days);
        let users = await db_1.db.query.users.findMany({
            columns: {
                id: true,
            },
        });
        const initialPromise = Promise.resolve();
        const apiCalls = users.reduce(async (previousPromise, user) => {
            await previousPromise;
            const userId = user.id;
            for (const day of helper_1.daysOfWeek) {
                await db_1.db.insert(days_1.days).values({ day, totalCalories: 0, totalProteins: 0, userId });
            }
        }, initialPromise);
        apiCalls
            .then(() => {
            console.log("All API calls completed successfully.");
        })
            .catch((error) => {
            console.error("Error occurred during API calls:", error);
        });
        console.log("USERSssss =", users);
    });
};
exports.weeklySchedule = weeklySchedule;
