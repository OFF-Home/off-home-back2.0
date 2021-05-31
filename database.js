var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./off-home.sqlite3', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the DataBase');
        db.get("PRAGMA foreign_keys = ON");
        db.serialize(() => {
            db.run('CREATE TABLE Usuaris (' +
                'email text,' +
                'username text not null,' +
                'uid integer,' +
                'token text,' +
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
                    let sql = 'INSERT INTO Usuaris VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
                    db.serialize(() => {
                        db.run(sql, ["victorfer@gmai.com", "victorfer", "101", "ahp9", "10-10-2000", "holaaaa", 200, 300, 0, 1, 3, "Spanish"]);
                        db.run(sql, ["victor@gmai.com", "victor", "102", "bep2", "12-10-2000", "holaaaa", 200, 300, 0, 1, 3, "Spanish"]);
                    });
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
                    db.serialize(() => {
                        db.run(sql, ["C/Balmes", 74, 23345232, 53452567]);
                    });
                    console.log("Taula Llocs creada correctament");
                }
            });
            db.run('CREATE TABLE Categories (' +
                'categoria text,' +
                'descripcio text,' +
                'CONSTRAINT Categoreis_PK PRIMARY KEY (categoria));', (err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    let sql = 'INSERT INTO Categories VALUES (?,?)';
                    db.serialize(() => {
                        db.run(sql, ["Running", "Activitats relacionades amb correr"]);
                        db.run(sql, ["Walking", "Activitats relacionades amb caminar,senderisme,etc"]);
                        db.run(sql, ["Skating", "Activitats relacionades amb esports en patins"]);
                        db.run(sql, ["Cycling", "Activitats relacionades amb ciclisme"]);
                        db.run(sql, ["Meditation", "Activitats relacionades amb la relaxacio"]);
                        db.run(sql, ["Cultural", "Activitats relacionades amb l'ambit cultural"]);
                        db.run(sql, ["Volunteering", "Activitats relacionades amb voluntariats"]);
                        db.run(sql, ["Gastronomic", "Activitats relacionades amb la gastronomia"]);
                        db.run(sql, ["WaterSports", "Activitats relacionades amb esports aquatics"]);
                    });
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
                'CONSTRAINT Activitats_FK_Categories FOREIGN KEY (categoria) references Categories(categoria));', (err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    let sql = 'INSERT INTO Activitats VALUES (?,?,?,?,?,?,?,?,?)';
                    db.serialize(() => {
                        db.run(sql, ["victorfer@gmai.com", "C/Balmes", 74, "2021-03-24 18:00:00.000", "Running", 20, "Correr", "encanta correr", "2021-03-24 19:00:00.000"]);
                    });
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
                    db.serialize(() => {
                        db.run(sql, [null, "victorfer@gmai.com", "2021-03-24 18:00:00.000", "victor@gmai.com", null]);
                    });
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
                    db.serialize(() => {
                        db.run(sql, ["running"]);
                    });
                    console.log("Taula Tags creada correctament");
                }
            });
            db.run('CREATE TABLE TagsxUsuari (' +
                'nomTag text,' +
                'Usuari text,' +
                'CONSTRAINT Tags_PK PRIMARY KEY (nomTag,Usuari),' +
                'CONSTRAINT TagsxUsuari_FK2 FOREIGN KEY (Usuari) REFERENCES Usuaris (email));', (err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    let sql = 'INSERT INTO TagsxUsuari VALUES (?,?)';
                    db.serialize(() => {
                        db.run(sql, ["running", "victor@gmai.com"]);
                    })
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
            db.run('CREATE TABLE Assoliments (' +
                'nom text, ' +
                'descripcio text, ' +
                'CONSTRAINT Assolimments_PK PRIMARY KEY (nom) ' +
                ');', (err) => {
                if (err) {
                    console.log(err.message);
                } else {
                    let sql = 'INSERT INTO Assoliments VALUES (?,?)';
                    db.run(sql, ["CREATOR BRONZE", "First activity created"]);
                    db.run(sql, ["CREATOR SILVER", "10 activities created"]);
                    db.run(sql, ["CREATOR GOLD", "25 activities created"]);
                    db.run(sql, ["CREATOR DIAMOND", "50 activities created"]);
                    db.run(sql, ["CREATOR PLATINUM", "100 activities created"]);
                    db.run(sql, ["PARTICIPANT BRONZE", "First participated activity"]);
                    db.run(sql, ["PARTICIPANT SILVER", "10 participated activity"]);
                    db.run(sql, ["PARTICIPANT GOLD", "25 participated activity"]);
                    db.run(sql, ["PARTICIPANT DIAMOND", "50 participated activity"]);
                    db.run(sql, ["PARTICIPANT PLATINUM", "100 participated activity"]);
                    db.run(sql, ["REVIEWER BRONZE", "First activity reviewed"]);
                    db.run(sql, ["REVIEWER SILVER", "10 activities reviewed"]);
                    db.run(sql, ["REVIEWER GOLD", "25 activities reviewed"]);
                    db.run(sql, ["REVIEWER DIAMOND", "50 activities reviewed"]);
                    db.run(sql, ["REVIEWER PLATINUM", "100 activities reviewed"]);
                    db.run(sql, ["FOLLOWERS BRONZE", "First follower acquired"]);
                    db.run(sql, ["FOLLOWERS SILVER", "10 followers acquired"]);
                    db.run(sql, ["FOLLOWERS GOLD", "25 followers acquired"]);
                    db.run(sql, ["FOLLOWERS DIAMOND", "50 followers acquired"]);
                    db.run(sql, ["FOLLOWERS PLATINUM", "100 followers acquired"]);
                    db.run(sql, ["BETA USER", "You have been a beta tester of the app"]);
                    db.run(sql, ["DEVELOPER", "You have been a developer of the app"]);
                    db.run(sql, ["DON'T STOP", "You have been participated in one activity of each category"]);
                    db.run(sql, ["RUNNER BRONZE", "First participation in a running activity"]);
                    db.run(sql, ["RUNNER SILVER", "10 participation in a running activity"]);
                    db.run(sql, ["RUNNER GOLD", "25 participation in a running activity"]);
                    db.run(sql, ["RUNNER DIAMOND", "50 participation in a running activity"]);
                    db.run(sql, ["RUNNER PLATINUM", "100 participation in a running activity"]);
                    db.run(sql, ["WALKER BRONZE", "First participation in a walking activity"]);
                    db.run(sql, ["WALKER SILVER", "10 participation in a walking activity"]);
                    db.run(sql, ["WALKER GOLD", "25 participation in a walking activity"]);
                    db.run(sql, ["WALKER DIAMOND", "50 participation in a walking activity"]);
                    db.run(sql, ["WALKER PLATINUM", "100 participation in a walking activity"]);
                    db.run(sql, ["SKATING BRONZE", "First participation in a skating activity"]);
                    db.run(sql, ["SKATING SILVER", "10 participation in a skating activity"]);
                    db.run(sql, ["SKATING GOLD", "25 participation in a skating activity"]);
                    db.run(sql, ["SKATING DIAMOND", "50 participation in a skating activity"]);
                    db.run(sql, ["SKATING PLATINUM", "100 participation in a skating activity"]);
                    db.run(sql, ["CYCLING BRONZE", "First participation in a cycling activity"]);
                    db.run(sql, ["CYCLING SILVER", "10 participation in a cycling activity"]);
                    db.run(sql, ["CYCLING GOLD", "25 participation in a cycling activity"]);
                    db.run(sql, ["CYCLING DIAMOND", "50 participation in a cycling activity"]);
                    db.run(sql, ["CYCLING PLATINUM", "100 participation in a cycling activity"]);
                    db.run(sql, ["MEDITATION BRONZE", "First participation in a meditation activity"]);
                    db.run(sql, ["MEDITATION SILVER", "10 participation in a meditation activity"]);
                    db.run(sql, ["MEDITATION GOLD", "25 participation in a meditation activity"]);
                    db.run(sql, ["MEDITATION DIAMOND", "50 participation in a meditation activity"]);
                    db.run(sql, ["MEDITATION PLATINUM", "100 participation in a meditation activity"]);
                    db.run(sql, ["CULTURAL BRONZE", "First participation in a cultural activity"]);
                    db.run(sql, ["CULTURAL SILVER", "10 participation in a cultural activity"]);
                    db.run(sql, ["CULTURAL GOLD", "25 participation in a cultural activity"]);
                    db.run(sql, ["CULTURAL DIAMOND", "50 participation in a cultural activity"]);
                    db.run(sql, ["CULTURAL PLATINUM", "100 participation in a cultural activity"]);
                    db.run(sql, ["VOLUNTEERING BRONZE", "First participation in a volunteering activity"]);
                    db.run(sql, ["VOLUNTEERING SILVER", "10 participation in a volunteering activity"]);
                    db.run(sql, ["VOLUNTEERING GOLD", "25 participation in a volunteering activity"]);
                    db.run(sql, ["VOLUNTEERING DIAMOND", "50 participation in a volunteering activity"]);
                    db.run(sql, ["VOLUNTEERING PLATINUM", "100 participation in a volunteering activity"]);
                    db.run(sql, ["GASTRONOMIC BRONZE", "First participation in a gastronomic activity"]);
                    db.run(sql, ["GASTRONOMIC SILVER", "10 participation in a gastronomic activity"]);
                    db.run(sql, ["GASTRONOMIC GOLD", "25 participation in a gastronomic activity"]);
                    db.run(sql, ["GASTRONOMIC DIAMOND", "50 participation in a gastronomic activity"]);
                    db.run(sql, ["GASTRONOMIC PLATINUM", "100 participation in a gastronomic activity"]);
                    db.run(sql, ["WATER SPORTS BRONZE", "First participation in a water sports activity"]);
                    db.run(sql, ["WATER SPORTS SILVER", "10 participation in a water sports activity"]);
                    db.run(sql, ["WATER SPORTS GOLD", "25 participation in a water sports activity"]);
                    db.run(sql, ["WATER SPORTS DIAMOND", "50 participation in a water sports activity"]);
                    db.run(sql, ["WATER SPORTS PLATINUM", "100 participation in a water sports activity"]);
                    console.log("Taula Assoliments creada correctament");
                }
            });
            db.run('CREATE TABLE AssolimentsxPersona (' +
                'nomassol text, ' +
                'useremail text, ' +
                'CONSTRAINT AssolimmentsxPersona_PK PRIMARY KEY (nomassol,useremail), ' +
                'CONSTRAINT AssolimentsxPersona_FK1 FOREIGN KEY (nomassol) REFERENCES Assoliments (nom), ' +
                'CONSTRAINT AssolimentsxPersona_FK2 FOREIGN KEY (useremail) REFERENCES Usuaris (email));', (err) => {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log("Taula AssolimentsxPersona creada correctament");
                }
            });

            db.run('CREATE VIEW IF NOT EXISTS ValoracioActivitats AS SELECT usuariCreador, dataHoraIni, AVG(valoracio) as valoracioMitjana FROM Participants GROUP BY usuariCreador, dataHoraIni ', (err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log("Vista ValoracioActivitats creada correctament");
                }
            });


            db.run('CREATE TABLE likedActivities (' +
                'usuariCreador text, ' +
                'dataHoraIni DateTime, ' +
                'usuariGuardador text, ' +
                'CONSTRAINT liked_activities PRIMARY KEY (usuariCreador,dataHoraIni,usuariGuardador),' +
                'FOREIGN KEY (usuariCreador,dataHoraIni) REFERENCES Activitats (usuariCreador,dataHoraIni),' +
                'CONSTRAINT Participants_FK2 FOREIGN KEY (usuariGuardador) REFERENCES Usuaris (email));', (err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    let sql = 'INSERT INTO likedActivities VALUES (?,?,?)';
                    db.run(sql, ["victorfer@gmai.com", "2021-03-24 18:00:00.000", "victor@gmai.com"]);
                    console.log("Taula d'activitats guardades creada correctament");
                }

            });

        });
    }
});





module.exports = db;