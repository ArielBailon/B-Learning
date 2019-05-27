'use stric'
const mongoose = require('mongoose'),
    app = require('./app'),
    port = process.env.PORT || 3000,
    http = require('http').Server(app);
    url = "mongodb://ariel:ariel1995@cluster0-shard-00-00-giri8.mongodb.net:27017,cluster0-shard-00-01-giri8.mongodb.net:27017,cluster0-shard-00-02-giri8.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
    { useNewUrlParser: true }

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    
mongoose.Promise = global.Promise;
mongoose.connect(url)
    .then(() => {
        console.log("Conectado a la base de datos correctamente");
        http.listen(port, '0.0.0.0', () => {
            console.log("Aplicación corriendo en: http://localhost:" + port);
        });
    }).catch(err => console.log(err))


// mongoose.connect('mongodb://AdminPCEB:passtodb95@ds151222.mlab.com:51222/catalogo_servicios', (err, res) => {

// Nueva string de mongo da error, se usa la 2.2
// mongodb+srv://Administrador:2oRmnR58jfcFdpas@cluster0-no1gz.mongodb.net/aula


