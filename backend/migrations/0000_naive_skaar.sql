CREATE TABLE `days` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`day_no` int,
	`total_calories` int,
	`total_proteins` int,
	CONSTRAINT `days_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `meals` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`meal_no` int,
	`day_id` int,
	`proteins` int,
	`calories` int,
	CONSTRAINT `meals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `meals_recipes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`meal_id` int,
	`recipe_id` int,
	`qty` int,
	CONSTRAINT `meals_recipes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `raw_items` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(50),
	`per_qty` decimal(1),
	`proteins` int,
	`calories` int,
	CONSTRAINT `raw_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `recipes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(50),
	`proteins` int,
	`calories` int,
	CONSTRAINT `recipes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `recipes_raw_items` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`recipe_id` int,
	`raw_items_id` int,
	`qty` int,
	CONSTRAINT `recipes_raw_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `meals` ADD CONSTRAINT `meals_day_id_days_id_fk` FOREIGN KEY (`day_id`) REFERENCES `days`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `meals_recipes` ADD CONSTRAINT `meals_recipes_meal_id_meals_id_fk` FOREIGN KEY (`meal_id`) REFERENCES `meals`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `meals_recipes` ADD CONSTRAINT `meals_recipes_recipe_id_recipes_id_fk` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recipes_raw_items` ADD CONSTRAINT `recipes_raw_items_recipe_id_recipes_id_fk` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recipes_raw_items` ADD CONSTRAINT `recipes_raw_items_raw_items_id_raw_items_id_fk` FOREIGN KEY (`raw_items_id`) REFERENCES `raw_items`(`id`) ON DELETE no action ON UPDATE no action;