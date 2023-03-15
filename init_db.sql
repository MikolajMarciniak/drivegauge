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
	drivingScoreImpact float NOT NULL, 
	averageSpeed float NOT NULL
);

DROP TABLE IF EXISTS Incidents;
CREATE TABLE Incidents (
	incidentID serial PRIMARY KEY, 
	userID serial NOT NULL, 
	type varchar(50) NOT NULL, 
	drivingScoreImpact float NOT NULL
);


/* insert test user */
INSERT INTO Companies (companyID, name) VALUES (1, 'Test Company');
INSERT INTO Empolyees (companyID, userName) VALUES (1, 'to_matih'), (1, 'ivan');
INSERT INTO Users (companyID,name,surname,boxID ) VALUES (1,'Hatsune','Miku','123'), (1, "Suletta","Mercury","456") , (1, "Safe", "Driver", "551"), (1, "Moderate", "Driver", "552"),(1, "Danger", "Driver", "553"),;

