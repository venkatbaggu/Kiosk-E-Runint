var init_swiper = function () {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 4.5,
        slidesPerColumn: 2,
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30
    });
};
var type_menu = function () {
    $('.e2-index-s1-2-a').bind("click", function () {
        var liindex = $('.e2-index-s1-2-title div').index(this);
        $(this).addClass('active').siblings().removeClass('active');
        $('.e2-index-s1-2-product').find(".swiper-container").removeClass("show").hide().eq(liindex).fadeIn(150).siblings('e2-index-s1-2-product').find(".swiper-container");
     
        init_swiper();
        var liWidth = 180;
        $('.e2-index-s1-2-title p').stop(false, true).animate({ 'left': liindex * liWidth + 'px' }, 300);
    });
}


var getRecomCatGoods = function () {
    type_menu();
    api.getRecomCatGoodsByTerminal(function (datas) {
        if (typeof (datas) == "undefined" || datas. length==0) {
            getProductList(170, "list1");
            getProductList(201, "list2");
            getProductList(230, "list3");
            getProductList(151, "list4");
            return;
        }
        var typememus = document.getElementsByName("tuijianType");
       
        $.each(datas, function (i, item) {           
            $(typememus[i]).html(item.name);
          
            var emid = "list" + (i + 1);
            var div = $("#" + emid);
            div.html("");
            $.each(item.goods_list, function (y, goods_item) {
              
                var html = '<div class="swiper-slide"><a href="b11.html?goodsid=' + goods_item.id + '"><img src="' + goods_item.img + '"width="155px" height="155px"><div class="e2-index-s1-2-info">' + goods_item.name + '</div><div class="e2-index-s1-2-price">' + goods_item.sell_price + '</div></a></div>';
                div.append(html);

            });
            init_swiper();

        });
    });

};

var getProductList = function (typeid, emid) {
    var div = $("#" + emid);
    div.html("");

    api.getProductList("", typeid, "sale", 20, 0, function (datas) {
        //<div class="swiper-slide"><a href="#"><img src="images/index-s1-a.png" class="img-responsive"><div class="e2-index-s1-2-info">a装饰椅子1</div><div class="e2-index-s1-2-price">¥ 90</div></a></div>

        var goods = datas.pro_list.goodsList;

        $.each(goods, function (i, item) {

            var html = '<div class="swiper-slide"><a href="b11.html?goodsid=' + item.id + '"><img src="' + item.img + '"width="155" height="155"><div class="e2-index-s1-2-info">' + item.name + '</div><div class="e2-index-s1-2-price">' + item.sell_price + '</div></a></div>';
           
            div.append(html);
        });
        init_swiper();
    });

};

var timer;
var goodscurrIndex = 0;
var select_type = 0;

var type_click = function (index) {
    if (index == select_type) return;
    select_type = index;
    goodscurrIndex = 0
    clearInterval(timer);
    timer = setInterval(scale, 5000);
}


var scale = function () {
    var max = 0;
    var lists = $('.swiper-container');


    max = $(lists[select_type]).find(".swiper-slide").length;
    if (goodscurrIndex > max) {
        goodscurrIndex = 0
    }
    $(lists[select_type]).find(".swiper-slide").removeClass("e2-scale");
    $(lists[select_type]).find(".swiper-slide").eq(goodscurrIndex).addClass("e2-scale");

    goodscurrIndex++;
};


$(function () {
   
    getRecomCatGoods();
    timer = setInterval(scale, 5000);
    document.onclick = function (event) {
        var e = event || window.event;
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var x = e.pageX || e.clientX + scrollX;
        var y = e.pageY || e.clientY + scrollY;
        //    alert('x: ' + x + '\ny: ' + y);
        if (typeof (formJs) === "undefined" || typeof (formJs.bodyclick) === "undefined") {
            return;
        } else {
            formJs.bodyclick(x, y);
        }
    }
});

