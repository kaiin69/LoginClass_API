const bcrypt = require("bcryptjs");
const usersModel = require("../models/usersModel");
const jwt = require("jsonwebtoken");


const secret = process.env.JWT_SECRET;
const encodedSecret = Buffer.from(secret).toString("base64");

require("dotenv").config(); //carga la configuración del entorno.

exports.authenticateUser = (req, res) => {
  const { email, password } = req.body;

  usersModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "El ususario no existe" });
      }

      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else if (result) {
          const payload = {
            userId: user._id,
            email: user.email,
            role: user.role,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          res
            .status(200)
            .json({ message: "La autentificación existosa", token });
        } else {
          res.status(401).json({ error: "Autentificación erronea" });
        }
      });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
