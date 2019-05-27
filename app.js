const cookieParser = require('cookie-parser')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')
const app = express();
const MemoryStore = session.MemoryStore;
const indexRoutes = require('./routes/index')
const userRoutes = require('./routes/users')
const adminRoutes = require('./routes/admin')
const config = require("./configuracion")

config.configuracionInicial()

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'resources/')))

app.engine('hbs', exphbs({       // ----->  Configuración del motor de plantillas
    defaultLayout: 'principal',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: 'hbs',
    helpers: { // Para usar condiciones de igualdad en las plantillas
        if_equal: (a, b, opts) => {
            if (a == b) {
                return opts.fn(this)
            } else {
                return opts.inverse(this)
            }
        },
        counter: (index) => {
            return index + 1;
        },
        and: (a, b) => {
            if (a && b) {
                return a && b
            }
        }, 
        or: (a, b, opts) => {
            if (a || b) {
                return a || b
            }
        }, 
        eq: (a, b) => {
            if (a == b) {
                return a == b
            }
        },
    }
}))


app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

// Configuración de passport para sesiones

app.use(session({
    secret: 'pesecret',
    resave: true,
    saveUninitialized: true,
    store: new MemoryStore(),
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Luego se podrá acceder a req.user (debe ir luego de initialize y session)
app.use((req, res, next) => {
    res.locals.user = req.user || null
    res.locals.messages = require('express-messages')(req, res)();
    next()
})

app.use('/', indexRoutes)
app.use('/users', userRoutes)
app.use('/admin', adminRoutes)


module.exports = app