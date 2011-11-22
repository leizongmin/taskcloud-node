/**
 * iot mdel data
 *
 * @author 老雷<leizongmin@gmail.com>
 * @version 0.1
 */
 
var data = module.exports;


/**
 * 设置数据
 *
 * @param {object} value 值
 * @param {function} callback 回调函数 function (err)
 */
data.set = function (value, callback) {
	global.db.data.save(value, callback);
}

/**
 * 取数据
 *
 * @param {object} cond 条件
 * @param {function} callback 回调函数 function (err, data)
 */
data.get = function (cond, callback) {
	global.db.data.findOne(cond, callback);
}

/**
 * 删除值
 *
 * @param {object} cond 条件
 * @param {function} callback 回调函数 function (err)
 */
data.remove = function (cond, callback) {
	global.db.data.remove(cond, callback);
}

/**
 * 取所有值
 *
 * @param {object} cond 条件
 * @param {function} callback 回调函数 function (err, data)
 */
data.all = function (cond, callback) {
	global.db.data.find(cond).toArray(callback);
}