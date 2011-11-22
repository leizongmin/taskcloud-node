/**
 * 检查指定话题的微博更新情况
 */

var checkWeibo = require('./lib/checkWeibo');

var trend_name = 'html5';
var L = require('util').log;
var lastmid = 0;

$m.on('connect', function () {
	$m.subscribe('TASK/check_weibo');
	
	$d.get('lastmid', function (err, data) {
		if (err)
			L('获取lastmid失败：' + err);
		lastmid = Number(data);
		L('lastmid = ' + lastmid);
		
		$m.on('publish', function (topic, msg) {
			if ('check' == msg)
				doCheckWeibo();
			else
				L('[' + topic + '] ' + msg);
		});
	});
});
	
/**
 * 获取微博更新
 */
var doCheckWeibo = function () {
	L('开始检查更新...');
	
	checkWeibo('trends/statuses', {trend_name: trend_name}, function (err, data) {
		if (err) {
			L(err);	return;
		}
		if (data.length < 1) {
			L('微博为空'); return;
		}
		
		// 筛选出有更新的微博
		var maxmid = 0;
		var newdata = [];
		for (var i in data) {
			if (data[i].mid <= lastmid)
				continue;
			if (data[i].mid > maxmid)
				maxmid = data[i].mid;
			newdata.push(data[i]);
		}
		if (maxmid > lastmid)
			lastmid = maxmid;
		
		// 保存状态
		$d.set('lastupdate', new Date().getTime());
		$d.set('lastmid', lastmid);
		
		// 输出有更新的微博
		for (var i in newdata)
			printWeibo(newdata[i]);
	});
}

/**
 * 输出微博
 */
var printWeibo = function (m) {
	var text =  m.user.name + '：' + m.text;
	
	$m.publish('inbox', text);
	
	console.log(text + '\n===============================');
}
