CREATE TABLE `customer` (
	`customer_id` serial AUTO_INCREMENT NOT NULL,
	`fname` varchar(256) NOT NULL,
	`lname` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`address` varchar(256),
	`phone` varchar(16),
	`clerk_id` varchar(16),
	CONSTRAINT `customer_customer_id` PRIMARY KEY(`customer_id`)
);
--> statement-breakpoint
CREATE TABLE `loyalty_card` (
	`loyalty_id` serial AUTO_INCREMENT NOT NULL,
	`customer_id` int,
	`program_id` int,
	`points_amt` int NOT NULL,
	`carry_over_amt` decimal NOT NULL,
	CONSTRAINT `loyalty_card_loyalty_id` PRIMARY KEY(`loyalty_id`)
);
--> statement-breakpoint
CREATE TABLE `point_redemption_history` (
	`history_id` serial AUTO_INCREMENT NOT NULL,
	`loyalty_id` int,
	`points_redeemed` int NOT NULL,
	`timestamp` timestamp NOT NULL,
	CONSTRAINT `point_redemption_history_history_id` PRIMARY KEY(`history_id`)
);
--> statement-breakpoint
CREATE TABLE `reward` (
	`reward_id` serial AUTO_INCREMENT NOT NULL,
	`program_id` int,
	`name` varchar(256),
	`description` text,
	`points_cost` int NOT NULL,
	CONSTRAINT `reward_reward_id` PRIMARY KEY(`reward_id`)
);
--> statement-breakpoint
CREATE TABLE `rewards_program` (
	`program_id` serial AUTO_INCREMENT NOT NULL,
	`vendor_id` int,
	`details` text,
	`spending_per_point` decimal,
	CONSTRAINT `rewards_program_program_id` PRIMARY KEY(`program_id`)
);
--> statement-breakpoint
CREATE TABLE `transaction` (
	`transaction_id` serial AUTO_INCREMENT NOT NULL,
	`loyalty_id` int,
	`program_id` int,
	`purchase_amt` decimal NOT NULL,
	`points_earned` int NOT NULL,
	`timestamp` timestamp NOT NULL,
	`payment_type` varchar(256),
	CONSTRAINT `transaction_transaction_id` PRIMARY KEY(`transaction_id`)
);
--> statement-breakpoint
CREATE TABLE `vendor` (
	`vendor_id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`address` varchar(256),
	`phone` varchar(16),
	`description` text,
	CONSTRAINT `vendor_vendor_id` PRIMARY KEY(`vendor_id`)
);
