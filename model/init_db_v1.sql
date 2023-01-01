DROP TABLE IF EXISTS game_collection; 

CREATE TABLE `game_collection`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `api_id` CHAR(255) NOT NULL,
    `game_name` CHAR(255) NOT NULL,
    `game_image` CHAR(255) NOT NULL,
    `user_id` INT NOT NULL,
    `status` TINYINT NOT NULL,
    `my_rating` TINYINT NOT NULL,
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS users; 

CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)

);
