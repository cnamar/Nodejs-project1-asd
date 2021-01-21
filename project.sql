CREATE TABLE Theatres
(
  Theatre_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL,
  passwords VARCHAR(30) NOT NULL,
  Theatre_Name VARCHAR(25) NOT NULL,
  Theatre_email VARCHAR(25) NOT NULL,
  Contact_No VARCHAR(20) NOT NULL,
  PRIMARY KEY (Theatre_id),
  UNIQUE(username),
  UNIQUE (Theatre_Name),
  UNIQUE (Theatre_email),
  UNIQUE (Contact_No)
);
CREATE TABLE Movies
(
  Movie_id INT NOT NULL AUTO_INCREMENT,
  Movie_Name VARCHAR(25) NOT NULL,
  Director_Name VARCHAR(40) NOT NULL,
  Producer_Name VARCHAR(40) NOT NULL,
  Distributor_Name VARCHAR(40) NOT NULL,
  Language VARCHAR(30) NOT NULL,
  major_cast VARCHAR(60) NOT NULL,
  PRIMARY KEY(Movie_id)
);
CREATE TABLE Location
(
  District VARCHAR(25) NOT NULL,
  Local_Body VARCHAR(25) NOT NULL,
  Division INT NOT NULL,
  Theatre_id INT NOT NULL,
  FOREIGN KEY (Theatre_id) REFERENCES Theatres(Theatre_id)
);
CREATE TABLE Screens
(
  Screen_id INT NOT NULL,
  Screen_Name VARCHAR(25) NOT NULL,
  PRIMARY KEY (Screen_id)
);
CREATE TABLE Show_timings
(
  Time TIME NOT NULL,
  Indication VARCHAR(25) NOT NULL,
  Screen_id INT NOT NULL,
  Theatre_id INT NOT NULL,
  Movie_id INT NOT NULL,
  FOREIGN KEY (Screen_id) REFERENCES Screens(Screen_id),
  FOREIGN KEY (Theatre_id) REFERENCES Theatres(Theatre_id),
  FOREIGN KEY (Movie_id) REFERENCES Movies(Movie_id)
);
CREATE TABLE Classes
(
  Class_Name VARCHAR(25) NOT NULL,
  Cost INT NOT NULL,
  Screen_id INT NOT NULL,
  Theatre_id INT NOT NULL,
  FOREIGN KEY (Screen_id) REFERENCES Screens(Screen_id),
  FOREIGN KEY (Theatre_id) REFERENCES Theatres(Theatre_id)
);
CREATE TABLE upcoming(
  id INT NOT NULL AUTO_INCREMENT,
  Movie_Name VARCHAR(25) NOT NULL,
  Director_Name VARCHAR(40) NOT NULL,
  Producer_Name VARCHAR(40) NOT NULL,
  Distributor_Name VARCHAR(40) NOT NULL,
  Language VARCHAR(30) NOT NULL,
  major_cast VARCHAR(60) NOT NULL,
  PRIMARY KEY(id)
  );
 CREATE TABLE users(
    username VARCHAR(30) NOT NULL,
    passwords VARCHAR(30) NOT NULL,
    admin TINYINT DEFAULT false,
    Theatre_id INT NOT NULL,
    FOREIGN KEY (Theatre_id) REFERENCES Theatres(Theatre_id)
    ); 
