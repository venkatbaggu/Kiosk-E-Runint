
var schemeList = function () {
    var de_wrapper = $(".swiper-wrapper");
    de_wrapper.html("");
   
    api.getHomeSchemeListByKiosk(function (datas) {
        if (datas == undefined || datas.data.length == 0) {
            schemeList2();
            return;
        } else {

            var list_data = datas.data;
            var len = list_data.length;
            var html = "";
            for (var i = 0; i < len; i++) {
                if (i == 0) {
                    html += '<div class="e2-d0-s3 swiper-slide">';
                }
                if (i == 6) {
                    html += '</div><div class="e2-d0-s3 swiper-slide">';
                }

                html += '<div class="e2-d0-s3-block">';
                html += '<a href="d3.html?id=' + list_data[i].id + '">'
                html += '<img src="' + list_data[i].img + '">';
                html += '<div class="e2-d0-s2-slidetitle e2-owt" style="height:28px; word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" >' + list_data[i].scheme_name + '</div>';

                if (list_data[i].house_name == null) {
                    html += '<div class="e2-d0-s2-slideinfo"><span>' + list_data[i].carpet_area + '平米</span>|<span>' + list_data[i].style_name + '</span></div>';
                } else {
                    html += '<div class="e2-d0-s2-slideinfo"><span>' + list_data[i].house_name + '</span>|<span>' + list_data[i].carpet_area + '平米</span>|<span>' + list_data[i].style_name + '</span></div>';
                }
                html += '</a>'
                html += '</div>'
                debugger;
            }
            html += '</div>';
            de_wrapper.html(html);
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                paginationClickable: true
            });

        }


    });



};

var schemeList2 = function () {
    var de_wrapper = $(".swiper-wrapper");
    api.getHomeSchemeList(function (datas) {
        var list_data = datas.data;
        var len = list_data.length;
        var html = "";
        for (var i = 0; i < len; i++) {
            if (i == 0) {
                html += '<div class="e2-d0-s3 swiper-slide">';
            }
            if (i == 6) {
                html += '</div><div class="e2-d0-s3 swiper-slide">';
            }

            html += '<div class="e2-d0-s3-block">';
            html += '<a href="d3.html?id=' + list_data[i].id + '">'
            html += '<img src="' + list_data[i].img + '">';
            html += '<div class="e2-d0-s2-slidetitle e2-owt" style="height:28px; word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + list_data[i].scheme_name + '</div>';
            if (list_data[i].house_name == null) {
                html += '<div class="e2-d0-s2-slideinfo"><span>' + list_data[i].carpet_area + '平米</span>|<span>' + list_data[i].style_name + '</span></div>';
            } else {
                html += '<div class="e2-d0-s2-slideinfo"><span>' + list_data[i].house_name + '</span>|<span>' + list_data[i].carpet_area + '平米</span>|<span>' + list_data[i].style_name + '</span></div>';
            }
            html += '</a>'
            html += '</div>'
            
        }
        html += '</div>';
        de_wrapper.html(html);
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            paginationClickable: true
        });
    });
}

var homeSellerList = function () {
    var sellerList_div = $("#sellerList_div");
    sellerList_div.html("");
    api.getHomeSellerList(function (datas) {
        var tmp_list = datas.data;
        $.each(tmp_list, function (i, item) {
            var html = '<div class="e2-c32-s5-block">';
            html += '<div class="e2-c32-s4-1-1">';
            html += '<img style="border-radius:100px" src="' + item.big_logo_img + '">';
            html += '</div>';
            html += '<div class="e2-c32-s4-1-2">';
            html += '<div class="e2-c32-s4-1-2-title" style="width:180px; height:40px;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" >' + item.true_name + '</div>';
            html += '<div class="e2-c32-s4-1-2-info e2-owt">服务范围：' + item.bus_area_name + '</div>'
            html += '<button class="btn btn-sm e2-c32-s4-1-2-button" onclick="window.location.href=\'d41.html?id=' + item.id + '\'">查看详情</button>'
            html += '</div>';
            html += '<div class="e2-c32-s4-1-3">';
            html += '<img src="' + item.qr_url + '">';
            html += '<p>立即扫码预约</p></div></div>';
            sellerList_div.append(html);
        });
    });


};


$(function () {

    schemeList();
    homeSellerList();

})