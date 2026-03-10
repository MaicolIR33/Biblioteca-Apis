const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.message);
    } else {
        console.log('Base de datos conectada correctamente');
    }
});

db.serialize(() => {

    db.run(`PRAGMA foreign_keys = ON`);

    // TABLA USUARIOS
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        email TEXT,
        telefono TEXT,
        fecha_registro TEXT
    )`);

    // TABLA AUTORES
    db.run(`CREATE TABLE IF NOT EXISTS autores (
        id_autor INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        nacionalidad TEXT,
        fecha_nacimiento TEXT
    )`);

    // TABLA LIBROS
    db.run(`CREATE TABLE IF NOT EXISTS libros (
        id_libro INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT,
        genero TEXT,
        anio_publicacion INTEGER,
        id_autor INTEGER,
        FOREIGN KEY (id_autor) REFERENCES autores(id_autor)
    )`);

    // TABLA PRESTAMOS
    db.run(`CREATE TABLE IF NOT EXISTS prestamos (
        id_prestamo INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER,
        id_libro INTEGER,
        fecha_prestamo TEXT,
        fecha_devolucion TEXT,
        estado TEXT,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
        FOREIGN KEY (id_libro) REFERENCES libros(id_libro)
    )`);

    // =========================
    // INSERTAR DATOS DE PRUEBA
    // =========================

    // AUTORES
    db.run(`INSERT INTO autores (nombre, nacionalidad, fecha_nacimiento)
        VALUES 
        ('Gabriel García Márquez', 'Colombiano', '1927-03-06'),
        ('J.K. Rowling', 'Británica', '1965-07-31'),
        ('George Orwell', 'Británico', '1903-06-25')
    `);

    // USUARIOS
    db.run(`INSERT INTO usuarios (nombre, email, telefono, fecha_registro)
        VALUES
        ('Juan Perez', 'juan@email.com', '3001234567', '2026-03-01'),
        ('Maria Gomez', 'maria@email.com', '3019876543', '2026-03-02'),
        ('Carlos Ruiz', 'carlos@email.com', '3025558888', '2026-03-03')
    `);

    // LIBROS
    db.run(`INSERT INTO libros (titulo, genero, anio_publicacion, id_autor)
        VALUES
        ('Cien años de soledad', 'Novela', 1967, 1),
        ('Harry Potter y la piedra filosofal', 'Fantasía', 1997, 2),
        ('1984', 'Distopía', 1949, 3)
    `);

    // PRESTAMOS
    db.run(`INSERT INTO prestamos (id_usuario, id_libro, fecha_prestamo, fecha_devolucion, estado)
        VALUES
        (1, 1, '2026-03-05', '2026-03-12', 'prestado'),
        (2, 2, '2026-03-06', '2026-03-13', 'prestado'),
        (3, 3, '2026-03-07', '2026-03-14', 'devuelto')
    `);

});

module.exports = db;
