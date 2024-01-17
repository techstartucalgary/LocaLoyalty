CREATE TABLE `reward` (
	`reward_id` serial AUTO_INCREMENT NOT NULL,
	`program_id` int,
	`name` varchar(256),
	`description` text,
	`points_cost` int NOT NULL,
	CONSTRAINT `reward_reward_id` PRIMARY KEY(`reward_id`)
);
--> statement-breakpoint
ALTER TABLE `transaction` MODIFY COLUMN `purchase_amt` decimal NOT NULL;--> statement-breakpoint
ALTER TABLE `transaction` MODIFY COLUMN `payment_type` varchar(256);--> statement-breakpoint
ALTER TABLE `customer` ADD `clerk_id` varchar(16);--> statement-breakpoint
ALTER TABLE `loyalty_card` ADD `carry_over_amt` decimal NOT NULL;--> statement-breakpoint
ALTER TABLE `rewards_program` ADD `spending_per_point` decimal;--> statement-breakpoint
ALTER TABLE `vendor` ADD `description` text;