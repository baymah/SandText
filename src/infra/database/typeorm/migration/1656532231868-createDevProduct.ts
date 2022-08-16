import {MigrationInterface, QueryRunner} from "typeorm";

export class createDevProduct1656532231868 implements MigrationInterface {
    name = 'createDevProduct1656532231868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE \`promotional_video_products\` DROP FOREIGN KEY \`FK_8770f13aefc5c70a42792228149\``);
        // await queryRunner.query(`ALTER TABLE \`promotional_video_products\` DROP FOREIGN KEY \`FK_fd3dfd05f6d0c7e5aaedb5d3128\``);
        // await queryRunner.query(`ALTER TABLE \`user_interests\` DROP FOREIGN KEY \`FK_cb0511a8fabd1a2ac9912f7a9aa\``);
        // await queryRunner.query(`ALTER TABLE \`user_interests\` DROP FOREIGN KEY \`FK_f635c6e4d9fb949a9f62c75053b\``);
        // await queryRunner.query(`DROP INDEX \`FK_16e086c6474004ff929f81d3783\` ON \`product_attributes\``);
        // await queryRunner.query(`DROP INDEX \`FK_1530a6f15d3c79d1b70be98f2be\` ON \`products\``);
        await queryRunner.query(`CREATE TABLE \`dev_products\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(191) NOT NULL, \`slug\` varchar(191) NOT NULL, \`thumbnail\` varchar(191) NOT NULL, \`user_id\` varchar(191) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`description\` longtext NOT NULL, \`brand_id\` varchar(191) NOT NULL, \`product_status\` int NOT NULL DEFAULT '0', \`quantity\` int NOT NULL, \`status\` int NULL, \`is_deleted\` tinyint NOT NULL DEFAULT '0', \`category_id\` varchar(191) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_cdee90b283c211169a40283ddb\` (\`status\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        // await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`weight\``);
        // await queryRunner.query(`ALTER TABLE \`promotion_videos\` DROP COLUMN \`service_id\``);
        // await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`availability\``);
        // await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`brand_id\``);
        // await queryRunner.query(`ALTER TABLE \`user_interests\` DROP COLUMN \`created_at\``);
        // await queryRunner.query(`ALTER TABLE \`user_interests\` DROP COLUMN \`updated_at\``);
        // await queryRunner.query(`ALTER TABLE \`activity_types\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
        // await queryRunner.query(`ALTER TABLE \`activity_types\` ADD \`is_deleted\` tinyint NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`activity_types\` DROP COLUMN \`name\``);
        // await queryRunner.query(`ALTER TABLE \`activity_types\` ADD \`name\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`activity_types\` DROP COLUMN \`slug\``);
        // await queryRunner.query(`ALTER TABLE \`activity_types\` ADD \`slug\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`activity_types\` DROP COLUMN \`created_at\``);
        // await queryRunner.query(`ALTER TABLE \`activity_types\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`activity_types\` DROP COLUMN \`updated_at\``);
        // await queryRunner.query(`ALTER TABLE \`activity_types\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`product_pictures\` DROP FOREIGN KEY \`FK_f07e63921c0d66f9ecd3a73868f\``);
        // await queryRunner.query(`ALTER TABLE \`product_pictures\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`product_pictures\` DROP COLUMN \`product_id\``);
        // await queryRunner.query(`ALTER TABLE \`product_pictures\` ADD \`product_id\` varchar(255) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`interests\` CHANGE \`name\` \`name\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`interests\` CHANGE \`video\` \`video\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`interests\` CHANGE \`picture\` \`picture\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`interests\` CHANGE \`slug\` \`slug\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`interests\` CHANGE \`is_deleted\` \`is_deleted\` tinyint NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`interests\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_145532db85752b29c57d2b7b1f1\``);
        // await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_9263386c35b6b242540f9493b00\``);
        // await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`order_id\` \`order_id\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`product_id\` \`product_id\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`size\` \`size\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`colour_id\` \`colour_id\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`is_deleted\` \`is_deleted\` tinyint NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`payment_type\` \`payment_type\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`tracking_id\` \`tracking_id\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`payment_status\` \`payment_status\` int NOT NULL DEFAULT '1'`);
        // await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`is_deleted\` \`is_deleted\` tinyint NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`tokens\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`product_comments\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`product_attributes\` CHANGE \`status\` \`status\` int NOT NULL DEFAULT '0'`);
        // await queryRunner.query(`ALTER TABLE \`product_attributes\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`colors\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`carts\` DROP FOREIGN KEY \`FK_2ec1c94a977b940d85a4f498aea\``);
        // await queryRunner.query(`ALTER TABLE \`carts\` DROP FOREIGN KEY \`FK_7d0e145ebd287c1565f15114a18\``);
        // await queryRunner.query(`ALTER TABLE \`carts\` DROP FOREIGN KEY \`FK_ab18eaf5265160d3dc8d70d9227\``);
        // await queryRunner.query(`ALTER TABLE \`carts\` CHANGE \`user_id\` \`user_id\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`carts\` CHANGE \`product_id\` \`product_id\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`carts\` CHANGE \`status\` \`status\` int NOT NULL DEFAULT '0'`);
        // await queryRunner.query(`ALTER TABLE \`carts\` CHANGE \`quantity\` \`quantity\` int NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`carts\` CHANGE \`size\` \`size\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`carts\` CHANGE \`is_deleted\` \`is_deleted\` tinyint NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`carts\` CHANGE \`color_id\` \`color_id\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`carts\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`peggs\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`product_videos\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`generated_video_tags\` CHANGE \`price\` \`price\` decimal(10,8) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`generated_video_tags\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`promotional_comments\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`promotional_likes\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`sub_categories\` CHANGE \`description\` \`description\` longtext NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`sub_categories\` CHANGE \`is_deleted\` \`is_deleted\` tinyint NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`sub_categories\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`promotion_videos\` DROP COLUMN \`product_id\``);
        // await queryRunner.query(`ALTER TABLE \`promotion_videos\` ADD \`product_id\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`promotion_videos\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`platform\` \`platform\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`activity\` \`activity\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`is_deleted\` \`is_deleted\` tinyint NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`user_activities\` DROP COLUMN \`type\``);
        // await queryRunner.query(`ALTER TABLE \`user_activities\` ADD \`type\` enum ('web', 'mobile') NULL`);
        // await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`city\` \`city\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`region\` \`region\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`country\` \`country\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`latitude\` \`latitude\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`longitude\` \`longitude\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`status\` \`status\` int NOT NULL DEFAULT '0'`);
        // await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`shops\` DROP FOREIGN KEY \`FK_bb9c758dcc60137e56f6fee72f7\``);
        // await queryRunner.query(`ALTER TABLE \`shops\` CHANGE \`user_id\` \`user_id\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`shops\` CHANGE \`phone\` \`phone\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`shops\` CHANGE \`address\` \`address\` longtext NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`shops\` CHANGE \`delivery_status\` \`delivery_status\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`shops\` CHANGE \`logo\` \`logo\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`shops\` CHANGE \`logistic_id\` \`logistic_id\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`shops\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`service_activities\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`service_availability\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`service_packages\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`services\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`)`);
        // await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`product_likes\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_176b502c5ebd6e72cafbd9d6f70\``);
        // await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_4d1e7e49f55910518a501997725\``);
        // await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`name\` \`name\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`slug\` \`slug\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`thumbnail\` \`thumbnail\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`user_id\` \`user_id\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`price\` \`price\` decimal(10,8) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`description\` \`description\` longtext NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`product_status\` \`product_status\` int NOT NULL DEFAULT '0'`);
        // await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`product_processed_status\` \`product_processed_status\` int NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`product_processed_meta\` \`product_processed_meta\` longtext NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`color_id\` \`color_id\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`shop_id\` \`shop_id\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`status\` \`status\` int NULL`);
        // await queryRunner.query(`ALTER TABLE \`products\` ADD UNIQUE INDEX \`IDX_1846199852a695713b1f8f5e9a\` (\`status\`)`);
        // await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`is_deleted\` \`is_deleted\` tinyint NOT NULL DEFAULT '0'`);
        // await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`products_status\` \`products_status\` int NOT NULL DEFAULT '0'`);
        // await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`sub_categories_id\` \`sub_categories_id\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`image\` \`image\` varchar(191) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`description\` \`description\` longtext NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`is_deleted\` \`is_deleted\` tinyint NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`otp_verifies\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        // await queryRunner.query(`ALTER TABLE \`product_pictures\` ADD CONSTRAINT \`FK_f07e63921c0d66f9ecd3a73868f\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_145532db85752b29c57d2b7b1f1\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_9263386c35b6b242540f9493b00\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`carts\` ADD CONSTRAINT \`FK_ab18eaf5265160d3dc8d70d9227\` FOREIGN KEY (\`color_id\`) REFERENCES \`colors\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`carts\` ADD CONSTRAINT \`FK_7d0e145ebd287c1565f15114a18\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`carts\` ADD CONSTRAINT \`FK_2ec1c94a977b940d85a4f498aea\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`shops\` ADD CONSTRAINT \`FK_bb9c758dcc60137e56f6fee72f7\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`services\` ADD CONSTRAINT \`FK_421b94f0ef1cdb407654e67c59e\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_176b502c5ebd6e72cafbd9d6f70\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_4d1e7e49f55910518a501997725\` FOREIGN KEY (\`sub_categories_id\`) REFERENCES \`sub_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`promotional_video_products\` ADD CONSTRAINT \`FK_8770f13aefc5c70a42792228149\` FOREIGN KEY (\`promotional_video_id\`) REFERENCES \`promotion_videos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        // await queryRunner.query(`ALTER TABLE \`promotional_video_products\` ADD CONSTRAINT \`FK_fd3dfd05f6d0c7e5aaedb5d3128\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`user_interests\` ADD CONSTRAINT \`FK_cb0511a8fabd1a2ac9912f7a9aa\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        // await queryRunner.query(`ALTER TABLE \`user_interests\` ADD CONSTRAINT \`FK_f635c6e4d9fb949a9f62c75053b\` FOREIGN KEY (\`interest_id\`) REFERENCES \`interests\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_interests\` DROP FOREIGN KEY \`FK_f635c6e4d9fb949a9f62c75053b\``);
        await queryRunner.query(`ALTER TABLE \`user_interests\` DROP FOREIGN KEY \`FK_cb0511a8fabd1a2ac9912f7a9aa\``);
        await queryRunner.query(`ALTER TABLE \`promotional_video_products\` DROP FOREIGN KEY \`FK_fd3dfd05f6d0c7e5aaedb5d3128\``);
        await queryRunner.query(`ALTER TABLE \`promotional_video_products\` DROP FOREIGN KEY \`FK_8770f13aefc5c70a42792228149\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_4d1e7e49f55910518a501997725\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_176b502c5ebd6e72cafbd9d6f70\``);
        await queryRunner.query(`ALTER TABLE \`services\` DROP FOREIGN KEY \`FK_421b94f0ef1cdb407654e67c59e\``);
        await queryRunner.query(`ALTER TABLE \`shops\` DROP FOREIGN KEY \`FK_bb9c758dcc60137e56f6fee72f7\``);
        await queryRunner.query(`ALTER TABLE \`carts\` DROP FOREIGN KEY \`FK_2ec1c94a977b940d85a4f498aea\``);
        await queryRunner.query(`ALTER TABLE \`carts\` DROP FOREIGN KEY \`FK_7d0e145ebd287c1565f15114a18\``);
        await queryRunner.query(`ALTER TABLE \`carts\` DROP FOREIGN KEY \`FK_ab18eaf5265160d3dc8d70d9227\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_9263386c35b6b242540f9493b00\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_145532db85752b29c57d2b7b1f1\``);
        await queryRunner.query(`ALTER TABLE \`product_pictures\` DROP FOREIGN KEY \`FK_f07e63921c0d66f9ecd3a73868f\``);
        await queryRunner.query(`ALTER TABLE \`otp_verifies\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`is_deleted\` \`is_deleted\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`description\` \`description\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`image\` \`image\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`sub_categories_id\` \`sub_categories_id\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`products_status\` \`products_status\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`is_deleted\` \`is_deleted\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP INDEX \`IDX_1846199852a695713b1f8f5e9a\``);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`status\` \`status\` int NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`shop_id\` \`shop_id\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`color_id\` \`color_id\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`product_processed_meta\` \`product_processed_meta\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`product_processed_status\` \`product_processed_status\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`product_status\` \`product_status\` int NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`description\` \`description\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`price\` \`price\` decimal(10,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`user_id\` \`user_id\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`thumbnail\` \`thumbnail\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`slug\` \`slug\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`name\` \`name\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_4d1e7e49f55910518a501997725\` FOREIGN KEY (\`sub_categories_id\`) REFERENCES \`sub_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_176b502c5ebd6e72cafbd9d6f70\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_likes\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\``);
        await queryRunner.query(`ALTER TABLE \`services\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`service_packages\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`service_availability\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`service_activities\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`shops\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`shops\` CHANGE \`logistic_id\` \`logistic_id\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`shops\` CHANGE \`logo\` \`logo\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`shops\` CHANGE \`delivery_status\` \`delivery_status\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`shops\` CHANGE \`address\` \`address\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`shops\` CHANGE \`phone\` \`phone\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`shops\` CHANGE \`user_id\` \`user_id\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`shops\` ADD CONSTRAINT \`FK_bb9c758dcc60137e56f6fee72f7\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`status\` \`status\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`longitude\` \`longitude\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`latitude\` \`latitude\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`country\` \`country\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`region\` \`region\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`city\` \`city\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_activities\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`user_activities\` ADD \`type\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`is_deleted\` \`is_deleted\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`activity\` \`activity\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_activities\` CHANGE \`platform\` \`platform\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`promotion_videos\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`promotion_videos\` DROP COLUMN \`product_id\``);
        await queryRunner.query(`ALTER TABLE \`promotion_videos\` ADD \`product_id\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`sub_categories\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`sub_categories\` CHANGE \`is_deleted\` \`is_deleted\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sub_categories\` CHANGE \`description\` \`description\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`promotional_likes\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`promotional_comments\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`generated_video_tags\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`generated_video_tags\` CHANGE \`price\` \`price\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_videos\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`peggs\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`carts\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`carts\` CHANGE \`color_id\` \`color_id\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`carts\` CHANGE \`is_deleted\` \`is_deleted\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`carts\` CHANGE \`size\` \`size\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`carts\` CHANGE \`quantity\` \`quantity\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`carts\` CHANGE \`status\` \`status\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`carts\` CHANGE \`product_id\` \`product_id\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`carts\` CHANGE \`user_id\` \`user_id\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`carts\` ADD CONSTRAINT \`FK_ab18eaf5265160d3dc8d70d9227\` FOREIGN KEY (\`color_id\`) REFERENCES \`colors\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`carts\` ADD CONSTRAINT \`FK_7d0e145ebd287c1565f15114a18\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`carts\` ADD CONSTRAINT \`FK_2ec1c94a977b940d85a4f498aea\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`colors\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`product_attributes\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`product_attributes\` CHANGE \`status\` \`status\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`product_comments\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`tokens\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`is_deleted\` \`is_deleted\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`payment_status\` \`payment_status\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`tracking_id\` \`tracking_id\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`payment_type\` \`payment_type\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`is_deleted\` \`is_deleted\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`colour_id\` \`colour_id\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`size\` \`size\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`product_id\` \`product_id\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`order_id\` \`order_id\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_9263386c35b6b242540f9493b00\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_145532db85752b29c57d2b7b1f1\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`interests\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`interests\` CHANGE \`is_deleted\` \`is_deleted\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`interests\` CHANGE \`slug\` \`slug\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`interests\` CHANGE \`picture\` \`picture\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`interests\` CHANGE \`video\` \`video\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`interests\` CHANGE \`name\` \`name\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_pictures\` DROP COLUMN \`product_id\``);
        await queryRunner.query(`ALTER TABLE \`product_pictures\` ADD \`product_id\` varchar(191) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_pictures\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`product_pictures\` ADD CONSTRAINT \`FK_f07e63921c0d66f9ecd3a73868f\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_types\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`activity_types\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`activity_types\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`activity_types\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`activity_types\` DROP COLUMN \`slug\``);
        await queryRunner.query(`ALTER TABLE \`activity_types\` ADD \`slug\` varchar(91) COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`activity_types\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`activity_types\` ADD \`name\` varchar(91) COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`activity_types\` DROP COLUMN \`is_deleted\``);
        await queryRunner.query(`ALTER TABLE \`activity_types\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`user_interests\` ADD \`updated_at\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`user_interests\` ADD \`created_at\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`brand_id\` varchar(191) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`availability\` int NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`promotion_videos\` ADD \`service_id\` varchar(191) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`weight\` varchar(191) NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_cdee90b283c211169a40283ddb\` ON \`dev_products\``);
        await queryRunner.query(`DROP TABLE \`dev_products\``);
        await queryRunner.query(`CREATE INDEX \`FK_1530a6f15d3c79d1b70be98f2be\` ON \`products\` (\`brand_id\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_16e086c6474004ff929f81d3783\` ON \`product_attributes\` (\`color\`)`);
        await queryRunner.query(`ALTER TABLE \`user_interests\` ADD CONSTRAINT \`FK_f635c6e4d9fb949a9f62c75053b\` FOREIGN KEY (\`interest_id\`) REFERENCES \`interests\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_interests\` ADD CONSTRAINT \`FK_cb0511a8fabd1a2ac9912f7a9aa\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`promotional_video_products\` ADD CONSTRAINT \`FK_fd3dfd05f6d0c7e5aaedb5d3128\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`promotional_video_products\` ADD CONSTRAINT \`FK_8770f13aefc5c70a42792228149\` FOREIGN KEY (\`promotional_video_id\`) REFERENCES \`promotion_videos\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
