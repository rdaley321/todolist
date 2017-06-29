const express = require('express');
const app = express()
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const models = require("./models/")

app.engine('mustache', mustache())
app.set('view engine', 'mustache');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));

app.listen(3000, function() {
  console.log("ok cool, listening!")
});

app.get("/", function(req, res) {
  let complete = []
  let incomplete = []

  models.Todo.findAll({order: [['createdAt', 'DESC']]}).then(function(todos) {
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].complete === true) {
        complete.push(todos[i])
      } else {
        incomplete.push(todos[i])
      }
    }
  }).then(function() {
    return res.render('todo', {
      incomplete: incomplete,
      complete: complete
    })
  })
})

app.post("/", function(req, res) {
  let title = req.body.todo
  models.Todo.create({title: title, complete: false}).then(function() {
    return res.redirect('/')
  })
})

app.post("/complete", function(req, res) {
  models.Todo.update({
    complete: true
  }, {
    where: {
      id: req.body.id
    }
  }).then(function() {
    return res.redirect('/')
  })
})

app.post('/delete', function(req, res) {
  models.Todo.destroy({
    where: {
      id: req.body.id
    }
  }).then(function() {
    return res.redirect('/')
  })
})
app.post('/deleteAll', function(req, res) {
  models.Todo.destroy({
    where: {
      complete: true
    }
  }).then(function() {
    return res.redirect('/')
  })
})
