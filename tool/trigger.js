/**
 * IOT- TaskVM trigger
 */
 
var fs = require('fs'); 
var MQTTClient = require('MQTTClient').Client;
var TriggerParser = require('../lib/TriggerParser');
var TriggerQueue = require('../lib/TriggerQueue');
var L = console.log; 
 
 /** ---------------------- 配置 ---------------------- */
// MQTT服务器地址
var MQTTSERVER = global.MQTTSERVER = {
	host:	'iot.ucdok.com',
	port:	1883
} 
 
var printUsage = function () {
	L('Usage:');
	L('  trigger [topic] [message] [retain]');
	L('  trigger -f [filename]');
} 
 
if (process.argv[2] != '-f') {
	var topic = process.argv[2];
	var msg = process.argv[3];
	var retain = Number(process.argv[4]);
	if (typeof topic == 'undefined' || typeof msg == 'undefined') {
		printUsage();
		process.exit();
	}
	else {
		var client = new MQTTClient(MQTTSERVER.host, MQTTSERVER.port, MQTTSERVER.clientID);
		client.connect(function () {
			client.publish(topic, msg, {
				retain:	retain > 0 ? true : false
			});
			process.exit();
		});
	}
}
else {
	var filename = process.argv[3];
	if (typeof filename == 'undefined') {
		printUsage();
		process.exit();
	}

	var data = fs.readFileSync(filename);
	var triggers = TriggerParser(data);
	
	L('================================================================================');
	L('                                  IOT - Trigger                                 ');
	L('================================================================================');
	L('');

	var client = new MQTTClient(MQTTSERVER.host, MQTTSERVER.port, MQTTSERVER.clientID);
	client.connect(function () {
		TriggerQueue(triggers, function (topic, msg) {
			client.publish(topic, msg);
		}); 
	});
}


// 捕捉出错信息
process.on('uncaughtException', function (err) {
	L(''); L(err.stack); L('');
});
process.on('exit', function () {
	L('================================================================================');
	L(''); L('End.');
});