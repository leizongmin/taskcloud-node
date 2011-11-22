/**
 * IOT- TaskVM listener
 */
 
var MQTTClient = require('MQTTClient').Client;
var L = require('util').log; 
 
 /** ---------------------- 配置 ---------------------- */
// MQTT服务器地址
var MQTTSERVER = global.MQTTSERVER = {
	host:	'iot.ucdok.com',
	port:	1883
} 
 
var printUsage = function () {
	console.log('Usage:');
	console.log('  listen [topic] [Qos level]');
} 
 
var topic = process.argv[2];
var level = Number(process.argv[3]);
if (typeof topic == 'undefined') {
	printUsage();
	process.exit();
}
else {
	var client = new MQTTClient(MQTTSERVER.host, MQTTSERVER.port, MQTTSERVER.clientID);
	client.connect(function () {
		L('连接成功!');
		client.subscribe(topic, level);
	});
	client.on('publish', function (topic, msg) {
		L('Topic: ' + topic);
		console.log('' + msg);
		console.log('===============\n');
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