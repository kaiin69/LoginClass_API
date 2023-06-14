const bcrypt = require('bcryptjs');
const saltRounds = 10;
const plainPassword = 'password123';

bcrypt.hash(plainPassword, saltRounds, function (error, hash) {
    if (error) {
        console.log(error);
    } 
    else {
        console.log('Se creó el hash de la contraseña:', hash); // muestra en la consola el hash de la contraseña generada.
    }
});

const hashedPassword = '$2b$10$';
const loginPassword = 'password123';

bcrypt.compare(loginPassword, hashedPassword, function (error, result) {
    if (error) {
        console.log(error);
    } 
    else if (result) {
        console.log('La contraseña es válida');
    } 
    else {
        console.log('La contraseña no es válida');
    }
});