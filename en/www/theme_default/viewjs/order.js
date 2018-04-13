var orderid = 0;
var order_status = 0;
require(["jquery", "jsuitl/yirunapi"], function ($, API) {
    var id = $.getUrlVar("id");
    var layout = $(".sbspsl");
    layout.html("");
    API.getOrderDetail(id, function (resultData) {
        $("#create_time1").html(resultData.order_info.create_time);
        $("#create_time2").html('Date：' + resultData.order_info.create_time);
        $("#order_no").html('Order Number：' + resultData.order_info.order_no);
        $("#order_status_text").html('State：' + resultData.order_info.order_status_text);
        $("#accept_name").html(resultData.order_info.accept_name);
        $("#delivery").html(resultData.order_info.delivery);
        $("#address").html(resultData.order_info.province_str + ' ' + resultData.order_info.city_str + ' ' + resultData.order_info.area_str + ' ' + resultData.order_info.address);
        $("#payment").html(resultData.order_info.payment);
        $("#postcode").html(resultData.order_info.postcode);
        $("#real_freight1").html(resultData.order_info.real_freight);
        $("#real_freight2").html(resultData.order_info.real_freight);
        $("#telphone").html(resultData.order_info.telphone);
        $("#freight_name").html(resultData.order_info.freight_name);
        $("#mobile").html(resultData.order_info.mobile);
        $("#delivery_code").html(resultData.order_info.delivery_code);
        $("#payable_amount").html(resultData.order_info.payable_amount);
        $("#order_amount").html(resultData.order_info.order_amount);
        $("#discount").html(resultData.order_info.discount);
        orderid = resultData.order_info.id;
        if (resultData.order_info.order_status == 2) {
            $("#buynow").css("display", "inline-block");
        } else {
            $("#buynow").css("display", "none");
        }

        order_status = resultData.order_info.order_status;

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
            setc();
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


});

var setc = function () {
    
    setTimeout(function () {
    if (window.userinfo) {
            if (order_status == 1 || order_status == 2) {
                $("#cancel").css("display", "inline-block");
            } else {
                $("#cancel").css("display", "none");
            }
        }
   }, 1500);
}

function buynowFn() {
    window.location.href = "cart5.html?id=" + orderid;
}

function cancelFn() {
    if (userinfo) {
        require(["jquery", "jsuitl/yirunapi"], function ($, API) {
            API.cancelOrder(orderid, function (result) {
                window.location.reload();
            });
        });
    } else {
        API.messageuitl("Please log in again");
    }
}