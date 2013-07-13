var express = require('express');
var fs = require('fs');
var HTMLFILE_DEFAULT = "index.html";

var app = express.createServer(express.logger());

// Reads content of file, if file not found error then it reads the default file 
var readhtmlcontent = function(htmlfile) {
    var htmlcontent;
    try {
	return htmlcontent = fs.readFileSync(htmlfile, "utf-8");
	} catch (e) {
	    if (e.code === 'ENOENT') {
		return htmlcontent = fs.readFileSync(HTMLFILE_DEFAULT, "utf-8");

//		return "File not found! " + e.message;

	    } else {
//		throw e;
		return e.message;
	    }
	}	    

//    return fs.readFileSync(htmlfile, "utf-8");

};

//var getbuffer = function(htmlfile) {    
//    var htmlcontent = readhtmlcontent(htmlfile);
//    var buffer = new Buffer(htmlcontent, "utf-8");
//    return buffer;
//    return htmlcontent;
//};

//Checks for command line arguments for a specified file to use
var htmlfile = process.argv;
if (htmlfile.length > 2) {
    htmlfile = htmlfile.slice(2, htmlfile.length);
    htmlfile = htmlfile.toString();
} else {
    htmlfile = HTMLFILE_DEFAULT;   
};
	
app.get('/', function(request, response) {    
//    var buffer = new Buffer(256);
//    buffer = getbuffer(htmlfile);

    var htmlcontent = readhtmlcontent(htmlfile);
    var buffer = new Buffer(htmlcontent, "utf-8");
    var htmlresponse = buffer.toString('utf-8');
    response.send(htmlresponse);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
