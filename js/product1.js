/**
 * Created by bjwsl-001 on 2017/3/12.
 */
var preview = {
    $ul:null,
    $pcolor:null,
    init(){

        this.$ul=$("#icon_list");
        this.$ul.on("click", "li>img", function () {
            //获得当前img的src
            //$(this).parent().parent().children().css("borderColor","transparent");
            //$(this).parent().css("borderColor","#2aad6f");
            $(this).parent().parent().children().removeClass("img_click");
            $(this).parent().addClass("img_click");

            var src = $(this).attr("src");
            //查找旧src中最后一个.的位置
            var i = src.lastIndexOf(".");
            //拼接.前的字符串+"-m"+.之后的剩余字符串
            src = src.slice(0, i) + "-l" + src.slice(i);
            //设置id为mImg的src为新的src
            $("#mImg").attr("src", src);
        });
        this.$color=$(".pcolor");
        this.$color.on("click","b",function(){
            //$(this).parent().children().css("borderColor","transparent");
            //$(this).css("borderColor","#2aad6f");
            $(this).parent().children().removeClass("choseColor");
            var click_chose = $(this).addClass("choseColor");
            var phones=$(this).parent().children();
            var $chose=$("#icon_list>li>img");
			 var address=$(this).index();
			//对象的遍历************************
			$("#icon_list li img").each(function(i,obj){
//				  var src=obj.attr("src");
//              
				var ff=60;
				console.log(ff);
                var id=null;
              if(address==1){
			  var p="g";
                   id=1;
              }else if(address==2){
			   var p="r";id=2;}else if(address==3){
				   var p="b";id=3;
			   }
                sessionStorage['pid']=id;
                console.log(sessionStorage['pid']);
              var i = obj.src.lastIndexOf(".");
//              // 拼接.前的字符串+"-m"+.之后的剩余字符串
                 var src= obj.src.slice(0, i-1) + p + obj.src.slice(i);
               obj.src=src;
              //console.log(typeof(obj.src));
				console.log(obj.src)
			});
           
//            
//           if(address==1){
               var src=$chose.attr("src");
//              
//               var i = src.lastIndexOf(".");
//              // 拼接.前的字符串+"-m"+.之后的剩余字符串
//                src = src.slice(0, i-1) + "g" + src.slice(i);
//               $chose.attr("src",src);
              
               var ii=src.lastIndexOf(".");
               var largesrc=src.slice(0, ii) + "-l" + src.slice(ii);
              $("#mImg").attr("src", largesrc);

        });
        //if(btn.innerHTML=="+")//如果btn的内容是+
       // n++;//n+1
    //else if(n!=1)//否则，如果n!=1
           //n-1
        //将n设置回span的内容中
        //span.innerHTML=n;

        $("#calc").on("click","a",function(e){
            var n=$(this).html();
            var m=$("#calc input").val();

            if(n=="+"){
                m++;
            }else if((n=="-")&&(m>0)){
                m--;
            }
            $("#calc input").val(m);
        });
        //为添加购物车绑定监听事件，先判断用户登录后跳转
        $('#add_cart').click(function(){
            if(sessionStorage['loginUid']!==undefined ){
                console.log(sessionStorage['loginUid']);

                location.href = 'cart.html';
            }else {
                console.log(sessionStorage['loginUid']);

                location.href = 'login.html';
            }
        });


    }
}
preview.init();