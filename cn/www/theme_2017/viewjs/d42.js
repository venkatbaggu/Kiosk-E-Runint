var id;

var initData = function () {
    api.getStoreHome(id, function (datas) {
        $("#name_a").text(datas.true_name);
        $("#true_name_div").html(datas.true_name + ' <em>缤纷国际</em>');

        $("#logo_img").attr("src", datas.big_logo_img);
        $("#qr_img").attr("src", datas.qr_url);
        var str_tmp = "";
        $.each(datas.sellerStyleData, function (i, item) {
            str_tmp += "/" + item.style_name;
        });
        if (str_tmp.length > 2) {
            $("#styleData_span").text(str_tmp.substring(1));
        }
        debugger;

        
        $("#e2-b22-a1").html(datas.kiosk_page_block);
      
        var zizhihtml = "";
        $.each(datas.sellerCertPhoto, function (i, item) {
            zizhihtml += '<img width="100%" src="' + item.img + '" />'
            zizhihtml += '<p style="width:100%;text-align:center; font-size:26px;">' + item.photo_text+'</p>';
        });
        $("#e2-b22-a2").html(zizhihtml);
        if (datas.page_title == null || datas.page_title.length < 1) {
            $("#t11").css("display", "none");
            $("#t11").removeClass("active");
            $("#t12").addClass("active");
            $("#e2-b22-a1").removeClass("in active");
            $("#e2-b22-a2").addClass("in active");
        } else {
            $("#t11").css("display", "");
            $("#t11").addClass("active");
            $("#t12").removeClass("active");
            $("#e2-b22-a1").addClass("in active");
            $("#e2-b22-a2").removeClass("in active");

        }
    });

};

$(function () {

    id = $.getUrlVar("id");

    initData();

});