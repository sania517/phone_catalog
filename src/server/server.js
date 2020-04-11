const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 11111;

app.use(cors());

app.get('/phones', (req, res) => {
  const filePath = path.join(__dirname, '../data/phones.json');
  const data = fs.readFileSync(filePath);

  res.json(JSON.parse(data));
});

app.get('/tablets', (req, res) => {
  const filePath = path.join(__dirname, '../data/tablets.json');
  const data = fs.readFileSync(filePath);

  res.json(JSON.parse(data));
});

app.get('/accessories', (req, res) => {
  const filePath = path.join(__dirname, '../data/accessories.json');
  const data = fs.readFileSync(filePath);

  res.json(JSON.parse(data));
});

app.get('/phones/:phoneId', (req, res) => {
  const filePath = path.join(
    __dirname,
    `../data/phones/${req.params.phoneId}.json`,
  );
  const data = fs.readFileSync(filePath);

  res.json(JSON.parse(data));
});

app.get('/tablets/:tabletId', (req, res) => {
  const filePath = path.join(
    __dirname,
    `../data/tablets/${req.params.tabletId}.json`,
  );
  const data = fs.readFileSync(filePath);

  res.json(JSON.parse(data));
});

app.get('/accessories/:accessoryId', (req, res) => {
  const filePath = path.join(
    __dirname,
    `../data/accessories/${req.params.accessoryId}.json`,
  );
  const data = fs.readFileSync(filePath);

  res.json(JSON.parse(data));
});

app.listen(PORT, () => {
});
