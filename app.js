const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.use(express.static('public')); 

// Ruta para reservar
app.post('/reservar', (req, res) => {
  const { personas, fecha, hora } = req.body;
  if (!personas || !fecha || !hora) {
    return res.status(400).json({ message: 'Por favor, complete todos los campos.' });
  }

  db.run('INSERT INTO reservas (personas, fecha, hora) VALUES (?, ?, ?)', [personas, fecha, hora], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al realizar la reserva.' });
    }

    res.status(200).json({ message: 'Reserva hecha exitosamente' });
  });
});

// ruta para obtener las reservas existentes
app.get('/reservas', (req, res) => {
  db.all('SELECT * FROM reservas', (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener las reservas.' });
    }
    return res.status(200).json({ reservas: rows });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
