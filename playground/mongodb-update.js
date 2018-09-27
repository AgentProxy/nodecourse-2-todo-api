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
//    db.collection('Todos').findOneAndUpdate({
//       _id: new ObjectID("5bab4f79d60dd2160ceeac5b")
//    }, {
//        $set: {
//            completed: true
//        } 
//    }, {
//        returnOriginal: false
//    }).then((result) => {
//        console.log(JSON.stringify(result, undefined, 2));
//    });
//    \
    
    db.collection('Users').findOneAndUpdate({
       _id: new ObjectID("5bac415938f1770f281bbafc")
    }, {
        $set: {
            name: "Eric Flores"
        } 
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });
    

    
//    client.close();

});