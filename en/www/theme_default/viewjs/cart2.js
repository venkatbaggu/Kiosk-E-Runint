var page = 1;
var totpage = 1;
var pageMaxCount = 2;
var len = 2;
var addr = "";
var addrlistdata = [];
var areainfo = {};
var province_layout;
var city_layout;
var area_layout;
var citylen, arealen;

require(["jquery", "jsuitl/yirunapi"], function ($, API) {

    $.virtualkeyboard.init();
    $("#accept_name_s").click(function (e) {
        $.virtualkeyboard.keyboardShowForId("accept_name_s");
    });
    $("#address_s").click(function (e) {
        $.virtualkeyboard.keyboardShowForId("address_s");
    });
    $("#zip_s").click(function (e) {
        $.virtualkeyboard.keyboardShowForId("zip_s");
    });
    $("#telphone_s").click(function (e) {
        $.virtualkeyboard.keyboardShowForId("telphone_s");
    });
    $("#mobile_s").click(function (e) {
        $.virtualkeyboard.keyboardShowForId("mobile_s");
    });





    addr = decodeURIComponent($.getUrlVar("addr"));
    if (!addr) {
        addr = "";
    }
    $("a.c2adda").click(function () {
        $('.darkbox').fadeIn(777);
    });
    $("a.pia-fzs").click(function () {
        $('.darkbox').fadeOut(777);
    });


    province_layout = $("#province");
    province_layout.html("");

    city_layout = $("#city");
    city_layout.html("");

    area_layout = $("#area");
    area_layout.html("");

    $("#province_s").html("Select Province");
    $("#city_s").html("Select City");
    $("#area_s").html("Select Area");

    citylen=0; 
    arealen=0;

    API.getAddress(function (resultData) {
        if (resultData) {
            addrlistdata = resultData;
        }
        if (addr !== "") {
            var tmp = JSON.parse(addr);

            if (!tmp.id) {
                addrlistdata.push(tmp);
            }
        }
        write_addr();//渲染地址列表 


    });

    API.getAreas("", function (resultData) {
        $.each(resultData.areas, function (i, item) {
            var val = JSON.stringify(item);
            province_layout.append('<a  onclick="selected_province(this);" value=' + val + '>' + item.area_name + '</a> ');
        });

        $(".absf").click(function () {
            $(".ncxz").fadeOut();
            $(".zssf").fadeIn();
        });
        $(".zssf a").click(function () {
            $(".absf").text($(this).text())
        });
        $(".ncxz a").click(function () {
            $(".ncxz").fadeOut();
        });
    });

});


var write_addr = function () {
    if (addrlistdata.length < 1) {
        return;
    }
    //计算总页数
    if (parseInt(addrlistdata.length % pageMaxCount) > 0) {
        totpage = parseInt(addrlistdata.length / pageMaxCount) + 1;
    } else {
        totpage = parseInt(addrlistdata.length / pageMaxCount);
    }
    var address_list = $("#address_list");//获取渲染地址列表容器
    address_list.html("");//清空原有数据

    for (var i = (page - 1) * pageMaxCount; i < page * pageMaxCount && addrlistdata.length > i; i++) {
        var jsonstr = JSON.stringify(addrlistdata[i]);

        var html = '<a  class="cartbsel" onclick="selectAddr(this);"  value=' + jsonstr + '>';
        if (addr == jsonstr) {
            html += '<dl class="c2dl cartbctive"><dt>' + addrlistdata[i].accept_name + '</dt>';
        } else {
            html += '<dl class="c2dl"><dt>' + addrlistdata[i].accept_name + '</dt>';
        }
        html += '<dd><div class="c2a1"><span>' + addrlistdata[i].province_name + ' ' + addrlistdata[i].city_name + ' ' + addrlistdata[i].area_name + '</span>';
        html += '<span>' + addrlistdata[i].address + '</span></div>';
        html += '<div class="c2a2"><span>' + addrlistdata[i].mobile + '</span>';
        html += '<span>' + addrlistdata[i].zip + '</span></div></dd></dl></a>';
        address_list.append(html);

    };



    $(".cartbsel").click(function () {
        $(this).siblings().children("dl").removeClass("cartbctive");
        $(this).children("dl").addClass("cartbctive");
    });
}

function pageup() {
    if (page > 1) {
        page--;
        write_addr();
    }

}

function pagedown() {
    if (page < totpage) {
        page++;
        write_addr();
    }
}


function next() {

    if (addr && addr != "") {
        window.location.href = "cart3.html?addr=" + encodeURIComponent(addr);
    } else {
        require(["jquery", "jsuitl/yirunapi"], function ($, API) {
            API.messageuitl("Please select a shipping address");
        });
    }
}

