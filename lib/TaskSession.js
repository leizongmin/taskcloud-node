/**
 * 任务管理模块
 *
 * @author 老雷<leizongmin@gmail.com>
 * @version 0.1
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter; 
var request = require('request');
var dataModel = require('../model/data');
var md5 = require('./md5');
 
var TaskSession = module.exports;
var DataSession = require('./DataSession');
var MessageSession = require('./MessageSession');
 
/**
 * 创建tasksession
 *
 * @param {string} name 任务名称
 */ 
TaskSession.create = function (name) {
	var s = {}
	// HTTP请求
	s['$request'] = s['$r'] = request;
	// MQTT消息
	s['$message'] = s['$m'] = new MessageSession(name);
	// 状态存取
	s['$data'] = s['$d'] = new DataSession(name);
	// 任务管理
	var t = s['$task'] = s['$t'] = new taskSession(name);
	t.message = s['$message'];
	t.request = s['$request'];
	t.data = s['$data'];
	
	return s;
}


var taskSession = function (name) {
	this.name = name;
}
// 继承EventEmitter
util.inherits(taskSession, EventEmitter);

/**
 * 任务结束
 */
taskSession.prototype.exit = function () {
	this.message.disconnect();
	this.emit('exit');
}