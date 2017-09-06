/**
 * Created by bjwsl-001 on 2017/3/16.
 */
$.ajax({
    url:'data/cart.php',
    data:{uid:sessionStorage['loginUid']},
    success:function(data){
        var html='';
        $.each(data,function(i,obj){
            html+=`<div>
                    <!-- 			单个的产品		 -->
                    <div class="p_detail">
                        <!-- 图片 -->
                        <div class="p_img">
                            <label>
                                <span class="check single"></span>
                            </label>
                            <img src="${obj.pic}" alt="">
                        </div>
                        <!-- 右侧 -->
                        <div class="p_count">
                            <div>
                                <h4>
                                    <a href="product1.html">${obj.pdevice}</a>
                                </h4>

                                <p>全网通|64G</p>
                            </div>
                            <div class="count">
                                <a class="sub_count" href="#">-</a>
                                <input type="text" value="1"/>
                                <a class="add_count" href="#">+</a>
                            </div>

                            <div class="price">
                                <span>￥${obj.price}</span>
                            </div>
                            <div class="delete">
                                删除

                            </div>

                        </div>

                    </div>
                    <!-- 赠品-->
                    <div class="p_detail border_no">
                        <!-- 图片 -->
                        <div class="p_img">

                            <img src="images/product/other07.jpg" alt="">
                        </div>
                        <!-- 右侧 -->
                        <div class="p_count">
                            <div>
                                <h5>
                                    <a href="product1.html">赠品 &nbsp;&nbsp;OPPO时尚单品自拍杆 晴空蓝</a>
                                </h5>

                                <p class="blue">晴空蓝</p>
                            </div>
                            <div class="z_count">
                                <span>x <span>1</span></span>
                            </div>
                        </div>

                    </div>
                    <div class="p_detail">
                        <!-- 图片 -->
                        <div class="p_img">

                            <img src="images/product/zeng_2.jpg" alt="">
                        </div>
                        <!-- 右侧 -->
                        <div class="p_count">
                            <div>
                                <h5>
                                    <a href="product1.html">赠品 &nbsp;&nbsp;OPPO时尚单品自拍杆 晴空蓝</a>
                                </h5>

                                <p class="blue">深蓝</p>
                            </div>
                            <div class="z_count">
                                <span>x <span>1</span></span>
                            </div>
                        </div>

                    </div>
                </div>`;
        });
        $("#single_detail").html(html);
    },
    error: function () {
        console.log("333");
        alert('异步请求商品列表出错！请检查响应消息');
    }

});