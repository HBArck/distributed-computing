/**
 * Created by nborisov on 9/28/13.
 */
var express = require("express");
var app = express();
var path = require('path'); // модуль для парсинга пути
var http = require ('http');             // For serving a basic web page.
//var mongoose = require ("mongoose"); // The reason for this demo.

app.use(express.logger());
app.use(express.static(path.join(__dirname, "public")));
app.get('/hello', function(request, response) {
    response.send('Hello World11!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});

var mongo = require('mongodb');

var mongoUri = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://herokumongo:_mongopass_123@paulo.mongohq.com:10011/app18351472';

console.log('>>>>>', mongoUri);
mongo.Db.connect(mongoUri, function (err, db) {
    if (err) {
//        sys.puts(err);
        console.log('++++++++++Error mongo connection++++++++', err);
    } else {
        db.collection('mydocs', function(er, collection) {
            collection.insert({'mykey': 'myvalue'}, {safe: true}, function(er,rs) {
            });
        });
    }
});

//mongoose.connect(mongoUri, function (err, res) {
//    if (err) {
//        console.log ('ERROR connecting to: ' + mongoUri + '. ' + err);
//    } else {
//        console.log ('Succeeded connected to: ' + mongoUri);
//    }
//});