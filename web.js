var express = require('express');
var fs = require('fs');
var HTMLFILE_DEFAULT = "index.html";

var app = express.createServer(express.logger());

// Reads content of file, if file not found error then it reads the default file
var readhtmlcontent = function(htmlfile) {
    try {
	return fs.readFileSync(htmlfile, "utf-8");
	} catch (e) {
	    if (e.code === 'ENOENT') {
		return fs.readFileSync(HTMLFILE_DEFAULT, "utf-8");
	    } else {
		return e.message;
	    }
	}
};

//Checks for command line arguments for a specified file to use
var htmlfile = process.argv;
if (htmlfile.length > 2) {
    htmlfile = htmlfile.slice(2, htmlfile.length);
    htmlfile = htmlfile.toString();
} else {
    htmlfile = HTMLFILE_DEFAULT;
}

app.get('/', function(request, response) {
    var htmlcontent = readhtmlcontent(htmlfile);
    var buffer = new Buffer(htmlcontent, "utf-8");
    var htmlresponse = buffer.toString('utf-8');
    response.send(htmlresponse);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
