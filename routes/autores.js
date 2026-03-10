const express = require('express');
const Routes = express.Router();

const autores = [
  { id: 1, nombre: "Julio Cortázar", nacionalidad: "Argentina" },
  { id: 2, nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
  { id: 3, nombre: "Pablo Neruda", nacionalidad: "Chilena" },
  { id: 4, nombre: "Miguel de Cervantes", nacionalidad: "Española" },
  { id: 5, nombre: "William Shakespeare", nacionalidad: "Británica" }
];


// GET - BUSCAR AUTOR POR ID 
Routes.get('/autores/:id', (req, res) => {
    const apiKey = req.headers['password']

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: 'API key es requerida'
        });
    }

    if (apiKey !== '6789') {
        return res.status(403).json({
            success: false,
            message: 'Error la password no es correcta'
        });
    }
  const autor = autores.find(a => a.id === parseInt(req.params.id));
  if (!autor) 
    return res.status(404).json({ success: false, message: 'Autor no encontrado' });
  
  res.json({ success: true, data: autor });
});


//GET MUESTRA TODOS LOS AUTORES CON FILTRO
Routes.get('/autores', (req, res) => {
    const apiKey = req.headers['password']

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: 'API key es requerida'
        });
    }

    if (apiKey !== '6789') {
        return res.status(403).json({
            success: false,
            message: 'Error la password no es correcta'
        });
    }
  const { nombre, nacionalidad } = req.query;

  const filtered = autores.filter(p => {
    return (
      (nombre == null || p.nombre?.toLowerCase().includes(nombre.toLowerCase())) &&
      (nacionalidad == null || p.nacionalidad?.toLowerCase().includes(nacionalidad.toLowerCase()))
    );
  });

  res.json({ success: true, data: filtered });
});

//POST- CREAR AUTOR
Routes.post('/autores', (req, res) => {
    const apiKey = req.headers['password']

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: 'API key es requerida'
        });
    }

    if (apiKey !== '6789') {
        return res.status(403).json({
            success: false,
            message: 'Error la password no es correcta'
        });
    }
  const { nombre, nacionalidad } = req.body;
  const nuevo = { id: autores.length + 1, nombre, nacionalidad };
  autores.push(nuevo);
  res.status(201).json({ success: true, data: nuevo });
});


// PUT - CAMBIAR AUTOR POR ID
Routes.put('/autores/:id', (req, res) => {
    const apiKey = req.headers['password']

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: 'API key es requerida'
        });
    }

    if (apiKey !== '6789') {
        return res.status(403).json({
            success: false,
            message: 'Error la password no es correcta'
        });
    }
  const id = parseInt(req.params.id);
  const { nombre, nacionalidad } = req.body;

  const autor = autores.find(l => l.id === id);

  if (!autor) {
    return res.status(404).json({ success: false, message: 'Autor no encontrado' });
  }

  // Actualizamos solo si vienen datos
  if (nombre) autor.nombre = nombre;
  if (nacionalidad) autor.nacionalidad = nacionalidad;

  res.json({ success: true, data: autor });
});


// DELETE - ELIMINAR AUTOR POR ID
Routes.delete('/autores/:id', (req, res) => {
    const apiKey = req.headers['password']

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: 'API key es requerida'
        });
    }

    if (apiKey !== '6789') {
        return res.status(403).json({
            success: false,
            message: 'Error la password no es correcta'
        });
    }
  const id = parseInt(req.params.id);

  const index = autores.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'autor no encontrado' });
  }

  const eliminado = autores.splice(index, 1);

  res.json({ success: true, data: eliminado[0] });
});

module.exports = Routes;
