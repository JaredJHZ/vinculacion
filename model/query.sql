CREATE TABLE usuarios (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellidoPaterno TEXT NOT NULL,
    apellidoMaterno TEXT NOT NULL,
    password TEXT NOT NULL,
    puesto TEXT
);


CREATE TABLE maestros (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellidoPaterno TEXT NOT NULL,
    apellidoMaterno TEXT,
    titulo TEXT NOT NULL
);

CREATE TABLE estudiantes (
    numeroDeControl INTEGER(8) NOT NULL PRIMARY KEY,
    nombre TEXT NOT NULL,
    apellidoPaterno TEXT NOT NULL,
    apellidoMaterno TEXT,
    semestre INTEGER NOT NULL,
    planDeEstudios TEXT NOT NULL,
    proyecto INTEGER,
    CONSTRAINT FK_PROYECTO
    FOREIGN KEY (proyecto)
    REFERENCES proyectos(id)
    ON DELETE CASCADE
);

CREATE TABLE proyectos (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nombreDelProyecto TEXT NOT NULL,
    asesor INTEGER NOT NULL,
    secretario INTEGER,
    vocal INTEGER,
    vocalSuplente INTEGER,
    asesorExterno TEXT NOT NULL,
    empresa TEXT NOT NULL,
    tipoDeProyecto TEXT,
    periodo TEXT NOT NULL,
    CONSTRAINT fk_asesor
    FOREIGN KEY (asesor)
    REFERENCES maestros(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_secretario
    FOREIGN KEY (secretario)
    REFERENCES maestros(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_vocal
    FOREIGN KEY (vocal)
    REFERENCES maestros(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_suplente
    FOREIGN KEY (vocalSuplente)
    REFERENCES maestros(id)
    ON DELETE CASCADE
);



CREATE TABLE formatos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numeroDeControl INTEGER(8) NOT NULL,
    proyecto INGTEGER NOT NULL,
    fecha datetime default current_timestamp,
    formato TEXT NOT NUll,
    CONSTRAINT FK_alumno
    FOREIGN KEY (numeroDeControl)
    REFERENCES estudiantes(numeroDeControl)
    ON DELETE CASCADE,
    CONSTRAINT FK_PROYECTO
    FOREIGN KEY(proyecto)
    REFERENCES proyectos(id)
    ON DELETE CASCADE
);



INSERT INTO usuarios (nombre,apellidoPaterno, apellidoMaterno, password, puesto) VALUES ("jared","hernandez","zuniga","asdqwe123","servicio");

SELECT estudiantes.nombre , estudiantes.apellidoPaterno, estudiantes.apellidoMaterno , proyectos.nombreDelProyecto, proyectos.secretario FROM proyectos INNER JOIN estudiantes ON estudiantes.proyecto = proyectos.id WHERE proyectos.asesor = null;


SELECT estudiantes.id, estudiantes.nombre, estudiantes.apellidoPaterno, estudiantes.apellidoMaterno, proyectos.nombreDelProyecto, proyectos.secretario FROM proyectos INNER JOIN estudiantes ON estudiantes.proyecto = proyectos.id WHERE proyectos.id = 