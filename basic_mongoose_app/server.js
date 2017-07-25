require('dotenv').load();
var port = process.env.PORT || 8000;
var express = require('express');
var app = express();

app.get('/', function(request, response){
  response.send("<h1>Hello Express</h1>");
})

app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/users', function(request, response){
  var users_array = [
    {name:"M", email:"m@m"},
    {name:"Ch", email:"ch@ch"},
    {name:"T", email:"t@t"},
    {name:"E", email:"e@e"}
  ];
  response.render('users', {users:users_array});
})


app.listen(port, function() {
  console.log("Server running on port: ", port);
})
