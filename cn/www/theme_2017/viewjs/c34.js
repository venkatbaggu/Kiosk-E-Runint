var id;


var initStoreHome = function () {
    api.getStoreHome(id, function (datas) {
        $("#logo_img").attr("src", datas.big_logo_img);
        $("#name_div").html(datas.true_name);
        var sellerBusArea = "";
        if (datas.sellerBusAreaData.length > 0) {
            $.each(datas.sellerBusAreaData, function (i, item) {
                sellerBusArea += "/" + item.area_name;
            });
            sellerBusArea = sellerBusArea.substring(1);
        }
        $("#sellerBusArea_span").text(sellerBusArea);
        $("#qr_img").attr("src", datas.qr_url);
     
        $("#e2-b22-a1").html(datas.content);
        $("#e2-b22-a2").html(datas.anliblock);
        $("#e2-b22-a3").html(datas.zizhiblock);
        $("#e2-b22-a4").html(datas.kiosk_page_block);
        
    });
}


$(function () {
    id = $.getUrlVar("id");
    var tmp = decodeURIComponent($.getUrlVar("typename")).replace("#","");
    $("#typename_span").text(tmp);
    initStoreHome();
});
