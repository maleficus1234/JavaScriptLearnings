// Load dependencies

// Express is a minimalist web framework
var express = require('express');
// body-parser parses the body of a post. Needed to get form submissions
var bodyParser = require('body-parser');
// consolidate is a template engine: needed for inserting markup
var engines = require('consolidate');

// Create the express web app
var app = express();

// The client side will encode as urlencoded, so we need the corresponding parser on the server side
app.use(bodyParser.urlencoded({ extended: true }));
// Where the html files are
app.set('html', __dirname + '/views');
// The engine to use for markup and rendering of html files
app.engine('html', engines.mustache);
app.set('view engine', 'html');

// Handle GETS for the root address
app.get('/', function (req, res) {
    // Just return the main page as-is.
    res.sendFile('views/main.html', { root: __dirname })
});

// Handle GETS for /hide
app.get('/hide', function (req, res) {
    // Return a demo that uses JQuery to hide text when clicked on
    res.sendFile('views/hide.html', { root: __dirname }) 
});

// Handle GETS for hidespecific
app.get('/hidespecific', function (req, res) {
    // Return a demo that hids a specific line of text when clicked
    res.sendFile('views/hidespecific.html', { root: __dirname })
});

// Handle GETS for /clientfib
app.get('/clientfib', function (req, res) {
    // Return a demo that uses JQuery to do a client side calculation of the nth number in the fibonacci sequence
    res.sendFile('views/clientfib.html', { root: __dirname })
});

// Handle GETS for /serverfib
app.get('/serverfib', function (req, res) {
    // Return a demo that performs server-side calculation of the nth number in the fibonacci sequence
    res.render('serverfib.html', { root: __dirname, fibres: ""  })
});

// Handle POSTS for /service/fib:
// Receive a value, test that it is an integer. If it is,
// display a fibonacci value
app.post('/service/fib', function (req, res) {

    // We need a fibonacci function
    var fib = function (n) {
        if (n < 2) {
            return 1;
        } else {
            return fib(n - 2) + fib(n - 1);
        }
    }

    // Get the value for the textbox in the form submission
    var nstr = req.body.nth;

    // Store the user message here
    var n = "";

    // Test if this is a number
    if (isNaN(nstr)) {
        n = "position must be an integer";
    }
    // Test if this is an integer
    else if (Math.floor(nstr) != nstr) {
        n = "position must be an integer";
    }
    // If we got this far, it's an integer number, so
    // calculate the fibonacci number'
    else {
        n = fib(nstr);
    }

    // Return the same website, with the fibonacci number or error displayed
    res.render('serverfib.html', { root: __dirname, fibres: n });
});

var port = process.env.PORT || 80;
var server = app.listen(port);
console.log('Test Node.js app started on port: ' + port);