const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://EJFlow32:flores888777666555@ds115193.mlab.com:15193/testdatabase, localhost:27017/TodoApp', {
    useNewUrlParser: true
});
module.exports = {mongoose}