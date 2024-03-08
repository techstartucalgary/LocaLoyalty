CREATE TABLE `stamp_design` (
	`stamp_design_id` serial AUTO_INCREMENT NOT NULL,
	`path` varchar(256),
	CONSTRAINT `stamp_design_stamp_design_id` PRIMARY KEY(`stamp_design_id`)
);
--> statement-breakpoint
ALTER TABLE `vendor` ADD `color2` varchar(16);--> statement-breakpoint
ALTER TABLE `vendor` ADD `color3` varchar(16);--> statement-breakpoint
ALTER TABLE `vendor` ADD `card_layout` int;--> statement-breakpoint
ALTER TABLE `vendor` ADD `stamp_design_id` int;