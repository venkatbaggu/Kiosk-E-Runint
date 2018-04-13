var rootId;
var rootName;
var nodeid;
var nodeName;
var goodsID = 0;
var seller_id;
var goodsName
var getProductinfoFn = function () {
    var reg = new RegExp("src=", "g");
    var tno = "kios_demo";
    if (typeof (formJs) === "undefined" || typeof (formJs.getkiosnum) === "undefined") {
        tno = "kios_demo";
    } else {
        tno = formJs.getkiosnum();
    }
    //tno = "88800003";
    api.getProductinfo(goodsID, function (datas) {
        if (rootName == "") {
            $("#navigation_bar_div").html('<a href="index.html">首页</a> > ' + datas.goods_info.name);
            $("#navigation_bar_div2").html('<a href="index.html">首页</a> > ' + datas.goods_info.name);

        } else {
            $("#navigation_bar_div").html('<a href="b0.html?id=' + rootId + '">' + rootName + '</a> > <a href="b1.html?id=' + nodeid + '&name=' + encodeURIComponent(nodeName) + '&rootName=' + encodeURIComponent(rootName) + '&rootid=' + rootId + '">' + nodeName + '</a> > ' + datas.goods_info.name);
            $("#navigation_bar_div2").html('<a href="b0.html?id=' + rootId + '">' + rootName + '</a> > <a href="b1.html?id=' + nodeid + '&name=' + encodeURIComponent(nodeName) + '&rootName=' + encodeURIComponent(rootName) + '&rootid=' + rootId + '">' + nodeName + '</a> > ' + datas.goods_info.name);
        }
        //商品名字
        $(".e2-b11-s3block1-title").html(datas.goods_info.name);
        //市场价
        $("#market_price_del").text(datas.goods_info.market_price);
        $("#sell_price_span").text(datas.goods_info.sell_price);
        //二维码图片
        $("#qr_img").attr("src", 'http://www.e-runint.com/qrcode.php?data=http://www.e-runint.com/site/products/id/' + goodsID + "/terminal_no/" + tno);
        //商品图片列表
        var photolist = datas.goods_info.photo;
        var pic_list = $("#pic_list");
        var pic_div = $("#pic_div")
        pic_list.html("");
        pic_div.html("");
        $.each(photolist, function (i, item) {
            var html1 = "";
            var html2 = "";
            if (i == 0) {
                // html1 = '<li data-target="#e2-album" data- slide - to="0" class="active" > <img src="images/b1-s3-1.png"></li>';
                // html2 = '<div class="item active" ><img src="images/b1-s3-1.png"></div>';
                html1 = '<li data-target="#e2-album" data- slide - to="' + i + '" class="active" style=" border-radius:0 !important;" > <img src="' + item.img + '"></li>';
                html2 = '<div class="item active" ><img src="' + item.img + '"></div>';


            } else {
                //html1 = '<li data-target="#e2-album" data-slide-to="1"><img src="images/b1-s3-1.png"></li>'
                //html2 = '<div class="item"><img src="images/b1-s3-1.png"></div>'
                html1 = '<li data-target="#e2-album" data-slide-to="' + i + '"><img src="' + item.img + '"></li>';
                html2 = '<div class="item"><img src="' + item.img + '"></div>';

            }
            pic_list.append(html1);
            pic_div.append(html2);

        });

        //商品详情
        //attr_ul
        var attrs = $("#attr_ul");
        //  <li>计价单位：片</li>
        var attributes = datas.goods_info.attribute;
        $.each(attributes, function (i, item) {
            if (item.attribute_value != "") {
                attrs.append("<li>" + item.name + "：" + item.attribute_value + "</li>");
            }
        });
        //详细内容
        $("#piccontent_div").html(datas.goods_info.content);
        seller_id = datas.goods_info.seller_id;
        goodsName = datas.goods_info.name;

        if (seller_id == 0) {
            $("#sellerStore").hide();
        } else {
            $("#sellerStore").show();
        }
        $("#e2-album").carousel('cycle');
    });
};

var detailedFn = function () {
    window.location.href = "b21.html?id=" + seller_id
        + "&rootId=" + rootId
        + "&rootName=" + encodeURIComponent(rootName)
        + "&nodeid=" + nodeid
        + "&nodeName=" + encodeURIComponent(nodeName)
        + "&goodsID=" + goodsID
        + "&goodsName=" + encodeURIComponent(goodsName);

}

$(function () {


    goodsID = $.getUrlVar("goodsid");
    rootId = $.getUrlVar("rootId");
    rootName = decodeURIComponent($.getUrlVar("rootName"));
    nodeid = $.getUrlVar("nodeid");
    nodeName = decodeURIComponent($.getUrlVar("nodeName"));
    getProductinfoFn();
    $("div.dnmgch").bind("scroll", function () {
        var st = $("div.dnmgch").scrollTop();
        if (st > 10) {
            $("div.e2-b11-s3").hide();
            $(".e2825").show();
            $("div.dnmgch").css("height", "1380px");
            $("div.e2828topclick").fadeIn();
        } else {
            $("div.e2-b11-s3").show();
            $(".e2825").hide();
            $("div.dnmgch").css("height", "945px");
            $("div.e2828topclick").fadeOut();
        }
        ;
    });
    $(".e2828topclickicon").bind("click", function () {
        $(".dnmgch").animate({ scrollTop: 0 }, 200);
    });
});



