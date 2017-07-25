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
mongoose.connect('mongodb://localhost/basic_mongoose');
mongoose.Promise = global.Promise;
var UserSchema = new mongoose.Schema({
  name: String,
  age: Number
})
mongoose.model('User', UserSchema)
var User = mongoose.model('User')

app.get('/', function(req, res){
  User.find({}, function(err, users) {
    if(err){
      console.log("Something went wrong in GET!");
      res.render('index');
    } else{
      console.log("Success!!!");
      res.render('index', {users: users} );
    }
  })
})

app.post('/users', function(req, res) {
  console.log("POST DATA ", req.body);
  var user = new User({name: req.body.name, age: req.body.age});
  user.save(function(err){
    if(err){
      console.log("Something went wrong!");
    } else{
      console.log("Successfully added a new user.");
      res.redirect('/');
    }
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
})
