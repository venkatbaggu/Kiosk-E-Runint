var rootId;
var rootName;
var selectedId;
var selectedName;
var pagesize = 15;
var selectorder = "new";

//sale
//sale_toggle
//cpoint
//cpoint_toggle
//price
//price_toggle
//new
//new_toggle

var currIndex = 1;
var wordstr = "";
var total_page = 0;
var getProductList = function () {

    var goods_list_div = $("#goods_list_div");
    goods_list_div.html("");
    //<div class="e2-b1-s3-block">
    //    <img src="images/b1-s3-1.png" class="img-responsive">
    //        <div class="e2-b1-s3-title">厨房装饰瓷砖厨房</div>
    //        <div class="e2-b1-s3-info"><span class="e2-b1-s3-price">¥ 688</span> <span class="pull-right"><del>¥ 999</del></span></div>
    //    </div>
    var imgRe = new RegExp("/", "g");
    api.getProductList(wordstr, selectedId, selectorder, pagesize, currIndex, function (datas) {
        if (datas.pro_list.goodsList.length < 1) {
            return;
        }
        var goods_list = datas.pro_list.goodsList;
        total_page = datas.total_page;

        // var search = location.search.replace("?", "").split("&");

        $.each(goods_list, function (i, item) {
            var html = '<div class="e2-b1-s3-block"><a href="b11.html?goodsid=' + item.id + '&rootId=' + rootId + '&rootName=' + encodeURIComponent(rootName) + '&nodeid=' + selectedId + '&nodeName=' + encodeURIComponent(selectedName) + '">';
            var img = "http://www.e-runint.com/pic/thumb/img/" + item.img.replace("http://www.e-runint.com/", "").replace(imgRe, "@_@") + "/w/190/h/190";
            html += '<img src="' + img + '" class="img-responsive">';
            html += '<div class="e2-b1-s3-title">' + item.name + '</div>'
            html += '<div class="e2-b1-s3-info"><span class="e2-b1-s3-price">' + item.sell_price + '</span> <span class="pull-right"><del>' + item.market_price + '</del></span></div>';
            html += '</a></div>';
            goods_list_div.append(html);
        });
        pagesInit();
    });
};


var pagesInit = function () {

    $("#total_page_span").text("共" + total_page + "页");
    $("#currPage_b").text(currIndex);
    var pageNo_ul = $("#pageNo_ul");
    pageNo_ul.html("");
    $("#pager_right_div").show();
    $("#pager_root_div").show();
    $("#pager_left_div").show();
    if (total_page == 1) {

        $("#pager_root_div").hide();
        $("#pager_left_div").hide();
        $("#pager_right_div").hide();
        return;
    }
    if (currIndex == 1) {
        $("#pager_left_div").hide();


    }
    if (total_page == currIndex) {
        $("#pager_right_div").hide();
    }


    var len_tmp = 5;

    //判断翻页列出的数据
    var i = currIndex;//其实页数

    //判断赋值起始页码
    if (total_page <= len_tmp - 1) {
        i = 1;
    } else {
        if (total_page - currIndex < len_tmp / 2 - 1) {
            i = total_page - len_tmp + 2;
            if (len_tmp != total_page - i) {
                i = total_page - len_tmp + 1
            }
        }
        else {
            i = currIndex - parseInt(len_tmp / 2) + (len_tmp % 2 == 0 ? 1 : 0);
        }
    }

    if (i < 1) { //确保页码其实数为正整数
        i = 1;
    }
    pageNo_ul.append('<li><a href="javascript:backPage();" class="e2-pagination-prev">上一页</a></li>');
    for (var count = 0; i <= total_page && count != len_tmp; i++ , count++) {
        //<li><a class="e2-pagination-active" href="javascript:toPage(1)">1</a></li>
        if (i == currIndex) {
            pageNo_ul.append('<li><a class="e2-pagination-active"  href="#">' + i + '</a></li>');
        } else {
            pageNo_ul.append('<li><a  href="javascript:toPage(' + i + ')">' + i + '</a></li>');
        }
    }
    pageNo_ul.append('<li><a href="javascript:nextPage();" class="e2-pagination-next">下一页</a></li>');

};


var changSelectorder = function (order) {
    if (selectorder == order) {
        return;
    }
    selectorder = order;
    $("#sale_toggle_a").removeClass("active");
    $("#sale_a").removeClass("active");
    $("#price_toggle_a").removeClass("active");
    $("#price_a").removeClass("active");
    if (selectorder != "new") {
        $("#" + selectorder + "_a").addClass("active");
    }
    currIndex = 1;
    getProductList();
}

var nextPage = function () {
    if (currIndex >= total_page) {
        return;
    } else {
        currIndex++;
        getProductList();
    }
};

var backPage = function () {
    if (currIndex == 1) {
        return;
    } else {
        currIndex--;
        getProductList();
    }
};

var toPage = function (pageno) {
    if (currIndex == pageno) {
        return;
    } else {
        currIndex = pageno;
        getProductList();
    }
};

var searchFn = function () {
    wordstr = $("#search_input").val();
    selectorder = "new";
    currIndex = 1;
    getProductList();
}

$(function () {
    rootId = $.getUrlVar("rootid");
    rootName = decodeURIComponent($.getUrlVar("rootName"));
    selectedId = $.getUrlVar("id");
    selectedName = decodeURIComponent($.getUrlVar("name"));
    $("#root_type_div").html('<a href="b0.html?id=' + rootId + '">' + rootName + '</a> > <a href="b0.html?id=' + rootId + '">' + selectedName + '</a>');
    $("#typename_span").text(selectedName);
    selectorder = "new";
    var currIndex = 1;
    wordstr = "";
    getProductList();
    vKeyboard.init();
    $("#search_input").click(function (e) {
        vKeyboard.keyboardShowForId("search_input");
    });

});