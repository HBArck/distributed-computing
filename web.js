/**
 * Created by nborisov on 9/28/13.
 */
global.confComp    = {};
var express         = require("express");
var task_wrapper    = require("./public/js/server_taskgen.js");
var path            = require('path');
var TaskModel       = require ("./libs/mongoose").TaskModel;
var ResultModel       = require ("./libs/mongoose").ResultModel;
var app             = express();
var nodesCount      = 1;
var ind             = 3;

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
    nodesCount++;
    if (global.confComp.task) {
        global.confComp.task.ind = ind;
        ind+= 2;

        res.end(JSON.stringify(global.confComp.task, undefined, 2));
    } else {
        TaskModel.find({_id: 0}).exec(function(err, result) {
            if (!err) {
                global.confComp.task = result[0];
                global.confComp.task.ind = ind;
                ind+= 2;

                res.end(JSON.stringify(global.confComp.task, undefined, 2));
            } else {
                res.end('Error in first query. ' + err);
            }
        });
    }
});
app.get('/stress', function(request, res) {
    var i;
    for (i=3;i<3000;i+=2) {

        var result = new ResultModel({
            ind: i,
            time: Math.round(i + Math.random(i*2) + Math.random(3)),
            nodCount: 1,
            result: ((Math.random(1) >= 0.5)),
            _task: 0
        });
        console.log(i);
        result.save(function (err) {
            if (err) console.log ('Error on save!')
        });
    }
});
app.get('/getchartdata', function(request, res) {
    ResultModel.find({_task: 0}, 'ind time result')
        .limit(1500)
        .sort('-ind')
        .exec(function(err, results){
            if (!err) {
                var arrays = {ind: [], time: [], result: []};
                results.forEach(function(item, i, arr){
                    arrays.ind.push(results[i].ind);
                    arrays.time.push(results[i].time);
                    arrays.result.push(results[i].result);
                });
                res.end(JSON.stringify(arrays, undefined, 2));
            } else {
                res.end('Error in first query. ' + err);
            }

    });
});

app.get('/setresult', function(request, res) {
    var result = new ResultModel({
        ind: request.query.ind,
        time: request.query.runtime,
        nodCount: nodesCount,
        result: request.query.result,
        _task: global.confComp.task._id
    });
    result.save(function (err) {
        if (err) console.log ('Error on save!')
    });
    nodesCount--;
});




