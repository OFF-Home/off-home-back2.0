var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./off-home.sqlite3', (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log('Connected to the DataBase');
        db.run('CREATE TABLE Usuaris (' +
            'email text,' +
            'username text,' +
            'password text,' +
            'birthDate date,' +
            'description text,' +
            'followers integer,' +
            'following integer,' +
            'darkmode boolean,' +
            'notifications boolean,' +
            'estrelles integer,' +
            'tags text,' +
            'language text,' +
            'CONSTRAINT LLOCS_PK PRIMARY KEY (email),' +
            'CONSTRAINT LLOCS_U0 UNIQUE (username));', (err) => {
            if (err) {
                console.error(err.message);
            }
            else {
                let sql = 'INSERT INTO Usuaris VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
                db.run(sql,["victorfer@gmai.com","victorfer","12342","10-10-2000","holaaaa",200,300,0,1,3,"jejeje","Spanish"]);
                db.run(sql,["victor@gmai.com","victor","1234234","12-10-2000","holaaaa",200,300,0,1,3,"jejeje","Spanish"]);
                console.log("Taula Usuaris creada correctament");
            }
        });
        db.run('CREATE TABLE Llocs (' +
            'nomCarrer text,' +
            'numCarrer integer,' +
            'latitud real,' +
            'altitud real,' +
            'CONSTRAINT LLocs_PK PRIMARY KEY (nomCarrer,numCarrer),' +
            'CONSTRAINT LLocs_U0 UNIQUE (latitud,altitud));', (err) => {
            if (err) {
                console.error(err.message);
            }
            else {
                let sql = 'INSERT INTO Llocs VALUES (?,?,?,?)';
                db.run(sql,["C/Balmes",74,23345232,53452567]);
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
            'CONSTRAINT Categoreis_PK PRIMARY KEY (categoria));',(err) => {
            if (err) {
                console.error(err.message);
            }
            else {
                let sql = 'INSERT INTO Categories VALUES (?,?)';
                db.run(sql,["Running","Correr per la Barceloneta"]);
                console.log("Taula Categories creada correctament");
            }
        });
        db.run('CREATE TABLE Activitats (' +
            'usuariCreador text,' +
            'nomCarrer text,' +
            'numCarrer integer,' +
            'dataHoraIni DateTime,' +
            'categoria text,' +
            'maxParticipant integer,' +
            'titol text not null,' +
            'descripcio text,' +
            'dataHoraFi DateTime,' +
            'CONSTRAINT Activitats_PK PRIMARY KEY (usuariCreador,dataHoraIni),' +
            'CONSTRAINT Activitats_FK_Usuaris FOREIGN KEY (usuariCreador) references Usuaris(email),' +
            'CONSTRAINT Activitats_FK_Llocs FOREIGN KEY (nomCarrer,numCarrer) references Llocs(nomCarrer,numCarrer),' +
            'CONSTRAINT Activitats_FK_Categlreis FOREIGN KEY (categoria) references Categories(categoria));', (err) => {
            if (err) {
                console.error(err.message);
            }
            else {
                let sql = 'INSERT INTO Activitats VALUES (?,?,?,?,?,?,?,?,?)';
                db.run(sql,["victorfer@gmai.com","C/Balmes",74,"24-03-2021 18:00:00","Running",20,"Correr","m'encanta correr","24-03-2021 19:00:00"]);
                console.log("Taula Activitats creada correctament");
            }
        });
        db.run('CREATE TABLE Valoracions (' +
            'valoracio integer ,' +
            'usuariCreador text,' +
            'dataHoraIni DateTime,' +
            'usuariParticipant text,' +
            'CONSTRAINT Participants_PK PRIMARY KEY (usuariCreador,dataHoraIni,usuariParticipant),' +
            'CONSTRAINT Valoracions_check CHECK valoracio > 0 && valoracio < 6,' +
            'CONSTRAINT Participants_FK1 FOREIGN KEY (usuariCreador,dataHoraIni) REFERENCES Activitats (usuariCreador,dataHoraIni),' +
            'CONSTRAINT Participants_PK FOREIGN KEY (usuariCreador,dataHoraIni,usuariParticipant) REFERENCES Participants (usuariCreador,dataHoraIni,usuariParticipant));', (err) => {
            if (err) {
                console.error(err.message);
            } else {
                let sql = 'INSERT INTO Valoracions VALUES (?,?,?,?)';
                db.run(sql, ["3", "victor@gmai.com", "24-03-2021 18:00:00", "victor@gmai.com"]);
                console.log("Taula Participants creada correctament");
            }
        });
    }
});

module.exports = db;