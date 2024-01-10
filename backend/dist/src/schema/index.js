"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_items_1 = require("./raw_items");
const recipes_1 = require("./recipes"); // Import multiple exports
const meals_1 = require("./meals");
const days_1 = require("./days");
const schema = {
    raw_items: raw_items_1.raw_items,
    recipes: recipes_1.recipes,
    recipes_raw_items: recipes_1.recipes_raw_items,
    meals: meals_1.meals,
    meals_recipes: meals_1.meals_recipes,
    days: days_1.days,
};
