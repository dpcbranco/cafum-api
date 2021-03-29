const mongoose = require("mongoose")

module.exports = (uri) => {
    const db = mongoose.connection
    mongoose.connect(uri)
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Connected to database!")
    });
}
