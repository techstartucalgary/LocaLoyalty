
ALTER TABLE vendor ADD clerk_id varchar(32);
--> statement-breakpoint

ALTER TABLE customer MODIFY clerk_id varchar(32);
--> statement-breakpoint



