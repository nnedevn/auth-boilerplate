module.exports = function(req,res,next){
  
var phantom = require('phantom');
var cheerio = require('cheerio');

var $ = cheerio.load('<body data-gr-c-s-loaded="true"><div><h1>Example Domain</h1><p>This domain is established to be used for illustrative examples in documents. You may use thisdomain in examples without prior coordination or asking for permission.</p><p><a href="http://www.iana.org/domains/example">More information...</a></p></div></body>');

console.log($('p').text());

};