/**
 * IOT - TaskVM
 */
 
var mongoskin = require('mongoskin');
var fs = require('fs');
var path = require('path');
var TaskVM = require('./lib/TaskVM');
var L = console.log;

/** ---------------------- ���� ---------------------- */
// MongoDB���ݿ������ַ���
var MONGODB = global.MONGODB = 'iot:123456@mongoc2.grandcloud.cn:10007/iot';
// MQTT��������ַ
var MQTTSERVER = global.MQTTSERVER = {
	host:	'iot.ucdok.com',
	port:	1883
}



L('================================================================================');
L('                                  IOT - TaskVM                                  ');
L('================================================================================');
L('');

// mongodb����
var db = global.db = {}
db._connection = mongoskin.db(MONGODB);
// ����
db.data = db._connection.collection('data');

// ��ȡ�������Ŀ¼
var taskdir = process.argv[2];
if (typeof taskdir != 'string')
	taskdir = process.cwd();
taskdir = path.resolve(taskdir);
// �����������
L('Load task script from ' + taskdir);
var tasks = fs.readdirSync(taskdir);
for (var i in tasks) {
	if (tasks[i].substr(-3) != '.js')
		continue;
	var name = tasks[i].substr(0, tasks[i].length - 3);
	var filename = path.resolve(taskdir, tasks[i]);
	var code = fs.readFileSync(filename);
	new TaskVM(name, code, filename).run();
	L('Start task "' + name + '"');
}
L('');

// ��׽������Ϣ
process.on('uncaughtException', function (err) {
	L(''); L(err.stack); L('');
});