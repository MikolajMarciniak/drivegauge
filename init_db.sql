DROP TABLE IF EXISTS Companies;
CREATE TABLE Companies (
	companyID serial PRIMARY KEY,
	name varchar(50) not NULL
);

DROP TABLE IF EXISTS Empolyees;
CREATE TABLE Empolyees(
	empolyeeID serial PRIMARY KEY,
	companyID serial NOT NULL,
	userName varchar(50) NOT NULL
);

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
	userID serial PRIMARY KEY, 
	companyID serial NOT NULL,
	name varchar(50) NOT NULL, 
	surname varchar(50) NOT NULL, 
	drivingScore float NOT NULL DEFAULT 0.0, 
	boxID varchar(10) NOT NULL
);


DROP TABLE IF EXISTS Trips;
CREATE TABLE Trips (
	tripID UUID PRIMARY KEY, 
	userID serial NOT NULL, 
	boxID varchar(10) NOT NULL,
	tripStart timestamp NOT NULL,
	tripStop timestamp NOT NULL,
	drivingScoreImpact float NOT NULL, 
	averageSpeed float NOT NULL
);

DROP TABLE IF EXISTS Incidents;
CREATE TABLE Incidents (
	incidentID serial PRIMARY KEY, 
	userID serial NOT NULL, 
	type varchar(50) NOT NULL, 
	drivingScoreImpact float NOT NULL,
	distance float NOT NULL,
	incidentTIme timestamp NOT NULL
);


/* insert test user */
INSERT INTO Companies (companyID, name) VALUES (1, 'Test Company'), (2, 'Mko');
INSERT INTO Empolyees (companyID, userName) VALUES (1, 'to_matih'), (1, 'ivan'), (1, 'miko');
INSERT INTO Users (companyID,name,surname,boxID ) VALUES (1,'Hatsune','Miku','123'), (1, 'Suletta','Mercury','456') , (1, 'Safe', 'Driver', '551'), (1, 'Moderate', 'Driver', '552'),(1, 'Danger', 'Driver', '553');
INSERT INTO Trips (tripID, userID, boxID, tripStart, tripStop, drivingScoreImpact, averageSpeed) 
VALUES ('a4b803cf-45e4-4e4e-8f31-48e43bdf9d52', 1, '123', '2025-11-16 19:11:00', '2025-08-08 12:21:00', 2.1, 3.0),
('17cfe5b5-3358-41cc-b5bb-722b7d52f389', 2, '551', '2023-04-13 11:00:00', '2023-04-13 11:20:00', -1.0, 25.7),
('a1303214-c4e3-4364-ba09-35f51d1c8aa4', 2, '552', '2023-04-13 14:00:00', '2023-04-13 14:30:00', -1.5, 15.2),
('7a41f37b-10af-4ba6-a891-3941f6c5b45e', 3, '553', '2023-04-13 17:00:00', '2023-04-13 17:45:00', -0.8, 30.1);
INSERT INTO Incidents (userID, type, drivingScoreImpact, distance, incidentTIme) VALUES 
  (1, 'collision', -5.2, 100.0, '2023-04-10 12:00:00'),
  (2, 'speeding', -1.7, 25.0, '2023-04-11 15:30:00'),
  (1, 'hard braking', -0.8, 10.0, '2023-04-11 18:45:00'),
  (3, 'unsafe lane change', -3.5, 50.0, '2023-04-12 08:15:00');