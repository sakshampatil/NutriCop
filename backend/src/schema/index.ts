import * as rawItems from "./raw_items";
import * as recipes from "./recipes";
import * as meals from "./meals";
import * as days from "./days";
import * as users from "./users";

const schema = { ...rawItems, ...recipes, ...meals, ...days, ...users };

export default schema;
