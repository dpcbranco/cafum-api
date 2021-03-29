const mongoose = require("mongoose")

module.exports = (uri) => {
    const db = mongoose.connection
    // cria conexão, utilizando parametros da ultima versão do MongoDB
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Connected to database!")
    });
}
