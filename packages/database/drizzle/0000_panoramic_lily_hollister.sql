CREATE TABLE `customer` (
	`customer_id` serial AUTO_INCREMENT NOT NULL,
	`fname` varchar(256) NOT NULL,
	`lname` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`address` varchar(256),
	`phone` varchar(16),
	CONSTRAINT `customer_customer_id` PRIMARY KEY(`customer_id`)
);
--> statement-breakpoint
CREATE TABLE `loyalty_card` (
	`loyalty_id` serial AUTO_INCREMENT NOT NULL,
	`customer_id` int,
	`program_id` int,
	`points_amt` int NOT NULL,
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
CREATE TABLE `rewards_program` (
	`program_id` serial AUTO_INCREMENT NOT NULL,
	`vendor_id` int,
	`details` text,
	CONSTRAINT `rewards_program_program_id` PRIMARY KEY(`program_id`)
);
--> statement-breakpoint
CREATE TABLE `transaction` (
	`transaction_id` serial AUTO_INCREMENT NOT NULL,
	`loyalty_id` int,
	`program_id` int,
	`purchase_amt` int NOT NULL,
	`points_earned` int NOT NULL,
	`timestamp` timestamp NOT NULL,
	`payment_type` varchar(16),
	CONSTRAINT `transaction_transaction_id` PRIMARY KEY(`transaction_id`)
);
--> statement-breakpoint
CREATE TABLE `vendor` (
	`vendor_id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`address` varchar(256),
	`phone` varchar(16),
	CONSTRAINT `vendor_vendor_id` PRIMARY KEY(`vendor_id`)
);
--> statement-breakpoint
ALTER TABLE `loyalty_card` ADD CONSTRAINT `loyalty_card_customer_id_customer_customer_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`customer_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `loyalty_card` ADD CONSTRAINT `loyalty_card_program_id_rewards_program_program_id_fk` FOREIGN KEY (`program_id`) REFERENCES `rewards_program`(`program_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `point_redemption_history` ADD CONSTRAINT `point_redemption_history_loyalty_id_loyalty_card_loyalty_id_fk` FOREIGN KEY (`loyalty_id`) REFERENCES `loyalty_card`(`loyalty_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rewards_program` ADD CONSTRAINT `rewards_program_vendor_id_vendor_vendor_id_fk` FOREIGN KEY (`vendor_id`) REFERENCES `vendor`(`vendor_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_loyalty_id_loyalty_card_loyalty_id_fk` FOREIGN KEY (`loyalty_id`) REFERENCES `loyalty_card`(`loyalty_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_program_id_rewards_program_program_id_fk` FOREIGN KEY (`program_id`) REFERENCES `rewards_program`(`program_id`) ON DELETE no action ON UPDATE no action;