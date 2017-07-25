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
mongoose.connect('mongodb://localhost/animals');
mongoose.Promise = global.Promise;
var AnimalSchema = new mongoose.Schema({
  name: String,
  age: Number
})
mongoose.model('Animal', AnimalSchema)
var Animal = mongoose.model('Animal')
//INDEX PAGE
app.get('/', function(req, res) {
  Animal.find({}, function(err, results) {
    if(err){ console.log(err); }
    res.render('index', {animals: results});
 })
})
//SHOW FORM FOR NEW ANIMAL
app.get('/new', function(req, res) {
  res.render('new');
})
//ADD NEW ANIMAL
app.post('/add', function(req, res) {
  // console.log("POST DATA ", req.body);
  // var animal = new Animal({name: req.body.name, age: req.body.age});
  // animal.save(function(err){
  //   if(err){
  //     console.log("Something went wrong!");
  //   } else{
  //     console.log("Successfully added a new animal.");
  //     res.redirect('/');
  //   }
  // });
  Animal.create(req.body, function(err, result){
    if(err){ console.log(err); }
    res.redirect('/');
  });
})
//SHOW SPECIFIC ANIMAL
app.get('/:id', function(req, res) {
  Animal.find({_id: req.params.id}, function(err, result) {
    if(err){ console.log(err); }
    res.render('show', {animal: result[0]});
  })
})

//SHOW SPECIFIC ANIMAL FOR EDIT
app.get('/edit/:id', function(req, res) {
  Animal.find({_id: req.params.id}, function(err, response) {
    if(err){ console.log(err); }
    res.render('edit', {animal: response[0]});
 });
})
//UPDATE SPECIFIC ANIMAL FROM EDIT
app.post('/:id', function(req, res) {
  Animal.update({_id: req.params.id}, req.body, function(err, result) {
    if(err){ console.log(err); }
    res.redirect('/');
  });
})

app.post('/delete/:id', function(req, res) {
  Animal.remove({_id: req.params.id}, function(err, result) {
    if(err){ console.log(err); }
    res.redirect('/');
  })
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
})
