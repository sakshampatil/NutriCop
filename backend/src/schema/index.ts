import * as rawItems from "./raw_items";
import * as recipes from "./recipes";
import * as meals from "./meals";
import * as days from "./days";

const schema = { ...rawItems, ...recipes, ...meals, ...days };

export default schema;
