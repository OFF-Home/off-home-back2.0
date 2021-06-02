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
                    db.serialize(() => {
                        db.run(sql, ["marianievas11@gmail.com", "marianievas", "1NjELMMmkFgRB68lMsfvVvTmsdf1", "ahp9", "Sóc la Maria Nievas i m'agrada correr, fer yoga i sortir amb la meva amiga Agnés", 1, 0, 0, 1, 4, "Spanish", null ]);
                        db.run(sql, ["pau.cuesta@gmail.com", "paucuesta", "6dCwr11w3iZglFaG2j4XWHfCs0q1", "bep2", "Sóc en Pau Cuesta. Sé molt de Kotlin però també de jogging hahaha", 0, 1, 0, 1, 3, "Spanish", null]);
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
                'urlBackground text,' +
                'urlIcon text,' +
                'CONSTRAINT Categoreis_PK PRIMARY KEY (categoria));', (err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    let sql = 'INSERT INTO Categories VALUES (?,?,?,?)';
                    db.serialize(() => {
                        db.run(sql, ["Running", "Activitats relacionades amb correr","https://www.justpodium.com/biblioteca/deporte-cuarentena-94-blog-251.jpg","https://i.ibb.co/687YRnt/running.png"]);
                        db.run(sql, ["Walking", "Activitats relacionades amb caminar,senderisme,etc","https://lh3.googleusercontent.com/proxy/LNzmrprv4Id_No3qWFYP4fA_2cxn5TuEkDcprVIb73es46RqJIfTHITqCZo_lxmUSvWnUtNNQuo9cG1IbK355ZlL7H8Y1DONXlPMq1-7h19HCe3KxeYqU_fi2Wcb4Y6oJ3BM-Ig0QuzuflFbGQd8v_iubOQGkMsIw9m1sHUWQH_K","https://i.ibb.co/pK0WxgM/walking.png"]);
                        db.run(sql, ["Skating", "Activitats relacionades amb esports en patins","https://www.osservatorioantitrust.eu/en/wp-content/uploads/2017/12/IMG_0055.jpg","https://i.ibb.co/hs6bxKk/skate.png"]);
                        db.run(sql, ["Cycling", "Activitats relacionades amb ciclisme","https://img.naturaki.com/64285rutes-ciclisme-girona-1.jpg?auto=compress&h=500&nr=5&usm=50&usmrad=0.5&s=0db63f328444cfa7e4f859fcfb5f3990","https://i.ibb.co/q0yH8m7/cycling.png"]);
                        db.run(sql, ["Meditation", "Activitats relacionades amb la relaxacio","https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/21/2019/05/centros-yoga-barcelona.jpg","https://i.ibb.co/Cb0ktr9/mediation.png"]);
                        db.run(sql, ["Cultural", "Activitats relacionades amb l'ambit cultural","https://api.nnhotels.com/storage/171219/5a58ce53eca45bad3b1b015a/xl/castellers-bcn-10.jpg","https://i.ibb.co/bsW4dgj/cultural.png"]);
                        db.run(sql, ["Volunteering", "Activitats relacionades amb voluntariats","https://badi.com/blog/wp-content/uploads/2020/03/Voluntariado-en-Barcleona_1-scaled.jpg","https://i.ibb.co/86JtKnN/volunteering.png"]);
                        db.run(sql, ["Gastronomic", "Activitats relacionades amb la gastronomia","https://dam.ngenespanol.com/wp-content/uploads/2018/11/5-gastronomia-paises-mundo.png","https://i.ibb.co/Jy6jyFH/food.png"]);
                        db.run(sql, ["WaterSports", "Activitats relacionades amb esports aquatics","https://www.asssa.es/wp-content/uploads/2019/08/00178_1-3.png","https://i.ibb.co/d4xZRS8/water-sports.png"]);
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
                        db.run(sql, ["marianievas11@gmail.com", "C/Balmes", 74, "2021-06-21 18:00:00", "Running", 20, "Una vez al año, no hace daño", "Anem a córrer pel cumple de l'Agnés que és una vaga", "2021-08-24 19:00:00"]);
                        db.run(sql, ["pau.cuesta@gmail.com", "C/Balmes", 74, "2021-03-21 20:00:00", "Walking", 20, "Paseos por BCN", "Paseos al atardecer", "2021-03-21 23:00:00"]);
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
                        db.run(sql, [null, "marianievas11@gmail.com", "2021-06-21 18:00:00", "pau.cuesta@gmail.com", null]);
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
                        db.run(sql, ["yoga"]);
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
                        db.run(sql, ["running", "marianievas11@gmail.com"]);
                        db.run(sql, ["yoga", "marianievas11@gmail.com"]);
                        db.run(sql, ["running", "pau.cuesta@gmail.com"]);
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
                    db.run(sql, ["pau.cuesta@gmail.com", "marianievas11@gmail.com"]);
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
                    db.run(sql, ["CREATOR PLATINUM", "50 activities created"]);
                    db.run(sql, ["CREATOR DIAMOND", "100 activities created"]);
                    db.run(sql, ["PARTICIPANT BRONZE", "First participated activity"]);
                    db.run(sql, ["PARTICIPANT SILVER", "10 participated activity"]);
                    db.run(sql, ["PARTICIPANT GOLD", "25 participated activity"]);
                    db.run(sql, ["PARTICIPANT PLATINUM", "50 participated activity"]);
                    db.run(sql, ["PARTICIPANT DIAMOND", "100 participated activity"]);
                    db.run(sql, ["REVIEWER BRONZE", "First activity reviewed"]);
                    db.run(sql, ["REVIEWER SILVER", "10 activities reviewed"]);
                    db.run(sql, ["REVIEWER GOLD", "25 activities reviewed"]);
                    db.run(sql, ["REVIEWER PLATINUM", "50 activities reviewed"]);
                    db.run(sql, ["REVIEWER DIAMOND", "100 activities reviewed"]);
                    db.run(sql, ["FOLLOWERS BRONZE", "First follower acquired"]);
                    db.run(sql, ["FOLLOWERS SILVER", "10 followers acquired"]);
                    db.run(sql, ["FOLLOWERS GOLD", "25 followers acquired"]);
                    db.run(sql, ["FOLLOWERS PLATINUM", "50 followers acquired"]);
                    db.run(sql, ["FOLLOWERS DIAMOND", "100 followers acquired"]);
                    db.run(sql, ["BETA USER", "You have been a beta tester of the app"]);
                    db.run(sql, ["DEVELOPER", "You have been a developer of the app"]);
                    db.run(sql, ["DON'T STOP", "You have been participated in one activity of each category"]);
                    db.run(sql, ["RUNNER BRONZE", "First participation in a running activity"]);
                    db.run(sql, ["RUNNER SILVER", "10 participation in a running activity"]);
                    db.run(sql, ["RUNNER GOLD", "25 participation in a running activity"]);
                    db.run(sql, ["RUNNER PLATINUM", "50 participation in a running activity"]);
                    db.run(sql, ["RUNNER DIAMOND", "100 participation in a running activity"]);
                    db.run(sql, ["WALKER BRONZE", "First participation in a walking activity"]);
                    db.run(sql, ["WALKER SILVER", "10 participation in a walking activity"]);
                    db.run(sql, ["WALKER GOLD", "25 participation in a walking activity"]);
                    db.run(sql, ["WALKER PLATINUM", "50 participation in a walking activity"]);
                    db.run(sql, ["WALKER DIAMOND", "100 participation in a walking activity"]);
                    db.run(sql, ["SKATING BRONZE", "First participation in a skating activity"]);
                    db.run(sql, ["SKATING SILVER", "10 participation in a skating activity"]);
                    db.run(sql, ["SKATING GOLD", "25 participation in a skating activity"]);
                    db.run(sql, ["SKATING PLATINUM", "50 participation in a skating activity"]);
                    db.run(sql, ["SKATING DIAMOND", "100 participation in a skating activity"]);
                    db.run(sql, ["CYCLING BRONZE", "First participation in a cycling activity"]);
                    db.run(sql, ["CYCLING SILVER", "10 participation in a cycling activity"]);
                    db.run(sql, ["CYCLING GOLD", "25 participation in a cycling activity"]);
                    db.run(sql, ["CYCLING PLATINUM", "50 participation in a cycling activity"]);
                    db.run(sql, ["CYCLING DIAMOND", "100 participation in a cycling activity"]);
                    db.run(sql, ["MEDITATION BRONZE", "First participation in a meditation activity"]);
                    db.run(sql, ["MEDITATION SILVER", "10 participation in a meditation activity"]);
                    db.run(sql, ["MEDITATION GOLD", "25 participation in a meditation activity"]);
                    db.run(sql, ["MEDITATION PLATINUM", "50 participation in a meditation activity"]);
                    db.run(sql, ["MEDITATION DIAMOND", "100 participation in a meditation activity"]);
                    db.run(sql, ["CULTURAL BRONZE", "First participation in a cultural activity"]);
                    db.run(sql, ["CULTURAL SILVER", "10 participation in a cultural activity"]);
                    db.run(sql, ["CULTURAL GOLD", "25 participation in a cultural activity"]);
                    db.run(sql, ["CULTURAL PLATINUM", "50 participation in a cultural activity"]);
                    db.run(sql, ["CULTURAL DIAMOND", "100 participation in a cultural activity"]);
                    db.run(sql, ["VOLUNTEERING BRONZE", "First participation in a volunteering activity"]);
                    db.run(sql, ["VOLUNTEERING SILVER", "10 participation in a volunteering activity"]);
                    db.run(sql, ["VOLUNTEERING GOLD", "25 participation in a volunteering activity"]);
                    db.run(sql, ["VOLUNTEERING PLATINUM", "50 participation in a volunteering activity"]);
                    db.run(sql, ["VOLUNTEERING DIAMOND", "100 participation in a volunteering activity"]);
                    db.run(sql, ["GASTRONOMIC BRONZE", "First participation in a gastronomic activity"]);
                    db.run(sql, ["GASTRONOMIC SILVER", "10 participation in a gastronomic activity"]);
                    db.run(sql, ["GASTRONOMIC GOLD", "25 participation in a gastronomic activity"]);
                    db.run(sql, ["GASTRONOMIC PLATINUM", "50 participation in a gastronomic activity"]);
                    db.run(sql, ["GASTRONOMIC DIAMOND", "100 participation in a gastronomic activity"]);
                    db.run(sql, ["WATER SPORTS BRONZE", "First participation in a water sports activity"]);
                    db.run(sql, ["WATER SPORTS SILVER", "10 participation in a water sports activity"]);
                    db.run(sql, ["WATER SPORTS GOLD", "25 participation in a water sports activity"]);
                    db.run(sql, ["WATER SPORTS PLATINUM", "50 participation in a water sports activity"]);
                    db.run(sql, ["WATER SPORTS DIAMOND", "100 participation in a water sports activity"]);
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
                    db.serialize(() => {
                        db.run(sql, ["marianievas11@gmail.com", "2021-06-21 18:00:00", "marianievas11@gmail.com"]);
                        db.run(sql, ["marianievas11@gmail.com", "2021-06-21 18:00:00", "pau.cuesta@gmail.com"]);
                    })

                    console.log("Taula d'activitats guardades creada correctament");
                }

            });

        });
    }
});





module.exports = db;