// JavaScript Document
var isMobileRegex = /^1\d{10}$/;
var isPasswordRegex = /^[0-9a-zA-Z]{6,16}$/;
var isNameRegex = /^[0-9a-zA-Z\u4e00-\u9fa5]{2,12}$/;
var isEmailRegex = /^([\w-_~`!#$%^&*{}.+]{3,20})+(\.[\w-]+)*@[\w-_]+((\.){1}([\w-_]+)+)+$/;
var isCaptchaRegx = /^([0-9a-zA-Z\u4e00-\u9fa5])+$/;
var isVercodeRegex = /^([0-9a-zA-Z])+$/;
var isMibaoRegex = /^[0-9a-zA-Z\u4e00-\u9fa5]{2,20}$/;

var listIndex=0,len,cookieList;
window.load_status = 1;
var xt1 = null;

function showinfo(id, message, color) {
    var val = $("#" + id);
    if (color == 1) {
        val.html(message).css("color", "#ff5656");
    }else if (color == 2) {
        val.html(message).css("color", "#878b8a");
    }else {
        val.html(message).css("color", "#666666");
    }
}

/***模拟placeholder**/
function focus_func(obj,str){
    $(obj).next(".placeholder").css("display","none");
    var id = obj.getAttribute("id");
    showinfo("info_"+id, str, 2);
    $(obj).parentsUntil(".pop_dlg").find(".error_tip1").html("");
}
function blur_func(obj,str){
    if ($(obj).val() == ""){
        $(obj).next(".placeholder").css("display","block");
        var id = obj.getAttribute("id");
        showinfo("info_"+id, str, 1);
    }
}



var u=(function getData(){
    var url=window.location.href;
    if (url.indexOf("?") != -1) {
        var url_info=url.split("?")[1];
        var arr_info=url_info.split("&");
        var url_obj={};
        for(var i=0;i<arr_info.length;i++){
            url_obj[arr_info[i].split("=")[0]]=arr_info[i].split("=")[1];
        }
        return url_obj;
    }else{
        return {};
    }
})()


/**弹框展示**/
function showDiv(obj){
    obj.css({
        "top":$(window).height()/2-obj.height()/2+$(window.document).scrollTop()+"px",
        "margin-left":$(window).width()/2-obj.width()/2+$(window.document).scrollLeft()+"px",
        "display":"block"
    });
    $(".mask").css({"height":$(document).height(),"width":$(document).width()}).show();
    $("#dlg_id").val(obj.attr("id"));
}


function hideDiv(obj){
    obj.find("input[type='text']").val("");
    obj.find("input[type='password']").val("");
    obj.find(".placeholder").show();
    obj.find(".error_tip").html("");
    obj.find(".error_tip1").html("");
    obj.hide();
    $(".mask").hide();
    $("#dlg_id").val("");
}

$(".ico_close").click(function(){
    var obj = $(this).parent();
    hideDiv(obj);
    if (document.getElementById("captcha_area").style.display == "block") {
        $("#auth_code").attr("src", $("#captchaUrl").val()+"?vertion=" + Math.random());
    }
    //弹框登录注册跳转来的
    if (u.isDialog){
        window.location.href=decodeURIComponent(u.callback);
    }
})

/**气泡**/
function showToast(obj,str){
    $("#toast_content").html(str);
    showDiv(obj);
    obj.fadeOut(3000);
    $("#mask").fadeOut(3000);
}


$("#repwd").focus(function(){
    focus_func(this,"密码包含6-16位字母、数字");
})
$("#repwd").blur(function() {
    if ($(this).val() == "") {
        $(this).next(".placeholder").css("display", "block");
    }
});

$(".username, #pwd, #vercode, #vercode1, #vercode2, #vercode3, #newpwd, .answer").focus(function(){
    focus_func(this,"");
});
$(".username, #pwd, #vercode, #vercode1, #vercode2, #vercode3, #newpwd, .answer").blur(function(){
    blur_func(this,"");
})
$("#vercode").focus(function(){
    $("#info_pwd").html("");
    $("#info_username").html("");
})



//获取验证码
function get_code() {
    $("#auth_code").attr("src", $("#captchaUrl").val()+"?vertion="+ Math.random());
}

function get_code1() {
    $("#auth_code1").attr("src", $("#captchaUrl").val()+"?vertion="+ Math.random());
}
$(document).on("click","#auth_code",function(){
    get_code();
});

$(document).on("click","#auth_code1",function(){
    get_code1();
});

$(document).on("click","#find_link1",function(){
    showinfo("info_login_form"," ",1);
    showDiv($("#find_pwd_dlg"));
    $("#auth_code1").attr("src", $("#captchaUrl").val()+"?vertion="+ Math.random());
});

$(document).on("click","#activate_link",function(){
    $.ajax({
        type: 'POST',
        url: 'register/reSendMail',
        cache: false,
        contentType: "application/json; charset=utf-8",   //内容类型
        dataType: "json",     //类型
        data:'{"email" :"'+ $.trim($("#username").val()) +'"}',

        beforeSend: function () {
        },
        success: function (redata) {
            if (redata.resultCode != 1001) {
                if (redata.resultCode == 3016){
                    showinfo("info_login_form","验证时间间隔太短", 1);
                }else {
                    showinfo("info_login_form", redata.resultMsg, 1);
                }
                $("#auth_code").attr("src", $("#captchaUrl").val()+"?vertion=" + Math.random());
                return;
            }
            showToast($("#success_toast"),"已发送验证邮件至您的邮箱，请于24小时内前往邮箱进行操作");
        }
    })
});


// 登录遇到问题
function problems() {
    var homeUrl = location.href;
    if (homeUrl.indexOf('test') > -1) {
        location.href = 'http://html.uctest.wanyol.com:81/search/problems.html?homeUrl=' + homeUrl;
    } else {
        location.href = 'http://m.uc.oppomobile.com/search/problems.html?homeUrl=' + homeUrl;
    }
}
//登录form提交
function check_login() {
    var username = $.trim($("#username").val());
    var pwd = $.trim($("#pwd").val());
    if (username.length == 0) {
        showinfo("info_username", "请输入帐号", 1);
        return false;
    }


    if (pwd.length == 0) {
        showinfo("info_pwd", "请输入密码", 1);
        return false;
    }
    $("#password").val($.md5(pwd));
   
    if (document.getElementById("captcha_area").style.display == "block"){
        var authcode = $.trim($("#vercode").val());
        if ( "" == authcode) {
            showinfo("info_vercode","请输入验证码",1);
            return false;
        }
        if (!authcode.match(isCaptchaRegx)){
            showinfo("info_vercode","验证码错误",1);
            return false;
        }
    }
    var url = '{"username":"'+ encodeURIComponent(username) +'","password":"'+$.md5(pwd) + '","type":"1","style":"2';
    if (document.getElementById("captcha_area").style.display == "block"){
        url +='","captcha":"' + $.trim($("#vercode").val());
    }

    if (u.callback){
        url += '","source":"'+ u.callback+'"}';
    }else{
        url += '"}';
    }


    $.ajax({
        type: 'POST',
        url:  $("#loginUrl").val(),
        cache: false,
        contentType: "application/json; charset=utf-8",   //内容类型
        dataType: "json",     //类型
        data: url,
        beforeSend: function () {
        },
        success: function (redata) {
            if (redata.data == "1"){
                document.getElementById("captcha_area").style.display = "block";
            }
            if (redata.resultCode != 1001) {
                switch (redata.resultCode) {
                    case 2009:
                        showinfo("info_vercode", "验证码错误", 1);
                        break;
                    case 20009:
                        document.getElementById("captcha_area").style.display = "block";
                        showinfo("info_vercode", "请输入验证码", 1);
                        break;
                    case 3005:
                    case 3006:
                    case 3007:
                        showinfo("info_username", "帐号不存在", 1);
                        break;
                    case 3008:
                        showinfo("info_pwd","密码错误",1);
                        break;
                    case 3010:
                        showinfo("info_login_form","帐号未激活，请前往邮箱进行激活。<a  id='activate_link' style='text-decoration:underline'>重新发送激活邮件</a>",1);
                        break;
                    case 3030:
                        showinfo("info_login_form","帐号存在安全风险，<a  id='find_link1' style='text-decoration:underline'>找回密码</a>后方可正常登录",1);
                        break;
                    case 3013:
                    case 3027:
                        showinfo("info_login_form","帐号已冻结",1);
                        break;
                    case 3016:
                        showinfo("info_login_form", "验证时间间隔太短", 1);
                        break;
                    case 3017:
                        showinfo("info_login_form", "今日验证身份次数达到上限", 1);
                        break;
                    case 30001:
                        showinfo("info_login_form", "此浏览器已有OPPO帐号登录，可尝试刷新页面", 1);
                        break;
                    default:
                        showinfo("info_login_form", redata.resultMsg, 1);
                        break;
                }

                $("#auth_code").attr("src", $("#captchaUrl").val()+"?vertion=" + Math.random());
                return;
            }
            //setCookie改为同步
            if (redata.data!=null &&  redata.data.length > 0) {
                showDiv($("#loading_toast"));
                len=redata.data.length;
                cookieList = redata.data;  

               var url= cookieList[listIndex++]+"&jsonpCallback=loginCallback&_="+new Date().getTime();
                var script=document.createElement("img");
                script.src=url;
                document.getElementsByTagName("head")[0].appendChild(script);
                //加载完成执行lodinCallback
                imgLoad(script, function() {
                    loginCallback();
                })

                if (xt1!=null){
                    clearTimeout(xt1);
                }
                xt1 = setTimeout(function() {
                    notResponse();
                }, 5000);
                window.load_status=0;
            }else{
                 //根据回调跳转
                if (u.callback){
                    window.location.href = decodeURIComponent(u.callback);
                }else{
                     window.location.href = $("#profileUrl").val();
                }
            }

        }
    })

}


// function imgLoad(img, callback) {
// 	var timer = setInterval(function() {
//         alert(img.complete)
// 		if (img.complete) {
// 			callback(img)
// 			clearInterval(timer)
// 		}
// 	}, 1000)
// }

function imgLoad(img, callback) {
    function a() {
        if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) {
            // alert(img.readyState)
            // if(img.readyState == "complete"){
            callback(img);
            clearInterval(timer);
            // }
        } else {
            if (img.complete) {
                callback(img);
                clearInterval(timer);
            }
        }
    }
    var timer = setInterval(a, 50)
}

// function imgLoad(img, callback) {
//
//     var timer = setInterval(function() {
//
//         if(document.all){
//
//             if(img.readyState == "complete"){callback(img);clearInterval(timer);}
//
//         }else{
//
//             if(img.complete){callback(img);clearInterval(timer);}
//
//         }
//
//     }, 50)
//
// }



function setCookie(){
     if (listIndex<len){           
        var url= cookieList[listIndex++]+"&jsonpCallback=loginCallback&_="+new Date().getTime();
        var script=document.createElement("img");
        script.src=url;
        document.getElementsByTagName("head")[0].appendChild(script);


        //加载完成执行lodinCallback
        imgLoad(script, function() {
            loginCallback();
        })
        if (xt1!=null){
             clearTimeout(xt1);
        }
        xt1 = setTimeout(function() {
             notResponse();
        }, 5000);
        window.load_status=0;
    }else{
        //根据回调跳转
        if (xt1!=null){
             clearTimeout(xt1);
        }
        
        if (u.callback){
            window.location.href = decodeURIComponent(u.callback);
        }else{
            window.location.href = $("#profileUrl").val();
        }
    } 
}
function  notResponse(){  
    clearTimeout(xt1);
    if (window.load_status==0){
        window.load_status=1;
       setCookie();                
    }
}
    


function loginCallback(redata){
    // window.load_status=1;
    setCookie();
}





$("#yz_email_dlg1").find(".login_button").click(function(){
    hideDiv($("#yz_email_dlg1"));
    if (u.isDialog){
        window.location.href= decodeURIComponent(u.callback);
    }
});



/***重置密码js**/
//取消设置密码
$("#set_pwd_dlg .cancel_btn").click(function(){
    hideDiv($("#set_pwd_dlg"));
    $("#auth_code").attr("src", $("#captchaUrl").val()+"?vertion="+ Math.random());
    showinfo("info_repwd","密码包含6-16位字母、数字", 2);

});

$("#set_pwd_dlg .ico_close").click(function(){
    showinfo("info_repwd","密码包含6-16位字母、数字", 2);
});


$("#find_pwd_link").click(function(){
    _hmt.push(['_trackEvent', 'account','login', 'findMe','findMe']);
    showDiv($("#find_pwd_dlg"));
    $("#auth_code1").attr("src", $("#captchaUrl").val()+"?vertion="+ Math.random());
})



//获取安全状态js
function check_find_pwd(){
    var username = $.trim($("#username1").val());
    var vercode = $.trim($("#vercode1").val());
    if (username.length == 0) {
        showinfo("info_username1", "请输入帐号", 1);
        return false;
    } else if (vercode.length == 0) {
        showinfo("info_vercode1", "请输入验证码", 1);
        return false;
    }else if(!vercode.match(isCaptchaRegx)){
        showinfo("info_vercode1", "验证码错误", 1);
    } else{
        $.ajax({
            type : 'POST',
            url : 'safety/getSafetyStatus',
            cache : false,
            contentType: "application/json; charset=utf-8",   //内容类型
            dataType: "json",     //类型
            data : '{"identify" :"'+ encodeURIComponent(username) +'","captcha":"'+ vercode + '","securityType":"findMe"}',
            beforeSend : function() {
            },
            success : function(redata) {
                if (redata.resultCode!=1001){
                    switch (redata.resultCode){
                        case 2009:
                            showinfo("info_vercode1", "验证码错误", 1);
                            break;
                        case  3005:
                            showinfo("info_username1", "无此帐号，请重新输入", 1);
                            break;
                        case 3016:
                            showinfo("info_find_pwd_dlg", "验证时间间隔太短", 1);
                            break;
                        case 3017:
                            showinfo("info_find_pwd_dlg", "今日验证身份次数达到上限", 1);
                            break;
                        case 4010:
                            hideDiv($("#find_pwd_dlg"));
                            showDiv($("#timeout_dlg"));
                            break;
                        default:
                            showinfo("info_find_pwd_dlg", redata.resultDesc, 1);
                            break;
                    }

                    $("#auth_code1").attr("src", $("#captchaUrl").val()+"?vertion="+ Math.random());
                    return;
                }


                var status =redata.data;
                var mobile = status.mobile;
                var email = status.email;
                var protections = status.protections;
                $("#requestKey_0").val(status.requestKey);

                if (mobile !== null){
                    $("#phoneNum").html(mobile);
                    $("#phoneNum1").html(mobile);
                    $("#yz_email_dlg").find(".other_way").eq(0).show();

                    if (email == null){
                        $("#yz_sms_dlg").find(".other_way").eq(0).hide();
                    }else{
                        $("#yz_sms_dlg").find(".other_way").eq(0).show();

                        $("#email").html(email);
                        $("#email1").html(email);
                    }

                    if (protections == null || protections.length == 0){
                        $("#yz_sms_dlg").find(".other_way").eq(1).hide();
                        $("#yz_email_dlg").find(".other_way").eq(1).hide();
                    }else{
                        $("#yz_sms_dlg").find(".other_way").eq(1).show();
                        $("#yz_email_dlg").find(".other_way").eq(1).show();
                        $("#question0").html(status.protections[0]);
                        $("#question1").html(status.protections[1]);
                        $("#question2").html(status.protections[2]);
                    }

                    hideDiv($("#find_pwd_dlg"));
                    showDiv($("#yz_sms_dlg"));
                }else{
                    $("#yz_email_dlg").find(".other_way").eq(0).hide();

                    if (email!== null){
                        $("#email").html(email);
                        $("#email1").html(email);
                        if (protections == null || protections.length == 0){
                            $("#yz_email_dlg").find(".other_way").eq(1).hide();
                        }else{
                            $("#yz_email_dlg").find(".other_way").eq(1).show();

                            $("#question0").html(status.protections[0]);
                            $("#question1").html(status.protections[1]);
                            $("#question2").html(status.protections[2]);
                        }
                        hideDiv($("#find_pwd_dlg"));
                        showDiv($("#yz_email_dlg"));
                    }else{

                        if (protections != null &&  protections.length > 0){
                            $("#question0").html(status.protections[0]);
                            $("#question1").html(status.protections[1]);
                            $("#question2").html(status.protections[2]);
                            hideDiv($("#find_pwd_dlg"));
                            showDiv($("#yz_mibao_dlg"));
                        }else{
                            showinfo("info_username1","该帐号无法找回密码", 1);
                            $("#auth_code1").attr("src", $("#captchaUrl").val()+"?vertion="+ Math.random());
                        }
                    }
                }


            },
            complete : function(req) {
            },
            error : function(data) {
            }
        });
    }
}



//验证js
//短信验证
$("#yz_sms_dlg").find(".login_button").click(function(){
    $.ajax({
        type : 'POST',
        url : 'safety/verifyByChannel',
        cache : false,
        contentType: "application/json; charset=utf-8",   //内容类型
        dataType: "json",     //类型
        data : '{"requestKey" :"'+ $("#requestKey_0").val()+'","channelId":"1","securityType":"findMe"}',
        beforeSend : function() {
        },
        success : function(redata) {
            var code = redata.resultCode;
            if (code != 1001){
                switch (code){
                    case 3016:
                        showinfo("info_yz_sms_dlg", "验证时间间隔太短", 1);
                        break;
                    case 3017:
                        showinfo("info_yz_sms_dlg", "今日发送邮件次数达到上限", 1);
                        break;
                    case 4010:
                        hideDiv($("#yz_sms_dlg"));
                        showDiv($("#timeout_dlg"));
                        break;
                    default:
                        showinfo("info_yz_sms_dlg", redata.resultDesc, 1);
                        break;

                }
                return;
            }

            $("#requestKey_1").val(redata.data.requestKey);
            hideDiv($("#yz_sms_dlg"));
            showDiv($("#yz_sms_dlg1"));
            time_sms();
        },
        complete : function(req) {
        },
        error : function(data) {
        }
    });
})

//短信验证输入验证码
$("#yz_sms_dlg1").find(".login_button").click(function() {
    var vercode = $.trim($("#vercode2").val());
    if (vercode.length == 0) {
        showinfo("info_vercode2", "请输入验证码", 1);
        return false;
    }
    if  (!vercode.match(isVercodeRegex)){
        showinfo("info_vercode2", "验证码错误", 1);
        return false;
    }

    $.ajax({
        type : 'POST',
        url : 'safety/checkByChannel',
        cache : false,
        contentType: "application/json; charset=utf-8",   //内容类型
        dataType: "json",     //类型
        data : '{"requestKey" :"'+ $("#requestKey_1").val()+'","activationCode":"'+vercode +'","channelId":"1"}',
        beforeSend : function() {
        },
        success : function(redata) {
            var code = redata.resultCode;
            if (code != 1001){
                switch (code){
                    case 2009:
                        showinfo("info_vercode2","验证码错误", 1);
                        break;
                    case 3016:
                        showinfo("info_yz_sms_dlg1", "验证时间间隔太短", 1);
                        break;
                    case 3017:
                        showinfo("info_yz_sms_dlg1", "今日发送邮件次数达到上限", 1);
                        break;
                    case 4010:
                        document.getElementById("btn_verify").innerHTML = "<span id='time'>60</span>S";
                        document.getElementById("btn_verify").className = "btn_verify_unedit";
                        document.getElementById("btn_verify").setAttribute("onclick", "");

                        if (xh_sms != null){
                            clearTimeout(xh_sms);
                        }
                        hideDiv($("#yz_sms_dlg1"));
                        showDiv($("#timeout_dlg"));
                        break;
                    default:
                        showinfo("info_yz_sms_dlg1", redata.resultDesc, 1);
                        break;

                }
                return;
            }
            $("#requestKey_2").val(redata.data.requestKey);

            document.getElementById("btn_verify").innerHTML = "<span id='time'>60</span>S";
            document.getElementById("btn_verify").className = "btn_verify_unedit";
            document.getElementById("btn_verify").setAttribute("onclick", "");

            if (xh_sms != null){
                clearTimeout(xh_sms);
            }

            hideDiv($("#yz_sms_dlg1"));
            showDiv($("#set_pwd_dlg"));
        },
        complete : function(req) {
        },
        error : function(data) {
        }
    });

})



//邮箱验证
$("#yz_email_dlg").find(".login_button").click(function(){
    $.ajax({
        type : 'POST',
        url : 'safety/verifyByChannel',
        cache : false,
        contentType: "application/json; charset=utf-8",   //内容类型
        dataType: "json",     //类型
        data : '{"requestKey" :"'+ $("#requestKey_0").val()+'","channelId":"5","securityType":"findMe"}',
        beforeSend : function() {
        },
        success : function(redata) {
            var code = redata.resultCode;
            if (code != 1001){
                switch (code){
                    case 2009:
                        showinfo("info_yz_email_dlg","验证码错误", 1);
                        break;
                    case 3016:
                        showinfo("info_yz_email_dlg", "验证时间间隔太短", 1);
                        break;
                    case 3017:
                        showinfo("info_yz_email_dlg", "今日发送邮件次数达到上限", 1);
                        break;
                    case 4010:
                        hideDiv($("#yz_email_dlg"));
                        showDiv($("#timeout_dlg"));
                        break;
                    default:
                        showinfo("info_yz_email_dlg", redata.resultDesc, 1);
                        break;

                }
                return;
            }

            $("#requestKey_1").val(redata.data.requestKey);
            hideDiv($("#yz_email_dlg"));
            showDiv($("#yz_email_dlg1"));
        },
        complete : function(req) {
        },
        error : function(data) {
        }
    });
})





//通过密保找回
$("#yz_mibao_dlg").find(".login_button").click(function(){
    var answer0 = $.trim($("#answer0").val());
    var answer1 = $.trim($("#answer1").val());
    var answer2 = $.trim($("#answer2").val());

    if (answer0.length == 0) {
        showinfo("info_answer0", "请输入密保答案", 1);
        return false;
    }

    if (!answer0.match(isMibaoRegex)){
        showinfo("info_answer0", "答案格式错误", 1);
        return false;
    }

    if (answer1.length == 0) {
        showinfo("info_answer1", "请输入密保答案", 1);
        return false;
    }

    if (!answer1.match(isMibaoRegex)){
        showinfo("info_answer1", "答案格式错误", 1);
        return false;
    }


    if (answer2.length == 0) {
        showinfo("info_answer2", "请输入密保答案", 1);
        return false;
    }

    if (!answer2.match(isMibaoRegex)){
        showinfo("info_answer2", "答案格式错误", 1);
        return false;
    }

    $.ajax({
        type : 'POST',
        url : 'safety/checkByChannel',
        cache : false,
        contentType: "application/json; charset=utf-8",   //内容类型
        dataType: "json",     //类型
        data : '{"requestKey" :"'+ $("#requestKey_0").val()+'","answer0":"'+answer0 +'","answer1":"'+answer1 +'","answer2":"'+answer2 +'","channelId":"3","securityType":"findMe"}',
        beforeSend : function() {
        },
        success : function(redata) {
            var code = redata.resultCode;
            if (code != 1001){
                switch (code){
                    case 2009:
                        showinfo("info_yz_mibao_dlg","验证码错误", 1);
                        break;
                    case 3016:
                        showinfo("info_yz_mibao_dlg", "验证时间间隔太短", 1);
                        break;
                    case 3017:
                        showinfo("info_yz_mibao_dlg", "今日密保验证次数达到上限", 1);
                        break;
                    case 4010:
                        hideDiv($("#yz_mibao_dlg"));
                        showDiv($("#timeout_dlg"));
                        break;
                    default:
                        showinfo("info_yz_mibao_dlg", redata.resultDesc, 1);
                        break;

                }
                return;
            }


            $("#requestKey_2").val(redata.data.requestKey);
            hideDiv($("#yz_mibao_dlg"));
            showDiv($("#set_pwd_dlg"));
        },
        complete : function(req) {
        },
        error : function(data) {
        }
    });

})

//重置密码js
$("#set_pwd_dlg").find(".confirm_btn").click(function() {
    var pwd = $.trim($("#newpwd").val());
    var pwd2 = $.trim($("#repwd").val());
    if (pwd.length == 0){
        showinfo("info_newpwd","请输入密码",1);
        return false;
    }
    if (pwd2.length == 0){
        showinfo("info_repwd","请再次输入密码",1);
        return false;
    }

    if (!pwd.match(isPasswordRegex)){
        showinfo("info_newpwd","密码格式错误",1);
        return false;
    }

    if (!pwd2.match(isPasswordRegex)){
        showinfo("info_repwd","密码格式错误",1);
        return false;
    }

    if (pwd!=pwd2){
        showinfo("info_repwd","两次密码输入不一致",1);
        return false;
    }

    var password = $.md5(pwd);
    $.ajax({
        type : 'POST',
        url : 'findMe',
        cache : false,
        contentType: "application/json; charset=utf-8",   //内容类型
        dataType: "json",     //类型
        data : '{"requestKey" :"'+ $("#requestKey_2").val()+'","password":"'+ password +'"}',
        beforeSend : function() {
        },
        success : function(redata) {
            if (redata.resultCode!=1001){
                if (redata.resultCode == 30001){
                    showinfo("info_set_pwd_dlg", "新旧密码不能相同", 1);
                }else {
                    if (redata.resultCode == 4010) {
                        hideDiv($("#set_pwd_dlg"));
                        showDiv($("#timeout_dlg"));
                    } else {
                        showinfo("info_set_pwd_dlg", redata.resultMsg, 1);
                    }
                }
                return;
            }

            hideDiv($("#set_pwd_dlg"));
            showinfo("info_repwd","密码包含6-16位字母、数字", 2);

            showToast($("#success_toast"),"已成功重置密码");

            if (u.isDialog){
                window.location.href= decodeURIComponent(u.callback);
            }
        },
        complete : function(req) {
        },
        error : function(data) {
        }
    });


});


//倒计时
var xh_sms;
//手机号码找回倒计时
function time_sms() {
    var t = $("#time").html();
    t--;
    $("#time").html(t);
    xh_sms = setTimeout(function() {
        time_sms();
    }, 1000);
    if (t < 1) {
        clearTimeout(xh_sms);
        $("#btn_verify").html("重新获取");
        document.getElementById("btn_verify").className = "btn_verify";
        document.getElementById("btn_verify").setAttribute("onclick","send_verify_sms()");
    }
}


$("#yz_sms_dlg1 .ico_close").click(function(){

    document.getElementById("btn_verify").innerHTML = "<span id='time'>60</span>S";
    document.getElementById("btn_verify").className = "btn_verify_unedit";
    document.getElementById("btn_verify").setAttribute("onclick", "");

    if (xh_sms != null){
        clearTimeout(xh_sms);
    }

})
function send_verify_sms(){
    document.getElementById("btn_verify").innerHTML = "<span id='time'>60</span>S";
    document.getElementById("btn_verify").className = "btn_verify_unedit";
    document.getElementById("btn_verify").setAttribute("onclick", "");
    time_sms();
    $.ajax({
        type : 'POST',
        url : 'safety/verifyByChannel',
        cache : false,
        contentType: "application/json; charset=utf-8",   //内容类型
        dataType: "json",     //类型
        data : '{"requestKey" :"'+ $("#requestKey_0").val()+'","channelId":"1","securityType":"findMe"}',
        beforeSend : function() {
        },
        success : function(redata) {
            var code = redata.resultCode;
            if (code !=1001){
                switch (code){
                    case 2009:
                        showinfo("info_yz_sms_dlg1", "验证码错误", 1);
                        break;
                    case 3016:
                        showinfo("info_yz_sms_dlg1", "验证时间间隔太短", 1);
                        break;
                    case 3017:
                        showinfo("info_yz_sms_dlg1", "今日发送短信次数达到上限", 1);
                        break;
                    case 4010:

                        hideDiv($("#yz_sms_dlg1"));
                        document.getElementById("btn_verify").innerHTML = "<span id='time'>60</span>S";
                        document.getElementById("btn_verify").className = "btn_verify_unedit";
                        document.getElementById("btn_verify").setAttribute("onclick", "");

                        if (xh_sms != null){
                            clearTimeout(xh_sms);
                        }

                        showDiv($("#timeout_dlg"));
                        break;

                    default:
                        showinfo("info_yz_sms_dlg1", redata.resultDesc, 1);
                        break;
                }
                return;
            }

            $("#requestKey_1").val(redata.data.requestKey);
        },
        complete : function(req) {
        },
        error : function(data) {
        }
    });
}


/***处理输入框回车事件***/
$("#vercode, #username, #pwd").keypress(function(e){
    var key =  e.which;
    if (key === 13) {
        e.preventDefault();
        check_login();
    }
})
$("#find_pwd_dlg #username1,#find_pwd_dlg #vercode1").keypress(function(e) {
    var key =  e.which;
    if (key === 13) {
        e.preventDefault();
        $("#find_pwd_dlg .login_button").click();
    }

});

$("#yz_sms_dlg1 #vercode2").keypress(function(e) {
    var key =  e.which;
    if (key === 13) {
        e.preventDefault();
        $("#yz_sms_dlg1 .login_button").click();
    }

});
$("#yz_mibao_dlg #answer0, #yz_mibao_dlg #answer1, #yz_mibao_dlg #answer2").keypress(function(e) {
    var key =  e.which;
    if (key === 13) {
        e.preventDefault();
        $("#yz_mibao_dlg .login_button").click();
    }

});
$("#set_pwd_dlg  #newpwd, #set_pwd_dlg #repwd").keypress(function(e) {
    var key =  e.which;
    if (key === 13) {
        e.preventDefault();
        $("#set_pwd_dlg .confirm_btn").click();
    }

});



$("#timeout_btn").click(function(){
    hideDiv($("#timeout_dlg"));
    $("#auth_code").attr("src", $("#captchaUrl").val()+"?vertion="+ Math.random());
})

$(".other_link").click(function(){
    if (typeof $(this).data('tj') != 'undefined' && typeof _hmt != 'undefined') {
        var tj = $(this).data('tj');
        var tjs = tj.split("|");
        _hmt.push(['_trackEvent', tjs[0], tjs[1], tjs[2], tjs[3]]);
        window.location.href = $(this).attr("link");
    }
    ;
})


$("#registerBtn").click(function(){
    window.location.href = $(this).attr("link");
})


$(document).ready(function(){
    if ($("#needCaptcha").val() =="1"){
        document.getElementById("captcha_area").style.display = "block";
        $("#auth_code").attr("src", $("#captchaUrl").val()+"?vertion="+ Math.random());
    }
    /***动态设置url***/
    if (u.callback) {
        $(".ico_qq").attr("link","http://my.oppo.com/auth/qqlogin?callback=" + u.callback);
        $(".ico_wb").attr("link","http://my.oppo.com/auth/sinalogin?callback="+ u.callback);
        $(".ico_alipay").attr("link","http://my.oppo.com/auth/alipaylogin?callback="+u.callback);
        $(".ico_wx").attr("link","http://my.oppo.com/auth/wxlogin?callback="+u.callback);
        $("#registerBtn").attr("link",$("#registerBtn").attr("link")+"&callback="+u.callback);
    }
    setTimeout(function(){
        if ($("#username").val() != "") {
            $("#username").next(".placeholder").css("display","none");
        }

        if ($("#pwd").val() != "") {
            $("#pwd").next(".placeholder").css("display","none");
        }
    },300);
    //弹窗找回密码跳转过来
    if (u.isDialog){
        showDiv($("#find_pwd_dlg"));
        $("#auth_code1").attr("src", $("#captchaUrl").val()+"?vertion="+ Math.random());
    }
});



window.onresize = function(){
    $(".mask").css({"height":$(document).height(),"width":$(document).width()});
    var dlg_id= $("#dlg_id").val();
    if (dlg_id != ''){
        var obj = $("#"+dlg_id);
        obj.css({
            "top":$(window).height()/2-obj.height()/2+$(window.document).scrollTop()+"px",
            "margin-left":$(window).width()/2-220+$(window.document).scrollLeft()+"px"
        });
    }
}