INSERT INTO Movies VALUES(1,'Lucifer','Prithviraj Sukumaran','Antony Perumbavoor','Maxlab','malayalam','Mohanlal,Manju warrier,Tovino');
INSERT INTO Movies VALUES(2,'Petta','Karthik Subbaraj','kalanithi','Sun Pictures','Tamil','Rajinikanth,Simran');
INSERT INTO Movies VALUES(3,'Moothon','Geethu Mohandas','Anurag Kashyap','MiniStudio','malayalam','Nivin Pauly,Roshan');
INSERT INTO Theatres VALUES(1,'amarnath','12345678','RAGAM','ragam@gmail.com','9999999999');
INSERT INTO Theatres VALUES(2,'abhijith','87654321','RAMDAS','ramdas@gmail.com','1111111111');
INSERT INTO Location VALUES('THRISSUR','THRISSUR',20,1);
INSERT INTO Location VALUES('THRISSUR','OLLUR',11,2);
INSERT INTO Screens VALUES(1,'Screen1');
INSERT INTO Screens VALUES(2,'Screen2');
INSERT INTO Screens VALUES(3,'Screen3');
INSERT INTO Show_timings VALUES('12:00:00','pm',1,1,1);
INSERT INTO Show_timings VALUES('03:00:00','pm',1,1,1);
INSERT INTO Show_timings VALUES('06:00:00','pm',1,1,1);
INSERT INTO Show_timings VALUES('09:00:00','pm',1,1,1);
INSERT INTO Show_timings VALUES('12:00:00','pm',2,1,2);
INSERT INTO Show_timings VALUES('03:00:00','pm',2,1,2);
INSERT INTO Show_timings VALUES('06:00:00','pm',2,1,3);
INSERT INTO Show_timings VALUES('09:00:00','pm',2,1,2);
INSERT INTO Show_timings VALUES('12:00:00','pm',1,2,3);
INSERT INTO Show_timings VALUES('03:00:00','pm',1,2,3);
INSERT INTO Show_timings VALUES('06:00:00','pm',1,2,1);
INSERT INTO Show_timings VALUES('09:00:00','pm',1,2,1);
INSERT INTO Classes VALUES('Golden',110,1,1);
INSERT INTO Classes VALUES('Silver',90,1,1);
INSERT INTO Classes VALUES('Golden',150,2,1);
INSERT INTO Classes VALUES('Golden',100,1,2);
SELECT * FROM Show_timings NATURAL JOIN Movies NATURAL JOIN Theatres NATURAL JOIN Screens;

  INSERT INTO upcoming VALUES(1,'KGF Chapter 2','Prasanth Neel','Vijay Kirungadoor','KRG Studios','Kannada','Yash,Sanjay DUtt');
  INSERT INTO upcoming VALUES(2,'Bilal','Amal Neerad','Playhouse','Playhouse','malayalam','Mammootty,Fahad');
  INSERT INTO upcoming VALUES(3,'Vikram','Lokesh','Kamalhassan','Playhouse','Tamil','Kamalhassan');
  SELECT * FROM upcoming;
  ALTER TABLE Theatres DROP username;
  ALTER TABLE Theatres DROP passwords;
    CREATE TABLE users(
    username VARCHAR(30) NOT NULL,
    passwords VARCHAR(30) NOT NULL,
    admin TINYINT DEFAULT false,
    Theatre_id INT NOT NULL,
    FOREIGN KEY (Theatre_id) REFERENCES Theatres(Theatre_id)
    );  
    INSERT INTO users VALUES('amarnath','12345678',0,1);
    INSERT INTO users VALUES('abhijith','87654321',0,2);
    ALTER TABLE users DROP admin;
    CREATE TABLE admin(
    username VARCHAR(30) NOT NULL,
    passwords VARCHAR(30) NOT NULL
    );
    INSERT INTO admin VALUES('admin','admin@123',0,1);
    DELETE FROM Show_timings WHERE (Theatre_id=1 && Screen_id=1 && Time='06:00:00');
    DELETE FROM Theatres WHERE Theatre_id=3;
    DELETE FROM users WHERE Theatre_id=3;
    ALTER TABLE users ADD FOREIGN KEY (Theatre_id) REFERENCES Theatres(Theatre_id) ON DELETE CASCADE;
    INSERT INTO Theatres VALUES(3,'Ganam','ganam@gmail.com',4444444444);
    INSERT INTO users VALUES('noel','00000000',3);
