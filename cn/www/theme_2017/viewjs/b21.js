var seller_id;
var rootId;
var rootName;
var nodeid;
var nodeName;
var goodsID;
var goodsName;

var len = 15;
var currindex = 1;
var total_page = 0;
var goodsList;
var getStoreHome = function () {
    
    api.getStoreHome(seller_id, function (datas) {
        
        $("#title_div").html('<a href="b0.html?id=' + rootId + '">' + rootName + '</a> > <a href="b1.html?id=' + nodeid + '&name=' + encodeURIComponent(rootName) + '&rootid=' + rootId + '">' + nodeName + '</a> > <a href="javascript:window.history.back();">' + goodsName + '</a> > ' + datas.true_name);
        //big_logo_img
        $("#logo_img").attr("src", datas.big_logo_img);
        $(".e2-b21-s2-name").html(datas.true_name);
        $(".e2-b21-s2-addr").html("地址：" + datas.address);
        $(".e2-b21-s2-phone").html("联系电话：" + datas.tel);
      
        $("#qr_img").attr("src", datas.qr_url);
        goodsList = datas.productList;
        var tmp = goodsList.length;
        total_page = parseInt(tmp / len);
        if (tmp % len != 0) {
            total_page++;
        }
        initList();


    });
};

var initList = function () {
    //<div class="e2-b1-s3-block">
    //<img src="images/b1-s3-1.png" class="img-responsive">
    //<div class="e2-b1-s3-title">厨房装饰瓷砖厨房</div>
    //<div class="e2-b1-s3-info"><span class="e2-b1-s3-price">¥ 688</span> <span class="pull-right"><del>¥ 999</del></span></div>
    //</div>
    var goodsList_div = $("#goodsList_div");
    goodsList_div.html("");
    var max = len;
    if (goodsList.length <= currindex * len) {
        max = goodsList.length;
    }

    for (var i = (currindex - 1) * len; i < max; i++) {
        var html = '<div class="e2-b1-s3-block"><img src="'
            + goodsList[i].img
            + '" class="img-responsive" style="width:190px;height:190px;"><div class="e2-b1-s3-title">'
            + goodsList[i].name
            + '</div><div class="e2-b1-s3-info"><span class="e2-b1-s3-price">'
            + accounting.formatMoney(goodsList[i].sell_price);
        +'</span> <span class="pull-right"><del>¥ 999</del></span></div></div>';


        goodsList_div.append(html);
    }


    initpagered();
};

var initpagered = function () {
    var pagerEntity = $("pagered_div");
    var left = $("#leftprev_div");
    var right = $("#rightnext_div");
    pagerEntity.show();
    left.show();
    right.show();
    if (total_page <= 1) {
        pagerEntity.hide();
        left.hide();
        right.hide();
        return;
    }
    pagerEntity.show();
    left.show();
    right.show();
    if (currindex == 1) {
        left.hide();
    }

    if (currindex == total_page) {
        right.hide();
    }


    $(".e2-pagination-info").html('<span>共' + total_page + '页</span> <span>第<b>' + currindex + '</b>页</span>');

    var len_tmp = 5;

    //判断翻页列出的数据
    var i = currindex;//其实页数

    //判断赋值起始页码
    if (total_page <= len_tmp - 1) {
        i = 1;
    } else {
        if (total_page - currindex < len_tmp / 2 - 1) {
            i = total_page - len_tmp + 2;
            if (len_tmp != total_page - i) {
                i = total_page - len_tmp + 1
            }
        }
        else {
            i = currindex - parseInt(len_tmp / 2) + (len_tmp % 2 == 0 ? 1 : 0);
        }
    }

    if (i < 1) { //确保页码其实数为正整数
        i = 1;
    }


    var pager_ul = $("#pager_ul");
    pager_ul.html("");
    pager_ul.append('<li><a href="javascript:leftFn();" class="e2-pagination-prev">上一页</a></li>');

    for (var count = 0; i <= total_page && count != len_tmp; i++ , count++) {
        if (i == currindex) {
            pager_ul.append('<li><a class="e2-pagination-active"  href="#">' + i + '</a></li>');
        } else {
            pager_ul.append('<li><a  href="javascript:toPage(' + i + ')">' + i + '</a></li>');
        }
    }

    pager_ul.append('<li><a href="javascript:rightFn();" class="e2-pagination-next">下一页</a></li>');
};

var toPage = function (page) {

    if (currindex == page) {
        return;
    }

    currindex = page;
    initList();
}

var leftFn = function () {
    currindex--;
    if (currindex <= 1) {
        currindex = 1;
    }
    initList();
};

var rightFn = function () {
    currindex++;
    if (currindex >= total_page) {
        currindex = total_page;
    }
    initList();
};

var jianjieFn = function () {

    window.location.href = "b22.html?id=" + seller_id
        + "&rootId=" + rootId
        + "&rootName=" + encodeURIComponent(rootName)
        + "&nodeid=" + nodeid
        + "&nodeName=" + encodeURIComponent(nodeName)
        + "&goodsID=" + goodsID
        + "&goodsName=" + encodeURIComponent(goodsName);

};

$(function () {
    //$("#myCarousel").carousel('cycle');
    seller_id = $.getUrlVar("id");
    rootId = $.getUrlVar("rootId");
    rootName = decodeURIComponent($.getUrlVar("rootName"));
    nodeid = $.getUrlVar("nodeid");
    nodeName = decodeURIComponent($.getUrlVar("nodeName"));
    goodsID = $.getUrlVar("goodsID");
    goodsName = decodeURIComponent($.getUrlVar("goodsName"));
    $("pagered_div").hide();
    $("#leftprev_div").hide();
    $("#rightnext_div").hide();


    getStoreHome();


});