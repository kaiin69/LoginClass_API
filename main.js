const express = require('express');
const cors = require('cors');

// Guardamos en "app" los métodos de la librería express.
const app = express();

// Definimos el puerto en el que se ejecutará el servidor.
const port = 3000;

// Rutas para las APIs de usuarios y contenido.
const usersRoutes = require("./API/routes/usersRoutes");

// Configuramos CORS para permitir el acceso desde cualquier origen.
app.use(cors({
  origin: "*"
}));

// Utilizamos el middleware para analizar el cuerpo de la solicitud y convertirlo en un objeto JSON.
app.use(express.json());

app.use('/users', usersRoutes);

app.listen(port, () => {
  console.log("El servidor se ejecuta en el puerto http://localhost:" + port); // Muestra en consola el puerto en el que está corriendo el servidor.
});