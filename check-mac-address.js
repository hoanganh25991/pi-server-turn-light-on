//in linux, - replace by :
var dellMacAdd = 'e0:9d:31:2a:fd:a0';

//exec cmd from node
var sys = require('util');
var exec = require('child_process').exec;

var requestTurnOn = function(rule){
	var turnOnOff = false;

	var timestamp = new Date().getTime() / 1000;

	var hours = Math.floor(timestamp / 60 / 60);

	var offset = +7;

	var hourInDay = hours % 24 + offset;

	if(hourInDay > rule.timeRange[0] & hourInDay < rule.timeRange[1]){
		turnOnOff = true;
	}

	if(turnOnOff){
		//send turnOnOff request
		var request = require("request");
		var options = {
			method: 'GET',
			url: 'http://192.168.1.98:9876/send',
			qs: {
				deviceMac: 'b4:43:0d:b0:8a:2b',
				on: true
			}
		};

		request(options, function(error, response, body) {
			if (error) throw new Error(error);

			console.log(body);
		});
	}
};


var puts = function (error, stdout, stderr) {
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
		
		var rule = {
			timeRange: [13, 18]
		};
		
		requestTurnOn(rule);
	}

}

var intervalCheck = setInterval(function(){
	exec("arp -a", puts);
}, 5 * 60 * 1000);