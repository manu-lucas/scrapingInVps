const express = require("express");
const router = express.Router()

const userRoutes = require("./userRoutes");
const sendUser = require("./sendUsers");
const sendFile = require("./sendFile");
const saveInfo = require("./saveInfo");
const saveFacturacion = require("./saveFacturacion")
const simpleApiRouter = require("./simpleApiRouter")

router.use("/", userRoutes);
router.use("/user", sendUser)
router.use("/upload", sendFile)
router.use("/saveinfo",saveInfo)
router.use("/facturacion",saveFacturacion)
router.use("/simpleapi", simpleApiRouter)

module.exports = router;