require('dotenv').load();
var port = process.env.PORT || 8000;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quoting');
mongoose.Promise = global.Promise;
var QuoteSchema = new mongoose.Schema({
  name: String,
  quote: String
}, {timestamps: true});
mongoose.model('Quote', QuoteSchema)
var Quote = mongoose.model('Quote')

app.get('/', function(req, res){
  res.render('index');
})

app.get('/quotes', function(req, res){
  Quote.find({}, function(err, quotes) {
    if(err){
      console.log("Something went wrong in GET!");
      res.render('error');
    } else{
      console.log("Success!!!");
      res.render('quotes', {quotes: quotes} );
    }
  })
})

app.post('/quotes', function(req, res) {
  console.log("POST DATA ", req.body);
  var quote = new Quote({name: req.body.name, quote: req.body.quote});
  quote.save(function(err){
    if(err){
      console.log("Something went wrong!");
      res.render('error');
    } else{
      console.log("Successfully added a new quote.");
      res.redirect('/');
    }
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
})


//
/*
var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path'),
    port = 8000,
    app = express();

// Set up body-parser to parse form data
app.use(bodyParser.urlencoded({extended: false}));

// Set up database connection, Schema, model
mongoose.connect('mongodb://localhost/quoting_dojo');

var QuoteSchema = new mongoose.Schema({
  name: String,
  quote: String
});

var Quote = mongoose.model('quotes', QuoteSchema);

// Point server to views
app.set('views', path.join(__dirname, './views'));
// We're using ejs as our view engine
app.set('view engine', 'ejs');

// Here are our routes!
app.get('/', function(req, res){
  res.render('welcome');
});

app.get('/quotes', function(req, res){
  // Logic to grab all quotes and pass into the rendered view
  Quote.find({}, function(err, results){
    if(err) { console.log(err); }
    res.render('quotes', { quotes: results });
  });
});

app.post('/quotes', function(req, res){
  Quote.create(req.body, function(err){
    if(err) { console.log(err); }
    res.redirect('/quotes');
  });
});
// END OF ROUTING...

app.listen(port);
*/
