if(typeof oppo == 'undefined'){
    var oppo = {};
}
var accountHost   = 'https://id.oppo.com';
var staticHost = 'https://id.oppo.com';
oppo.win = {
    isScroll : false,

    init : function(){
        oppo.win.isTest();
        oppo.win.createLink();

        var body 			= document.body || document.getElementsByTagName("body")[0];
        var account_bg		= oppo.win.createDiv('account_bg', 'account_bg');
        var account_contain = oppo.win.createDiv('account_contain', 'account_contain');


        body.appendChild(account_bg);
        body.appendChild(account_contain);


        var obj = document.getElementById('account_bg');
        if(obj.attachEvent){
            obj.attachEvent("onclick",function(){
                document.getElementById('account_contain').innerHTML = '';
                oppo.win.closeWindow();
            });
        }else if(obj.addEventListener){
            obj.addEventListener("click",function(){
                document.getElementById('account_contain').innerHTML = '';
                oppo.win.closeWindow();
            });
        }





    },

    closeWindow : function(){
        oppo.win.isScroll = true;
        document.getElementById('account_bg').style.display = 'none';
        document.getElementById('account_contain').className = 'account_contain';
        document.getElementById('account_contain').style.display = 'none';
        oppo.win.removeClass(document.getElementsByTagName("body")[0], 'account_overflow_hide');
    },

    createIframe : function(url, isHTML5){
        var url = url,
            isHTML5 = isHTML5 || false;

        if ( typeof url === 'boolean' ) {
            isHTML5 = url;
            url = false;
        }

        var iframe 			= document.createElement('iframe');
        iframe.id           = 'oppo_iframe';
        iframe.scrolling    = 'no';
        iframe.frameBorder  = 0;
        iframe.noresize     = 'noresize';
        //重置callback
        //移动端
        if(isHTML5 ) {
            if(url) {
                iframe.src = accountHost + '/login_dlg_wap.jsp?type=2&callback=' + encodeURIComponent(url);
            }else{
                iframe.src = accountHost + '/login_dlg_wap.jsp?type=2&callback=' + encodeURIComponent(location.href);
            }
            iframe.style.width = '100%';
            iframe.style.height = '100%';
        }else{
            if(url) {
                iframe.src = accountHost + '/login_dlg.jsp?type=1&callback=' + encodeURIComponent(url);
            }else{
                iframe.src      = accountHost + '/login_dlg.jsp?type=1&callback=' + encodeURIComponent(location.href);
            }
            iframe.style.width="440px";
            iframe.style.height="600px";
        }

        iframe.style.border = 0;
        iframe.style.marginwidth  = 0;
        iframe.style.marginheight = 0;
        iframe.allowtransparency  = 'true';
        return iframe;
    },

    createLink : function(){
        var head	= document.head || document.getElementsByTagName('head')[0];
        var link 	= document.createElement('link');
        link.type 	= 'text/css';
        link.rel  	= 'stylesheet';
        if(oppo.win.isMobile()){
            link.href 	= staticHost + '/resources/css_wap/oppo.login.css';
        }else{
            link.href 	= staticHost + '/resources/css/oppo.login.css';
        }
        head.appendChild(link);
    },

    createDiv : function(id, className){
        var div 		= document.createElement('div');
        div.className 	= className;
        div.id        	= id;
        return div;
    },

    createCloseDiv : function(){
        var a 		= document.createElement('a');
        a.className = 'account_close';
        a.id        = 'account_close';
        a.href      = 'javascript:;';
        return a;
    },

    open : function(url){//打开弹窗登录
        document.getElementById('account_bg').style.display = 'block';
        document.getElementById('account_contain').style.display = 'block';
        document.getElementById('account_contain').innerHTML = '';

        //创建iframe
        if(oppo.win.isMobile()){
            var iframe = oppo.win.createIframe(url, true);//移动端
        }else{
            var iframe = oppo.win.createIframe(url, false);//PC端
        }




        document.getElementById('account_contain').appendChild(iframe);

        var close_div = oppo.win.createCloseDiv();
        document.getElementById('account_contain').appendChild(close_div);
        var obj = document.getElementById('account_close');
        if(obj.attachEvent){
            obj.attachEvent("onclick",function(){
                document.getElementById('account_contain').innerHTML = '';
                oppo.win.closeWindow();
            });
        }else if(obj.addEventListener){
            obj.addEventListener("click",function(){
                document.getElementById('account_contain').innerHTML = '';
                oppo.win.closeWindow();
            });
        }


        setTimeout(function(){
            document.getElementById('account_contain').className = 'account_contain active';
        }, 50);
    },

    isMobile:function() {
        if (/AppleWebKit.*Mobile/i.test(navigator.userAgent)
            || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
            if (location.href.indexOf("?mobile") < 0) {
                try {
                    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                        return 1;
                    } else if (/iPad/i.test(navigator.userAgent)) {
                        return 1;
                    } else {
                        return 1;
                    }
                } catch (e) {
                }
            }
        } else {
            return 0;
        }
    },


    hasClass: function(obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },

    addClass: function(obj, cls) {
        if (!this.hasClass(obj, cls)) obj.className += " " + cls;
    },

    removeClass: function(obj, cls) {
        if (oppo.win.hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    },

    isTest : function(){
        var currentUrl = encodeURI(location.href);
        if (currentUrl.indexOf('test') > -1 || currentUrl.indexOf('dev')>-1) {
            accountHost = 'https://snewucweb.uctest.wanyol.com/UserCenterWeb';
            staticHost = 'https://snewucweb.uctest.wanyol.com/UserCenterWeb';
        }
    }

};

oppo.win.init();