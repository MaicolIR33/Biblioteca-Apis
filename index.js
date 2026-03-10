const express = require('express');
const app = express();

app.use(express.json());

// Importar rutas
const librosRoutes = require('./routes/libros');
const autoresRoutes = require('./routes/autores');
const usuariosRoutes = require('./routes/usuarios');
const prestamosRoutes = require('./routes/prestamos');

// Registrar rutas (SIN prefijo porque ya lo tienen dentro)
app.use(librosRoutes);
app.use(autoresRoutes);
app.use(usuariosRoutes);
app.use(prestamosRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
