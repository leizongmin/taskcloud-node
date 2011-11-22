/**
 * 任务虚拟机模块
 *
 * @author 老雷<leizongmin@gmail.com>
 * @version 0.1
 */
 
var TaskSession = require('./TaskSession');
var vm = require('vm');
var path = require('path');


/**
 * 任务虚拟机
 *
 * @param {string} name 任务名称
 * @param {string} code 代码
 * @param {string} filename 文件名
 */
var TaskVM = module.exports = function (name, code, filename) {
	this.name = name;
	this.filename = filename;
	this.script = vm.createScript(code, filename);
}

/**
 * 执行任务
 */
TaskVM.prototype.run = function () {
	var session = TaskSession.create(this.name);
	var filename = this.filename;
	session.require = function (name) {
		if (name.substr(0, 1) == '.') {
			name = path.resolve(path.dirname(filename), name);
		}
		return require(name);
	}
	session.console = console;
	session.setTimeout = setTimeout;
	session.setInterval = setInterval;
	session.clearTimeout = clearTimeout;
	session.clearInterval = clearInterval;
	session.Buffer = Buffer;
	this.script.runInNewContext(session);
}

/**
 * 销毁任务
 */
TaskVM.prototype.destroy = function () {
	delete this.script;
}
