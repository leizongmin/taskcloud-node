/**
 * 消息管理模块，基于MQTT
 *
 * @author 老雷<leizongmin@gmail.com>
 * @version 0.1
 */

 var MQTTClient = require('MQTTClient').Client;
 
/**
 * 消息操作
 */
var MessageSession = module.exports = function (name) {
	var self = this;
	this.name = name;
	this.client = new MQTTClient(global.MQTTSERVER.host, global.MQTTSERVER.port, {
		client_id:	global.MQTTSERVER.clientID
	});
	this.client.connect();
}

/**
 * 订阅主题
 *
 * @param {string} topic 主题
 */
MessageSession.prototype.subscribe = function (topic) {
	this.client.subscribe(topic);
}

/**
 * 发布消息
 *
 * @param {string} topic 主题
 * @param {string} msg 消息
 */
MessageSession.prototype.publish = function (topic, msg) {
	this.client.publish(topic, msg);
}

/**
 * 监听事件
 *
 * @param {string} event 事件名称
 * @param {function} callback 回调函数
 */
MessageSession.prototype.on = function (event, callback) {
	this.client.on(event, callback);
}

/**
 * 关闭连接
 */
MessageSession.prototype.disconnect = function () {
	this.client.disconnect();
}