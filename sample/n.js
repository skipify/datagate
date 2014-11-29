var gate = require('../');

var a = [
    {
        name:'username',//必填
    	value:'saaDasdASD',//要过滤的值，浏览器时可以直接 document.getElementById('xx').value();
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
        value:"1223",
        regexp:'password',
        required:true,
        alias:'密码必填',
        err:'密码请填写6-20位'
    },
    {
        name:'email',
        regexp:'email',
        value:"xx@q.com"
    },
    {
        name:'xx',
        regexp:'xx',
        value:'xx'
    }
    ];

var t1 = gate(a).check();
    console.log(t1.getData());

var t2 = gate(a).regexp('xx',/^[0-9]*$/).check();
    
    if(!t2.getErr())
    {
        data = t2.getData();
    }else{
        console.log(t2.getErr());
        console.log(t2.getData());
    }
