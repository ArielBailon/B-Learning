mongoose = require('mongoose')
Schema = mongoose.Schema

AeronaveSchema = Schema({
    nombre: { type: String },
    modelo: { type: String },
    serie: { type: String },
    fabricante: { type: String },
    anio: { type: Number },
    fechaIngreso: { type: String },
    estadoCompra: { type: String },
    horasActuales: { type: Number }, //  Horas disponibles
    horasVoladas: { type: Number },
    reparto: { type: String },
    observaciones: { type: Array },
    fechaRegistro: { type: Date, default: new Date() },
})

module.exports = mongoose.model('Aeronave', AeronaveSchema)

