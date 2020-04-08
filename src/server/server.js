const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 11111;

app.use(cors());

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../data/phones.json');
  const data = fs.readFileSync(filePath);

  res.json(JSON.parse(data));
});

app.get('/:phoneId', (req, res) => {
  const filePath = path.join(__dirname, `../data/${req.params.phoneId}.json`);
  const data = fs.readFileSync(filePath);

  res.json(JSON.parse(data));
});

app.listen(PORT, () => {
});
