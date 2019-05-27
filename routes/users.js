const express = require('express')
const passport = require('passport')
const router = express.Router()
const user = require('../models/users')
const aeronave = require('../models/aeronaves')
const vuelo = require('../models/vuelos')
require('../passport')(passport);

router.post('/registro', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/registro',
    failureFlash: true
}))

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}))


router.post('/realizar-test', ensureAuthenticated, (req, res) => {
    var userId = req.query.id;   
    var r1 = req.body.group1
    var r2 = req.body.group2
    var r3 = req.body.group3
    var r4 = req.body.group4
    
    user.findByIdAndUpdate(userId, {test:true, resultadoTest:[r1, r2, r3, r4]}, (err, userUpdated) => {
        if (err) {
            res.render('test', { errorActualizar: "Ha ocurrido un error al realizar el test" })
        } else {
            if (!userUpdated) {
                res.render('test', { errorActualizar: "No se ha podido realizar el test" })
            } else {
                req.flash('testCompletado', 'Los resultados del test han sido enviados correctamente');
                res.redirect('/');
            }
        }
    })
})



router.post('/nivel1-modulo1', (req, res) => {
    respuesta = req.body.respuesta
    id = req.user.id
    user.findByIdAndUpdate(id, {$set: {"resultadoM1.r1": respuesta} }, (err, userUpdated) => {
        if (err) {
            res.status(500).send("Ha ocurrido un error")
        } else {
            if (!userUpdated) {
                res.status(404).send("No se ha podido enviar la respuesta")
            } else {
                res.status(200).send('Puede avanzar al siguiente módulo');
            }
        }
    });

})

router.post('/nivel1-modulo2', (req, res) => {
    respuesta = req.body.respuesta
    id = req.user.id
    user.findByIdAndUpdate(id, {$set: {"resultadoM1.r2": respuesta} }, (err, userUpdated) => {
        if (err) {
            res.status(500).send("Ha ocurrido un error")
        } else {
            if (!userUpdated) {
                res.status(404).send("No se ha podido enviar la respuesta")
            } else {
                res.status(200).send('Puede avanzar al siguiente módulo');
            }
        }
    });

})


router.post('/nivel1-modulo3', (req, res) => {
    respuesta = req.body.respuesta
    id = req.user.id
    user.findByIdAndUpdate(id, {$set: {"resultadoM1.r3": respuesta} }, (err, userUpdated) => {
        if (err) {
            res.status(500).send("Ha ocurrido un error")
        } else {
            if (!userUpdated) {
                res.status(404).send("No se ha podido enviar la respuesta")
            } else {
                res.status(200).send('Puede avanzar al siguiente módulo');
            }
        }
    });

})


router.post('/nivel1-prueba', ensureAuthenticated, (req, res) => {
    var userId = req.query.id;   
    var r1 = req.body.group1
    var r2 = req.body.group2
    var r3 = req.body.group3
    var r4 = req.body.group4
    
    user.findByIdAndUpdate(userId, { pruebaN1:[r1, r2, r3, r4]}, (err, userUpdated) => {
        if (err) {
            res.render('test', { errorActualizar: "Ha ocurrido un error al realizar el test" })
        } else {
            if (!userUpdated) {
                res.render('test', { errorActualizar: "No se ha podido realizar el test" })
            } else {
                req.flash('testCompletado', 'Los resultados del test han sido enviados correctamente');
                res.redirect('/');
            }
        }
    })
})

router.post('/nivel3-modulo1', (req, res) => {
    respuesta = req.body.respuesta
    id = req.user.id
    user.findByIdAndUpdate(id, {$set: {"resultadoM3.r1": respuesta} }, (err, userUpdated) => {
        if (err) {
            res.status(500).send("Ha ocurrido un error")
        } else {
            if (!userUpdated) {
                res.status(404).send("No se ha podido enviar la respuesta")
            } else {
                res.status(200).send('Puede avanzar al siguiente módulo');
            }
        }
    });

})

router.post('/nivel3-modulo2', (req, res) => {
    respuesta = req.body.respuesta
    id = req.user.id
    user.findByIdAndUpdate(id, {$set: {"resultadoM3.r2": respuesta} }, (err, userUpdated) => {
        if (err) {
            res.status(500).send("Ha ocurrido un error")
        } else {
            if (!userUpdated) {
                res.status(404).send("No se ha podido enviar la respuesta")
            } else {
                res.status(200).send('Puede avanzar al siguiente módulo');
            }
        }
    });

})

