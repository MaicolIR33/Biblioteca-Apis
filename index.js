const express = require('express');
const app = express();

app.use(express.json());

// Importar rutas
const librosRoutes = require('./routes/libros');
const autoresRoutes = require('./routes/autores');
const usuariosRoutes = require('./routes/usuarios');
const prestamosRoutes = require('./routes/prestamos');

// Registrar rutas
app.use('/libros', librosRoutes);
app.use('/autores', autoresRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/prestamos', prestamosRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
