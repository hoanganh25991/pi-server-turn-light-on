//in linux, - replace by :
var dellMacAdd = 'e0:9d:31:2a:fd:a0';

//exec cmd from node
var sys = require('util');
var exec = require('child_process').exec;


function puts(error, stdout, stderr) {
    // sys.puts(stdout);
    // console.log(stdout.substring(0, 50));
    console.log(stdout);

    var isDellOn = stdout.includes(dellMacAdd);

    var msg = isDellOn ? 'dellMacAdd is on' : 'can not find dellMacAdd';

    var http = require("http");

    var req;


    if (isDellOn) {
    	console.log(msg);
    	//get status on|off

        var options = {
            "method": "GET",
            "hostname": "192.168.1.98",
            "port": "9876",
            "path": "/status?deviceMac=b4%3A43%3A0d%3Ab0%3A8a%3A2b",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "4144a658-5a02-70d1-6771-2d259408834c"
            }
        };

        req = http.request(options, function(res) {
            var chunks = [];

            res.on("data", function(chunk) {
                chunks.push(chunk);
            });

            res.on("end", function() {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
            });
        });

        req.end();
    }

}

exec("arp -a", puts);