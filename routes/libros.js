const express = require('express');
const Routes = express.Router();
const db = require('../db'); // conexión a la base de datos

// =============================
// GET - TODOS LOS LIBROS
// =============================
Routes.get('/libros', (req, res) => {

    const apiKey = req.headers['password'];

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

    const sql = `SELECT * FROM libros`;

    db.all(sql, [], (err, rows) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            data: rows
        });

    });

});


// =============================
// GET - LIBRO POR ID
// =============================
Routes.get('/libros/:id', (req, res) => {

    const apiKey = req.headers['password'];

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

    const id = req.params.id;

    const sql = `SELECT * FROM libros WHERE id_libro = ?`;

    db.get(sql, [id], (err, row) => {

        if (err) {
            return res.status(500).json({ success:false, message: err.message });
        }

        if (!row) {
            return res.status(404).json({
                success:false,
                message: "Libro no encontrado"
            });
        }

        res.json({
            success:true,
            data: row
        });

    });

});


// =============================
// POST - CREAR LIBRO
// =============================
Routes.post('/libros', (req, res) => {

    const { titulo, genero, anio_publicacion } = req.body;

    if (!titulo) {
        return res.status(400).json({
            success:false,
            message:"El titulo es obligatorio"
        });
    }

    const sql = `
    INSERT INTO libros (titulo, genero, anio_publicacion)
    VALUES (?, ?, ?)
    `;

    db.run(sql, [titulo, genero, anio_publicacion], function(err){

        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }

        res.status(201).json({
            success:true,
            data:{
                id:this.lastID
            }
        });

    });

});


// =============================
// PUT - ACTUALIZAR LIBRO
// =============================
Routes.put('/libros/:id', (req,res)=>{

    const id = req.params.id;
    const { titulo, genero, anio_publicacion } = req.body;

    const sql = `
    UPDATE libros
    SET titulo=?, genero=?, anio_publicacion=?
    WHERE id_libro=?
    `;

    db.run(sql,[titulo,genero,anio_publicacion,id],function(err){

        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }

        if(this.changes === 0){
            return res.status(404).json({
                success:false,
                message:"Libro no encontrado"
            });
        }

        res.json({
            success:true,
            message:"Libro actualizado"
        });

    });

});


// =============================
// DELETE - ELIMINAR LIBRO
// =============================
Routes.delete('/libros/:id',(req,res)=>{

    const id = req.params.id;

    const sql = `DELETE FROM libros WHERE id_libro=?`;

    db.run(sql,[id],function(err){

        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }

        if(this.changes === 0){
            return res.status(404).json({
                success:false,
                message:"Libro no encontrado"
            });
        }

        res.json({
            success:true,
            message:"Libro eliminado"
        });

    });

});

module.exports = Routes;
