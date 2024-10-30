const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const todoRoutes = require('./api/routes/routes.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', todoRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});