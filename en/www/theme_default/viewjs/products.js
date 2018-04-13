var goods_id = 0;
var productID = 0;
var store_nums = 0;
var goods_info;
require(["jquery", "jsuitl/yirunapi", "jsuitl/slider"], function ($, API) {

    $("a.pia-xq").click(function () { //点击详细效果动画显示效果
        $('.lightbox').fadeIn(777);
        $('.nairong').show();
        $(".nrzp").delay(400).slideDown();
        $(".ssnr").delay(700).slideDown();
        //debugger;
        // var reg = new RegExp("src=", "g");
        // var piccontent = goods_info.content.replace(reg, "width='900' data-original=");
        // var piccontent = goods_info.content.replace(reg, "width='900' src=");
        // $("#goods_content").html(piccontent);//商品详细介绍
        //$("#goods_content").html(goods_info.content);// 商品详细介绍
        // debugger;

        setTimeout(function () {
            var reg = new RegExp("src=", "g");
            // var piccontent = goods_info.content.replace(reg, "width='900' data-original=");
            var piccontent = goods_info.content.replace(reg, "width='800' src=");
            $("#goods_content").html(piccontent);//商品详细介绍
            //$("img").lazyload();
        }, 900);


    });
    $("a.fhla").click(function () {//点击详细页面返回按钮关闭详细页面的效果
        $(".nrzp").slideUp();
        $(".ssnr").slideUp();
        $('.nairong').delay(700).fadeOut(200);
        $('.lightbox').delay(700).fadeOut(777);
    });
    $("a.xsg").click(function () {//点击详细页面控制滚动条按钮 上
        var t = $(".ssnr").scrollTop();
        $('.ssnr').animate({ 'scrollTop': t - 200 }, 100)
    });
    $("a.xxg").click(function () {//点击详细页面控制滚动条按钮 下
        var t = $(".ssnr").scrollTop();
        $('.ssnr').animate({ 'scrollTop': t + 200 }, 100)
    });

    //$("a.pia-gm").click(function () {//点击购买动画显示效果
    //    $('.lightbox').fadeIn(777);
    //    $('.guige').delay(700).slideDown();
    //});
    $("a.pia-qx").click(function () {//点击购买后取消动画关闭效果
        $('.lightbox').delay(200).fadeOut(777);
        $('.guige').slideUp();
    });

    $("a.pia-gm").click(function () {//二维码点击显示效果
        $('.lightbox').fadeIn(777);
        $('.nairong').hide();
        $('.guige').hide();
        $('.qrs').delay(700).slideDown();
    });


    $("a.pia-qr").click(function () {//二维码点击显示效果
        $('.lightbox').fadeIn(777);
        $('.nairong').hide();
        $('.guige').hide();
        $('.qrs').delay(700).slideDown();
    });
    $("a.pia-qrx").click(function () {//二维码点击关闭效果
        $('.qrs').delay(700).fadeOut(200);
        $('.lightbox').delay(700).fadeOut(777);
    });


    goods_id = $.getUrlVar("goods_id");//获取请求的商品id
    var type = decodeURIComponent($.getUrlVar("type"));//获取商品类型

    if (type != "undefined" && type.length > 1) {
        $("#typename").html(type);
    } else {
        $("#typename").remove();
    }

    var photoul = $("#sliderbanner ul");//装载商品图片容器
    photoul.children("li").remove();//删除原有商品图片

    var type_list = $("#type_list");
    type_list.html("");

    API.getProductinfo(goods_id, function (datas) {
        goods_info = datas.goods_info;//保存商品信息
        $("#shangjia").attr("href", "sp.html?id=" + goods_info.seller_id);

        /*--- 商品展示图片 ---*/
        var photolist = goods_info.photo;//商品图片列表
        $.each(photolist, function (i, item) {//加载商品图片
            photoul.append('<li><div class="img"><img src="' + item.img + '" height="450" width="450" alt="" /></div></li>');
        });
        $('#sliderbanner').flexslider({//构造商品图片滚动
            slideshowSpeed: 5000,
            animation: "slide",
            direction: "horizontal",
            easing: "swing"
        });

        $("#goods_name").html(goods_info.name);//商品名称
        $("#goods_name2").html(goods_info.name);//再详细页面中商品名称

        store_nums = goods_info.store_nums//保存库存



        //计算显示商品价格
        var minSellPrice = goods_info.minSellPrice;//商品最低价格
        var maxSellPrice = goods_info.maxSellPrice;//商品最高价格
        var sell_price = goods_info.sell_price;
        if (minSellPrice != maxSellPrice) {//判断是否存在最小价格和最大价格
            sell_price = API.formatMoney(minSellPrice) + " - " + API.formatMoney(maxSellPrice);
        }

        $("#goods_sell_price").html(sell_price);//市场价格
        $("#goods_sell_price2").html(sell_price);//市场价格购买里面的

        var spec_data = datas.spec_data;//获取分类列表
        var tmparray = [];//临时装载分类数据
        var tmpid = undefined;//临时记录分类id

        if (spec_data)//检查有没有商品分类
            $.each(spec_data, function (i, item) {//循环商品分类列表
                var newid = item.id;//获取当前分类主ID
                if (newid != tmpid) {//判断商品分类循环中是否为新的分类
                    if (tmpid > 0) {//判断是否需要结束上一个类型
                        tmparray[tmpid] += "</dd>"
                    }
                    tmpid = newid;//置换不相同的分类id
                }
                if (tmparray[tmpid] === undefined) {//如果没有数据
                    tmparray[tmpid] = '<dt>规格</dt><dd name="specCols" id="specList' + tmpid + '">';//创建第一行

                }
                var rowjson = {//记录类型数据，用于点击分类时候
                    "id": tmpid + "",
                    "type": item.type,
                    "value": item.value,
                    "name": item.name
                };

                tmparray[tmpid] += "<a href='javascript:;' onclick='sele_spec(this);' value='" + JSON.stringify(rowjson) + "'>" + item.value + "</a>";//装载分类选项
            });
        var type_list_html = "";//显示分类的html数据容器

        $.each(tmparray, function (i, item) {//构造分类html内容
            if (item !== undefined) {
                type_list_html += item + "</dd>";
                productID = goods_id;//该商品需要选择分类
            }
        });
        type_list.html(type_list_html);//把分类html数据写出到界面

        $("#goods_qr").attr("src", 'http://www.e-runint.com/qrcode.php?data=http://www.e-runint.com/site/products/id/' + goods_id);//二维码图片


    });
});

