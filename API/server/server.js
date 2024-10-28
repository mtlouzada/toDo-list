const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const todoRoutes = require('./todos/routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', todoRoutes);

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});