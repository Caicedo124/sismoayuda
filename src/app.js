const express = require('express');
const apiRoutes = require('./routes/index');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    estado: 'correcto',
    mensaje: 'API de SismoAyuda funcionando',
  });
});

app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

module.exports = app;