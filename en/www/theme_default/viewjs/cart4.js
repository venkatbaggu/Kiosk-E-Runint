var addr, deliverid, paymentid, deliver_time;
var services = {};
require(["jquery", "jsuitl/yirunapi"], function ($, API) {
    var layout = $(".list-products");
    layout.html("");

    addr = decodeURIComponent($.getUrlVar("addr"));
    deliverid = $.getUrlVar("deliverid");
    paymentid = $.getUrlVar("paymentid");
    deliver_time = $.getUrlVar("deliver_time");
    addr = JSON.parse(addr);
    var city_id = addr.city;

    API.getUnionTypeList(function (resultData) {
        $.each(resultData.unionCatlist, function (i, item) {
            var html = '<div class="mcb" style="margin-bottom: 10px;">';
            html += '<a href="javascript:;" class="mca">';
            html += '<div class="cart2-t" style="margin-bottom: 0;"><span>Selector' + item.name + 'Service</span></div>';
            html += '<div class="xbs">▾</div>';
            html += '</a>';
            if (i == 0) {
                html += '<div class="mch" style="display: block">'
            } else {
                html += '<div class="mch" >'
            }

            html += ' <a onclick="selected_services(this)" key="' + item.rad_name + '" value="0" class="zmc cartasel cartactive">Don&rsquo;t need the service </a>'

            API.getUnionList(item.id, city_id, function (retultData) {
                $.each(retultData.unionlist, function (i, uitem) {
                    html += '<a onclick="selected_services(this)" key="' + item.rad_name + '" value="' + uitem.id + '" class="zmc cartasel">' + uitem.true_name + '</a>';
                });
            });
            html += '</div>';
            html += '</div>';
            layout.append(html);

            services[item.rad_name] = "0";


        });



        $("a.mca").click(function () {//渲染服务商类型选择效果
            $(".mch").slideUp(200);
            $(this).parents(".mcb").children(".mch").stop().slideDown(200);
        });
        $(".cartasel").click(function () {//渲染选择服务商效果
            $(this).siblings().removeClass("cartactive");
            $(this).addClass("cartactive");
        });
    });
});

function selected_services(_this) {
    var key = $(_this).attr("key");
    var value = $(_this).attr("value");
    services[key] = value;
}
function addOrder() {
    //addr, deliverid, paymentid, deliver_time;
    var params = services;
    params["terminal_no"] = formJs.getkiosnum();//终端机编号   
    params["accept_name"] = addr["accept_name"];//收货人名称
    params["province"] = addr["province"];//省份ID
    params["city"] = addr["city"];//城市ID
    params["area"] = addr["area"];//区域ID
    params["address"] = addr["address"];//地址
    params["mobile"] = addr["mobile"];//联系电话
    params["telphone"] = addr["telphone"];//固话
    params["zip"] = addr["zip"];//邮编
    params["delivery_id"] = deliverid;//配送方式

    if (deliver_time == "1") {//配送时间
        params["accept_time"] = "任意";
    }
    if (deliver_time == "2") {//配送时间
        params["accept_time"] = "周一至周五";
    }
    if (deliver_time == "3") {//配送时间
        params["accept_time"] = "周末";
    }

    params["payment"] = paymentid;//支付方式
    params["order_message"] = "";//留言
    // 优惠劵
    //if (useTicketID > 0) {
    //    params["ticket_id"] = useTicketID;//优惠劵
    //}
    //if (useTicketForSellerId > 0) {
    //    params["ticketUserd"] = useTicketForSellerId;//优惠劵提供商
    //}
    params["order_source"] = 3;
    params["taxes"] = 0;//是否需要发票
    params["tax_title"] = "";//发票抬头



    //if (this.comp("checkbox1").get("checked")) {
    //    if (this.comp("input_goodsTax_title").val() === "") {
    //        common.message("aler", "请填写发票抬头");
    //        return;
    //    }
    //    params["taxes"] = 1;
    //    params["tax_title"] = this.comp("input_goodsTax_title").val();
    //}

    //if (takeself !== 0) {
    //    params["takeself"] = takeself;//自提点ID
    //}
    require(["jquery", "jsuitl/yirunapi"], function ($, API) {
        API.getOrderInfo(function (resultData) {
            if (resultData) {
                API.addOrder(params, function (resultData2) {

                    if (resultData2.return_code == "00") {

                        API.clearCart(function (resultData3) {
                            //跳转到支付页面
                            API.messageuitl(resultData2.return_message);
                            setTimeout(function () {
                                if (resultData2.to_pay) {
                                    window.location.href = "cart5.html?id=" + resultData2.return_data.order_id;
                                } else {
                                    window.location.href = "index.html";
                                }
                            }, 2100);
                        });
                    } else {
                        API.messageuitl(resultData2.return_message);
                    }
                });

            } else {
                window.location.href = "index.html";
            }

        });
    });
}