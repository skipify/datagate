datagate
========

主要用于验证数据格式是否正确，用于数据安全验证,node端，Browser端可以共享配置文件，最大限度的减少工作量

# INSTALL
## NODEJS
	
	npm install data-gate

## BROWER
	
	<script type="text/javascript" src="index.js"></script>

## API
	
	var gate = gate(xx);
	@param object 获取信息的配置文件
	@param object node环境下的req对象，用于自动获取 req.body的内容

### regexp
	添加一个正则验证规则
	@param string/object
	@param RegExp
	
	gate.regexp('int',/^[0-9]+$/)
	gate.regexp({int:/^[0-9]+$/})

### check
	
	触发检测操作

	gate.check();

### getData
	
	获取最后获得数据

	gate.getData() // {username:'xxx',password:'123456'}

### getErr
	获取错误提示

	gate.getErr() //['用户名错误','密码必须要6-20位']

## OPTIONS

	name:'username',//返回的数据键值，不填则使用id    
	id:'username',//要过滤的值，浏览器时可以是元素ID，
				//直接 document.getElementById('xx').value()    
    regexp:'username',//预设的正则表达式名    
    required:true,//是否为必填，默认false,如果非必填则为空时不进行regexp的监测    
    alias:'用户名必填', //为空时提示    
    err:'用户名格式错误' //格式错误时提示    
    value:"值" // 当nodejs环境的时候需要提供要检测的内容 value /id，共存时取value值 
    		   //node 环境下id value均可为undefined 此时自动根据name属性在req.body中取值   
	equal:"password" // 必须保证当前字段的值与 name为 password的值相等，如果不相等则提示err错误信息  
	eg:    
	
	var a = [    
	    {    
	    	name:'username',//返回的数据键值，不填则使用id    
	    	id:'username',//要过滤的值，浏览器时可以是元素ID，直接 document.getElementById('xx').value();    
	        regexp:'username',//预设的正则表达式名    
	        required:true,//是否为必填，默认false,如果非必填则为空时不进行regexp的监测    
	        alias:'用户名必填', //为空时提示    
	        err:'用户名格式错误', //格式错误时提示    
	        value:"值", // 当nodejs环境的时候需要提供要检测的内容 value /id必填其一，共存时取value值  
	        equal:"password" // 必须保证当前字段的值与 name为 password的值相等，如果不相等则提示err错误信息  
	    },    
	    {    
	        name:'password',    
	        id:"password1",    
	        regexp:'password',    
	        required:true,    
	        alias:'密码必填',    
	        err:'密码请填写6-20位'    
	    },    
	    {    
	        regexp:'email',    
	        id:"email"    
	    }    
    
    ];    

## 预设规则

	*email* 邮箱     
	*ip* IP   
	*digit* 数字    
	*url* URL   
	*username* : /^[a-z0-9_-]{3,15}$/  用户名    
	*password* :  /.{6,20}/ 密码    
	*phone* : /^1[0-9]{10}$/ 电话    

[更多规则](https://github.com/javaquery/regexp)

# 单个字符串的处理

	Notice:  is系列函数 可以指定一个参数 也可以使用gate参数  gate(1).isInt() === gate().isInt(1)

### isType
	@param int/string
	@param string/RegExp
	是否符合某个正则条件
	

### isInt     
	@param int/string
	是否是整形

### isEmail     
	@param int/string
	是否是邮箱

### isPhone     
	@param int/string
	是否是手机号码

### isUrl     
	@param int/string
	是否是一个url连接


