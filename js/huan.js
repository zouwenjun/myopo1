/**
 * Created by bjwsl-001 on 2017/3/14.
 */
function huanying() {

    var n = sessionStorage['LoginName'];
    console.log(n);
    if(n !=undefined) {
        console.log("keyiyunxing ");
        //$('#welcome').html('欢迎回来：'+data.uname);
        var nn = "我的OPPO";
        var mm = "退出";
        document.getElementById("duname").innerHTML = nn;
        document.getElementById("out").innerHTML = mm;
    } else if (n==undefined) {
        var nn = "登录";
        var mm = "注册";
        document.getElementById("duname").innerHTML = nn;
        document.getElementById("out").innerHTML = mm;

    }
}
huanying();