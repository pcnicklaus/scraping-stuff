var express = require('express');
var router = express.Router();

// dependencies
var csv = require('csv');
var fs = require('fs');
var request=require("request");
var cheerio=require("cheerio");
var writeStream = fs.createWriteStream("file.csv");

var scrapedHacker;
var scrapedReddit;
var scrapedMDN;


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hell', function (req, res, next) {
  //ajax request
  var url = 'https://news.ycombinator.com';
  var html = request(url, function (err, response, html) {
      //parse htm with cheerio
      var $ = cheerio.load(html)
      // not JQUERY!!! this is cheerio made to look lke jquery because of above line...
      var test = $('td.title a').first().text();
      console.log(test);

      res.send('hi');


  });



});



module.exports = router;
