const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const usersControllers = require('../controllers/usersControllers');

router.get('/', usersControllers.getAllUsers);

router.post('/create', usersControllers.createUser);

router.put('/update/:id', usersControllers.updateUser);

router.delete('/delete/:id', usersControllers.deleteUser);

router.post('/login', authControllers.authenticateUser);

router.get('/:email', usersControllers.getUser);

module.exports = router;