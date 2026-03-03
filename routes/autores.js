const express = require('express');
const router = express.Router();

let autores = [
    { id: 1, nombre: "José Saramago" },
    { id: 2, nombre: "Carlos Cuauhtémoc Sánchez" }
];

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const autor = autores.find(a => a.id === id);

    if (!autor) {
        return res.status(404).json({ mensaje: "Autor no encontrado" });
    }

    res.json(autor);
});


router.post('/', (req, res) => {
    const nuevo = {
        id: autores.length + 1,
        ...req.body
    };
    autores.push(nuevo);
    res.json(nuevo);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = autores.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Autor no encontrado" });
    }

    autores[index] = {
        ...autores[index],
        ...req.body
    };

    res.json(autores[index]);
});


router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = autores.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Autor no encontrado" });
    }

    const eliminado = autores.splice(index, 1);

    res.json({
        mensaje: "Autor eliminado correctamente",
        autor: eliminado[0]
    });
});

module.exports = router;
