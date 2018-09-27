const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('../db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 4000;

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
        // console.log("Id is not valid");
        return notFound(res);
    }

    Todo.findById(id).then((todo) => {
        if(!todo){
            // console.log("No todo is found");
            return notFound(res);
        }
        res.send({todo});
    }).catch((e) => {
        // console.log("Error in finding ID");
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

app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
});

module.exports = {
    app
}