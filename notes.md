PARA CORRER EN LOCAL: (Crear el archivo off-home.sqlite3 y meter el archivito firebase)
docker-compose up --build

PARA SUBIR SERVER:
PC:
docker build -t agnesmgomez/pes:latest .
docker push agnesmgomez/pes:latest

SERVER: (o ./update.sh)
docker-compose stop && docker-couser_testing.jsmpose rm -f && docker-compose pull && docker-compose up -d

LOGS: docker-compose logs -f pes

docker-compose.yaml AQUEST ES EL COMPOSE PEL SERVER!!!!
```yaml
version: '3'
services:
    pes:
        image: agnesmgomez/pes
        ports:
            - "3000:3000"
        volumes:
        - "./off-home.sqlite3:/app/off-home.sqlite3"
        - "./off-home-93451-firebase-adminsdk-ew1oq-42cac07c20.json:/app/off-home-93451-firebase-adminsdk-ew1oq-42cac07c20.json"
        - "./images:/app/images"
        restart: always
```