CREATE TABLE `stamp_design` (
	`stamp_design_id` integer PRIMARY KEY NOT NULL,
	`path` text(256)
);
--> statement-breakpoint
ALTER TABLE vendor ADD `color2` text(16);--> statement-breakpoint
ALTER TABLE vendor ADD `color3` text(16);--> statement-breakpoint
ALTER TABLE vendor ADD `card_layout` integer;--> statement-breakpoint
ALTER TABLE vendor ADD `stamp_design_id` integer;