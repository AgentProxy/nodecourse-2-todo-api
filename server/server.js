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

app.post('/todos', authenticate, (req,res)=>{
    let todo = new Todo({
        text: req.body.text,
        _creator: req.user._id,
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
});

var notFound = (res) => {
    res.status(404).send();
}

app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return notFound(res);
    }

    Todo.findOne({
        _id: id,
        _creator: req.user.id
    }).then((todo) => {
        if(!todo){
            return notFound(res);
        }
        res.send({todo});
    }).catch((e) => {
        return res.status(400).send();
    });
});

//convert
app.delete('/todos/:id', authenticate, async (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        return notFound(res);
    }
    try{
        const todo = await Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id
        });
         if(!todo){
            return notFound(res);
        }
        else{
            res.status(200).send({todo});
        }
    }
    catch(e){
        return res.status(400).send();
    }
});

app.patch('/todos/:id', authenticate, (req, res) => {
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

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id 
    }, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return notFound(res);
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});

//USER
app.post('/users/add', async (req, res) =>{
    try{
        const body = _.pick(req.body, ['email', 'password']);
        let user = new User(body);
        await user.save();
        let userToken = await user.generateAuthToken();
        res.header('x-auth', userToken).send(user);
    }
    catch(e){
        res.status(400).send(e);
    }
});

app.post('/users/login', async (req,res) => {
    try{
        const body = _.pick(req.body, ['email' , 'password']);
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken()
        res.header('x-auth', token).send(user);
    }
    catch(e){
        res.status(400).send();
    }
});

app.delete('/users/me/token', authenticate, async (req, res) => {
    try{
        await req.user.removeToken(req.token)
        res.status(200).send();
    }
    catch(e){
        res.status(400).send();
    }
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