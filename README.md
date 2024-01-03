# Blui

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
6. `SECRET` - Secret value to sign the JWT tokens

For production environment:

1. `ENVIRONMENT` - The environment (production)
2. `PROD_DB_USER` - The user for your production database (XXXXXXX\\blui_admin)
3. `PROD_DB_PASSWORD` - The password for your production database (XXXXXXXXX)
4. `PROD_DB_HOST` - The host of your production database (20.XXX.XXX.XXX)
5. `PROD_DB_NAME` - The name of your production database (Blui)
6. `SECRET` - Secret value to sign the JWT tokens

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

## Deploying to Azure VM with Nginx

This section assumes you have an Azure VM running Windows and you're connected to it using Remote Desktop.

1. Download and install Nginx for Windows from the [official Nginx website](http://nginx.org/en/download.html).

2. Navigate to the directory where Nginx was installed (usually `C:\nginx`).

3. Open the `conf` directory and find the `nginx.conf` file.

4. Open `nginx.conf` in a text editor and replace its contents with the following configuration, replacing `your-app-port` with the port your application runs on (5050 in this case):

```nginx
http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    # Enable gzip compression
    gzip on;
    gzip_types text/plain application/xml text/css application/javascript;

    server {
        listen       80 http2;
        server_name  localhost;

        root   html;
        index  index.html index.htm;

        location / {
            proxy_pass http://localhost:your-app-port;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        # Set caching headers
        location ~* \.(?:manifest|js|css|png|jpg|jpeg|svg)$ {
            expires 1w;
            add_header Cache-Control "public, must-revalidate, proxy-revalidate";
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}

 5. Save and close the nginx.conf file.

 6. Open a command prompt as administrator and navigate to the Nginx directory (cd C:\nginx).

 7. Start Nginx with the command start nginx.
