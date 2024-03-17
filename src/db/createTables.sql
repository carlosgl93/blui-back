CREATE TABLE Comuna (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    region NVARCHAR(150),
    country NVARCHAR(100) 
);

CREATE TABLE Usuario (
    id INT IDENTITY(1,1) PRIMARY KEY,
    firstname NVARCHAR(50) NOT NULL,
    lastname NVARCHAR(50) NOT NULL,
    password NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) NOT NULL,
    phone NVARCHAR(20),
    address NVARCHAR(255),
    city NVARCHAR(100),
    region NVARCHAR(150),
    country NVARCHAR(100),
    comuna_id INT,
    FOREIGN KEY (comuna_id) REFERENCES Comuna(id)
);

CREATE TABLE Servicio (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    description NVARCHAR(1000)
);

CREATE TABLE Especialidad (
    id INT IDENTITY(1,1) PRIMARY KEY,
    service_id INT NOT NULL,
    name NVARCHAR(255) NOT NULL,
    description NVARCHAR(1000),
    FOREIGN KEY (service_id) REFERENCES Servicio(id)
);

CREATE TABLE Prestador (
    id INT IDENTITY(1,1) PRIMARY KEY,
    firstname NVARCHAR(50) NOT NULL,
    lastname NVARCHAR(50) NOT NULL,
    password NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) NOT NULL,
    phone NVARCHAR(20),
    address NVARCHAR(255),
    city NVARCHAR(100),
    region NVARCHAR(100),
    country NVARCHAR(100),
    comuna_id INT,
	service_id INT,
	speciality_id INT,
    FOREIGN KEY (comuna_id) REFERENCES Comuna(id),
    FOREIGN KEY (service_id) REFERENCES Servicio(id),
    FOREIGN KEY (speciality_id) REFERENCES Especialidad(id),
);



CREATE TABLE Usuario_Comuna (
    usuario_id INT NOT NULL,
    comuna_id INT NOT NULL,
    PRIMARY KEY (usuario_id, comuna_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (comuna_id) REFERENCES Comuna(id)
);

CREATE TABLE Prestador_Comuna (
    prestador_id INT NOT NULL,
    comuna_id INT NOT NULL,
    PRIMARY KEY (prestador_id, comuna_id),
    FOREIGN KEY (prestador_id) REFERENCES Prestador(id),
    FOREIGN KEY (comuna_id) REFERENCES Comuna(id)
);

CREATE TABLE Reviews (
    id INT IDENTITY(1,1) PRIMARY KEY,
    prestador_id INT NOT NULL,
    usuario_id INT NOT NULL,
    comment NVARCHAR(1000),
    score INT,
    created_at DATETIME2,
    FOREIGN KEY (prestador_id) REFERENCES Prestador(id),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

CREATE TABLE Mensajes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    prestador_id INT NOT NULL,
    message NVARCHAR(1000) NOT NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (prestador_id) REFERENCES Prestador(id)
);

CREATE TABLE AvailabilityDays (
    id INT IDENTITY(1,1) PRIMARY KEY,
    prestador_id INT NOT NULL,
    day_name VARCHAR(10) NOT NULL,
    is_available BIT NOT NULL DEFAULT 0,
    FOREIGN KEY (prestador_id) REFERENCES Prestador(id)
);

CREATE TABLE AvailabilityTimes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    availability_day_id INT NOT NULL,
    start_time TIME,
    end_time TIME,
    FOREIGN KEY (availability_day_id) REFERENCES AvailabilityDays(id)
);

CREATE TABLE Tarifas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    prestador_id INT NOT NULL,
    day_name NVARCHAR(15) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (prestador_id) REFERENCES Prestador(id)
);

ALTER TABLE Prestador
ADD offers_free_meet_greet BIT NOT NULL DEFAULT 0;