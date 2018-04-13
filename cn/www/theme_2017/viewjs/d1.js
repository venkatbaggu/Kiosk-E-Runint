var style_id = "";
var house_id = 0;
var min_mj = "";
var max_mj = "";
var style_id = "";
var sort_by = "";
var styleName = "";
var pagesize = 12;
var page = 1;
var total_page = 1;
var loadDesignList = function () {
    var designList_div = $("#designList_div");
    designList_div.html("");

    api.getDesignList(house_id
        , min_mj, max_mj
        , style_id, sort_by
        , page
        , pagesize
        , function (datas) {
            total_page = datas.page_info.total_page;
          
            var tmp_list = datas.data;
            initpage();
            inittype(datas.house_list, datas.mj_list);

            $.each(tmp_list, function (i, item) {
                var html = '<div class="e2-c1-s3-block">';
                html += '<a href="d3.html?id=' + item.id + '">'
                html += '<img src="' + item.img + '" width="318" height="174">';
                html += '<div class="e2-c0-s2-slidetitle e2-owt" style="height:28px; word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" >' + item.scheme_name + '</div>';
                html += '<div class="e2-c0-s2-slideinfo"><span>' + item.house_name + '</span>|<span>' + item.carpet_area + '平米</span>|<span>' + item.style_name + '</span></div>'
                html += '</a>';
                html += '</div>';

                designList_div.append(html);
            });
        });

};

var inittype = function (house_list, mj_list) {

    var house_id_div = $("#house_id_div");
    house_id_div.html("");
    $.each(house_list, function (i, item) {

        house_id_div.append('<a href="#" onclick="house_onclickFn(this)"  tag="' + item.id + '">' + item.house_name + '</a>');
    });
    var mj_div = $("#mj_div");
    mj_div.html("");
    $.each(mj_list, function (i, item) {
        var tmp = item.split("-");

        if (tmp.length > 1) {
            if (tmp[0] < 2) {
                mj_div.append('<a href="#" onclick="mj_onclick(this)" tag="' + item + '">' + tmp[1] + '平米以下</a>');
            } else {
                mj_div.append('<a href="#" onclick="mj_onclick(this)" tag="' + item + '">' + item + '平米</a>');
            }
        } else {
            mj_div.append('<a href="#" onclick="mj_onclick(this)" tag="' + item + '">' + item + '平米以下</a>');
        }
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

var select_houseandmjFn = function () {
    var house_id_a = $("#house_id_div a");
    var mj_a = $("#mj_div a");
    $.each(house_id_a, function (i, item) {
        if ($(item).hasClass("active")) {
            house_id = $(item).attr("tag");
        }
    });
    $.each(mj_a, function (i, item) {
        if ($(item).hasClass("active")) {
            var tmp = $(item).attr("tag").split("-");
            if (tmp.length < 1) {
                min_mj = "";
                max_mj = tmp;
            } else {
                min_mj = tmp[0];
                max_mj = tmp[1];
            }

        }
    });
    loadDesignList();
};

var house_onclickFn = function (s) {

    $("#house_id_div a").removeClass("active");
    $(s).addClass("active");
};

var mj_onclick = function (s) {

    $("#mj_div a").removeClass("active");
    $(s).addClass("active");
};

var goPage = function (p) {
    if (page == p) {
        return;
    }
    page = p;
    loadDesignList();
};

var leftbackFn = function () {
    page--;
    if (page < 1) {
        page = 1;
    }
    loadDesignList();
};

var rightnextFn = function () {
    page++;
    if (page >= total_page) {
        page = total_page;
    }
    loadDesignList();
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
    loadDesignList();
}

$(function () {
    style_id = $.getUrlVar("style_id");
    styleName = decodeURIComponent($.getUrlVar("styleName"));
   
    if (styleName.length > 0)
    { $("#e2-d1-dropdown1").html(styleName +'&nbsp;<span class="caret" style="transform:scale(2);color: #ccc;"></span>'); }
    loadDesignList();
    $(document).ready(function () {
        $(".e2-d0-hxmj").bind("click", function () {
            $(".e2-lightbox").fadeIn();
            $(".e2-adddiv").fadeIn();
        });
        $(".e2-lightbox").bind("click", function () {
            $(".e2-lightbox").fadeOut();
            $(".e2-adddiv").fadeOut();
        });
        $(".e2-adddiv-btn").bind("click", function () {
            $(".e2-lightbox").fadeOut();
            $(".e2-adddiv").fadeOut();
        });
        $(".e2-x").bind("click", function () {
            $(".e2-lightbox").fadeOut();
            $(".e2-adddiv").fadeOut();
        });
    });
})
