"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToday = void 0;
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const getToday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    return daysOfWeek[dayOfWeek];
};
exports.getToday = getToday;
