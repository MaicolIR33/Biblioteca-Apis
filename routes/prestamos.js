const express = require('express');
const router = express.Router();

let prestamos = [
    { id: 1, libroId: 1, usuarioId: 2 }
];

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const prestamo = prestamos.find(p => p.id === id);

    if (!prestamo) {
        return res.status(404).json({ mensaje: "Préstamo no encontrado" });
    }

    res.json(prestamo);
});



router.post('/', (req, res) => {
    const nuevo = {
        id: prestamos.length + 1,
        ...req.body
    };
    prestamos.push(nuevo);
    res.json(nuevo);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = prestamos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Préstamo no encontrado" });
    }

    prestamos[index] = {
        ...prestamos[index],
        ...req.body
    };

    res.json(prestamos[index]);
});


router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = prestamos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Préstamo no encontrado" });
    }

    const eliminado = prestamos.splice(index, 1);

    res.json({
        mensaje: "Préstamo eliminado correctamente",
        prestamo: eliminado[0]
    });
});


module.exports = router;