function selectAddr(_this) {
    addr = $(_this).attr("value");
}



function selected_province(_this) {
    var val = $(_this).attr("value");
    if (areainfo["province"] == val) {
        return;
    }
    city_layout.html("");
    area_layout.html("");
    $("#city_s").html("Select City");
    $("#area_s").html("Select Area");
    areainfo["province"] = val;
    areainfo["city"] = "";
    areainfo["area"] = "";
    citylen=0; 
    arealen=0;

    var provincejson = JSON.parse(val);

    require(["jquery", "jsuitl/yirunapi"], function ($, API) {
        API.getAreas(provincejson.area_id, function (resultData) {
            citylen=resultData.areas.length;
           
            $.each(resultData.areas, function (i, item) {
                var val = JSON.stringify(item);
                city_layout.append('<a  onclick="selected_city(this);" value=' + val + '>' + item.area_name + '</a> ');
            });

            $(".abcs").click(function () {
                $(".ncxz").fadeOut();
                $(".zscs").fadeIn();
            });

            $(".zscs a").click(function () {
                $(".abcs").text($(this).text())
            });
            $(".ncxz a").click(function () {
                $(".ncxz").fadeOut();
            });
        });
    });
}

function selected_city(_this) {
    var val = $(_this).attr("value");
    if (areainfo["city"] == val) {
        return;
    }
    area_layout.html("");
   
    $("#area_s").html("Select Area");

    areainfo["city"] = val;
    areainfo["area"] = "";
    var cityjson = JSON.parse(val);
    arealen=0;
    require(["jquery", "jsuitl/yirunapi"], function ($, API) {
        API.getAreas(cityjson.area_id, function (resultData) {

            arealen=resultData.areas.length;
            $.each(resultData.areas, function (i, item) {
                var val = JSON.stringify(item);
                area_layout.append('<a  onclick="selected_area(this);" value=' + val + '>' + item.area_name + '</a> ');
            });

            $(".abdq").click(function () {
                $(".ncxz").fadeOut();
                $(".zsdq").fadeIn();
            });
            $(".zsdq a").click(function () {
                $(".abdq").text($(this).text())
            });
            $(".ncxz a").click(function () {
                $(".ncxz").fadeOut();
            });
        });
    });

}

function selected_area(_this) {
    areainfo["area"] = $(_this).attr("value");
}

function newaddr() {

    require(["jquery", "jsuitl/yirunapi"], function ($, API) {
        var accept_name = $.removeBlankSpace($("#accept_name_s").val());
        if (accept_name.length < 1) {
            API.messageuitl("Please input the delivery name");
            return;
        }
        var newdata = {
            "accept_name": accept_name
        };

        var province_s = areainfo["province"];
        if (!province_s || province_s === "") {
            API.messageuitl("Select Province");
            return;
        }
        province_s = JSON.parse(province_s);

        newdata["province"] = province_s.area_id;
        newdata["province_name"] = province_s.area_name;
                
        if (citylen>0) {
            var city_s = areainfo["city"];
            if (!city_s || city_s === "") {
                API.messageuitl("Select City");
                return;
            }
            city_s = JSON.parse(city_s);
            newdata["city"] = city_s.area_id;
            newdata["city_name"] = city_s.area_name;
        } else {
            newdata["city"] = "";
            newdata["city_name"] = "";

        }
        if ( arealen>0) {
            var area_s = areainfo["area"];
            if (!area_s || area_s === "") {

                API.messageuitl("Select Area");
                return;
            }
            area_s = JSON.parse(area_s);
            newdata["area"] = area_s.area_id;
            newdata["area_name"] = area_s.area_name;
        } else {
            newdata["area"] = "";
            newdata["area_name"] = "";

        }
        var address_s = $.removeBlankSpace($("#address_s").val());

        if (address_s.length < 1) {
            API.messageuitl("Please input the delivery Addr");
            return;
        }
        newdata["address"] = address_s;
        newdata["zip"] = $.removeBlankSpace($("#zip_s").val());
        newdata["telphone"] = $.removeBlankSpace($("#telphone_s").val());
        var mobile_s = $.removeBlankSpace($("#mobile_s").val());
        if (mobile_s.length < 1) {
            API.messageuitl("Please input the delivery Mobile Phone");
            return;
        }
        newdata["mobile"] = mobile_s;
       
        addrlistdata.push(newdata);
        write_addr();
        $('.darkbox').fadeOut(777); //确定数据后关闭输入界面
    });
}