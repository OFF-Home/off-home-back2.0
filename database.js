var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./off-home.sqlite3', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the DataBase');
        db.run('CREATE TABLE Usuaris (' +
            'email text,' +
            'username text not null,' +
            'uid integer,' +
            'birthDate date,' +
            'description text,' +
            'followers integer,' +
            'following integer,' +
            'darkmode boolean,' +
            'notifications boolean,' +
            'estrelles integer,' +
            'language text,' +
            'image text,' +
            'CONSTRAINT USUARIS_PK PRIMARY KEY (email),' +
            'CONSTRAINT USUARIS_U0 UNIQUE (username));', (err) => {
            if (err) {
                console.error(err.message);
            } else {
                let sql = 'INSERT INTO Usuaris VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
                db.run(sql, ["victorfer@gmai.com", "victorfer", "102", "10-10-2000", "holaaaa", 200, 300, 0, 1, 3, "Spanish",101]);
                db.run(sql, ["victor@gmai.com", "victor", "102", "12-10-2000", "holaaaa", 200, 300, 0, 1, 3, "Spanish",102]);
                console.log("Taula Usuaris creada correctament");
            }
        });
        db.run('CREATE TABLE Llocs (' +
            'nomCarrer text,' +
            'numCarrer integer,' +
            'latitud real not null,' +
            'altitud real not null,' +
            'CONSTRAINT LLocs_PK PRIMARY KEY (nomCarrer,numCarrer),' +
            'CONSTRAINT LLocs_U0 UNIQUE (latitud,altitud));', (err) => {
            if (err) {
                console.error(err.message);
            } else {
                let sql = 'INSERT INTO Llocs VALUES (?,?,?,?)';
                db.run(sql, ["C/Balmes", 74, 23345232, 53452567]);
                console.log("Taula Llocs creada correctament");
            }
        });
        /*db.run('CREATE TABLE DataHora (' +
            'dataHora DateTime,' +
            'CONSTRAINT DATAHORA_PK PRIMARY KEY (dataHora));', (err) => {
            if(err) {
                console.error(err.message);
            }
            else {
                let sql = 'INSERT INTO DataHora VALUES (?)';
                db.run(sql,["24/03/2021 18:00:00"]);
            }
            console.log("Taula DataHora creada correctament");
        }); */
        db.run('CREATE TABLE Categories (' +
            'categoria text,' +
            'descripcio text,' +
            'CONSTRAINT Categoreis_PK PRIMARY KEY (categoria));', (err) => {
            if (err) {
                console.error(err.message);
            } else {
                let sql = 'INSERT INTO Categories VALUES (?,?)';
                db.run(sql, ["Running", "Correr per la Barceloneta"]);
                console.log("Taula Categories creada correctament");
            }
        });
        db.run('CREATE TABLE Activitats (' +
            'usuariCreador text,' +
            'nomCarrer text not null,' +
            'numCarrer integer not null,' +
            'dataHoraIni DateTime,' +
            'categoria text,' +
            'maxParticipant integer,' +
            'titol text not null,' +
            'descripcio text,' +
            'dataHoraFi DateTime,' +
            'CONSTRAINT Activitats_PK PRIMARY KEY (usuariCreador,dataHoraIni),' +
            'CONSTRAINT Activitats_FK_Usuaris FOREIGN KEY (usuariCreador) references Usuaris(email),' +
            'CONSTRAINT Activitats_FK_Llocs FOREIGN KEY (nomCarrer,numCarrer) references Llocs(nomCarrer,numCarrer),' +
            'CONSTRAINT Activitats_FK_Categories FOREIGN KEY (categoria) references Categories(categoria));', (err) => {
            if (err) {
                console.error(err.message);
            } else {
                let sql = 'INSERT INTO Activitats VALUES (?,?,?,?,?,?,?,?,?)';
                db.run(sql, ["victorfer@gmai.com", "C/Balmes", 74, "2021-03-24 18:00:00.000", "Running", 20, "Correr", "m'encanta correr", "2021-03-24 19:00:00.000"]);

                console.log("Taula Activitats creada correctament");
            }
        });
        db.run('CREATE TABLE Participants (' +
            'valoracio real,' +
            'usuariCreador text,' +
            'dataHoraIni DateTime,' +
            'usuariParticipant text,' +
            'comentari text, ' +
            'CONSTRAINT Participants_PK PRIMARY KEY (usuariCreador,dataHoraIni,usuariParticipant),' +
            'CONSTRAINT Participants_check CHECK (valoracio is NULL OR (valoracio > 0 AND valoracio < 6)),' +
            'CONSTRAINT Participants_FK1 FOREIGN KEY (usuariCreador,dataHoraIni) REFERENCES Activitats (usuariCreador,dataHoraIni),' +
            'CONSTRAINT Participants_FK2 FOREIGN KEY (usuariParticipant) REFERENCES Usuaris (email));', (err) => {

            if (err) {
                console.error(err.message);
            } else {
                let sql = 'INSERT INTO Participants VALUES (?,?,?,?,?)';
                db.run(sql, [null, "victorfer@gmai.com", "2021-03-24 18:00:00.000", "victor@gmai.com",null]);
                console.log("Taula Participants creada correctament");
            }
        });
        db.run('CREATE TABLE Tags (' +
            'nomTag text,' +
            'CONSTRAINT Tags_PK PRIMARY KEY (nomTag));', (err) => {
            if (err) {
                console.error(err.message);
            } else {
                let sql = 'INSERT INTO Tags VALUES (?)';
                db.run(sql, ["running"]);
                console.log("Taula Tags creada correctament");
            }
        });
        db.run('CREATE TABLE TagsxUsuari (' +
            'nomTag text,' +
            'Usuari text,' +
            'CONSTRAINT Tags_PK PRIMARY KEY (nomTag,Usuari),' +
            'CONSTRAINT TagsxUsuari_FK1 FOREIGN KEY (nomTag) REFERENCES Tags (nomTag),' +
            'CONSTRAINT TagsxUsuari_FK2 FOREIGN KEY (Usuari) REFERENCES Usuaris (email));', (err) => {
            if (err) {
                console.error(err.message);
            } else {
                let sql = 'INSERT INTO TagsxUsuari VALUES (?,?)';
                db.run(sql, ["running", "victor@gmai.com"]);
                console.log("Taula TagsxUsuari creada correctament");
            }
        });

        db.run('CREATE TABLE Segueix (' +
            'usuariSeguidor text NOT NULL, ' +
            'usuariSeguit text NOT NULL, ' +
            'CONSTRAINT Follow_PK PRIMARY KEY (usuariSeguidor,usuariSeguit),' +
            'CONSTRAINT seguitEsUsuaris_FK2 FOREIGN KEY (usuariSeguit) REFERENCES Usuaris (email), ' +
            'CONSTRAINT seguidorEsUsuaris_FK2 FOREIGN KEY (usuariSeguidor) REFERENCES Usuaris (email), ' +
            'CONSTRAINT noFollowMyself CHECK (usuariSeguidor <> usuariSeguit));', (err) => {
            if (err) {
                console.error(err.message);
            } else {
                let sql = 'INSERT INTO Segueix VALUES (?,?)';
                db.run(sql, ["victorfer@gmai.com", "victor@gmai.com"]);
                console.log("Taula Segueix creada correctament");
            }
        });

        db.run('CREATE VIEW IF NOT EXISTS Activitatsinfo AS SELECT usuariCreador, nomCarrer, numCarrer, dataHoraIni, categoria, maxParticipant, titol, descripcio, dataHoraFi, datetime("now")>dataHoraFi AS acabada  FROM Activitats; ', (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("Vista Activitatsinfo creada correctament");
            }
        });

    }

});

module.exports = db;