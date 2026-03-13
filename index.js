require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// Ruta raíz para verificar que la API funciona
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API Biblioteca funcionando 🚀'
    });
});

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
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
};

// Importar rutas
const librosRoutes = require('./routes/libros');
const autoresRoutes = require('./routes/autores');
const usuariosRoutes = require('./routes/usuarios');
const prestamosRoutes = require('./routes/prestamos');

// Aplicar middleware y rutas
app.use('/libros', authMiddleware, librosRoutes);
app.use('/autores', authMiddleware, autoresRoutes);
app.use('/usuarios', authMiddleware, usuariosRoutes);
app.use('/prestamos', authMiddleware, prestamosRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

// Puerto para Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API corriendo en puerto ${PORT}`);
});