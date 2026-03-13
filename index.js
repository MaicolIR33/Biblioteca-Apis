require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// Middleware de autenticación
app.use((req, res, next) => {
    const apiKey = req.headers['password'];

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: 'API key requerida'
        });
    }

    if (apiKey !== process.env.API_PASSWORD) {
        return res.status(403).json({
            success: false,
            message: 'Password incorrecta'
        });
    }

    next();
});

// Importar rutas
const librosRoutes = require('./routes/libros');
const autoresRoutes = require('./routes/autores');
const usuariosRoutes = require('./routes/usuarios');
const prestamosRoutes = require('./routes/prestamos');

// Registrar rutas
app.use(librosRoutes);
app.use(autoresRoutes);
app.use(usuariosRoutes);
app.use(prestamosRoutes);

// Puerto (compatible con despliegue tipo Render)
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${server.address().port}`);
});