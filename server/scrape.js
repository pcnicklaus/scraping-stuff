// dependencies
var csv = require('csv');
var fs = require('fs');
var request=require("request");
var cheerio=require("cheerio");
var writeStream = fs.createWriteStream("file.csv");

var scrapedHacker;
var scrapedReddit;
var scrapedMDN;
var allHacker = [];
var allReddit = [];
var allMDN = []
var allHackerString = '';
var allRedditString = '';
var allMdnString = '';
var javascriptReddit;
var javascriptHacker;

// write headers to csv
writeStream.write('Title,' + 'URL' + '\n');

var reddit = getReddit();


// perfrom request
request('https://news.ycombinator.com', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    // console.log(html)
    // pass DOM to cheerio
    var $ = cheerio.load(html);
    $('span.comhead').each(function(i, element){
      // select previous element
      var a = $(this).prev();
      // parse the link title
      var title = a.text();
      // parse the href attribute from the "a" element:
      var url = a.attr('href');

      // write data to csv
      writeStream.write(title + ',' + url + '\n');

      // data store in an object (for dumping to mongo)
      scrapedHacker = title;
    });
    javascriptHacker = scrapedHacker.match(/javascript/g);
    // console.log(allHackerString);
    console.log("\nDONE! hacker\n")
  }
});

request('https://www.reddit.com/r/Web_Development/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    // console.log(html)
    // pass DOM to cheerio
    var $ = cheerio.load(html);

      $('span.domain').each(function(i, element){
        // select previous element
        var a = $(this).prev();
        // parse the link title
        var title = a.text();
        // parse the href attribute from the "a" element:
        var url = a.attr('href');

        // write data to csv
        writeStream.write(title + ',' + url + '\n');

        // data store in an object (for dumping to mongo)
        scrapedReddit = title;

      });
      javascriptReddit = scrapedReddit.match('/javascript/g');


    console.log("\nDONE! reddit\n");
    // console.log(allReddit);
  }
});

// var javascriptReddit = allHackerString.match(/javascript/g);
// console.log(javascriptReddit);
// var javascriptHacker = allRedditString.match('/javascript/g');
// console.log(javascriptHacker);

function returnMDN() {
  if (javascriptReddit && javascriptHacker) {
    console.log('javascript firing')
    request('https://developer.mozilla.org/en-US/docs/Web/JavaScript/', function (error, response, html) {
      if (!error && response.statusCode == 200) {
        // console.log(html)
        // pass DOM to cheerio
        var $ = cheerio.load(html);
        $('span.comhead').each(function(i, element){
          // select previous element
          var a = $(this).prev();
          // parse the link title
          var title = a.text();
          // parse the href attribute from the "a" element:
          var url = a.attr('href');

          // write data to csv
          writeStream.write(title + ',' + url + '\n');

          // data store in an object (for dumping to mongo)
          var scrapedMDN = {
            title: title
          };
          allMDN.push(scrapedMDN);
          //console.log(scrapedData);
        });
        console.log("\nDONE! mdn\n")
      }
    });

  }
  else {
    request('https://www.python.org/', function (error, response, html) {
      console.log('python firing')
      if (!error && response.statusCode == 200) {
        // console.log(html)
        // pass DOM to cheerio
        var $ = cheerio.load(html);
        $('p').each(function(i, element){
          // select previous element
          var a = $(this).prev();
          // parse the link title
          var title = a.text();
          // parse the href attribute from the "a" element:
          var url = a.attr('href');

          // write data to csv
          writeStream.write(title + ',' + url + '\n');

          // data store in an object (for dumping to mongo)
          var scrapedMDN = title;
        });
      }
    });
  }
}
returnMDN();

// var res = str.match(/ain/g);
