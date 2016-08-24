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
		

		var request = require("request");

		var turnOnOff = false;

		var timestamp = new Date().getTime() / 1000;

		var hours = Math.floor(timestamp / 60 / 60);

		var offset = +7;

		var hourInDay = hours % 24 + offset;

		if(hourInDay > 13 & hourInDay < 18){
			turnOnOff = true;
		}

		// var options = {
		// 	method: 'GET',
		// 	url: 'http://192.168.1.98:9876/status',
		// 	qs: {
		// 		deviceMac: 'b4:43:0d:b0:8a:2b'
		// 	}
		// };

		// request(options, function(error, response, body) {
		// 	if (error) throw new Error(error);

		// 	console.log(body);

		// 	var status = JSON.parse(body);

		// 	var timestamp = Number(status.timestamp);

		// 	var hours = Math.floor(timestamp / 60 / 60);

		// 	var offset = +7;

		// 	var hourInDay = hours % 24 + offset;

		// 	if(hourInDay > 13 & hourInDay < 18){
		// 		turnOnOff = 'on';
		// 	}
		// });
		
		if(turnOnOff){
			//send turnOnOff request
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
		
	}

}



var intervalCheck = setInterval(function(){


}, 5 * 60 * 1000);

exec("arp -a", puts);