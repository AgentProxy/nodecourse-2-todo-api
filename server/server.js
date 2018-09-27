const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('../db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

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
    res.status(400).send();
}

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        console.log("Id is not valid");
        return notFound(res);
    }

    Todo.findById(id).then((todo) => {
        if(!todo){
            console.log("No todo is found");
            return notFound(res);
        }
        res.send({todo});
    }).catch((e) => {
        console.log("Error in finding ID");
        return notFound(res);
    });
    //respond with 404 if invalid, send back empty body
    //findbyid: success(send it back, if no (send back 404 with empty body)) and error case(400 and send empty body)
    // res.send(req.params);
});

app.listen(4000, ()=>{
    console.log('Started on port 4000');
});

module.exports = {
    app
}