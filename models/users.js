mongoose = require('mongoose')
bcrypt = require('bcryptjs')
Schema = mongoose.Schema


UserSchema = Schema({
    
    nombres: { type: String },
    apellidos: { type: String },
    correo: { type: String, unique: true },
    contrasena: { type: String },
    test: { type: Boolean, default:false },
    resultadoTest: {type: Array},
    tipoUsuario: { type: String, default: 'Estudiante' },
    nivel1: { type: Boolean, default:true },
    nivel2: { type: Boolean, default:false },
    nivel3: { type: Boolean, default:false },
    fechaRegistro: { type: Date, default: new Date() },


    resultadoM1: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    resultadoM2: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    resultadoM3: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    resultadoM4: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    pruebaN1: {type: Array },

    resultadoM1N2: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    resultadoM2N2: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    resultadoM3N2: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    resultadoM4N2: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    pruebaN1N2: {type: Array },

    resultadoM1N3: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    resultadoM2N3: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    resultadoM3N3: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    resultadoM4N3: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    pruebaN1N3: {type: Array }


})


/*resultadoM1: {type: Array, default:[{id:1, r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}]},
    resultadoM2: {type: Array, default:[{id:2, r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}]},
    resultadoM3: {type: Array, default:[{id:3, r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}]},
    resultadoM4: {type: Array, default:[{id:4, r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}]}, */


// Cifra la contraseña
UserSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// Compara la contraseña ingresada por el usuario con la de la base de datos
UserSchema.methods.validatePassword = (password, user) => {
    return bcrypt.compareSync(password, user.contrasena)
}

module.exports = mongoose.model('User', UserSchema)