/**
 * 触发命令解释模块
 *
 * @author leizongmin<leizongmin@gmail.com>
 * @version 0.1
 */
 

/**
 * 解释命令
 *
 * @param {string} code 代码
 * @return {object} 返回{task:{任务参数}, data:{预先设定的任务数据}} 返回false表示解析失败
 */
module.exports = function (code) {
	if (typeof code != 'string')
		code = '' + code;
	var ret = [];
	var block = code.split(/\r?\n\r?\n/);
	if (block.length < 1)
		return false;
	
	for (var i in block) {
		var b = {}
		var line = block[i].split(/\r?\n/);
		for (j in line) {
			var d = parseLine(line[j]);
			if (d)
				b[d.k] = d.v;
		}
		ret.push(b);
	}

	return ret;
}

/**
 * 解析一行数据
 *
 * @param {string} line 行
 * @param {object} 返回{k:键名, v:值} 返回false表示解析失败
 */
var parseLine = function (line) {
	var pos = line.indexOf('=');
	if (pos < 0)
		return false;
		
	var ret = {};
	ret.k = line.substr(0, pos).trim();
	ret.v = line.substr(pos + 1);
	
	// 如果是引号括起来的字符串
	if (ret.v.match(/['"].*['"]/)) {
		ret.v = ret.v.trim();
		ret.v = ret.v.substr(1, ret.v.length - 2);
		return ret;
	}
	
	// 尝试判断值类型
	try {
		ret.v = ret.v.trim();
		
		// 如果是布尔类型
		var b = ret.v.toLowerCase();
		if (b == 'true') {
			ret.v = true;
			return ret;
		}
		if (b == 'false') {
			ret.v = false;
			return ret;
		}
		
		// 如果是数值类型
		if (!isNaN(ret.v)) {
			ret.v = parseFloat(ret.v);
			return ret;
		}
		// 如果是日期类型
		var d = new Date(ret.v);
		if (!isNaN(d.getTime()))
			ret.v = d;
		return ret;
	}
	catch (err) {
		return ret;
	}
}