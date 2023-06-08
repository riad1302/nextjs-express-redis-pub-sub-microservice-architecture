DROP DATABASE IF EXISTS express_crud;

CREATE DATABASE express_crud;

USE express_crud;

DROP TABLE IF EXISTS posts;

CREATE TABLE `posts` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `title` varchar(45) DEFAULT '100',
    `description` longtext,
    `created_at` datetime DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id_UNIQUE` (`id`)
);

INSERT INTO posts (title, description, created_at) VALUES('initial data', 'Lorem Ipsum is simply dummy text of the printing and typesetting', '2023-06-09');
