const express = require('express');
const router = express.Router();

let libros = [
    { id: 1, titulo: "Ensayo sobre la seguera", autorId: 1 },
    { id: 2, titulo: "Juventud en extasis", autorId: 2 }
];

// Obtener todos
router.get('/', (req, res) => {
    res.json(libros);
});

// Obtener por id
router.get('/:id', (req, res) => {
    const libro = libros.find(l => l.id == req.params.id);
    res.json(libro);
});

// Crear
router.post('/', (req, res) => {
    const nuevo = {
        id: libros.length + 1,
        ...req.body
    };
    libros.push(nuevo);
    res.json(nuevo);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = libros.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Libro no encontrado" });
    }

    libros[index] = {
        ...libros[index],
        ...req.body
    };

    res.json(libros[index]);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = libros.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Libro no encontrado" });
    }

    const eliminado = libros.splice(index, 1);

    res.json({
        mensaje: "Libro eliminado correctamente",
        libro: eliminado[0]
    });
});


module.exports = router;
