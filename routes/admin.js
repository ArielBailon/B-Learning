const express = require('express')
const passport = require('passport')
const router = express.Router()
const user = require('../models/users')
const aeronave = require('../models/aeronaves')
const vuelo = require('../models/vuelos')
require('../passport')(passport);


router.get('/reportes', ensureAuthenticatedAsAdmin, (req, res) => {
    fecha = new Date()
    fechaReporte = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
    aeronave.find({}, (err, aeronaves) => {
        if (err) {
            console.log(err)
        } else {
            if (!aeronaves) {
                console.log("No hay aeronaves")
            } else {
                res.render('reportes', { aeronaves: aeronaves, fechaReporte: fechaReporte })
            }
        }
    })
})


router.get('/seguridad', ensureAuthenticatedAsAdmin, (req, res) => {
    user.find({ tipoUsuario: 'Piloto' }, (err, usuarios) => {
        if (err) {
            console.log(err)
        } else {
            if (!usuarios) {
                console.log("No hay usuarios")
            } else {
                res.render('seguridad', { usuarios: usuarios })
            }
        }
    })
})

router.post('/nuevaFicha', ensureAuthenticatedAsAdmin, (req, res) => {
    user.update({ tipoUsuario: 'Piloto' }, { ficha: false }, {multi:true}, (err, usuarios) => {
        if (err) {
            console.log(err)
        } else {
            if (!usuarios) {
                console.log("No hay usuarios")
            } else {
                req.flash('restablecido', 'Nuevo periodo de ficha médica creado')
                res.redirect('/admin/seguridad')
            }
        }
    })
})

function ensureAuthenticatedAsAdmin(req, res, next) {
    if (req.isAuthenticated())
        if (req.user.tipoUsuario == "Docente") {
            return next()
        } else {
            res.send('No tiene permisos para acceder a esta url')
        }
    else
        res.redirect('/login')
}

module.exports = router