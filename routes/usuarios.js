const express = require('express');
const router = express.Router();

let usuarios = [
    { id: 1, nombre: "Juan" },
    { id: 2, nombre: "Maicol" }
];

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json(usuario);
});



router.post('/', (req, res) => {
    const nuevo = {
        id: usuarios.length + 1,
        ...req.body
    };
    usuarios.push(nuevo);
    res.json(nuevo);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    usuarios[index] = {
        ...usuarios[index],
        ...req.body
    };

    res.json(usuarios[index]);
});


router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const eliminado = usuarios.splice(index, 1);

    res.json({
        mensaje: "Usuario eliminado correctamente",
        usuario: eliminado[0]
    });
});

module.exports = router;
