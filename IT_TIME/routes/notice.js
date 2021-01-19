const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

var express = require('express');
var router = express.Router();

const url = "https://it.jbnu.ac.kr/it/9841/subview.do"

const getHtml = async (url) => {
    try {
        return await axios.get(url);
    } catch (error) {
        console.error(error);
    }
};

router.get('/', function (req, res, next) {
getHtml(url)
    .then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("tbody tr");

        $bodyList.each(function(i, elem) {
            ulList[i] = {
                title: $(this).find('td a strong').text(),
                url: $(this).find('td a').attr('href'),
                date: $(this).find('td._artclTdRdate').text()
            };

        });
        return ulList
    })
.then(result => res.render('notice', { list : result , length : result.length}));
});



module.exports = router;