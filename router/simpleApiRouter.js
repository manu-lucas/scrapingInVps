const express = require("express");
const urlMonths = require("../services/urlMonth");
const fetchData = require("../services/fetchData");
const processAndCountData = require("../services/processSimpleApi");
const router = express.Router()


// ENDPOINT QUE HACE EL SCRAPING EN SIMPLE API 
router.post('/', async (req, res) => {
    try {
        const {rut, rutRL, claveRL} = req.body
        console.log(rut, rutRL, claveRL)
        const urls = await urlMonths();
        console.log(urls);
        const results = await Promise.all(urls.map(async url => await fetchData(url, rut, rutRL, claveRL)));
        const countData = processAndCountData(results)
        res.status(200).json(countData);
    } catch (error) {
        console.error('Error in post router simpleApi', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router