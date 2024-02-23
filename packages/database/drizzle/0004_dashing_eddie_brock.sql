CREATE TABLE `onboarding` (
	`onboarding_id` serial AUTO_INCREMENT NOT NULL,
	`icon` varchar(255) NOT NULL,
	`title` varchar(256) NOT NULL,
	`priority` int NOT NULL,
	`directory` varchar(256) NOT NULL,
	`buttonText` varchar(32) NOT NULL,
	CONSTRAINT `onboarding_onboarding_id` PRIMARY KEY(`onboarding_id`)
);
--> statement-breakpoint
CREATE TABLE `onboarding_vendor` (
	`onboarding_vendor` serial AUTO_INCREMENT NOT NULL,
	`onboarding_id` int NOT NULL,
	`vendor_id` int NOT NULL,
	`isCompleted` boolean NOT NULL,
	CONSTRAINT `onboarding_vendor_onboarding_vendor` PRIMARY KEY(`onboarding_vendor`)
);
