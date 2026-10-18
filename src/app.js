const express = require('express');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    estado: 'correcto',
    mensaje: 'API de SismoAyuda funcionando',
  });
});

module.exports = app;