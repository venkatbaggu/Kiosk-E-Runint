var wordstr = "";
var layout;
var ulpage;
var page = 1;//当前页数 
var total_page = 1;//最大页数
var pageMaxCount = 4;//每页显示数目
var len = 9;//翻页按钮个数，实际长度+1，起始位置1


require(["jquery", "jsuitl/yirunapi"], function ($, API) {

    $.virtualkeyboard.init();
    $("#query_words").click(function (e) {     
        $.virtualkeyboard.keyboardShowForId("query_words");
    });
    


    wordstr = decodeURIComponent($.getUrlVar("wordstr"));
    page = $.getUrlVar("page");
    if (page == "") {
        page = 1;
    }

    layout = $("#orderlist");
    ulpage = $(".ul-page");
    layout.html("");
    ulpage.html("");
    if (wordstr != "undefined" && wordstr != "null") {
        $("#query_words").val(wordstr);
    } else {
        return;
    }
    API.getOrderList(page,pageMaxCount, wordstr, function (resultData) {

        total_page = resultData.total_page;
        writepage();


        $.each(resultData.rows, function (i, item) {
            var html = '<a href="order.html?id=' + item.id + '"><table width="100%" border="0" class="lbtable">';
            html += '<tr class="lbtable-tr1">';

            html += '<td colspan="4"><span>' + item.create_time + '</span> <span>Order Number：' + item.order_no + '</span> <span>Store：' + item.true_name + '</span></td>'
            html += '</tr>';
            html += '<tr class="lbtable-tr2">';
            html += '<td width="70%" class="lbtable-tr2-td1"><a>';
            if (item.goods.length > 0) {
                html += '<div class="lbtcover"><img src="' + item.goods[0].img + '" width="70" height="70" /></div>';
                html += '<div class="lbtitle">';
                html += '<p>' + item.goods[0].good_info.name + '</p>'
                html += ' <p class="lbtzl">' + item.goods[0].good_info.value + '</p>';
                html += '</div>';
                html += '<div class="lbtnum">x ' + item.goods[0].goods_nums + '</div>';
            }
            html += '</a></td>';
            html += '<td width="10%" align="center">' + item.accept_name + ' 收</td>';
            html += '<td width="10%" align="center">' + item.order_amount + '</td>';
            html += '<td width="10%" align="center">';
            html += '<a href="order.html?id=' + item.id + '" class="zsmjb">';
            html += '<p class="lbtzl">' + item.order_status_text + '</p>';
            html += '订单详情</a></td>';
            html += ' </tr>';
            html += '</table></a>';           
            layout.append(html);
        });
    });


});

var writepage = function () {
    if (total_page < 1) {
        return;
    }

    if (page == 1) {
        ulpage.append('<a><li class="first"><</li></a>')

    } else {
        ulpage.append('<a href="?page=' + (page - 1) + '&wordstr=' + encodeURIComponent(wordstr) + '"><li class="first"><</li></a>');

    }

    var i = page;//其实页数


    //判断赋值起始页码
    if (total_page <= len - 1) {
        i = 1;
    } else {
        if (total_page - page < len / 2 - 1) {
            i = total_page - len + 2;
        }
        else {
            i = page - parseInt(len / 2) + 1;
        }
    }

    if (i < 1) { //确保页码其实数为正整数
        i = 1;
    }

    for (var count = 0; i <= total_page && count != len; i++, count++) {
        if (page == i) {
            ulpage.append('<a><li class="selpage">' + i + '</li></a>');
        } else {
            ulpage.append('<a href="?page=' + i + '&wordstr=' + encodeURIComponent(wordstr) + '"><li>' + i + '</li></a>');
        }
    }



    if (page == total_page) {
        ulpage.append('<a><li class="last">></li></a>');
    } else {
        ulpage.append('<a href="?page=' + (page + 1) + '&wordstr=' + encodeURIComponent(wordstr) + '"><li class="last">></li></a>');

    }


};


var query = function () {
    require(["jquery"], function ($) {
        wordstr = $("#query_words").val();
        window.location.href = "?wordstr=" + encodeURIComponent(wordstr);
    });
};