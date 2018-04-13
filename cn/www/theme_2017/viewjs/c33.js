var id;

var pagesize = 8;
var page = 1;
var total_page = 1;


var initData = function () {
    var datalist_div = $("#datalist_div");
    datalist_div.html("");
    api.getZhuangXiuList(page, pagesize, function (datas) {
        total_page = datas.page_info.total_page;
        $.each(datas.data, function (i, item) {
            var html = '<div class="e2-c32-s5-block">';
            html += '<div class="e2-c32-s4-1-1"><img src="' + item.big_logo_img + '" style="border-radius:100px;" width="150" height="150"></div>';
            html += '<div class="e2-c32-s4-1-2">';
            html += '<div class="e2-c32-s4-1-2-title" style="width:168px; height:50px;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + item.true_name + '</div>';
            html += '<div class="e2-c32-s4-1-2-info e2-owt" style="width:168px; height:20px;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">服务范围：' + item.bus_area_name + '</div>';
            html += '<button class="btn btn-sm e2-c32-s4-1-2-button" onclick="window.location.href = \'c34.html?id=' + item.id + '&typename=' + $.getUrlVar('typename') + '\';">查看详情</button>';
            html += '</div>';
            html += '<div class="e2-c32-s4-1-3">';
            html += '<img src="' + item.qr_url + '">';
            html += '<p>立即扫码预约</p>';
            html += '</div>';
            html += '</div>';
            datalist_div.append(html);
        });
        initpage();
    });
};


var initpage = function () {
    //page_title_div
    $("#page_title_div").html('<span>共' + total_page + '页</span> <span>第<b>' + page + '</b>页</span>');
    var page_ul = $("#page_ul");
    page_ul.html("");
    $("#pager_right_div").show();
    $("#pager_root_div").show();
    $("#pager_left_div").show();
    if (total_page == 1) {
        $("#pager_root_div").hide();
        $("#pager_left_div").hide();
        $("#pager_right_div").hide();
        return;
    }
    if (page == 1) {
        $("#pager_left_div").hide();
    }
    if (total_page == page) {
        $("#pager_right_div").hide();
    }
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
    page_ul.append('<li><a href="javascript:leftbackFn();" class="e2-pagination-prev">上一页</a></li>');
    for (var count = 0; i <= total_page && count != len_tmp; i++ , count++) {
        //<li><a class="e2-pagination-active" href="javascript:toPage(1)">1</a></li>
        if (i == page) {
            page_ul.append('<li><a class="e2-pagination-active"  href="#">' + i + '</a></li>');
        } else {

            page_ul.append('<li><a  href="javascript:goPage(' + i + ')">' + i + '</a></li>');
        }
    }
    page_ul.append('<li><a href="javascript:rightnextFn();" class="e2-pagination-next">下一页</a></li>');
};


var goPage = function (p) {
    if (page == p) {
        return;
    }
    page = p;
    initData();
};

var leftbackFn = function () {
    page--;
    if (page < 1) {
        page = 1;
    }
    initData();
};

var rightnextFn = function () {
    page++;
    if (page >= total_page) {
        page = total_page;
    }
    initData();
};

$(function () {
    id = $.getUrlVar("id");
    var tmp = decodeURIComponent($.getUrlVar("typename")).replace("#", "");
    $("#title_bar_span").text(tmp);
    $("#title_div1").html(tmp);

    initData();
});