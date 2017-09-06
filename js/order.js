/*使用 HTML DOM 的方式实现地址选折选项*/
var categories = [
    {
        "id": 10,
        "name": '广州市',
        "children": [
            {
                "id": 101, "name": '荔湾区',
                "children": [
                    {"id": 1011, "name": '东墩街道'},
                    {"id": 1011, "name": '沙面街道'},
                    {"id": 1011, "name": '中南街道'},
                    {"id": 1011, "name": '东沙街道'},
                    {"id": 1011, "name": '朝中街道'},
                ]
            },
            {
                "id": 102, "name": '越秀区',

                "children": [
                    {"id": 1021, "name": '黄花岗街道'},
                    {"id": 1021, "name": '白云街道'},
                    {"id": 1021, "name": '人民街道'},
                    {"id": 1021, "name": '北京街道'},

                ]
            },
            {
                "id": 103, "name": '海珠区',
                "children": [
                    {"id": 1031, "name": '中上街道'},
                    {"id": 1031, "name": '华洲街道'},
                    {"id": 1031, "name": '沙园街道'},
                    {"id": 1031, "name": '其它'},

                ]
            },
            {
                "id": 104, "name": '天河区',
                "children": [
                    {"id": 1041, "name": '凤凰街道'},
                    {"id": 1041, "name": '石牌街道'},
                    {"id": 1041, "name": '五山街道'},
                    {"id": 1041, "name": '其它'},

                ]
            },
        ]
    },
    {
        "id": 20,
        "name": '深圳市',
        "children": [
            {
                "id": 201, "name": '罗湖区',
                "children": [
                    {"id": 2011, "name": '笋岗街道'},
                    {"id": 2011, "name": '黄贝街道'},
                    {"id": 2011, "name": '东门街道'},
                    {"id": 2011, "name": '其它街道'},
                ]
            },
            {
                "id": 202, "name": '福田',
                "children": [
                    {"id": 2021, "name": '福保街道'},
                    {"id": 2021, "name": '华强北街道'},
                    {"id": 2021, "name": '圆岭街道'},
                    {"id": 2021, "name": '其它街道'},
                ]
            },
            {
                "id": 203,
                "name": '宝安区',
                "children": [
                    {"id": 2031, "name": '新安街道'},
                    {"id": 2031, "name": '民治街道'},
                    {"id": 2031, "name": '西乡街道'},
                    {"id": 2031, "name": '福永街道'},
                ]
            },
        ]
    },
    {
        "id": 30, "name": '中山市', "children": [

        {
            "id": 302, "name": '中山市', "children": [
            {"id": 3021, "name": "大涌镇"},
            {"id": 3021, "name": "三乡镇"},
            {"id": 3021, "name": "南区街道"},
            {"id": 3021, "name": "其它"}
        ]
        },

    ]
    }
];


//查找id为category的div保存在div中
var div = document.getElementById("category");
//定义函数createSelect,接收一个数组参数arr
function createSelect(arr) {
    //创建一个select
    var sel = document.createElement("select");
    //创建一个option，设置其内容为"-请选择-"，值为-1,将option添加到select中
    sel.add(new Option("-请选择-", -1));
    for (var i = 0; i < arr.length; i++) {//遍历arr
        //创建一个option，设置内容为当前元素的name属性，设置value为当前元素的id属性，将新option添加到select中
        sel.add(new Option(arr[i].name, arr[i].id));
    }//(遍历结束)
    //为sel绑定onchange事件
    sel.onchange = function () {
        //反复:只要当前select不是div的lastChild
        while (this != div.lastChild)
            //换了一个父元素，所以其子元素需删除，让div删除其lastChild
            div.removeChild(div.lastChild);
        //获得当前选中项的下标-1，保存在i中
        var i = this.selectedIndex - 1;
        //如果arr中i位置的商品类别有children
        if (i >= 0 && arr[i].children !== undefined)
        //用arr中i位置的商品类别的children数组创建下一个select
            createSelect(arr[i].children);
    }
    //将select添加到div中
    div.appendChild(sel);
}
createSelect(categories);
$(".ad_address").click(function () {
    var m = $(".detail_a").css("display");
    if (m == "none") {
        $(".detail_a").css("display", "block");
    } else {
        $(".detail_a").css("display", "none");
    }
})
//order 页面的更新
refresh();
function refresh() {
    $.ajax({
        url: 'data/order.php',
        data: {uid: sessionStorage['loginUid']},
        success: function (data) {
            var html = '';
            var sum = 0;
            var count = 0;
            // console.log(data);
            $.each(data, function (i, obj) {

                count += parseInt(obj.count);
                sum += obj.price * obj.count;
                html += `<div>
                    <!-- 			单个的产品		 -->
                    <div class="p_detail">
                        <!-- 图片 -->
                        <div class="p_img">

                          <img src="${obj.pic}" alt="">
                        </div>
                        <!-- 右侧 -->
                        <div class="p_count">
                            <div>
                                <h4>
                                    <a href="product1.html">${obj.pdevice}</a>
                                    <a href="product1.html">赠品 &nbsp;&nbsp;OPPO时尚单品自拍杆 晴空蓝</a>
                                    <a href="product1.html">赠品 &nbsp;&nbsp;蓝牙音箱Q9</a>

                                </h4>
                            </div>
                            <div id="count_cp"class="count count_border">

                                <p> <span class="scount">x${obj.count}</span></p>
                                <p> <span class="scount">x${obj.count}</span></p>
                                <p> <span class="scount">x${obj.count}</span></p>

                            </div>

                            <div class="price">
                                <span>￥${obj.price}</span>
                            </div>


                        </div>

                    </div>

                </div>`;
            });
            $("#single_detail").html(html);
            $("#count").html(count);
            sessionStorage["count"] = count;
            $("#cart_count").html(count);
            $("#money").html(sum);
        },
        error: function () {

            alert('异步请求商品列表出错！请检查响应消息');
        }
    });

}
$("#do_order").click(function(e){
    e.preventDefault();
    location.href="success.html";
})
