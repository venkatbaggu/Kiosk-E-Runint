var currIndex = 1;
var pagesize = 12;
var total_page = 1;
var sort_by = 1;
var id = "";
var initData = function () {
    var decorateList_div = $("#decorateList_div");
    decorateList_div.html("");
   
    api.getDecorateList(id, sort_by, currIndex, pagesize, function (datas) {

        total_page = datas.page_info.total_page;
        if (id < 1) {
            var house_bar_div = $("#house_bar_div");
            house_bar_div.html("<span class=\"e2-c1-leftspan orange\" onclick=\"window.location.href = 'c1.html';\">综合</span>");

            $.each(datas.house_list, function (i, item) {

                house_bar_div.append('<span class="e2-c1-leftspan" onclick="window.location.href =\'c11.html?id=' + item.id + '\';">' + item.house_name + '</span>');
            });
        } else {
            var result = window.JSLINQ(datas.house_list).Where(function (item, index) {
                return item.id == id;
            });

            $("#select_home_span").text(result.items[0].house_name);
        }
        $.each(datas.data, function (i, item) {
            var html = '<div class="e2-c1-s3-block">';
            html += '<a href="c12.html?id=' + item.id + '">';
            html += '<img src="' + item.img + '" width="318" height="174">';
            html += '<div class="e2-c0-s2-slidetitle e2-owt" style="height:26px; white-space:nowrap;text-overflow: ellipsis; overflow:hidden;">' + item.scheme_name + '</div>'
            html += '<div class="e2-c0-s2-slideinfo"><span>' + item.house_name + '</span>|<span>' + item.carpet_area + '平米</span>|<span>' + item.style_name + '</span></div>'
            html += '</a></div>';
            decorateList_div.append(html);

        });
        pagesInit();
    });

};

var nextPage = function () {
    if (currIndex  >= total_page) {
        return;
    } else {
        currIndex++;
        initData();
    }
};

var backPage = function () {
    if (currIndex == 0) {
        return;
    } else {
        currIndex--;
        initData();
    }
};

var toPage = function (pageno) {
    if (currIndex == pageno) {
        return;
    } else {
        currIndex = pageno;
        initData();
    }
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
        $("#pager_root_div").show();
        $("#pager_right_div").show();

    }
    if (total_page == currIndex) {

        $("#pager_right_div").hide();
        $("#pager_root_div").show();
        $("#pager_left_div").show();

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


var select_sort_by = function (sort) {
    $("#sort_one").removeClass("active");
    $("#sort_tow").removeClass("active");
    if (2 == sort) {
        sort_by = "2";
        $("#sort_tow").addClass("active");
    } else {
        sort_by = "";
        $("#sort_one").addClass("active");
    }
    initData();
}
$(function () {
    id = $.getUrlVar("id");

    initData();

});