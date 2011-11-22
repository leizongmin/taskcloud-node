/**
 * 任务触发队列模块
 */
 
var L = require('util').log;
 
/**
 * 启动队列
*
* @param {qs} 队列信息数组
* @param {function} callback 回调函数 function (topic, message)
*/ 
var TriggerQueue = module.exports = function (qs, callback) {
	var timestamp = new Date().getTime();
	for (var i in qs) {
		var q = qs[i];
		if (isNaN(q.cycle) || typeof q.topic != 'string' || typeof q.message != 'string') {
			qs.splice(i, 1);
		}
		else {
			if (q.start instanceof Date)
				q.start = q.start.getTime();
			else
				q.start = 0;
			if (q.end instanceof Date)
				q.end = q.end.getTime();
			else
				q.end = 0;
			if (q.end > 0 && q.end < timestamp)
				qs.splice(i, 1);
		}
	}
	
	var queueCycle = function () {
		if (qs.length < 1) {
			process.exit();
			return;
		}
			
		var timestamp = new Date().getTime();
		for (var i in qs) {
			var q = qs[i];
			// 超过指定次数
			if (!isNaN(q.loop) && q.loop < 0) {
				qs.splice(i, 1);
				continue;
			}
			// 未开始
			if (q.start > timestamp) {
				// L('未开始' + q.topic);
				continue;
			}
			// 已过期
			if (q.end > 0 && q.end < timestamp) {
				// L('已过期' + q.topic);
				qs.splice(i, 1);
				continue;
			}
			// 还没开始过
			if (isNaN(q.timestamp))
				q.timestamp = 0;
			// 已到时机
			if (timestamp - q.timestamp >= q.cycle) {
				L(q.topic + ' => ' + q.message);
				q.timestamp = timestamp;
				callback(q.topic, q.message);
				if (!isNaN(q.loop))
					q.loop--;
			}
		}
		//process.nextTick(queueCycle);
	}
	
	queueCycle();
	setInterval(queueCycle, 100);
}