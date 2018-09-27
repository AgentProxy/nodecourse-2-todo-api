const {ObjectID} = require('mongodb');
const {mongoose} = require('./../db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

Todo.findOneAndRemove({_id: "5baca52cd8c9104a94e211d2"}).then((todo) => {
    console.log(todo);
})
// Todo.findByIdAndRemove("5baca4b8d8c9104a94e2117d").then((todo) => {
//     console.log(todo);
// })