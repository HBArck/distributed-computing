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
//    _id: String,
    ind: String,
    time: String,
    nodCount: Number,
    result: String,
    _task: {type: Number, ref: 'TaskSchema'}
});

var TaskSchema = new Schema({
    _id: Number,
    taskName: String,
    realization: String,
    ind: String
});

var TaskModel = mongoose.model('Tasks', TaskSchema);
var ResultModel = mongoose.model('Results', ResultSchema);

setTimeout(function(){

//    TaskModel.remove({}, function(err) {
//        if (err) {
//            console.log ('error deleting old data.');
//        }
//    });
//
//    var firstTask = new TaskModel ({
//        _id: 0,
//        taskName: 'primeNumber',
//        realization: global.confComp.getTaskTemplate(),
//        ind: global.confComp.getNextTaskInd()
//    });
//
//    firstTask.save(function (err) {if (err) console.log ('Error on save!')});
}, 1000);

module.exports.mongoose = mongoose;
module.exports.TaskModel = TaskModel;
module.exports.ResultModel = ResultModel;