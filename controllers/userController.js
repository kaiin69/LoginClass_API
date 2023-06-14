const userModel = require("../models/usersModel");
const bcrypt = require("bcryptjs");

// obtener todos los usuarios
exports.getAllUsers = (req, res) => {
  userModel.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json(
      { error: err.message }
      ));
};

// Crear un nuevo usuario
exports.createUser = (req, res) => {
  const { username, email, password } = req.body;

  const saltRounds = 10; // cantidad de rondas de para generar el hash de la contraseña.
  
  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      res.status(500).json(
        { error: err.message });
    } else {
      const newUser = new userModel({
        username,
        email,
        password: hash,
        picture:""
      });
      newUser
        .save()
        .then(() => res.status(201).json(
          { success: "Se creo el usuario exitosamente" }
          ))
        .catch((err) => res.status(500).json(
          { error: err.message }
          ));
    }
  });
};


// Actualizar un usuario existente
exports.updateUser = (req, res) => {

  const { id } = req.params;
  
  const { username, email, password } = req.body;
  const avatarFileName = req.file ? req.file.filename:null;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      res.status(500).json(
        { error: err.message });
    }
    else {
      userModel.findByIdAndUpdate(id, { username, email, password: hash, picture:avatarFileName }, { new: true })
        .then(user => {
          if (!user) throw new Error(`El usuario con el ID ${id} no existe`);
          res.status(200).json(
            { user });
        })
        .catch(err => res.status(404).json(
          { error: err.message }
          ));
    }
  });
};

// Eliminar un usuario existente
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  
  userModel
    .findByIdAndDelete(id)
    .then(user => {
      if (!user) throw new Error(`El usuario con el ID ${id} no existe`);
      res.status(200).json(
        { message: "Usuario Elimiado" });
    })
    .catch((err) => res.status(500).json(
      { error: err.message }
      ));
};


// obtener un usuario por su email
exports.getUser = (req, res) => {
  const { email } = req.params;
  userModel.findOne({ email })
    .then(user => res.json(user))
    .catch(err => res.status(404).json(
      { error: err.message }
      ));
};