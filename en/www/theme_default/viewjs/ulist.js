var page = 1;//当前页
var total_page = 1;//总页数
var pageMaxCount = 10;//每页显示数目
var len = 10;//翻页按钮个数，实际长度+1，起始位置1
var ullist;//商家列表容器
var ulpage//翻页按钮容器
var type;
var typeid;
var typename;
var listdata;//数据
var imgRe = new RegExp("/", "g");
var writeullist = function () {//渲染商家列表
    ullist.html("");//清空原有数据
    if (listdata)
        for (var i = (page - 1) * pageMaxCount; i < page * pageMaxCount && listdata.length > i; i++) {//循环编写商品列表渲染元素

            var img = listdata[i].logo_img;
            if (!listdata[i].logo_img.indexOf("nologo.jpg", 0) > 1) {
                var img = "http://www.e-runint.com/pic/thumb/img/" + listdata[i].logo_img.replace("http://www.e-runint.com/", "").replace(imgRe, "@_@") + "/w/70/h/70";
            }

            var html_tmp = '<a href="sp1.html?provincename=' + encodeURIComponent(typename) + '&province=' + typeid + '&root=' + encodeURIComponent("联盟商") + '&type=' + encodeURIComponent(type) + '&id=' + listdata[i].id + '"> <li>';
            html_tmp += '<div class="uulc"><img src="' + img + '" width="70" height="70" alt="" /></div>';
            html_tmp += '<div class="ult">';
            html_tmp += '<h3>' + listdata[i].name + '</h3>';
            html_tmp += '<div class="uult">' + type + ' <span class="v">V<em>4</em></span></div>';
            html_tmp += '<div class="rz-ico ulist-ico"><span class="yico">营</span> <span class="rico">认</span> <span class="jico">金</span></div>';
            html_tmp += '</div>';
            ullist.append(html_tmp);//加入容器进行界面渲染
        }

}
var writeulpage = function () { //渲染翻页按钮
    ulpage.html("");//清空原有的渲染数据
    if (total_page > 1) {//判断是否需要翻页按钮
        //填写最左边的箭头
        if (page == 1) {//当前在第一页
            ulpage.append('<a><li class="first"><</li></a>');
        }
        else {//当前不在第一页
            ulpage.append('<a onclick="gotoPage(' + (page - 1) + ')"><li class="first"><</li></a>');
        }

        var i = page;
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

        for (var count = 1 ; i <= total_page && count != len; i++, count++) {//循环加载页数选项
            if (page == i) {
                ulpage.append('<a><li class="selpage">' + i + '</li></a>');
            } else {
                ulpage.append('<a  onclick="gotoPage(' + i + ')"><li>' + i + '</li></a>');
            }
        }

        //填写最右边的箭头
        if (page == total_page) {//如果当前是最后一页
            ulpage.append('<a><li class="last">></li></a>');
        }
        else {//当前不是最后一页
            ulpage.append('<a  onclick="gotoPage(' + (page + 1) + ')")><li class="last">></li></a>');
        }

    }

}

function gotoPage(p) {
    page = p;//点击翻页页数
    writeullist();//渲染商品列表
    writeulpage();//渲染翻页按钮
}

require(["jquery", "jsuitl/yirunapi"], function ($, API) {

    type = decodeURIComponent($.getUrlVar("type"));//获取商家分类
    typeid = $.getUrlVar("id");//获取地区编码
    typename = decodeURIComponent($.getUrlVar("name"));//获取地区名字
    $("#title1").html(type);//显示商家分类
    $("#title2").html(typename);//显示地区名

    ullist = $(".ul-list");//商家列表容器
    ulpage = $(".ul-page");//翻页按钮容器
    page = 1;//设置为第一页
    API.getUnionCatList(function (resultData) {
        listdata = JSLINQ(resultData.unionCatlist).Where(function (item) { return item.pid == typeid }).items;//保存数据
        total_page = parseInt(listdata.length % pageMaxCount) > 0 ? parseInt(listdata.length / pageMaxCount) + 1 : parseInt(listdata.length / pageMaxCount); //计算总页数
        writeullist();//渲染商家列表
        writeulpage();//渲染翻页按钮

    });
});