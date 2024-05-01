"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToday = exports.daysOfWeek = void 0;
exports.daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];
const getToday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const day = dayOfWeek - 1 < 0 ? 6 : dayOfWeek - 1;
    return exports.daysOfWeek[day];
};
exports.getToday = getToday;
