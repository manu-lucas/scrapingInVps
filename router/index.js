const express = require("express");
const router = express.Router()

const userRoutes = require("./userRoutes");
const sendUser = require("./sendUsers");
const sendFile = require("./sendFile");
const saveInfo = require("./saveInfo");
const saveFacturacion = require("./saveFacturacion")


router.use("/", userRoutes);
router.use("/user", sendUser)
router.use("/upload", sendFile)
router.use("/saveinfo",saveInfo)
router.use("/facturacion",saveFacturacion)

module.exports = router;