'use strict'

const LocalStrategy = require('passport-local').Strategy
var user = require('./models/users')
//var flash = require('connect-flash')

module.exports = (passport) => {

	passport.serializeUser((user, done) => {
		done(null, user.id);
	})

	passport.deserializeUser((id, done) => {
		user.findById(id, (err, user) => {
			done(err, user)
		})
	})

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'correo',
		passwordField: 'contrasena',
		passReqToCallback: true
	}, (req, email, password, done) => {
		var newUser = new user()
		user.findOne({ 'correo': email }, (err, us) => {
			if (err) { return done(err) }
			if (us) {
				return done(null, false, req.flash('errorRegistro', 'Esta dirección de correo ya está registrada'))
			}
			else {
				if (password != req.body.contrasena2) {
					return done(null, false, req.flash('errorRegistro', 'Las contraseñas no coinciden'))
				} else {
					newUser.nombres = req.body.nombres
					newUser.apellidos = req.body.apellidos
					newUser.correo = email
					newUser.contrasena = newUser.generateHash(password)
					newUser.test = false
					newUser.save((err) => {
						if (err) { throw err }
						return done(null, newUser)
					})
				}
			}
		})
	}))

	passport.use('local-login', new LocalStrategy({
		usernameField: 'correo',
		passwordField: 'contrasena',
		passReqToCallback: true
	}, (req, email, password, done) => {
		user.findOne({ 'correo': email }, (err, user) => {
			if (err) { return done(err) }
			if (!user) {
				return done(null, false, req.flash('errorLogin', 'Este estudiate no está registrdo'))
			}
			if (!user.validatePassword(password, user)) {
				return done(null, false, req.flash('errorLogin', 'Contraseña incorrecta'))
			}
			return done(null, user)
		})
	}))
}	