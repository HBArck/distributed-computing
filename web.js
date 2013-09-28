/**
 * Created by nborisov on 9/28/13.
 */
var express     = require("express");
var app         = express();
var path        = require('path'); // модуль для парсинга пути
var mongoose    = require ("mongoose"); // The reason for this demo.

app.use(express.logger());
app.use(express.static(path.join(__dirname, "public")));
app.get('/hello', function(request, response) {
    response.send('Hello!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});

//var mongo = require('mongodb');
//
var mongoUri = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    Config.mongoDBCred ;
//
//console.log('>>>>>', mongoUri);
//mongo.Db.connect(mongoUri, function (err, db) {
//    if (err) {
////        sys.puts(err);
//        console.log('++++++++++Error mongo connection++++++++', err);
//    } else {
//        db.collection('mydocs', function(er, collection) {
//            collection.insert({'mykey': 'myvalue'}, {safe: true}, function(er,rs) {
//            });
//        });
//    }
//});

mongoose.connect(mongoUri, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + mongoUri + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + mongoUri);
        var userSchema = new mongoose.Schema({
            taskName: String,
            realization: String
//    result: String
        });

        var Task = mongoose.model('Tasks', userSchema);
        Task.remove({}, function(err) {
            if (err) {
                console.log ('error deleting old data.');
            }
        });

        var firstTask = new Task ({
            taskName: 'primeNumber',
            realization: 'a mod 2'
//    result: true
        });

        firstTask.save(function (err) {if (err) console.log ('Error on save!')});

        app.get('/gettask', function(request, res) {
            Task.find({taskName: 'primeNumber'}).exec(function(err, result) {
                if (!err) {
                    res.end(JSON.stringify(result, undefined, 2));
                } else {
                    res.end('Error in first query. ' + err)
                }
            });
        });
    }
});




