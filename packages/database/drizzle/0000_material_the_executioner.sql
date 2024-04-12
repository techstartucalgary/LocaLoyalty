CREATE TABLE `customer` (
	`customer_id` integer PRIMARY KEY NOT NULL,
	`fname` text(256) NOT NULL,
	`lname` text(256) NOT NULL,
	`email` text(256) NOT NULL,
	`address` text(256),
	`phone` text(16),
	`clerk_id` text(32)
);
--> statement-breakpoint
CREATE TABLE `loyalty_card` (
	`loyalty_id` integer PRIMARY KEY NOT NULL,
	`customer_id` integer,
	`vendor_id` integer,
	`points_amt` integer NOT NULL,
	`carry_over_amt` numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE `onboarding` (
	`onboarding_id` integer PRIMARY KEY NOT NULL,
	`icon` text(255) NOT NULL,
	`title` text(256) NOT NULL,
	`priority` integer NOT NULL,
	`directory` text(256) NOT NULL,
	`buttonText` text(32) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `onboarding_vendor` (
	`onboarding_vendor` integer PRIMARY KEY NOT NULL,
	`onboarding_id` integer NOT NULL,
	`vendor_id` integer NOT NULL,
	`isCompleted` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `point_redemption_history` (
	`history_id` integer PRIMARY KEY NOT NULL,
	`loyalty_id` integer,
	`points_redeemed` integer NOT NULL,
	`timestamp` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reward` (
	`reward_id` integer PRIMARY KEY NOT NULL,
	`vendor_id` integer,
	`name` text(256),
	`description` text,
	`points_cost` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transaction` (
	`transaction_id` integer PRIMARY KEY NOT NULL,
	`loyalty_id` integer,
	`vendor_id` integer,
	`purchase_amt` numeric NOT NULL,
	`points_earned` integer NOT NULL,
	`timestamp` text NOT NULL,
	`payment_type` text(256)
);
--> statement-breakpoint
CREATE TABLE `vendor` (
	`vendor_id` integer PRIMARY KEY NOT NULL,
	`name` text(256) NOT NULL,
	`email` text(256) NOT NULL,
	`business_email` text(256),
	`address` text(256),
	`phone` text(16),
	`business_phone` text(16),
	`description` text,
	`color` text(16),
	`reward_program_details` text,
	`spending_per_point` numeric,
	`max_points` integer,
	`clerk_id` text(32),
	`city` text(50),
	`province` text(30),
	`postal_code` text(6),
	`business_image` text,
	`business_logo` text,
	`merchant_id` text(13),
	`clover_api_key` text(200),
	`stamp_life` integer
);
