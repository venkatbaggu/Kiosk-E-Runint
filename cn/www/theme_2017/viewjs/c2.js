
var seller_id;
//var rootId;
//var rootName;
//var nodeid;
//var nodeName;
//var goodsID;
//var goodsName;


var getStoreHome = function () {

    api.getStoreHome(seller_id, function (datas) {
        //$("#title_div").html('<a href="b0.html?id=' + rootId + '">' + rootName + '</a> > <a href="b1.html?id=' + nodeid + '&name=' + encodeURIComponent(rootName) + '&rootid=' + rootId + '">' + nodeName + '</a> > <a href="javascript:history.go(-2);">' + goodsName + '</a> > <a href="javascript:window.history.back();">' + datas.true_name + '</a> > 商家简介');
        $("#logo_img").attr("src", datas.big_logo_img);
        $(".e2-b21-s2-name").html(datas.true_name);
        $(".e2-b21-s2-addr").html("地址：" + datas.address);
        $(".e2-b21-s2-phone").html("联系电话：" + datas.tel);
        $("#qr_img").attr("src", datas.qr_url);
        
        $("#e2-b22-a1").html(datas.content);
        $("#e2-b22-a2").html(datas.zizhiblock);
    
        //dvr 路径
        var dvrurl = datas.shijinglink;
      
        if (dvrurl && dvrurl != "null" && dvrurl != null) {
            //有dvr
            $("#dvr_tab").show();
            $("#dvrurl").val(dvrurl);
        } else {
            $("#dvr_tab").hide();
        }
    });

};

var dvr_loginFn = function () {

    var url = $("#dvrurl").val();
    var user = $("#username_input").val();
    var paw = $("#password_input").val();

    formJs.dvr_login(user, paw, url);

}


$(function () {
    seller_id = $.getUrlVar("id");

    getStoreHome();
    //var url = decodeURIComponent($.getUrlVar("url"));

    vKeyboard.init();
    $("#username_input").click(function (e) {

        vKeyboard.keyboardShowForId("username_input");
    });
    $("#password_input").click(function (e) {
        vKeyboard.keyboardShowForId("password_input");
    });

});