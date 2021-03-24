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
            'CONSTRAINT LLOCS_U0 UNIQUE (username),' +
            'CONSTRAINT LLOCS_U1 UNIQUE (password));', (err) => {
            if (err) {
                console.error(err.message);
            }
            //else inserir aqui inserts per defecte
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
        });
        db.run('CREATE TABLE DataHora (' +
            'dataHora DateTime,' +
            'CONSTRAINT DATAHORA_PK PRIMARY KEY (dataHora));', (err) => {
            if(err) {
                console.error(err.message);
            }
        });
        db.run('CREATE TABLE Categories (' +
            'categoria text,' +
            'descripcio text,' +
            'CONSTRAINT Categoreis_PK PRIMARY KEY (categoria));',(err) => {
            if (err) {
                console.error(err.message);
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
            'CONSTRAINT Activitats_FK_DataHora FOREIGN KEY (dataHoraIni) references DataHora(dataHora),' +
            'CONSTRAINT Activitats_FK_Categlreis FOREIGN KEY (categoria) references Categories(categoria));', (err) => {
            if (err) {
                console.error(err.message);
            }
        });
    }
});

module.exports = db;