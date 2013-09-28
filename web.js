/**
 * Created by nborisov on 9/28/13.
 */
global.globalConfComp    = {};
var express         = require("express");
var task_wrapper    = require("./public/js/server_taskgen.js");
var path            = require('path');
var TaskModel       = require ("./libs/mongoose").TaskModel;
var app             = express();

app.use(express.logger());
app.use(express.static(path.join(__dirname, "public")));
app.get('/hello', function(request, response) {
    response.send('Hello!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});

app.get('/gettask', function(request, res) {
    TaskModel.find({taskName: 'primeNumber'}).exec(function(err, result) {
        if (!err) {
            res.end(JSON.stringify(result, undefined, 2));
        } else {
            res.end('Error in first query. ' + err)
        }
    });
});




