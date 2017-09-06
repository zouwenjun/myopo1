//username.onclick=function(){
//    username.placeholder='';
//}
//password.onclick=function(){
//    password.placeholder='';
//}
//username.onblur=function(){
//    username.placeholder='请输入手机号码/邮箱/用户名';
//}
//password.onblur=function(){
//    password.placeholder='请输入帐号密码';
//}
//username.onblur=function() {
//    if (username.value == '') {
//        this.nextElementSibling.innerHTML = "请输入账号";
//    } else {
//        this.nextElementSibling.innerHTML = "";
//    }
//}
//password.onblur=function(){
//    var reg=/^\d{6}$/;
//    if (!reg.test(password.value)) {
//    this.nextElementSibling.innerHTML = "请输入六位数字的密码";
//}else{this.nextElementSibling.innerHTML ="";}
//}
//1:获取表单对象
var loginForm = document.getElementById("loginForm");
//2:绑定事件 onsubmit
loginForm.onsubmit = function(){
    //3:创建正则表达式
    var nameReg = /^[0-9_]{11}$/i;
    //var pwdReg = /^[0-9]{6,8}$/;
    //4:获取用户名和密码验证
    var name = document.getElementById("name");
    var pwd = document.getElementById("pwd");
    //5:如果不成功 return false;
    if(!nameReg.test(name.value)){
        alert("用户名格式不正确");
        return false;
    }
    if(!pwdReg.test(pwd.value)){
        alert("密码格式不正确");
        return false;
    }
    //6:如果成功   return true;
    return true;
};



