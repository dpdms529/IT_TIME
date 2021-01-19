const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

var express = require('express');
var router = express.Router();



const getHtml = async () => {
    try {
        return await axios.get("https://it.jbnu.ac.kr/it/9841/subview.do");
    } catch (error) {
        console.error(error);
    }
};

router.get('/notice', function (req, res, next) {
getHtml()
    .then(html => {
        let ulList = [];
        let title;
        let url;
        let date;
        const $ = cheerio.load(html.data);
        const $bodyList = $("tbody tr");

        $bodyList.each(function(i, elem) {
            ulList[i] = {
                title: $(this).find('td a strong').text(),
                url: $(this).find('td a').attr('href'),
                date: $(this).find('td._artclTdRdate').text()
            };

        });
        return ulList.filter(n => n.title);
    })
.then(result => res.render('index', { title: res }));
});


router.get('/', function (req, res, next) {

    res.render('notice', {
        title: getHtml().title,
        url: getHtml().url,
        date: getHtml().date
    });
});

module.exports = router;