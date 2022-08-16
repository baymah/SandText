import {MigrationInterface, QueryRunner} from "typeorm";

export class updateProductRelation1655381998050 implements MigrationInterface {
    name = 'updateProductRelation1655381998050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query("ALTER TABLE `orders` DROP COLUMN `orderid`");
        // await queryRunner.query("ALTER TABLE `orders` DROP COLUMN `weight`");
        // await queryRunner.query("ALTER TABLE `products` DROP COLUMN `availability`");
        // await queryRunner.query("ALTER TABLE `activity_types` ADD `id` varchar(36) NOT NULL PRIMARY KEY");
        // await queryRunner.query("ALTER TABLE `activity_types` ADD `is_deleted` tinyint NOT NULL");
        // await queryRunner.query("ALTER TABLE `orders` ADD `name` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `orders` ADD `phone` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `orders` ADD `email` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `activity_types` DROP COLUMN `name`");
        // await queryRunner.query("ALTER TABLE `activity_types` ADD `name` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `activity_types` DROP COLUMN `slug`");
        // await queryRunner.query("ALTER TABLE `activity_types` ADD `slug` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `activity_types` DROP COLUMN `created_at`");
        // await queryRunner.query("ALTER TABLE `activity_types` ADD `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        // await queryRunner.query("ALTER TABLE `activity_types` DROP COLUMN `updated_at`");
        // await queryRunner.query("ALTER TABLE `activity_types` ADD `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        // await queryRunner.query("ALTER TABLE `order_items` DROP FOREIGN KEY `FK_145532db85752b29c57d2b7b1f1`");
        // await queryRunner.query("ALTER TABLE `order_items` DROP FOREIGN KEY `FK_9263386c35b6b242540f9493b00`");
        // await queryRunner.query("ALTER TABLE `order_items` CHANGE `order_id` `order_id` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `order_items` CHANGE `product_id` `product_id` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `order_items` CHANGE `size` `size` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `order_items` CHANGE `colour_id` `colour_id` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `order_items` CHANGE `is_deleted` `is_deleted` tinyint NOT NULL");
        // await queryRunner.query("ALTER TABLE `orders` CHANGE `payment_type` `payment_type` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `orders` CHANGE `tracking_id` `tracking_id` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `orders` CHANGE `payment_status` `payment_status` int NOT NULL DEFAULT 1");
        // await queryRunner.query("ALTER TABLE `orders` CHANGE `is_deleted` `is_deleted` tinyint NOT NULL");
        // await queryRunner.query("ALTER TABLE `carts` DROP FOREIGN KEY `FK_2ec1c94a977b940d85a4f498aea`");
        // await queryRunner.query("ALTER TABLE `carts` DROP FOREIGN KEY `FK_7d0e145ebd287c1565f15114a18`");
        // await queryRunner.query("ALTER TABLE `carts` DROP FOREIGN KEY `FK_ab18eaf5265160d3dc8d70d9227`");
        // await queryRunner.query("ALTER TABLE `carts` CHANGE `user_id` `user_id` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `carts` CHANGE `product_id` `product_id` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `carts` CHANGE `status` `status` int NOT NULL DEFAULT 0");
        // await queryRunner.query("ALTER TABLE `carts` CHANGE `quantity` `quantity` int NOT NULL");
        // await queryRunner.query("ALTER TABLE `carts` CHANGE `size` `size` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `carts` CHANGE `is_deleted` `is_deleted` tinyint NOT NULL");
        // await queryRunner.query("ALTER TABLE `carts` CHANGE `color_id` `color_id` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `shops` DROP FOREIGN KEY `FK_bb9c758dcc60137e56f6fee72f7`");
        // await queryRunner.query("ALTER TABLE `shops` CHANGE `user_id` `user_id` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `shops` CHANGE `phone` `phone` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `shops` CHANGE `address` `address` longtext NOT NULL");
        // await queryRunner.query("ALTER TABLE `shops` CHANGE `delivery_status` `delivery_status` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `shops` CHANGE `logo` `logo` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `shops` CHANGE `logistic_id` `logistic_id` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `sub_categories` CHANGE `description` `description` longtext NOT NULL");
        // await queryRunner.query("ALTER TABLE `sub_categories` CHANGE `is_deleted` `is_deleted` tinyint NOT NULL");
        // await queryRunner.query("ALTER TABLE `categories` CHANGE `image` `image` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `categories` CHANGE `description` `description` longtext NOT NULL");
        // await queryRunner.query("ALTER TABLE `categories` CHANGE `is_deleted` `is_deleted` tinyint NOT NULL");
        // await queryRunner.query("ALTER TABLE `promotion_videos` DROP COLUMN `product_id`");
        // await queryRunner.query("ALTER TABLE `promotion_videos` ADD `product_id` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `services` CHANGE `is_deleted` `is_deleted` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `products` DROP FOREIGN KEY `FK_176b502c5ebd6e72cafbd9d6f70`");
        await queryRunner.query("ALTER TABLE `products` DROP FOREIGN KEY `FK_1530a6f15d3c79d1b70be98f2be`");
        await queryRunner.query("ALTER TABLE `products` DROP FOREIGN KEY `FK_9a5f6868c96e0069e699f33e124`");
        await queryRunner.query("ALTER TABLE `products` DROP FOREIGN KEY `FK_4d1e7e49f55910518a501997725`");
        // await queryRunner.query("ALTER TABLE `products` CHANGE `name` `name` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `products` CHANGE `slug` `slug` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `products` CHANGE `thumbnail` `thumbnail` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `products` CHANGE `user_id` `user_id` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `products` CHANGE `price` `price` decimal(10,8) NOT NULL");
        // await queryRunner.query("ALTER TABLE `products` CHANGE `description` `description` longtext NOT NULL");
        // await queryRunner.query("ALTER TABLE `products` CHANGE `brand_id` `brand_id` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `products` CHANGE `product_status` `product_status` int NOT NULL DEFAULT 0");
        // await queryRunner.query("ALTER TABLE `products` CHANGE `product_processed_status` `product_processed_status` int NOT NULL");
        // await queryRunner.query("ALTER TABLE `products` CHANGE `product_processed_meta` `product_processed_meta` longtext NOT NULL");
        // await queryRunner.query("ALTER TABLE `products` CHANGE `color_id` `color_id` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `products` CHANGE `status` `status` int NULL");
        // await queryRunner.query("ALTER TABLE `products` ADD UNIQUE INDEX `IDX_1846199852a695713b1f8f5e9a` (`status`)");
        // await queryRunner.query("ALTER TABLE `products` CHANGE `is_deleted` `is_deleted` tinyint NOT NULL DEFAULT 0");
        // await queryRunner.query("ALTER TABLE `products` CHANGE `products_status` `products_status` int NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `products` CHANGE `category_id` `category_id` varchar(191) NOT NULL");
        // await queryRunner.query("ALTER TABLE `products` DROP COLUMN `sub_categories_id`");
        // await queryRunner.query("ALTER TABLE `products` ADD `sub_categories_id` varchar(36) NULL");
        // await queryRunner.query("ALTER TABLE `order_items` ADD CONSTRAINT `FK_145532db85752b29c57d2b7b1f1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        // await queryRunner.query("ALTER TABLE `order_items` ADD CONSTRAINT `FK_9263386c35b6b242540f9493b00` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        // await queryRunner.query("ALTER TABLE `carts` ADD CONSTRAINT `FK_ab18eaf5265160d3dc8d70d9227` FOREIGN KEY (`color_id`) REFERENCES `colors`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        // await queryRunner.query("ALTER TABLE `carts` ADD CONSTRAINT `FK_7d0e145ebd287c1565f15114a18` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        // await queryRunner.query("ALTER TABLE `carts` ADD CONSTRAINT `FK_2ec1c94a977b940d85a4f498aea` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        // await queryRunner.query("ALTER TABLE `shops` ADD CONSTRAINT `FK_bb9c758dcc60137e56f6fee72f7` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        // await queryRunner.query("ALTER TABLE `services` ADD CONSTRAINT `FK_421b94f0ef1cdb407654e67c59e` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `products` ADD CONSTRAINT `FK_176b502c5ebd6e72cafbd9d6f70` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `products` ADD CONSTRAINT `FK_1530a6f15d3c79d1b70be98f2be` FOREIGN KEY (`brand_id`) REFERENCES `brands`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `products` ADD CONSTRAINT `FK_9a5f6868c96e0069e699f33e124` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `products` ADD CONSTRAINT `FK_4d1e7e49f55910518a501997725` FOREIGN KEY (`sub_categories_id`) REFERENCES `sub_categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `products` DROP FOREIGN KEY `FK_4d1e7e49f55910518a501997725`");
        await queryRunner.query("ALTER TABLE `products` DROP FOREIGN KEY `FK_9a5f6868c96e0069e699f33e124`");
        await queryRunner.query("ALTER TABLE `products` DROP FOREIGN KEY `FK_1530a6f15d3c79d1b70be98f2be`");
        await queryRunner.query("ALTER TABLE `products` DROP FOREIGN KEY `FK_176b502c5ebd6e72cafbd9d6f70`");
        await queryRunner.query("ALTER TABLE `services` DROP FOREIGN KEY `FK_421b94f0ef1cdb407654e67c59e`");
        await queryRunner.query("ALTER TABLE `shops` DROP FOREIGN KEY `FK_bb9c758dcc60137e56f6fee72f7`");
        await queryRunner.query("ALTER TABLE `carts` DROP FOREIGN KEY `FK_2ec1c94a977b940d85a4f498aea`");
        await queryRunner.query("ALTER TABLE `carts` DROP FOREIGN KEY `FK_7d0e145ebd287c1565f15114a18`");
        await queryRunner.query("ALTER TABLE `carts` DROP FOREIGN KEY `FK_ab18eaf5265160d3dc8d70d9227`");
        await queryRunner.query("ALTER TABLE `order_items` DROP FOREIGN KEY `FK_9263386c35b6b242540f9493b00`");
        await queryRunner.query("ALTER TABLE `order_items` DROP FOREIGN KEY `FK_145532db85752b29c57d2b7b1f1`");
        await queryRunner.query("ALTER TABLE `products` DROP COLUMN `sub_categories_id`");
        await queryRunner.query("ALTER TABLE `products` ADD `sub_categories_id` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `products` CHANGE `category_id` `category_id` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `products` CHANGE `products_status` `products_status` int NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `products` CHANGE `is_deleted` `is_deleted` tinyint NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `products` DROP INDEX `IDX_1846199852a695713b1f8f5e9a`");
        await queryRunner.query("ALTER TABLE `products` CHANGE `status` `status` int NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `products` CHANGE `color_id` `color_id` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `products` CHANGE `product_processed_meta` `product_processed_meta` longtext NULL");
        await queryRunner.query("ALTER TABLE `products` CHANGE `product_processed_status` `product_processed_status` int NULL");
        await queryRunner.query("ALTER TABLE `products` CHANGE `product_status` `product_status` int NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `products` CHANGE `brand_id` `brand_id` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `products` CHANGE `description` `description` longtext NULL");
        await queryRunner.query("ALTER TABLE `products` CHANGE `price` `price` decimal(10,2) NULL");
        await queryRunner.query("ALTER TABLE `products` CHANGE `user_id` `user_id` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `products` CHANGE `thumbnail` `thumbnail` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `products` CHANGE `slug` `slug` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `products` CHANGE `name` `name` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `products` ADD CONSTRAINT `FK_4d1e7e49f55910518a501997725` FOREIGN KEY (`sub_categories_id`) REFERENCES `sub_categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `products` ADD CONSTRAINT `FK_9a5f6868c96e0069e699f33e124` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `products` ADD CONSTRAINT `FK_1530a6f15d3c79d1b70be98f2be` FOREIGN KEY (`brand_id`) REFERENCES `brands`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `products` ADD CONSTRAINT `FK_176b502c5ebd6e72cafbd9d6f70` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `services` CHANGE `is_deleted` `is_deleted` tinyint NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `promotion_videos` DROP COLUMN `product_id`");
        await queryRunner.query("ALTER TABLE `promotion_videos` ADD `product_id` longtext NULL");
        await queryRunner.query("ALTER TABLE `categories` CHANGE `is_deleted` `is_deleted` tinyint NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `categories` CHANGE `description` `description` longtext NULL");
        await queryRunner.query("ALTER TABLE `categories` CHANGE `image` `image` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `sub_categories` CHANGE `is_deleted` `is_deleted` tinyint NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `sub_categories` CHANGE `description` `description` longtext NULL");
        await queryRunner.query("ALTER TABLE `shops` CHANGE `logistic_id` `logistic_id` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `shops` CHANGE `logo` `logo` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `shops` CHANGE `delivery_status` `delivery_status` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `shops` CHANGE `address` `address` longtext NULL");
        await queryRunner.query("ALTER TABLE `shops` CHANGE `phone` `phone` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `shops` CHANGE `user_id` `user_id` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `shops` ADD CONSTRAINT `FK_bb9c758dcc60137e56f6fee72f7` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `carts` CHANGE `color_id` `color_id` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `carts` CHANGE `is_deleted` `is_deleted` tinyint NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `carts` CHANGE `size` `size` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `carts` CHANGE `quantity` `quantity` int NULL");
        await queryRunner.query("ALTER TABLE `carts` CHANGE `status` `status` int NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `carts` CHANGE `product_id` `product_id` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `carts` CHANGE `user_id` `user_id` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `carts` ADD CONSTRAINT `FK_ab18eaf5265160d3dc8d70d9227` FOREIGN KEY (`color_id`) REFERENCES `colors`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `carts` ADD CONSTRAINT `FK_7d0e145ebd287c1565f15114a18` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `carts` ADD CONSTRAINT `FK_2ec1c94a977b940d85a4f498aea` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `is_deleted` `is_deleted` tinyint NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `payment_status` `payment_status` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `tracking_id` `tracking_id` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `orders` CHANGE `payment_type` `payment_type` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `order_items` CHANGE `is_deleted` `is_deleted` tinyint NULL");
        await queryRunner.query("ALTER TABLE `order_items` CHANGE `colour_id` `colour_id` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `order_items` CHANGE `size` `size` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `order_items` CHANGE `product_id` `product_id` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `order_items` CHANGE `order_id` `order_id` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `order_items` ADD CONSTRAINT `FK_9263386c35b6b242540f9493b00` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order_items` ADD CONSTRAINT `FK_145532db85752b29c57d2b7b1f1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `activity_types` DROP COLUMN `updated_at`");
        await queryRunner.query("ALTER TABLE `activity_types` ADD `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `activity_types` DROP COLUMN `created_at`");
        await queryRunner.query("ALTER TABLE `activity_types` ADD `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `activity_types` DROP COLUMN `slug`");
        await queryRunner.query("ALTER TABLE `activity_types` ADD `slug` varchar(91) COLLATE \"utf8mb4_unicode_ci\" NOT NULL");
        await queryRunner.query("ALTER TABLE `activity_types` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `activity_types` ADD `name` varchar(91) COLLATE \"utf8mb4_unicode_ci\" NOT NULL");
        await queryRunner.query("ALTER TABLE `orders` DROP COLUMN `email`");
        await queryRunner.query("ALTER TABLE `orders` DROP COLUMN `phone`");
        await queryRunner.query("ALTER TABLE `orders` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `activity_types` DROP COLUMN `is_deleted`");
        await queryRunner.query("ALTER TABLE `activity_types` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `products` ADD `availability` int NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `orders` ADD `weight` varchar(191) NULL");
        await queryRunner.query("ALTER TABLE `orders` ADD `orderid` varchar(45) NULL");
    }

}
