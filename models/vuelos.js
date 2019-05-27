mongoose = require('mongoose')
Schema = mongoose.Schema

VueloSchema = Schema({
    origen: { type: String },
    llegada: { type: String },
    horasVuelo: { type: String },
    fechaVuelo: { type: String },
    aeronave: { type: Schema.Types.ObjectId, ref: 'Aeronave' },
    piloto: { type: Schema.Types.ObjectId, ref: 'User' },
    observaciones: { type: String },
    fechaRegistro: { type: Date, default: new Date() },
})

module.exports = mongoose.model('Vuelo', VueloSchema)