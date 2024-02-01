DROP DATABASE IF EXISTS adventure_game_db;
CREATE DATABASE adventure_game_db;

USE adventure_game_db;

CREATE TABLE classes(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    strength INT NOT NULL CHECK (strength <= 1000),
    health INT NOT NULL CHECK (health <= 1000),
    defense INT NOT NULL CHECK (defense <= 1000),
    intelligence INT NOT NULL CHECK (intelligence <= 1000) 
);

CREATE TABLE monsters(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    strength INT NOT NULL CHECK (strength <= 1000),
    health INT NOT NULL CHECK (health <= 1000),
    defense INT NOT NULL CHECK (defense <= 1000),
    intelligence INT NOT NULL CHECK (intelligence <= 1000)
);

CREATE TABLE scoreboard(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    gold INT NOT NULL CHECK (gold <= 10000),
    class VARCHAR(30) NOT NULL
);


