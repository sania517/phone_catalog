const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 11111;

app.use(cors());

app.use(express.static('build'));

app.get('/data/hotPrices', (req, res) => {
  const filePath = path.join(__dirname, 'src/data/hot_prices.json');
  const data = fs.readFileSync(filePath);

  res.json(JSON.parse(data));
});

app.get('/data/brandNew', (req, res) => {
  const filePath = path.join(__dirname, 'src/data/brand_new.json');
  const data = fs.readFileSync(filePath);

  res.json(JSON.parse(data));
});

app.get('/data/phones', (req, res) => {
  const filePath = path.join(__dirname, 'src/data/phones.json');
  const data = fs.readFileSync(filePath);

  res.json(JSON.parse(data));
});

app.get('/data/tablets', (req, res) => {
  const filePath = path.join(__dirname, 'src/data/tablets.json');
  const data = fs.readFileSync(filePath);

  res.json(JSON.parse(data));
});

app.get('/data/accessories', (req, res) => {
  const filePath = path.join(__dirname, 'src/data/accessories.json');
  const data = fs.readFileSync(filePath);

  res.json(JSON.parse(data));
});

app.get('/data/phones/:phoneId', (req, res) => {
  const filePath = path.join(
    __dirname,
    `src/data/phones/${req.params.phoneId}.json`,
  );
  const data = fs.readFileSync(filePath);

  res.json(JSON.parse(data));
});

app.get('/data/tablets/:tabletId', (req, res) => {
  const filePath = path.join(
    __dirname,
    `src/data/tablets/${req.params.tabletId}.json`,
  );
  const data = fs.readFileSync(filePath);

  res.json(JSON.parse(data));
});

app.get('/data/accessories/:accessoryId', (req, res) => {
  const filePath = path.join(
    __dirname,
    `src/data/accessories/${req.params.accessoryId}.json`,
  );
  const data = fs.readFileSync(filePath);

  res.json(JSON.parse(data));
});

app.listen(PORT, () => {
});
