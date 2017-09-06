/**
 * Created by bjwsl-001 on 2017/3/17.
 */
/**
 * Created by bjwsl-001 on 2017/3/17.
 */
function loadProduct() {
    $.ajax({
        url: 'data/shopcity.php',
        success: function(data){
            var html = '';
            $.each(data,function(i,obj) {
                //console.log(obj.price);

                //if (data.pid == 1 || data.pid == 5 || data.pid == 8) {
                var yuan = parseFloat(obj.price) + 300;
                html += `
			    <li><img src="images/mini/new.png">
                <dl>
                    <dt><a href="#"><img src="${obj.pic}"></a></dt>
                    <dt><span><a href="#">${obj.pdevice}</a></span></dt>
                    <dd><p><s>&yen;${yuan}</s></p>

                    <h1>&yen;${obj.price}</h1>
                    </dd>
                </dl>
                </li>
		        `;
                sessionStorage['pid']=obj.pid;
            });
            $('#main ul').html(html);

        },
        error: function () {
			console.log("333");
            alert('异步请求商品列表出错！请检查响应消息');
        }
    });
}
loadProduct();
$("#main").on('click','li a',function(e){
    e.preventDefault();

    location.href="product1.html";
})
