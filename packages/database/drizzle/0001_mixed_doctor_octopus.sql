ALTER TABLE `loyalty_card` DROP FOREIGN KEY `loyalty_card_customer_id_customer_customer_id_fk`;
--> statement-breakpoint
ALTER TABLE `loyalty_card` DROP FOREIGN KEY `loyalty_card_program_id_rewards_program_program_id_fk`;
--> statement-breakpoint
ALTER TABLE `point_redemption_history` DROP FOREIGN KEY `point_redemption_history_loyalty_id_loyalty_card_loyalty_id_fk`;
--> statement-breakpoint
ALTER TABLE `rewards_program` DROP FOREIGN KEY `rewards_program_vendor_id_vendor_vendor_id_fk`;
--> statement-breakpoint
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_loyalty_id_loyalty_card_loyalty_id_fk`;
--> statement-breakpoint
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_program_id_rewards_program_program_id_fk`;
