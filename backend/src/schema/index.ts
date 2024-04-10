import * as ingredients from "./ingredients";
import * as recipes from "./recipes";
import * as meals from "./meals";
import * as days from "./days";
import * as users from "./users";

const schema = { ...ingredients, ...recipes, ...meals, ...days, ...users };

export default schema;
