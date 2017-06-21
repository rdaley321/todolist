const express = require('express');
const app = express()
const mustache = require('mustache-express');
const bodyParser = require('body-parser');

app.engine('mustache', mustache() )
app.set('view engine', 'mustache');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, function(){
  console.log("ok cool, listening!")
});

const todos = [
  "Wash the car"
];
const complete = []

app.get("/", function (req, res) {
  res.render('todo', { todos: todos, complete: complete });
});

app.post("/", function (req, res) {
  todos.push(req.body.todo);
  res.redirect('/');
})

app.post("/complete", function(req, res) {
  const pop = req.body.mark
  todos.splice(todos.indexOf(pop), 1)
  complete.push(pop)
  res.redirect('/')
})
