document.onclick = function (event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    //    alert('x: ' + x + '\ny: ' + y);
    formJs.bodyclick(x, y);

}
require(["jquery", "jsuitl/yirunapi", "jsuitl/slider"], function ($, API) {
    var ul = $("#sliderbanner ul");//获取广告横幅容器
    ul.children("li").remove();//删除原有的内容
    API.getSlide(function (datas) {//获取广告横幅

        $.each(datas, function (i, item) {
            if (item["location"] === 'kiosk/site/index') {
                var html = '<li><div class="img"><img src="' + item["img"] + '" height="400" width="1000" alt="" /></div></li>';
                ul.append(html);
            }
        });

        $('#sliderbanner').flexslider({
            slideshowSpeed: 7000,
            animation: "slide",
            direction: "horizontal",
            easing: "swing"
        });
    });
    //推荐商品
    API.getHomePic1(function (resultData) {
      
        $(".zd-index-t1").html('<a href="products.html?goods_id=' + resultData[0].goods_id + '"><img src="' + resultData[0].content + '"/></a>');
    });
    API.getHomePic2(function (resultData) {
        $(".zd-index-t2").html('<a href="products.html?goods_id=' + resultData[0].goods_id + '"><img src="' + resultData[0].content + '"/></a>');
    });
    API.getHomePic3(function (resultData) {
      
        $(".zd-index-t3").html('<a href="products.html?goods_id=' + resultData[0].goods_id + '"><img src="' + resultData[0].content + '"/></a>');
    });
    API.getHomePic4(function (resultData) {
        $(".zd-index-t4").html('<a href="products.html?goods_id=' + resultData[0].goods_id + '"><img src="' + resultData[0].content + '"/></a>');
    });
});
