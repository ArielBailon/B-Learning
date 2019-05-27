express = require('express');
router = express.Router();
user = require('../models/users')


router.get('/', ensureAuthenticated, (req, res) => {
    user.find({ tipoUsuario: 'Estudiante' }, (err, estudiantes) => { // Sentencia para consultar
        if (err) { // Si hay error
            console.log(err)
        } else {
            if (!estudiantes) { // Si no se encientran estudiantes se muestra un mensaje en consola
                console.log("No hay estudiantes")
            } else {
                // Si encuentra alumnos los envía a las vistas html para mostrarlos en tablas
                res.render('inicio', { estudiantes: estudiantes })
            }
        }
    })
})

router.get('/login',  (req, res) => {
    res.render("login")
})

router.get('/registro', (req, res) => {
    res.render("registro")
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next()
    else
        res.redirect('/login')
}

module.exports = router