function reduction() {//减少购买数
    var num = $("#goods_num").attr("value");
    if (num > 1) {
        num--;
    } else {
        num = 1;
    }
    $("#goods_num").attr("value", num);
}

function addend() {//添加购买数

    var num = $("#goods_num").attr("value");
    num++;
    var num = $("#goods_num").attr("value", num);
}

/**
 * 选中分类
 * 
 */
function sele_spec(_self) {
    var specObj = $.parseJSON($(_self).attr('value')); // 获取商品类型的json数据

    if ($(_self).attr('class') == 'active') {// 已经为选中状态时
        $(_self).removeClass('active');
        productID = goods_id;
    } else { // 清除同行中其余规格选中状态，并设置当前点击的类型为选中样式   
        $('#specList' + specObj.id).find('a.active').removeClass('active');
        $(_self).addClass('active');
    }


    if (checkSpecSelected()) {//判断是否全部类型选择完毕      
        // 整理规格值
        var specArray = [];//装载以选中的所有分类信息
        $('[name="specCols"]').each(function () {//循环获取选中的分类信息
            specArray.push($(this).find('a.active').attr('value'));
        });
        var specJSON = '[' + specArray.join(",") + ']';//把选中的分类数组转换成字符串

        require(["jquery", "jsuitl/yirunapi", "jsuitl/slider"], function ($, API) {

            API.getProduct(goods_id, specJSON, function (resultData) {//计算选中的商品分类价格和库存等

                if (resultData.flag != "success") {//判断是否成功
                    return;
                }
                productID = resultData.data.id;//记录当前指定分类的商品id
                $("#goods_sell_price2").html(API.formatMoney(resultData.data.sell_price));//市场价格购买里面的
                store_nums = resultData.data.store_nums;//记录库存
            });

        });
    }
}

/**
 * 检查规格选择是否符合标准
 * 
 * @return boolen
 */
function checkSpecSelected() {   //检查商品分类是否选择完毕
    if ($('[name="specCols"]').length == $('[name="specCols"] .active').length) {
        return true;
    }
    return false;
}


function addcart() {
    var num = $("#goods_num").attr("value");
    if (store_nums < num) {//检查库存

        require(["jsuitl/yirunapi"], function (API) {
            API.messageuitl("Insufficient inventory");
        });
        return;//库存不足提示后返回
    }

    //设置商品提交参数
    var id = 0;//商品id
    var typetmp = "goods";//商品类型
    if (productID == 0) {//没有分类的商品
        id = goods_id;//设置提交的商品id
    } else if (!checkSpecSelected()) {//没有选择分类
        require(["jsuitl/yirunapi"], function (API) {
            API.messageuitl("Please select a classification of goods");
        });
        return;//没有选择分类提示后返回
    } else {//已经选好分类
        id = productID;//设置商品id
        typetmp = "product";//设置商品类型
    }

    require(["jsuitl/yirunapi"], function (API) {
        API.joinCart(id, num, typetmp, function (datas) {
            API.messageuitl(datas.result.message);  //提示提交结果
            if (!datas.result.isError) {//提交成功后关闭选择分类界面
                $('.lightbox').delay(200).fadeOut(777);
                $('.guige').slideUp();
            }

        });

    });


}