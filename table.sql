---------------------------------
-- Destruction de la Base de Données
---------------------------------
DROP DATABASE IF EXISTS appMatch;

---------------------------------
-- Création de la Base de Données
---------------------------------
CREATE DATABASE appMatch;

---------------------------------
-- Selection de la Base de Données
---------------------------------
USE appMatch;

---------------------------------
-- TOURNOI
---------------------------------
-- table
DROP TABLE IF EXISTS tournoi;
CREATE TABLE tournoi(
  id INT NOT NULL AUTO_INCREMENT,
  nom VARCHAR (255) NOT NULL,
  date DATE,
  ville VARCHAR (255) NOT NULL,
  PRIMARY KEY(id)
);
-- Données
INSERT INTO tournoi (nom, date, ville) VALUES ('FFR', '2021-01-01', 'Autun');
SELECT LAST_INSERT_ID();
INSERT INTO tournoi (nom, date, ville) VALUES ('TEST', '2022-05-04', 'Paris');
SELECT LAST_INSERT_ID();

---------------------------------
-- CLUB
---------------------------------
DROP TABLE IF EXISTS club;
CREATE TABLE club(
  id INT NOT NULL AUTO_INCREMENT,
  nom VARCHAR (255) NOT NULL,
  ville VARCHAR (255) NOT NULL,
  logo BLOB,
  PRIMARY KEY(id)
);
-- Données
--INSERT INTO club (nom, ville, logo) VALUES ('ASA', 'Autun',  LOAD_FILE('/home/alexis/Images/asa.jpg'));
INSERT INTO club (nom, ville, logo) VALUES ('ASA', 'Autun',  LOAD_FILE('/tmp/asa.jpg'));
INSERT INTO club (nom, ville, logo) VALUES ('SCC', 'Couches', null);

---------------------------------
-- CATEGORIE
---------------------------------
DROP TABLE IF EXISTS categorie;
CREATE TABLE categorie(
  id INT NOT NULL AUTO_INCREMENT,
  nom VARCHAR (255) NOT NULL,
  PRIMARY KEY(id)
);
-- Données
INSERT INTO categorie (nom) VALUES ('U6');
INSERT INTO categorie (nom) VALUES ('U8');
INSERT INTO categorie (nom) VALUES ('U10');
INSERT INTO categorie (nom) VALUES ('U12');

---------------------------------
-- CLUB_TOURNOI
---------------------------------
DROP TABLE IF EXISTS club_tournoi;
CREATE TABLE club_tournoi(
  id INT NOT NULL AUTO_INCREMENT,
  tournoi_id INT NOT NULL,
  club_id INT NOT NULL,
  FOREIGN KEY (tournoi_id) REFERENCES tournoi(id),
  FOREIGN KEY (club_id) REFERENCES club(id),
  PRIMARY KEY(id)
);
-- Données
INSERT INTO club_tournoi (tournoi_id, club_id) VALUES (1, 1);

---------------------------------
-- CATEGORIE_TOURNOI
---------------------------------
DROP TABLE IF EXISTS categorie_tournoi;
CREATE TABLE categorie_tournoi(
  id INT NOT NULL AUTO_INCREMENT,
  tournoi_id INT NOT NULL,
  categorie_id INT NOT NULL,
  FOREIGN KEY (tournoi_id) REFERENCES tournoi(id),
  FOREIGN KEY (categorie_id) REFERENCES categorie(id),
  PRIMARY KEY(id)
);
-- Données
INSERT INTO categorie_tournoi (tournoi_id, categorie_id) VALUES (1, 2);
INSERT INTO categorie_tournoi (tournoi_id, categorie_id) VALUES (1, 3);

---------------------------------
-- EQUIPE_TOURNOI
---------------------------------
DROP TABLE IF EXISTS equipe_tournoi;
CREATE TABLE equipe_tournoi(
  id INT NOT NULL AUTO_INCREMENT,
  tournoi_id INT NOT NULL,
  categorie_id INT NOT NULL,
  club_id INT NOT NULL,
  nb_equipe INT,
  FOREIGN KEY (tournoi_id) REFERENCES tournoi(id),
  FOREIGN KEY (categorie_id) REFERENCES categorie(id),
  FOREIGN KEY (club_id) REFERENCES club(id),
  PRIMARY KEY(id)
);
-- Données
-- tournoi FFR catégorie U8 club ASA nb_equipe 1
INSERT INTO equipe_tournoi (tournoi_id, categorie_id, club_id, nb_equipe) VALUES (1, 2, 1, 1);
-- tournoi FFR catégorie U10 club ASA nb_equipe 1
INSERT INTO equipe_tournoi (tournoi_id, categorie_id, club_id, nb_equipe) VALUES (1, 3, 1, 1);
-- tournoi FFR catégorie U12 club ASA nb_equipe 1
INSERT INTO equipe_tournoi (tournoi_id, categorie_id, club_id, nb_equipe) VALUES (1, 4, 1, 1);
-- tournoi FFR catégorie U12 club SCC nb_equipe 2
INSERT INTO equipe_tournoi (tournoi_id, categorie_id, club_id, nb_equipe) VALUES (1, 4, 2, 2);

---------------------------------
-- AFFICHAGE POUR TEST
---------------------------------
SELECT equipe_tournoi.id, tournoi.nom AS Tournoi, categorie.nom AS Categorie, club.nom AS Club, equipe_tournoi.nb_equipe
FROM equipe_tournoi
INNER JOIN categorie ON equipe_tournoi.categorie_id=categorie.id
INNER JOIN tournoi ON equipe_tournoi.tournoi_id=tournoi.id
INNER JOIN club ON equipe_tournoi.club_id=club.id
WHERE equipe_tournoi.tournoi_id=1;

--SELECT categorie_tournoi.id, categorie.nom, tournoi.nom
--FROM categorie_tournoi
--INNER JOIN categorie ON categorie_tournoi.categorie_id=categorie.id
--INNER JOIN tournoi ON categorie_tournoi.tournoi_id=tournoi.id;




