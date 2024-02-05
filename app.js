require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs").promises; // fs/promises no es compatible con require
const router = require("./router/index");
const path = require("path");
const urlMonths = require('./services/urlMonth');
const fetchData = require('./services/fetchData');
const { log } = require('console');



const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const port = 3000;
app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error("acahay un error",err);
  res.status(status).send(message);
});



const uploadDir = path.resolve(__dirname, "uploads");
fs.mkdir(uploadDir, { recursive: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`La aplicación está escuchando en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error al crear el directorio de carga:", error);
  });



// ENDPOINT QUE HACE EL SCRAPING EN SIMPLE API 
app.post('/', async (req, res) => {
  try {
      const {rut, rutRL, claveRL} = req.body
      console.log(rut, rutRL, claveRL)
      const urls = await urlMonths();
      console.log(urls);
      const results = await Promise.all(urls.map(async url => await fetchData(url, rut, rutRL, claveRL)));
      res.json(results);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' }); // Maneja el error y devuelve una respuesta 500
  }
});