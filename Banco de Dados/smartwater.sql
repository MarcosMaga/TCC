DROP DATABASE IF EXISTS smartwater;
CREATE DATABASE smartwater;
USE smartwater;

CREATE TABLE dispositivos(
	macId VARCHAR(30) PRIMARY KEY,
    data_ativacao DATE NOT NULL
);

SELECT * FROM dispositivos
