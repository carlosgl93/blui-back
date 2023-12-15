

CREATE TABLE Usuario (
    id INT IDENTITY(1,1) PRIMARY KEY,
    firstname NVARCHAR(50),
    password NVARCHAR(255),
    email NVARCHAR(255),
    phone NVARCHAR(50),
    address NVARCHAR(255),
    city NVARCHAR(50),
    region NVARCHAR(50),
    country NVARCHAR(50)
);

CREATE TABLE Comuna (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(50),
    region NVARCHAR(50),
    country NVARCHAR(50)
);

CREATE TABLE Usuario_Comuna (
    usuario_id INT FOREIGN KEY REFERENCES Usuario(id),
    comuna_id INT FOREIGN KEY REFERENCES Comuna(id),
    PRIMARY KEY (usuario_id, comuna_id)
);

CREATE TABLE Prestador (
    id INT IDENTITY(1,1) PRIMARY KEY,
    firstname NVARCHAR(50),
    password NVARCHAR(255),
    email NVARCHAR(255),
    phone NVARCHAR(50),
    address NVARCHAR(255),
    city NVARCHAR(50),
    region NVARCHAR(50),
    country NVARCHAR(50),
    service_id INT NOT NULL,
    speciality_id INT NOT NULL
);

CREATE TABLE Prestador_Comuna (
    prestador_id INT FOREIGN KEY REFERENCES Prestador(id),
    comuna_id INT FOREIGN KEY REFERENCES Comuna(id),
    PRIMARY KEY (prestador_id, comuna_id)
);

CREATE TABLE Servicio (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(50),
    description NVARCHAR(255)
);

CREATE TABLE Especialidad (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(50),
    description NVARCHAR(255),
    servicio INT Foreign Key REFERENCES Servicio(id) 
);

ALTER TABLE Prestador
ADD FOREIGN KEY (service_id) REFERENCES Servicio(id),
    FOREIGN KEY (speciality_id) REFERENCES Especialidad(id);