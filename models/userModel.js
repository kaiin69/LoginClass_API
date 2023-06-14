const mongoose = require("mongoose");
const Uri = "";

mongoose.connect(Uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Se conecto correctamente con la base de datos"))
.catch(err => console.log("no se conecto correctamente con la base de datos", err));

const userSchema = new mongoose.Schema({

    username: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    picture: {type:String},
    role: {type:String, default:"user"}
});

module.exports = mongoose.model('Usuarios', userSchema);