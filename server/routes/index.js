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



module.exports = router;
