SET IDENTITY_INSERT Usuario ON;

-- Insert into Usuario
INSERT INTO Usuario (id, firstname, password, email, phone, address, city, region, country) VALUES
(1, 'Juan', 'hashedpassword1', 'juan@example.com', '1234567890', '123 Calle Principal', 'Santiago', 'RM', 'Chile'),
(2, 'Ana', 'hashedpassword2', 'ana@example.com', '0987654321', '456 Avenida Arce', 'Valparaíso', 'Valparaíso', 'Chile');

SET IDENTITY_INSERT Usuario OFF;

SET IDENTITY_INSERT Comuna ON;

-- Insert into Comuna
INSERT INTO Comuna (id, name, region, country) VALUES
(1, 'Las Condes', 'RM', 'Chile'),
(2, 'Viña del Mar', 'Valparaíso', 'Chile');

SET IDENTITY_INSERT Comuna OFF;

-- Insert into Usuario_Comuna
INSERT INTO Usuario_Comuna (usuario_id, comuna_id) VALUES
(1, 1),
(2, 2);

SET IDENTITY_INSERT Prestador ON;

-- Insert into Prestador
INSERT INTO Prestador (id, firstname, password, email, phone, address, city, region, country, service_id, speciality_id) VALUES
(1, 'Carlos', 'hashedpassword3', 'carlos@example.com', '1122334455', '789 Calle Roble', 'Santiago', 'RM', 'Chile', 1, 1),
(2, 'Maria', 'hashedpassword4', 'maria@example.com', '5566778899', '321 Calle Pino', 'Valparaíso', 'Valparaíso', 'Chile', 2, 2);

SET IDENTITY_INSERT Prestador OFF;

-- Insert into Prestador_Comuna
INSERT INTO Prestador_Comuna (prestador_id, comuna_id) VALUES
(1, 1),
(2, 2);