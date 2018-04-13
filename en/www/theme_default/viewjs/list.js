var page = 1;
var total_page = 1;
var len1 = 8;//最大显示个数
var len2 = 12;
var order = "new";
var list_display = 1;
var type = "";
var id = 0;
var ullist = "";
var len = 0;
var ulpage = "";
require(["jquery"], function ($) {
    id = $.getUrlVar("id");
    type = decodeURIComponent($.getUrlVar("type"));
    page = parseInt($.getUrlVar("page"));
    total_page = parseInt($.getUrlVar("total_page"));

    var ordertmp = $.getUrlVar("order");
    var displaytmp = parseInt($.getUrlVar("list_display"));

    if (!page || page < 1) {
        page = 1;
    }
    if (!total_page || total_page < 1) {
        total_page = 1;
    }
    if (!ordertmp || ordertmp.length < 1) {
        order = "new";
    } else if (ordertmp != order) {
        order = ordertmp;
    }
    if (displaytmp == 2) {
        list_display = 2;
    } else {
        list_display = 1;
    }

    $("#typename").html(type);


    ulpage = $(".ul-page");//获取脚部翻页按钮元素
    ulpage.html("");//清空原有内容
    $(".ul-list").html("");//列表型清空原有的数据
    $(".ul-list9").html("");//九宫格型清空原有的数据
    $(".ul-list").css("display", "");
    $(".ul-list9").css("display", "none");

    //默认显示
    ullist = $(".ul-list");//商品列表容器
    len = len1;

    //更改显示
    if (list_display == 2) {
        len = len2;
        ullist = $(".ul-list9");//商品列表容器
        $(".ul-list").css("display", "none");
        $(".ul-list9").css("display", "");
    }
    switch (order) {
        case "sale":
            $("#a_sale").attr("href", "javascript:;");
            $("#a_sale").removeClass("sx-select");
            $("#a_cpoint").attr("href", "javascript:selectorderFn('cpoint');");
            $("#a_cpoint").removeClass("sx-select");
            $("#a_price").attr("href", "javascript:selectorderFn('price');");
            $("#a_price").removeClass("sx-select");
            $("#a_new").attr("href", "javascript:selectorderFn('new');");
            $("#a_new").removeClass("sx-select");

            $("#a_sale").addClass("sx-select");

            break;
        case "cpoint":
            $("#a_sale").attr("href", "javascript:selectorderFn('sale');");
            $("#a_sale").removeClass("sx-select");
            $("#a_cpoint").attr("href", "javascript:;");
            $("#a_cpoint").removeClass("sx-select");
            $("#a_price").attr("href", "javascript:selectorderFn('price');");
            $("#a_price").removeClass("sx-select");
            $("#a_new").attr("href", "javascript:selectorderFn('new');");
            $("#a_new").removeClass("sx-select");

            $("#a_cpoint").addClass("sx-select");
            break;
        case "price":
            $("#a_sale").attr("href", "javascript:selectorderFn('sale');");
            $("#a_sale").removeClass("sx-select");
            $("#a_cpoint").attr("href", "javascript:selectorderFn('cpoint');");
            $("#a_cpoint").removeClass("sx-select");
            $("#a_price").attr("href", "javascript:;");
            $("#a_price").removeClass("sx-select");
            $("#a_new").attr("href", "javascript:selectorderFn('new');");
            $("#a_new").removeClass("sx-select");

            $("#a_price").addClass("sx-select");
            break;
        case "new":
            $("#a_sale").attr("href", "javascript:selectorderFn('sale');");
            $("#a_sale").removeClass("sx-select");
            $("#a_cpoint").attr("href", "javascript:selectorderFn('cpoint');");
            $("#a_cpoint").removeClass("sx-select");
            $("#a_price").attr("href", "javascript:selectorderFn('price');");
            $("#a_price").removeClass("sx-select");
            $("#a_new").attr("href", "javascript:;");
            $("#a_new").removeClass("sx-select");

            $("#a_new").addClass("sx-select");
            break;
        default:
            break;
    }

    loaddates();


});//完成

