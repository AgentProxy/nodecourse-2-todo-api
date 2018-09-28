require('./config/config.js');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('../db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req,res)=>{
    let todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
});

var notFound = (res) => {
    res.status(404).send();
}

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return notFound(res);
    }

    Todo.findById(id).then((todo) => {
        if(!todo){
            return notFound(res);
        }
        res.send({todo});
    }).catch((e) => {
        return res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return notFound(res);
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            return notFound(res);
        }
        res.status(200).send({todo});
    }).catch((e) => {
        return res.status(400).send();
    })
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectID.isValid(id)){
        return notFound(res);
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }
    else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return notFound(res);
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});

// USER

app.post('/users/add', (req, res) =>{
    var body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.post('/users/login', (req,res) => {
    let body = _.pick(req.body, ['email' , 'password']);
    
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
});

app.get("/users/me", authenticate, (req, res) => {
    res.send(req.user);
})

module.exports = {
    app
}