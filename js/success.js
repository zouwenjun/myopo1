$.ajax({

    type: 'POST',
    url: 'data/success.php',
    data: {uid: sessionStorage['loginUid']},
    success: function (data) {
        var price=0;

        var html='';
        $.each(data.pp,function(i,obj){

            price+=parseFloat(obj.price)*parseFloat(obj.count);

            html+=`<div class="s_list">
                            <label>${obj.pdevice} </label>
                            <label>OPPO时尚单品自拍杆 晴空蓝x1</label>
                            <label>蓝牙音箱Q9x1</label>
                     </div>`;

        });
        $("#detailed_list").html(html);

        $("#money_pay").html(price);

        $.each(data.nn,function(i,obj){
            var nu=obj.nn;
            $("#nu").html(nu);
        });




    },
    error: function () {
        alert('购买记录删除失败！请检查响应消息');
    }
});
$(".ad_address").click(function () {
    var m = $(".detail_a").css("display");
    if (m == "none") {
        $(".detail_a").css("display", "block");
    } else {
        $(".detail_a").css("display", "none");
    }
})