const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path'); // Agregamos el módulo 'path' para manipular rutas de archivos
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/formulario', (req, res) => {
  const usuario_id = req.body.usuario_id;
  const usuario_nombre = req.body.usuario_nombre;
  const usuario_apellido = req.body.usuario_apellido;
  const libro_titulo = req.body.libro_titulo;
  const libro_autor = req.body.libro_autor;
  const libro_editorial = req.body.libro_editorial;
  const libro_anio = req.body.libro_anio;

  if (!usuario_id || !usuario_nombre || !usuario_apellido || !libro_titulo || !libro_autor || !libro_editorial || !libro_anio) {
    res.redirect('/error.html');
  } else {
    const datos = {
      usuario_id,
      usuario_nombre,
      usuario_apellido,
      libro_titulo,
      libro_autor,
      libro_editorial,
      libro_anio
    };

    const datosJSON = JSON.stringify(datos);

    const rutaArchivo = path.join(__dirname, 'data', `${usuario_id}.txt`);

    fs.writeFile(rutaArchivo, datosJSON, (err) => {
      if (err) {
        console.error('Hubo un error:', err);
        res.status(500).send('Error al guardar los datos.');
      } else {
        console.log('Datos guardados correctamente.');
        res.status(200).send('Datos guardados correctamente.');
      }
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
