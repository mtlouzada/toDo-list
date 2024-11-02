const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const todoRouters = require('../routers/routers.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', todoRouters);

const PORT = 3015;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});