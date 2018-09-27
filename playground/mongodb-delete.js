const {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client) => {
    const db = client.db('TodoApp')
    
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
//deleteMany
//    db.collection('Users').deleteMany({
//       name: "Therese Samson" 
//    }).then((result) => {
//        console.log(result);
//    });
//deleteOne 
//    db.collection('Todos').deleteOne({
//        text: "Eat lunch"
//    }).then((result) => {
//        console.log(result);
//    });
//findOneAndDelete
    db.collection('Users').findOneAndDelete({
       _id: new ObjectID("5bab4ba7addae216d8c02d17")
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });
//ObjectId("5bab4ba7addae216d8c02d17")
    
//    client.close();

});