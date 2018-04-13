
var homeDecorateList = function () {
    var decorate_div = $("#decorate_div");
    decorate_div.html("");
    $("#right_next").hide();
    $("#left_prev").hide();

    api.getHomeDecorateListByKiosk(function (datas) {
       
        if (datas == undefined ||datas.data.length == 0)
        {
            homeDecorateList2();
            return;
        }


        if (datas.data.length > 3) {
            $("#right_next").show();
            $("#left_prev").show();
        }
        $.each(datas.data, function (i, item) {
            var html = '<div class="swiper-slide" >';
            html += '<a href="c12.html?id=' + item.id + '">';
            html += '<img src="' + item.img + '" width="327" height="179">';
            html += '<div  class="e2-c0-s2-slidetitle e2-owt" style="height:26px; white-space:nowrap;text-overflow: ellipsis; overflow:hidden;">' + item.scheme_name + '</div>';
            html += ' <div class="e2-c0-s2-slideinfo"><span>' + item.house_name + '</span>|<span>' + item.carpet_area + '平米</span>|<span>' + item.style_name + '</span></div>'
            html += '</a></div>';
            decorate_div.append(html);

        });

        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: 3,
            paginationClickable: true,
            spaceBetween: 29,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            freeMode: true
        });
    });

  
};

var homeDecorateList2 = function () {
    var decorate_div = $("#decorate_div");
    api.getHomeDecorateList(function (datas) {
        if (datas.data.length > 3) {
            $("#right_next").show();
            $("#left_prev").show();
        }
        $.each(datas.data, function (i, item) {
            var html = '<div class="swiper-slide" >';
            html += '<a href="c12.html?id=' + item.id + '">';
            html += '<img src="' + item.img + '" width="327" height="179">';
            html += '<div  class="e2-c0-s2-slidetitle e2-owt" style="height:26px; white-space:nowrap;text-overflow: ellipsis; overflow:hidden;">' + item.scheme_name + '</div>';
            html += ' <div class="e2-c0-s2-slideinfo"><span>' + item.house_name + '</span>|<span>' + item.carpet_area + '平米</span>|<span>' + item.style_name + '</span></div>'
            html += '</a></div>';
            decorate_div.append(html);

        });

        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: 3,
            paginationClickable: true,
            spaceBetween: 29,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            freeMode: true
        });
    });
};

$(function () {
    homeDecorateList();
});