router.get('/test', ensureAuthenticated, (req, res) => {
    res.render('test')
})



router.get('/deficit-de-atencion',ensureAuthenticated, (req, res) => {
    res.render("nivel1-index")
})
router.get('/deficit-de-atencion/modulo1', ensureAuthenticated, (req, res) => {
    res.render("nivel1-modulo1")
})
router.get('/deficit-de-atencion/modulo2', ensureAuthenticated, (req, res) => {
    res.render("nivel1-modulo2")
})
router.get('/deficit-de-atencion/modulo3', ensureAuthenticated, (req, res) => {
    res.render("nivel1-modulo3")
})
router.get('/deficit-de-atencion/modulo4', ensureAuthenticated, (req, res) => {
    res.render("nivel1-modulo4")
})
router.get('/deficit-de-atencion/prueba-final', ensureAuthenticated, (req, res) => {
    res.render("nivel1-prueba")
})




router.get('/disgrafia', ensureAuthenticated, (req, res) => {
    res.render("nivel3-index")
})
router.get('/disgrafia/modulo1', ensureAuthenticated, (req, res) => {
    res.render("nivel3-modulo1") 
})
router.get('/disgrafia/modulo2', ensureAuthenticated, (req, res) => {
    res.render("nivel3-modulo2")
})
router.get('/disgrafia/modulo3', ensureAuthenticated, (req, res) => {
    res.render("nivel3-modulo3")
})
router.get('/disgrafia/modulo4', ensureAuthenticated, (req, res) => {
    res.render("nivel3-modulo4")
})
router.get('/disgrafia/prueba-final', ensureAuthenticated, (req, res) => {
    res.render("nivel3-prueba")
})



router.post('/vuelos', ensureAuthenticated, (req, res) => {
    fecha = new Date()
    fechaVuelo = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
    datos = Object.defineProperty(req.body, 'fechaVuelo', { value: fechaVuelo, enumerable: true })
    console.log(datos)
    vuelo.create(datos, (err, vueloRegistrado) => {
        if (err) {
            console.log("Error del sistema")
        }
        else {
            user.findOneAndUpdate({ _id: datos.piloto }, { horasVoladas: req.user.horasVoladas + parseFloat(datos.horasVuelo) },
                (err, userUpdated) => {
                    if (err) {
                        throw err
                    } else {
                        if (!userUpdated) {
                            console.log("No se actualizó el piloto")
                        } else {
                            aeronave.findOneAndUpdate({ _id: datos.aeronave },
                                {
                                    $push: {
                                        observaciones: { descripcion: datos.observaciones, fecha: fechaVuelo }
                                    },
                                    $inc: {
                                        horasActuales: -(parseFloat(datos.horasVuelo)),
                                        horasVoladas: (parseFloat(datos.horasVuelo))
                                    },
                                }, (err, aeronaveUpdated) => {
                                    if (err) {
                                        throw err
                                    } else {
                                        if (!aeronaveUpdated) {
                                            console.log("No se actualizó la aeronave")
                                        } else {
                                            req.flash('correcto', 'El vuelo se registro correctamente');
                                            res.redirect('/users/vuelos')
                                        }
                                    }
                                })

                        }
                    }
                });
        }
    })
})

router.get('/vuelos', ensureAuthenticated, (req, res) => {
    aeronave.find({}, (err, resultado) => {
        if (err) { throw err }
        if (!resultado) {
            console.log("No hay aeronaves")
        } else {
            vuelo.find({ piloto: req.user._id }).populate('aeronave', 'nombre')
                .exec((err, resultadoVuelos) => {
                    if (err) { throw err }
                    if (!resultadoVuelos) {
                        console.log("Error al buscar los vuelos")
                    } else {
                        res.render('vuelos', { aeronaves: resultado, vuelos: resultadoVuelos })
                    }
                })
        }
    })
})


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        if (req.user.tipoUsuario == "Estudiante") {
            return next()
        }else{
            res.redirect('/login')
        }
    }
    else{
        res.redirect('/login')
    }
}




module.exports = router