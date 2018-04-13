require(["jquery", "jsuitl/yirunapi"], function ($, API) {

    var root = decodeURIComponent($.getUrlVar("root"));
    var type = decodeURIComponent($.getUrlVar("type"));
    var id = $.getUrlVar("id");
    var province = $.getUrlVar("province");
    var provincename = decodeURIComponent($.getUrlVar("provincename"));
    $("#roottype").html(root);
    $("#typename").html(type);

    //渲染脚部导航
    if (root == "Alliance") {
        $("#roottype").attr("href", "union.html");
        $("#typename").attr("href", "ulist.html?type=" + encodeURIComponent(type) + "&id=" + province + "&name=" + encodeURIComponent(provincename));
    } else {
        $("#roottype").attr("href", "factory.html");
        $("#typename").attr("href", "factory.html");
    }
    //获取商家信息
    API.getStoreHome(id, function (resultData) {
       
        $("#log_img").attr("src", resultData.big_logo_img);//渲染商家Logo
        $("#span_title").html(resultData.true_name);//渲染商家公司名称
        var pagemane = window.location.pathname.substr(window.location.pathname.lastIndexOf("/") + 1);//获取页面名字
        switch (pagemane) {//判断是哪个页面
            case "sp.html"://商家介绍页
                sp(resultData);
                break;
            case "sp-products.html"://商家产品中心
                sp_products(resultData);
                break;
            case "sp-zs.html"://商家证书页
                sp_zs(resultData);
                break;
            case "sp-al.html"://商家工程案例
                sp_al(resultData);
                break;
            default:
                return;
        }
        //dvr 路径
        var dvrurl = resultData.shijinglink;
        if (dvrurl && dvrurl != "null") {
            //有dvr
           
            $(".pia-jks").attr("href", "dvr.html?url=" + encodeURIComponent(dvrurl));
            $(".pia-jks").css("display", "block")
        }
        //上下滚动按钮
        $("a.pia-sy").click(function () {
            var t = $(".spl2l").scrollTop();
            $('.spl2l').animate({ 'scrollTop': t - 200 }, 100)
        });
        $("a.pia-xy").click(function () {
            var t = $(".spl2l").scrollTop();
            $('.spl2l').animate({ 'scrollTop': t + 200 }, 100)
        });
    });

    //商家介绍页
    var sp = function (resultData) {
        //渲染公司简介
        if (resultData.content && resultData.content != "null") {
            $("#div_content").html(resultData.content);
        }

        //渲染公司联系方式
        var html = '<p>Company Name：' + resultData.true_name + '</p>';
        html += '<p>Company Addr：' + resultData.location + resultData.address + '</p>';
        html += '<p>Contact Number：' + resultData.tel + '</p>';
        html += '<p>Company Website：' + resultData.home_url + '</p>';

        $("#div_Contact_us").html(html);
    };
    //商家产品中心
    var sp_products = function (resultData) {
        var datalist = resultData.productList;
        var ullist = $(".ul-slist");
        ullist.html("");
        var imgRe = new RegExp("/", "g");
        $.each(datalist, function (i, item) {
            var img = "./images/nologo.jpg"
            if (item.img.length >1) {
                img = "http://www.unellinc.hk/pic/thumb/img/" + item.img.replace("http://www.unellinc.hk/", "").replace(imgRe, "@_@") + "/w/120/h/120";
            }
            var html = '<a href="products.html?goods_id=' + item.id + '">';
            html += '<li><div class="ulc"><img src="' + img + '" width="120" height="120" alt="" /></div>';
            html += '<div class="ult"><h4>' + item.name + '</h4></div>';
            html += '<div class="clearfix"></div></li></a>';
            ullist.append(html);
        });
    };
    //商家证书页
    var sp_zs = function (resultData) {
        //resultData.zizhiblock
        if (resultData.zizhiblock != "null") {
            $(".ul-zlist").html(resultData.zizhiblock);
        }

    };
    //商家工程案例
    var sp_al = function (resultData) {
        if (resultData.anliblock != "null") {
            $(".ul-zlist").html(resultData.anliblock);
        }
    };
});