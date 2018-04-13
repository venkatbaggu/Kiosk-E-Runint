var addr;
var deliverid;
var paymentid;
var deliver_time;
require(["jquery", "jsuitl/yirunapi"], function ($, API) {
    addr = decodeURIComponent($.getUrlVar("addr"));
    deliverid = $.getUrlVar("deliverid");
    paymentid = $.getUrlVar("paymentid");
    deliver_time = $.getUrlVar("deliver_time");
    if (deliver_time || deliver_time == "") {
        deliver_time = 1;
    }
    $("#deliver_time" + deliver_time).addClass("cartactive");
    var goodsIds = {};
    var productIds = {};
    var nums = {};

    API.getOrderInfo2(function (resultData1) {
        var goodsList = resultData1.goodsList;
        $.each(goodsList, function (i, item) {
            goodsIds[i] = item.goods_id;
            productIds[i] = item.product_id;
            nums[i] = item.count;
        });

        API.getDeliveryPaymentList(function (resultData) {
            var paymentjson = resultData.payment_list;
            var deliverjson = resultData.deliver_list;
            $("#deliver_list").html("");
            $("#payment_list").html("");
            $.each(deliverjson, function (i, item) {
                if (item.id == "1") {
                    API.order_delivery(JSON.parse(addr).province, item.id, goodsIds, productIds, nums, function (deliveryresult) {
                        var delivery_price = deliveryresult.price;
                        var tmp = '<a  class="cartbsel" onclick="selected_deliver(this);" value=' + item.id + '>';
                        if (deliverid == item.id) {

                            tmp += '<dl class="c3dl cartbctive">';
                        } else {

                            tmp += '<dl class="c3dl">';
                        }

                        tmp += '<dt>' + item.name + '</dt>';
                        tmp += '<dd>';
                        tmp += '<div class="c2a1"><span>Freight：' + API.formatMoney(delivery_price) + '</span></div>';
                        tmp += '</dd>';
                        tmp += '</dl>';
                        tmp += '</a>';
                        $("#deliver_list").append(tmp);
                    });


                } else {

                    var tmp = '<a  class="cartbsel" onclick="selected_deliver(this);" value=' + item.id + '>';
                    if (deliverid == item.id) {

                        tmp += '<dl class="c3dl cartbctive">';
                    } else {

                        tmp += '<dl class="c3dl">';
                    }

                    tmp += '<dt>' + item.name + '</dt>';
                    tmp += '<dd>';
                    tmp += '<div class="c2a1"><span>' + item.description + '</span></div>';
                    tmp += '</dd>';
                    tmp += '</dl>';
                    tmp += '</a>';
                    $("#deliver_list").append(tmp);
                }

            });

            $.each(paymentjson, function (i, item) {

                if (item.id == 13) {
                    if (paymentid == item.id) {
                        $("#payment_list").append('<a class="c3a cartasel cartbctive" onclick="selected_payment(this);" value=' + item.id + '>' + item.name + '</a>');
                    } else {
                        $("#payment_list").append('<a class="c3a cartasel" onclick="selected_payment(this);" value=' + item.id + '>' + item.name + '</a>');
                    }
                }
            });

            $(".cartasel").click(function () {
                $(this).siblings().removeClass("cartactive");
                $(this).addClass("cartactive");
            });
            $(".cartbsel").click(function () {
                $(this).siblings().children("dl").removeClass("cartbctive");
                $(this).children("dl").addClass("cartbctive");
            });
        });
    });
});

function selected_deliver(_this) {
    deliverid = $(_this).attr("value");
}
function selected_payment(_this) {
    paymentid = $(_this).attr("value");
}
function selected_deliver_time(val) {
    deliver_time = val;
}
function next() {

    if (deliverid && paymentid && deliverid !== "" && paymentid !== "") {
        window.location.href = "cart4.html?addr=" + addr + "&deliverid=" + deliverid + '&paymentid=' + paymentid + "&deliver_time=" + deliver_time;
    } else {
        require(["jquery", "jsuitl/yirunapi"], function ($, API) {
            API.messageuitl("Please select a delivery and payment");

        });
    }
}