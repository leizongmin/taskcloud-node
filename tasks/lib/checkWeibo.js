/**
 * 检查新微博模块
 */

var cookie = 'U_TRS1=000000fa.dfdb2afa.4d9289b2.4ea0560b; UOR=,t,; SINAGLOBAL=113.66.114.250.168911301449141955; vjuids=-ff65b2c4b.12f488859b9.0.889f0cf9; _sinasid=eQ4B+02j+fUvL25xHVl2Ag==; ALLYESID4=00110831101346826140345; mvsign=v%3DJl%24YPD%5DapkC%40uU5vU6mq; ALF=1321591315; SUR=uid%3D1548350950%26user%3D15813086095%26nick%3Dnormalman%26email%3D15813086095%2540sina.cn%26dob%3D1989-03-20%26ag%3D1%26sex%3D1%26ssl%3D0; Apache=716f268d.fc79207d.4ec1c371.315d1b8b; U_TRS2=0000008d.6cb03828.4ec1e1db.382d2aa3; ULV=1321329782829:65:9:1:716f268d.fc79207d.4ec1c371.315d1b8b:1321069824113; SessionID=2hg9i598a5m6ehqj5933qra7f1; _s_tentry=blog.flamingoeda.com; SGUP=211a002118002217032214032433172431052c40102de0a02d60a02d10942db0882e10602f2034; SUS=SID-1548350950-1321333749-XD-vjc5i-eb3c862d9c6b1684698db5e332e8314d; SUE=es%3D1d66e64b83a86611457f456b33acbca2%26ev%3Dv1%26es2%3D361ed4264f63676122a38f6ca130e706%26rs0%3DuIckDxjItiGvGwlN5IVP9l27LTYaHNE5399dFALUvnlI6W%252BKmmkaE7Q%252BxmYrdhxv2WQVSwM24RcybM6b%252Bdd%252FPbU1Svc0VWQbmbp%252FPL7XbGgsgosKSvcmPbx0nb9%252BtuAVUfNYnH%252FObQGAML%252FN8vMGDHkx916BFia01JlIWzAM11E%253D%26rv%3D0; SUP=cv%3D1%26bt%3D1321321327%26et%3D1321420147%26lt%3D7%26uid%3D1548350950%26user%3D15813086095%26ag%3D1%26name%3D15813086095%2540sina.cn%26nick%3Dnormalman%26sex%3D1%26ps%3D0%26email%3D15813086095%2540sina.cn%26dob%3D1989-03-20%26ln%3D%26os%3D%26fmp%3D%26lcp%3D2011-03-30%252009%253A42%253A00%26us%3D1%26vf%3D0; SINABLOGNUINFO=1548350950.5c49f5e6.hptdr; ; vjlast=1321338212; _s_upa=13; JSESSIONID=BEADB6C8E06B522F592CFBB265CA398A';
var source = '2149656847';
var apiBase = 'http:/\/api.t.sina.com.cn/';
var request = require('request');
	
/**
 * 获取微博更新
 *
 * @param {string} api
 * @param {object} params 参数
 * @param {function} callback 回调函数 function (err, data)
 */
var checkWeibo = module.exports = function (api, params, callback) {
	// 生成URL
	var url = apiBase + api + '.json?source=' + source;
	for (var i in params)
		url += '&' + i + '=' + encodeURI(params[i]);
	// console.log(url);
	// 发送请求
	request({
		uri:	url,
		headers: {
			cookie:	cookie
		}
	}, function (err, response, body) {
		// console.log(body);
		if (err)
			callback(err);
		else if (response.statusCode < 200 || response.statusCode > 299)
			callback('statusCode:' + response.statusCode);
		else {
			var data = JSON.parse(body);
			if (data.error)
				callback(data.error);
			else
				callback(undefined, data);
		}
	});
}
