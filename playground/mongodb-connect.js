//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client) => {
    const db = client.db('TodoApp')
    
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
//    db.collection('Todos').insertOne({
//        text: "Something to do",
//        completed: false
//    }, (err, result) => {
//        if (err){
//            return console.log('Unable to insert todo', err);
//        }
//        console.log(JSON.stringify(result.ops, undefined, 2));
//    });
    db.collection('Users').insertOne({
        name: "Therese Samson",
        age: 20,
        location: "Philippines"
    }, (err, result) =>{
        if (err){
            return console.log('Unable to insert user', err);
        }
//        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    });
//    client.close();
});