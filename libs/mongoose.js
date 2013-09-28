var mongoose    = require('mongoose');
var config      = require('./config');

mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error:', err.message);
});
db.once('open', function callback () {
    console.log("Connected to DB!");
});

var Schema = mongoose.Schema;

// Task

var ResultSchema = new Schema({
    id: String,
    ind: String,
    time: String,
    nodCount: Number,
    result: String
});

var TaskSchema = new Schema({
    taskName: String,
    realization: String,
    ind: String,
    results: [ResultSchema]
});

var TaskModel = mongoose.model('Tasks', TaskSchema);

TaskModel.remove({}, function(err) {
    if (err) {
        console.log ('error deleting old data.');
    }
});

var firstTask = new TaskModel ({
    taskName: 'primeNumber',
    realization: global.globalConfComp.getTaskTemplate(),
    ind: global.globalConfComp.getNextTaskInd(),
    results: []
});

firstTask.save(function (err) {if (err) console.log ('Error on save!')});

module.exports.mongoose = mongoose;
module.exports.TaskModel = TaskModel;