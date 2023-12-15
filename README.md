# Project Title

Blui, plataforma para encontrar al apoyo en casa que necesitas.

## Description

Blui es una plataforma integral diseñada para conectar a personas que buscan asistencia domiciliaria con profesionales calificados. Ya sea que necesite ayuda con la limpieza, la cocina, el cuidado de los niños o cualquier otra tarea doméstica, Blui hace que sea fácil encontrar ayuda confiable y experimentada.

Los usuarios pueden explorar los perfiles de los ayudantes disponibles en su área, ver sus calificaciones, calificaciones y reseñas, y elegir el que mejor se adapte a sus necesidades. La plataforma también proporciona un sistema de pago seguro y un canal de comunicación para que los usuarios y ayudantes interactúen y organicen los detalles del servicio.

Blui tiene como objetivo simplificar el proceso de búsqueda de asistencia domiciliaria y crear una comunidad de profesionales confiables dedicados a brindar un servicio excelente.

## Environment Variables

To run this project, you will need to add the following environment variables:

For local environment:

1. `ENVIRONMENT` - The environment (local)
2. `LOCAL_DB_USER` - The user for your local database (local\\blui_admin)
3. `LOCAL_DB_PASSWORD` - The password for your local database (carlos2015817!)
4. `LOCAL_DB_HOST` - The host of your local database (localhost)
5. `LOCAL_DB_NAME` - The name of your local database (Blui-Local)

For production environment:

1. `ENVIRONMENT` - The environment (production)
2. `PROD_DB_USER` - The user for your production database (XXXXXXX\\blui_admin)
3. `PROD_DB_PASSWORD` - The password for your production database (XXXXXXXXX)
4. `PROD_DB_HOST` - The host of your production database (20.XXX.XXX.XXX)
5. `PROD_DB_NAME` - The name of your production database (Blui)

## Docker SQL Image Setup

1. Install Docker on your machine.
2. Pull the SQL image using the command: `docker pull mcr.microsoft.com/mssql/server:2017-latest`.
3. Run the Docker image using the command: `docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=<YourPassword>' \
   -e 'MSSQL_PID=Express' -p 1433:1433 --name sql_server \
   -d mcr.microsoft.com/mssql/server:2017-latest`.

## Database Connection

To connect to the database using DBeaver:

1. Open DBeaver.
2. Click on "New Database Connection" (it's the plus icon in the Database Navigator).
3. Select "SQL Server" from the list and click "Next".
4. In the "Server Host" field, enter your `DB_HOST` (localhost for local environment).
5. In the "Port" field, enter `1433`.
6. In the "Database/Schema" field, enter your `DB_NAME` (localBlui for local environment).
7. In the "Authentication" section, select "SQL Server Authentication".
8. In the "User Name" field, enter your `DB_USER` (local\\blui_admin for local environment).
9. In the "Password" field, enter your `DB_PASSWORD` (localPassword for local environment).
10. Click "Test Connection" to ensure the details are correct.
11. If the connection is successful, click "Finish" to complete the setup.

## Running the Project

1. Install dependencies: `npm install`
2. Start the server: `npm start`

## Testing

Run tests using the command: `npm test`
