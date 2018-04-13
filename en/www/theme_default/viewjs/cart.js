var cartinfo;//购物车json对象
var pageMaxCount = 8;//每页显示数目
var total_page = 1;//最大页数
var page = 1;//当前页数
var ullist;//商品列表容器
var ulpage//翻页按钮容器
var len = 7;//翻页按钮个数，实际长度+1，起始位置1

var writeullist = function () {//渲染商品列表
    ullist.html("");//清空原有数据
    if (cartinfo && cartinfo.goodsList)
        for (var i = (page - 1) * pageMaxCount; i < page * pageMaxCount && cartinfo.goodsList.length > i; i++) {//循环编写商品列表渲染元素
            var tmp = cartinfo.goodsList[i];
            var html_tmp = '<li><a href="#">';
            html_tmp += '<div class="ulc"><img src="' + tmp.img + '" width="120" height="120" alt="" /></div>';//商品图片
            html_tmp += '<div class="ult"><h4>' + tmp.name + '</h4>';//商品名称
            if (tmp.spec_array) {//判断是否存在商品分类
                var spec_array = $.parseJSON(tmp.spec_array);
                html_tmp += '<div class="cguige">'
                $.each(spec_array, function (i, item) {
                    html_tmp += '<span>' + item.value + '</span> '//商品分类
                });
                html_tmp += '</div>';
            } else {//没有商品分类
                html_tmp += '<div class="cguige"><span>&nbsp</span></div>'//没有商品分类
            }
            html_tmp += '<div class="price">' + tmp.sell_price + '<div class="cshuliang">x' + tmp.count + '</div></div>'//商品单价和购买数量
            html_tmp += '</div><div class="clearfix"></div></a><a onclick="removeCart(' + tmp.goods_id + ',' + tmp.product_id + ')"><div class="shanchu">×</div></a></li>'//结束一个商品渲染元素
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
            ulpage.append('<a  onclick="gotoPage(' + (page + 1) + '")><li class="last">></li></a>');
        }

    }

}

require(["jquery", "jsuitl/yirunapi"], function ($, API) {

    ullist = $(".ul-list");//商品列表容器
    ulpage = $(".ul-page");//翻页按钮容器
    page = 1;//设置为第一页
    API.getCart(function (resultData) {//获取购物车数据       
        cartinfo = resultData;//全局保存购物车数据
        if (cartinfo.goodsList.length == 0) {
            $("#btn_buy").css("display", "none");//没有商品数据就不显示购买按钮
            $("#btn_clear").css("display", "none");//没有商品数据就不显示清空按钮
            
        } else {
            $("#btn_buy").css("display", "block");//有商品数据就显示购买按钮
            $("#btn_clear").css("display", "block");//有商品数据就显示清空按钮
        }

        //计算总页数
        if (parseInt(cartinfo.goodsList.length % pageMaxCount) > 0) {
            total_page = parseInt(cartinfo.goodsList.length / pageMaxCount) + 1;
        } else {
            total_page = parseInt(cartinfo.goodsList.length / pageMaxCount);
        }
        writeullist();//渲染商品列表

        writeulpage();//渲染翻页按钮

    });

});

//翻页
function gotoPage(p) {
    page = p;//点击翻页页数
    writeullist();//渲染商品列表
    writeulpage();//渲染翻页按钮
}

function removeCart(goods_id, product_id) {
    require(["jquery", "jsuitl/yirunapi"], function ($, API) {      
        API.removeCart(goods_id, product_id, function (resultdata) {         
            window.location.href = "cart.html?random=" +parseInt(Math.random() *10000);
        });
    });
}

//清空购物车并返回主页
function clearCart() {
    require(["jquery", "jsuitl/yirunapi"], function ($, API) {

        API.clearCart(function (resultData) {
            $("#btn_buy").css("display", "none");
            $("#btn_clear").css("display", "none");
            window.location.href = "cart.html?random=" + parseInt(Math.random() * 10000);

        })

    });


}