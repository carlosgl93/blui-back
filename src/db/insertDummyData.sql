-- Inserting data into Usuario
INSERT INTO Usuario (firstname, lastname, password, email, phone, address, city, region, country, comuna_id)
VALUES ('John', 'Doe', 'password123', 'john.doe@example.com', '1234567890', '123 Main St', 'Santiago', 'Metropolitana', 'Chile', 229),
       ('Jane', 'Doe', 'password123', 'jane.doe@example.com', '0987654321', '456 Main St', 'Santiago', 'Metropolitana', 'Chile', 229);

-- Inserting data into Prestador
INSERT INTO Prestador (firstname, lastname, password, email, phone, address, city, region, country, comuna_id, service_id, speciality_id)
VALUES ('Carlos', 'Smith', 'password123', 'carlos.smith@example.com', '1234567890', '789 Main St', 'Santiago', 'Metropolitana', 'Chile', 229, 1, 1),
       ('Maria', 'Gonzalez', 'password123', 'maria.gonzalez@example.com', '0987654321', '012 Main St', 'Santiago', 'Metropolitana', 'Chile', 229, 2, 2);
       
-- Inserting more data into Usuario
INSERT INTO Usuario (firstname, lastname, password, email, phone, address, city, region, country, comuna_id)
VALUES ('Alice', 'Johnson', 'password456', 'alice.johnson@example.com', '2345678901', '789 Secondary St', 'Santiago', 'Metropolitana', 'Chile', 135),
       ('Bob', 'Williams', 'password456', 'bob.williams@example.com', '1098765432', '012 Secondary St', 'Santiago', 'Metropolitana', 'Chile', 135);

-- Inserting more data into Prestador
INSERT INTO Prestador (firstname, lastname, password, email, phone, address, city, region, country, comuna_id, service_id, speciality_id)
VALUES ('Patricia', 'Brown', 'password456', 'patricia.brown@example.com', '2345678901', '345 Secondary St', 'Santiago', 'Metropolitana', 'Chile', 135, 3, 3),
       ('Robert', 'Garcia', 'password456', 'robert.garcia@example.com', '1098765432', '678 Secondary St', 'Santiago', 'Metropolitana', 'Chile', 135, 4, 10);