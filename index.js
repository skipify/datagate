//0.0.6
(function(){
	var root    = this,
		outdata = {},//输出的数据
		errdata = [],//错误提示
		haserr  = false,
		isnode  = (typeof module !== 'undefined' && module.exports),
	//预设验证正则规则
		regs    = {
		'email' : /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i,
		'ip' : /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
		'digit' : /^[0-9]*$/,
		'url' : /((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
		'username' : /^[a-z0-9_-]{3,15}$/,
		'password' :  /.{6,20}/,
		'phone' : /^1[0-9]{10}$/
		};

	var gate = function(obj,req){
		if(!(this instanceof gate)) return new gate(obj,req);
		this._data = obj;
		this.req   = req;
		return this;
	};

	//添加或者覆盖预设正则规则
	gate.prototype.regexp = function(key,reg) {
		if(typeof key === 'string') {
			regs[key] = reg;
			return this;
		}
		if(Object.prototype.tostring.call(key) === '[object Object]') {
			for(var i in key){
				regs[i] = key[i];
			}
		}
		return this;
	}
	//检测数据
	// @param callback function 错误的回调
	gate.prototype.check = function(callback){
		errdata = [],outdata = {};
		for(var i=0;i<this._data.length;i++)
		{
			var item = this._data[i],
				_haserr = false;//标示一下错误，防止重复提示
			if(!item.name && !item.id) continue;
			item.name = item.name || item.id;
			item.id   = item.id   || item.name;
			if(item.value === undefined && !isnode && item.id) {
				var ele =  document.getElementById(item.id);
				item.value = ele ? ele.value : '';
			}
			//node时获取数据
			if(item.value === undefined && isnode){
				item.value = this.req && this.req.body[item.name];
			}
			var val  = item.value || '';

			if(item.required && val.length == 0){
				var tip = item.alias || '信息不完整'; //info is empty
				errdata.push(tip);
				_haserr  = true;
				callback && callback.call(null,item);
			}
			var reg = item.regexp;
			//预设正则
			if(!_haserr && (item.required || val.length !=0) && reg && typeof reg == 'string'){
				//内部方法
				if(regs[reg] && !regs[reg].test(val)){
					var tip = item.err || item.name + ' 格式错误'; //format err
					errdata.push(tip);
					_haserr  = true;
					callback && callback.call(null,item);
				}
			}
			if(!_haserr && (item.required || val.length !=0) && reg &&　Object.prototype.toString.call(reg) === '[object RegExp]'){
				//正则匹配
				if(reg && !reg.test(val)){
					var tip = item.err || item.name + ' 格式错误';//format err
					errdata.push(tip);
					_haserr  = true;
					callback && callback.call(null,item);
				}
			}
			outdata[item.name] = val;
			_haserr  = false;
		}
		haserr = errdata.length >0 ? true : false;
		return this;
	}
	//get err if has error return error data
	gate.prototype.getErr = function(){
		return haserr ? errdata : haserr;
	}
	//get data
	gate.prototype.getData = function(){
		return outdata;
	}

	/*
		单个检查
	*/
	gate.prototype.isType = function(val,regexp){
		if(!val){
			if(this._data && typeof this._data === 'string' || typeof this._data === 'number'){
				val = this._data;
			}
		}
		if(!val) return null;
		if(typeof regexp === 'string'){
			if(!regs[regexp]){
				throw new Error('Not found RegExp Object');
			}
			var regexp = regs[regexp];
		}
		return regexp.test(val);
	}
	/*
		整形
	*/
	gate.prototype.isInt = function(val){
		return this.isType(val,'digit');
	}
	/*
		email
	*/
	gate.prototype.isEmail = function(val){
		return this.isType(val,'email');
	}
	/*
		isurl
	*/
	gate.prototype.isUrl = function(val){
		return this.isType(val,'url');
	}
	/*
		phone
	*/
	gate.prototype.isPhone = function(val){
		return this.isType(val,'phone');
	}

	//导出变量
	if (isnode) {
	  	exports = module.exports = gate;
	} else {
		root.DataGate = gate;
	}
})();

/*
[
    {
        name:'username',//必填
    	id: '',//浏览器元素ID
    	value:'',//要过滤的值，浏览器时可以直接 document.getElementById('xx').value();
        regexp:'username',
        required:true,
        alias:'用户名必填', //为空时提示
        err:'用户名格式错误' //格式错误时提示
    },
    {
        name:'group',
        value:"xas"
    },
    {
        name:'password',
        value:"sdaasd",
        regexp:'password',
        required:true,
        alias:'密码必填',
        err:'密码请填写6-20位'
    },
    {
        name:'email',
        regexp:'email',
        value:"xx@q.com"
    }
    ]
   
*/