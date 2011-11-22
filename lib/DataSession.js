/**
 * 简单数据存取模块
 *
 * @author 老雷<leizongmin@gmail.com>
 * @version 0.1
 */
 
var dataModel = require('../model/data.js'); 
 var md5 = require('./md5');
 

/**
 * 状态存取
 *
 * @param {string} name 任务名称
 */
var DataSession = module.exports = function (name) {
	this.name = name;
}

/**
 * 存数据
 *
 * @param {string} key 键
 * @param {object} value 值
 * @param {function} callback 回调函数 function (err)
 */
DataSession.prototype.set = function (key, value, callback) {
	dataModel.set({
		'_id':			md5(this.name + key),
		'task':			this.name,	// 任务名称
		'key':			key,		// 键
		'value':		value,		// 值
		'lastupdate':	new Date().getTime()
	}, callback);
}

/**
 * 取数据
 *
 * @param {string} key 键
 * @param {function} callback 回调函数 function (err, data)
 */
DataSession.prototype.get = function (key, callback) {
	dataModel.get({
		'_id':			md5(this.name + key)
	}, function (err, data) {
		if (err)
			callback(err);
		else
			callback(undefined, data.value);
	});
}

/**
 * 删除数据
 *
 * @param {string} key 键
 * @param {function} callback 回调函数 function (err, data)
 */
DataSession.prototype.remove = function (key, callback) {
	dataModel.remove({
		'_id':			md5(this.name + key)
	}, callback);
}

/**
 * 取所有数据
 *
 * @param {function} callback 回调函数 function (err, data)
 */
DataSession.prototype.all = function (key, callback) {
	dataModel.all({
		'task':		this.name
	}, callback);
}