//加载数据
var loaddates = function () {

    require(["jquery", "jsuitl/yirunapi", "jsuitl/lib/jquery.lazyload"], function ($, API) {
        API.getProductList("", id, order, len, page, function (datas) {

            if (datas.pro_list.goodsList.length < 1) {
                return;
            }

            page = parseInt(page);
            total_page = datas.total_page;//记录最大页数
            var search = location.search.replace("?", "").split("&");
            var page_search = "";
            $.each(search, function (i, item) {
                if (item.indexOf("page=") == -1 && item.indexOf("total_page=") == -1) {
                    page_search += "&" + item;
                }
            });
            page_search = page_search.replace("&", "?")

            /*---分页效果---*/
            if (total_page > 1) {
                //翻页按钮计算和显示


                //填写最左边的箭头
                if (page == 1) {//当前在第一页
                    ulpage.append('<a><li class="first"><</li></a>');
                }
                else {//当前不在第一页
                    ulpage.append('<a href="' + page_search + '&page=' + (page - 1) + '&total_page=' + total_page + '"><li class="first"><</li></a>');
                }

                //判断翻页列出的数据
                var i = page;//其实页数


                //判断赋值起始页码
                if (total_page <= len - 1) {
                    i = 1;
                } else {
                    if (total_page - page < len / 2 - 1) {
                        i = total_page - len + 2;
                    }
                    else {
                        i = page - parseInt(len / 2) + 1;
                    }
                }

                if (i < 1) { //确保页码其实数为正整数
                    i = 1;
                }

                for (var count = 1 ; i <= total_page && count != len; i++, count++) {//循环加载页数选项
                    if (page == i) {
                        ulpage.append('<a><li class="selpage">' + i + '</li></a>');
                    } else if (page < i) {
                        ulpage.append('<a href="?id=' + id + '&type=' + type + '&page=' + i + '&total_page=' + total_page + '"><li>' + i + '</li></a>');
                    } else {
                        ulpage.append('<a href="?id=' + id + '&type=' + type + '&page=' + i + '&total_page=' + total_page + '"><li>' + i + '</li></a>');
                    }
                }
                //填写最右边的箭头
                if (page == total_page) {//如果当前是最后一页
                    ulpage.append('<a><li class="last">></li></a>');
                }
                else {//当前不是最后一页
                    ulpage.append('<a href="?id=' + id + '&type=' + type + '&page=' + (page + 1) + '&total_page=' + total_page + '"><li class="last">></li></a>');
                }
            }
            /*---商品列表---*/

            var goodsList = datas.pro_list.goodsList;//获取商品数据
            var hhtml = "";
            var imgRe = new RegExp("/", "g");

            $.each(goodsList, function (i, item) {

                var img = "http://www.unellinc.hk/pic/thumb/img/" + item.img.replace("http://www.unellinc.hk/", "").replace(imgRe, "@_@") + "/w/120/h/120";
                hhtml += ("<a href='products.html?goods_id=" + item.id + "&type=" + encodeURIComponent(type) + "'>");
                hhtml += ("<li><div class='ulc'>");
                hhtml += ('<img data-original="' + img + '" width="120" height="120" alt="" />')
                hhtml += ('</div><div class="ult">');
                hhtml += ('<h4>' + item.name + '</h4>');
                hhtml += ('<div class="price">' + item.sell_price + '</div>');
                if (item.true_name == null) {
                    hhtml += ('<div class="shopname">E-RUN platform</div>');
                } else {
                    hhtml += ('<div class="shopname">' + item.true_name + '</div>');
                }
                hhtml += ('</div><div class="clearfix"></div></li></a>');
            });
            ullist.append(hhtml);
            $("img").lazyload();
        });//结束
    });
};

var selectorderFn = function (selectorder) {
    var search = location.search.replace("?", "").split("&");
    var page_search = "";
    $.each(search, function (i, item) {
        if (item.indexOf("page=") == -1 && item.indexOf("total_page=") == -1 && item.indexOf("order=") == -1) {
            page_search += "&" + item;
        }
    });
    page_search = page_search.replace("&", "?") + "&order=" + selectorder;

    location.href = page_search;
};

var list_display_change = function () {

    var search = location.search.replace("?", "").split("&");
    var page_search = "";
    $.each(search, function (i, item) {
        if (item.indexOf("page=") == -1 && item.indexOf("total_page=") == -1 && item.indexOf("list_display=") == -1) {
            page_search += "&" + item;
        }
    });

    if (list_display == 2) {
        page_search = page_search.replace("&", "?") + "&list_display=1";
    } else {
        page_search = page_search.replace("&", "?") + "&list_display=2";
    }

    location.href = page_search;
};