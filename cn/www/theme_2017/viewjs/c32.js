var id;

var initdata = function () {
    var service_list_div = $("#service_list_div");
    service_list_div.html("");
    api.getZhuangXiuList(1, 4, function (datas) {
        $.each(datas.data, function (i, item) {
            if (i == 0) {
                var tj_html = '<div class="e2-c32-s4-1">';
                tj_html += '<div class="e2-c32-s4-1-1"><img style="border-radius:100px;"  width="150" height="150" src="' + item.big_logo_img + '"></div>';
                tj_html += '<div class="e2-c32-s4-1-2">';
                tj_html += '<div class="e2-c32-s4-1-2-title" style="height:52px; word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + item.true_name + '</div>';
                tj_html += '<div class="e2-c32-s4-1-2-info e2-owt">服务范围：' + item.bus_area_name + '</div>';
                tj_html += '<button class="btn btn-sm e2-c32-s4-1-2-button" onclick="window.location.href=\'c34.html?id=' + item.id + '&typename=' + $.getUrlVar("typename") + '\'">查看详情</button>';
                tj_html += '</div >';
                tj_html += '<div class="e2-c32-s4-1-3" style="display:none;">';
                tj_html += '<img src="' + item.qr_url + '">';
                tj_html += '<p>立即扫码预约</p>';
                tj_html += '</div> ';
                tj_html += '</div> ';
                tj_html += '<div class="e2-c32-s4-2"><img width="646" height="355" src="' + item.big_ad_img + '"></div>';
                $("#tuijain_div").html(tj_html);

                var html2 = '<div class="e2-c32-s5-block">';
                html2 += '<div class="e2-c32-s4-1-1"><img style="border-radius:100px;" width="150" height="150" src="' + item.big_logo_img + '"></div>';
                html2 += '<div class="e2-c32-s4-1-2">';
                html2 += '<div class="e2-c32-s4-1-2-title" style="height:52px; word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + item.true_name + '</div>';
                html2 += '<div class="e2-c32-s4-1-2-info e2-owt" style="height: 60px;">服务范围：' + item.bus_area_name + '</div>';
                html2 += '<button class="btn btn-sm e2-c32-s4-1-2-button" onclick="window.location.href=\'c34.html?id=' + item.id + '&typename=' + $.getUrlVar("typename") + '\'">查看详情</button>';
                html2 += '</div >';
                html2 += '<div class="e2-c32-s4-1-3" style="display:none;">';
                html2 += '<img src="' + item.qr_url + '">';
                html2 += '<p>立即扫码预约</p>';
                html2 += '</div>';
                html2 += '</div>';
                service_list_div.append(html2);
            } else {
                var html2 = '<div class="e2-c32-s5-block">';
                html2 += '<div class="e2-c32-s4-1-1"><img style="border-radius:100px;" width="150" height="150" src="' + item.big_logo_img + '"></div>';
                html2 += '<div class="e2-c32-s4-1-2">';
                html2 += '<div class="e2-c32-s4-1-2-title" style="height:52px; word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + item.true_name + '</div>';
                html2 += '<div class="e2-c32-s4-1-2-info e2-owt" style="height: 60px;">服务范围：' + item.bus_area_name + '</div>';
                html2 += '<button class="btn btn-sm e2-c32-s4-1-2-button" onclick="window.location.href=\'c34.html?id=' + item.id + '&typename=' + $.getUrlVar("typename") + '\'">查看详情</button>';
                html2 += '</div >';
                html2 += '<div class="e2-c32-s4-1-3" style="display:none;">';
                html2 += '<img src="' + item.qr_url + '">';
                html2 += '<p>立即扫码预约</p>';
                html2 += '</div>';
                html2 += '</div>';
                service_list_div.append(html2);
            }
        });
    });
};


$(function () {
    id = $.getUrlVar("id");
    var tmp = decodeURIComponent($.getUrlVar("typename")).replace("#", "");
    $("#typename_span").text(tmp);
    $("#ex_list_a").attr("href", "c33.html?id=" + id + "&typename=" + $.getUrlVar("typename"));
    initdata();
});