var mongoose    = require('mongoose');
var log         = require('./log')(module);
var config      = require('./config');
var crypto      = require('crypto');

mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
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
    results: [ResultSchema]
});

Article.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

var TaskModel = mongoose.model('Tasks', TaskSchema);


module.exports.mongoose = mongoose;
module.exports.ArticleModel = ArticleModel;
module.exports.UserModel = UserModel;
module.exports.ClientModel = ClientModel;
module.exports.AccessTokenModel = AccessTokenModel;
module.exports.RefreshTokenModel = RefreshTokenModel;