
require.config({
    baseUrl: window.location.href.substr(0, window.location.href.indexOf("/www/") + 5),
    /**
     * 设置JS插件
     */
    paths: {
        jquery: 'jsuitl/lib/jquery',
        ajaxuitl: 'jsuitl/lib/ajaxuitl',
        accounting: 'jsuitl/lib/accounting',
    },
    /**
     * 设置css.js文件路径
     */
    map: {
        '*': {
            'css': 'jsuitl/lib/css'
        },
    },

});
//导入CSS
//require(["css!theme_default/css/style", "css!theme_default/css/slider", "css!theme_default/css/msg"]);

require(['jquery', "jsuitl/yirunapi"], function ($, API) {

    $.LoadingBar.constructor();
    //$.LoadingBar.start();
    //$.LoadingBar.stop();

    // var userinfo = null;

    API.getUserInfo(function (resultData) {
        
        if (!resultData.return_code) {
            
            window.userinfo = resultData;
            $(".menu").html('<a id="head_link_login" onclick="userlogout();";><div class="m m1" style="font-weight:bold;" >log out</div></a><a id="head_link_orderlist" href="orderlist.html"><div class="m m2">Order</div></a><a id="head_link_search"  href="search.html"><div class="m m3">Search</div></a><a  id="head_link_cart" href="cart.html"><div class="m m4">Cart</div></a>');
        }

    });
    //渲染左边菜单的内容
    var menuhtml = "";
    menuhtml += '<a href="index.html"><div id="div_index" class="b">Home Page</div></a>';
    menuhtml += '<a href="mall.html"><div id="div_mall"  class="b">Mall</div></a>';
    menuhtml += ' <a href="union.html"><div id="div_union" class="b">Alliance</div></a>';
    menuhtml += '<a href="factory.html"><div id="div_factory" class="b">Manufacturers</div></a>';
    menuhtml += '<a href="3d.html"><div id="div_3d" class="b">3D showroom</div></a>';
    menuhtml += '<div class="shbutton sh1"> B<br>a<br>r<br> < </div>';
    menuhtml += '<div class="shbutton sh2"> B<br>a<br>r<br> > </div>';
    $(".sidebar").html(menuhtml);//进行渲染左边菜单
    /*渲染菜单*/
    //渲染头部菜单    
    if (window.userinfo) {
        $(".menu").html('<a id="head_link_login" onclick="userlogout();";><div class="m m1"  style="font-weight:bold;" >log out</div></a><a id="head_link_register" href="orderlist.html"><div class="m m2">Order</div></a><a id="head_link_search"  href="search.html"><div class="m m3">Search</div></a><a  id="head_link_cart" href="cart.html"><div class="m m4">Cart</div></a>');
        removeMenuhref();
    } else {
        $(".menu").html('<a id="head_link_login" href="login.html"><div class="m m1">log in</div></a><a id="head_link_orderlist" href="orderlist.html"><div class="m m2">Order</div></a><a id="head_link_search"  href="search.html"><div class="m m3">Search</div></a><a  id="head_link_cart" href="cart.html"><div class="m m4">Cart</div></a>');
        removeMenuhref();
    }
  
    $(document).ready(function () {
        $(".sh1").bind("click", function () {
            $(".sh1").hide();
            $(".sh2").show();
            $(".sidebar").animate({ "left": "-220px" });
        });
        $(".sh2").bind("click", function () {
            $(".sh2").hide();
            $(".sh1").show();
            $(".sidebar").animate({ "left": "0" });
        });
    });
});

function removeMenuhref() {

    var currpage = window.location.pathname.substr(window.location.pathname.lastIndexOf("/") + 1);//获取当前页面名字
    switch (currpage) {//判断需要修改的菜单
        case "index.html":
        case "mall.html":
        case "union.html":
        case "factory.html":
        case "3d.html":
            var div = $('#div_' + currpage.substr(0, currpage.lastIndexOf(".")));
            div.addClass("b-active");
            div.parent().removeAttr("href");
            break;
        case "login.html":
        case "orderlist.html":
        case "search.html":
            $('#head_link_' + currpage.substr(0, currpage.lastIndexOf("."))).removeAttr("href");
            break;
        case "cart.html":
        case "cart2.html":
        case "cart3.html":
        case "cart4.html":
            $("#head_link_cart").removeAttr("href");
            break;
        default:
            break;
    }

}

function userlogout() {

    require(['jquery', "jsuitl/yirunapi"], function ($, API) {
        API.logout(function (resultData) {
            $(".menu").html('<a id="head_link_login" href="login.html"><div class="m m1">log in</div></a><a id="head_link_orderlist" href="orderlist.html"><div class="m m2">Order</div></a><a id="head_link_search"  href="search.html"><div class="m m3">Search</div></a><a  id="head_link_cart" href="cart.html"><div class="m m4">Cart</div></a>');
            removeMenuhref();
        });

    });
}

