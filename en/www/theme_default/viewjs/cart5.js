var qr_old = "images/wxqr.jpg";
var t = 60;
var id;
var order_no;
var checktimer;
var timer;
require(["jquery", "jsuitl/yirunapi"], function ($, API) {
    id = $.getUrlVar("id");
    var layout = $(".sbspsl");

    API.getOrderDetail(id, function (resultData) {

        $("#order_no").html('Order Number：' + resultData.order_info.order_no);
        $("#create_time2").html('Date：' + resultData.order_info.create_time);
        $("#order_status_text").html('State：' + resultData.order_info.order_status_text);
        $("#payable_amount").html(resultData.order_info.payable_amount);
        $("#order_amount").html(resultData.order_info.order_amount);
        $("#real_freight2").html(resultData.order_info.real_freight);
        $("#discount").html(resultData.order_info.discount);
        $("#qr_order_no").html(resultData.order_info.order_no);
        order_no = resultData.order_info.order_no;

        $.each(resultData.order_goods, function (i, item) {
            var html = "";
            html += '<table width="100%" border="0" class="lbtable3">';
            html += '<tr class="lbtable-tr2">';
            html += '<td class="lbtable-tr2-td1">';
            html += '<a>';
            html += '<div class="lbtcover2">';
            html += '<img src="' + item.img + '" width="50" height="50" />';
            html += '</div>';
            html += ' <div class="lbtitle2">';
            html += '<p>' + item.goodsname + '</p>';
            var goods_array = JSON.parse(item.goods_array);
            html += '<p class="lbtzl">' + goods_array.value + '</p>';
            html += '</div>';
            html += '<div class="lbtnum2">x ' + item.goods_nums + '</div>';
            html += '</a></td></tr></table>';
            layout.append(html);
        });

        //商品列表的上下按钮
        $("a.sxsg").click(function () {
            var t = $(".sbspsl").scrollTop();
            $('.sbspsl').animate({ 'scrollTop': t - 100 }, 100)
        });
        $("a.sxxg").click(function () {
            var t = $(".sbspsl").scrollTop();
            $('.sbspsl').animate({ 'scrollTop': t + 100 }, 100)
        });
    });

    API.weixinpay(id, function (resultData) {

        if (resultData && resultData.code_url) {
            $("#qrimg").attr("src", resultData.code_url);
            tmm();
            weixincheck();
        } else {
            $("#tm").html("Unable to get qr code, please return back to operation.");
        }

    });
    // $("#qrimg").attr("src", "");
    $(window).unload(function () {        
        clearInterval(checktimer);
        clearInterval(timer);
    });
});

var weixincheck = function () {

    checktimer = setInterval(function () {
        require(["jquery", "jsuitl/yirunapi"], function ($, API) {
            API.weixinpaycheck(order_no, function (resultData) {               
                if (resultData.pay_status == 1) {
                    clearInterval(checktimer);
                    clearInterval(timer);
                    API.messageuitl("Pay for success!");
                    setTimeout(function () { window.location.href = "orderlist.html"; }, 1200);  
                }
            });
        });
    }, 3000);

};

var tmm = function () {
     timer = setInterval(function () {
        t--;
        if (t == 0) {
            clearInterval(timer);
            $("#tm").html("Qr code has expired, please return back to operation.");
            $("#qrimg").attr("src", qr_old);
            setTimeout(function () {                
                clearInterval(checktimer);
            }, 3000);
        } else {
            $("#tm").html("Valid time：" + t + "秒");
        }
    }, 1000);
};
