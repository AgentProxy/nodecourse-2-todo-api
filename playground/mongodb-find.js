//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();


//console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client) => {
    const db = client.db('TodoApp')
    
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

//    db.collection('Todos').find({completed: false}).toArray().then((docs) => {
//        console.log('Todos');
//        console.log(JSON.stringify(docs, undefined, 2));
//    }, (err) => {
//        console.log('Unable to fetch todos', err);
//    });
//    db.collection('Todos').find({completed: false}).count().then((count) => {
//        console.log('Todos count:', count);
//    }, (err) => {
//        console.log('Unable to fetch todos', err);
//    });
        db.collection('Users').find({name: "Therese Samson"}).count().then((count) => {
            console.log(count);
//        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

//    client.close();
    //find({_id: new ObjectID('id')})
    //to filter the one with this id
});