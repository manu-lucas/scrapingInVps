require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs").promises; // fs/promises no es compatible con require
const router = require("./router/index");
const path = require("path");


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const port = 3000;
app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);

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
