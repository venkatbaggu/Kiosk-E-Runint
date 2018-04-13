var page = 1;
var pagesize = 9;
var total_page = 1;
var id;
var initdata = function () {
    api.getStoreHome(id, function (datas) {
        $("#true_name_span").text(datas.true_name);
        $("#true_name_div").html(datas.true_name + ' <em>缤纷国际</em>');
        var sBusArea = "";

        $.each(datas.sellerBusAreaData, function (i, item) {
            sBusArea += "/" + item.area_name;
        });
        if (sBusArea.length > 2) {
            sBusArea = sBusArea.substring(1);
        }
        $("#sellerBusArea_span").text(sBusArea);
        $("#logo_img").attr("src", datas.big_logo_img);
        $("#qr_img").attr("src", datas.qr_url);


        var list_div = $("#list_div");
        list_div.html("");



      //  initPager();
    });
};

var initPager = function () {
    $("#tot_pager_div").html('<span>共' + total_page + '页</span> <span>第<b>' + page + '</b>页</span>');

    //显示页码数量
    var len_tmp = 5;

    //判断翻页列出的数据
    var i = page;//其实页数

    //判断赋值起始页码
    if (total_page <= len_tmp - 1) {
        i = 1;
    } else {
        if (total_page - page < len_tmp / 2 - 1) {
            i = total_page - len_tmp + 2;
            if (len_tmp != total_page - i) {
                i = total_page - len_tmp + 1
            }
        }
        else {
            i = page - parseInt(len_tmp / 2) + (len_tmp % 2 == 0 ? 1 : 0);
        }
    }

    if (i < 1) { //确保页码其实数为正整数
        i = 1;
    }

    var pager_ul = $("#pager_ul");
    pager_ul.html("");
    pager_ul.append('<li><a href="javascript:leftBackFn();" class="e2-pagination-prev">上一页</a></li>');
    for (var count = 0; i <= total_page && count != len_tmp; i++ , count++) {
        if (i == page) {
            pager_ul.append('<li><a class="e2-pagination-active"  href="#">' + i + '</a></li>');
        } else {
            pager_ul.append('<li><a  href="javascript:toPager(' + i + ')">' + i + '</a></li>');
        }
    }
    pager_ul.append('<li><a href="javascript:rightNextFn();" class="e2-pagination-next">下一页</a></li>');


};

var getSchemeListBySeller = function () {
    var list_div = $("#schemeList_div");
    list_div.html("");
    api.getSchemeListBySeller(id, page, pagesize, function (datas) {
        total_page = datas.page_info.total_page;
       
        $.each(datas.data, function (i, item) {
            var html = '<div class="e2-c1-s3-block" >';
            html += '<a href="d3.html?id=' + item.id + '">';
            html += '<img src="' + item.img + '" width="318" height="174">';
            html += '<div class="e2-c0-s2-slidetitle e2-owt" style="height:26px; white-space:nowrap;text-overflow: ellipsis; overflow:hidden;">' + item.scheme_name + '</div>';
            html += '<div class="e2-c0-s2-slideinfo"><span>' + item.house_name + '</span>|<span>' + item.carpet_area + '平米</span>|<span>' + item.style_name + '</span></div>';
            html += '</a>';
            html += '</div>';

            list_div.append(html);
        });        
        initPager();
    });


}


var toPager = function (tmp) {
    if (tmp == page) {
        return;
    }
    page = tmp;
    if (page < 1) {
        page = 1;
    }
    if (page > total_page) {
        page = total_page;
    }
    getSchemeListBySeller();
};


var leftBackFn = function () {
    page--;
    if (page < 1) {
        page = 1;
    }
    getSchemeListBySeller();
};

var rightNextFn = function () {
    page++;
    if (page > total_page) {
        page = total_page;
    }
    getSchemeListBySeller();
};
$(function () {
    id = $.getUrlVar("id");
    
    $("#butseller").click(function () {
        window.location.href = "d42.html?id=" + id;
    });
    initdata();
    getSchemeListBySeller();

});
