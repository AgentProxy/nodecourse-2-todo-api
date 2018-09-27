const {ObjectID} = require('mongodb');
const {mongoose} = require('./../db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = "6bac798407248d1e443d367f";

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log("Todos", todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log("Todo", todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('ID not found');
//     }
//     console.log("Todo by ID", todo);
// }).catch((e) => console.log(e));
id = "6bac4bf6af59ec27846af95f";

User.findById(id).then((user) => {
    if(!user){
        return console.log('User not found')
    }
    console.log("User: ", user);
}).catch((e) => {
    console.log("Error in finding user.");
});

