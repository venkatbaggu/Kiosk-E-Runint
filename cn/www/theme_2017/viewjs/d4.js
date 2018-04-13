var page = 1;
var pagesize = 8;
var total_page = 1;
var qstr = "";
var sort_by = "";

var initgetSellerList = function () {
    api.getSellerList(qstr, page, pagesize, sort_by, function (datas) {
        total_page = datas.page_info.total_page;
        var list_div = $("#list_div");
        list_div.html("");

        $.each(datas.data, function (i, item) {
            var html = '<div class="e2-c32-s5-block">';
            html += '<div class="e2-c32-s4-1-1"><img style="border-radius:100px" src="' + item.big_logo_img + '"></div>'
            html += '<div class="e2-c32-s4-1-2">';
            html += '<div class="e2-c32-s4-1-2-title" style="width:180px; height:40px;word-break:keep-all; white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + item.true_name + '</div>';

            if (item.bus_area_name && item.bus_area_name.length > 14) {
                var ttmp = item.bus_area_name.substring(0, 14);

                html += '<div class="e2-c32-s4-1-2-info e2-owt" style="height: 40px;">服务范围：' + ttmp + '......</div>';
            } else {
                if (item.bus_area_name) {
                    html += '<div class="e2-c32-s4-1-2-info e2-owt" style="height: 40px;">服务范围：' + item.bus_area_name + '</div>';
                } else {
                    html += '<div class="e2-c32-s4-1-2-info e2-owt" style="height: 40px;">服务范围：</div>';
                }
            }
            html += '<button class="btn btn-sm e2-c32-s4-1-2-button"  onclick="window.location.href=\'d41.html?id=' + item.id + '\'">查看详情</button>';

            html += '</div>';
            html += '<div class="e2-c32-s4-1-3">';
            html += '<img src="' + item.qr_url + '">';
            html += '<p>立即扫码预约</p></div></div>';

            list_div.append(html);

        });

        initPager();
    });
};

var initPager = function () {

    $("#pager_div").show();
    $(".e2-leftprev").show();
    $(".e2-rightnext").show();
    if (total_page == 1) {
        $("#pager_div").hide();
        $(".e2-leftprev").hide();
        $(".e2-rightnext").hide();
        return;
    }
    if (page == 1) {
        $(".e2-leftprev").hide();
    }
    if (page == total_page) {
        $(".e2-rightnext").hide();
    }
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


var sortFn = function (s) {
    $("#sort_div1").removeClass("active");
    $("#sort_div2").removeClass("active");
    $("#sort_div" + s).addClass("active");
    if (s == 2) {
        sort_by = "2";
    } else {
        sort_by = "";
    }
    initgetSellerList();
};

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
    initgetSellerList();
};


var leftBackFn = function () {
    page--;
    if (page < 1) {
        page = 1;
    }
    initgetSellerList();
};

var rightNextFn = function () {
    page++;
    if (page > total_page) {
        page = total_page;
    }
    initgetSellerList();
};

var searchFn = function () {
    qstr = $("#search_input").val();
    page = 1;
    sort_by = "";
    $("#sort_div1").removeClass("active");
    $("#sort_div2").removeClass("active");
    $("#sort_div1").addClass("active");
    initgetSellerList();
}


$(function () {
    initgetSellerList();
    vKeyboard.init();
    $("#search_input").click(function (e) {
        vKeyboard.keyboardShowForId("search_input");
    });
    //$(document).ready(function () {
    //    $('.e2-owt').ellipsis();

    //}
});