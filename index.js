const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/formulario', (req, res) => {
  const nombre = req.body.nombre;
  const correo = req.body.correo;

  const datos = { nombre, correo };
  const datosJSON = JSON.stringify(datos);

  fs.writeFile('datos.txt', datosJSON, (err) => {
    if (err) {
      console.error('Hubo un error:', err);
      res.status(500).send('Error al guardar los datos.');
    } else {
      console.log('Datos guardados correctamente.');
      res.status(200).send('Datos guardados correctamente.');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
