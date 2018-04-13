require(["jquery", "jsuitl/yirunapi"], function ($, API) {

    $.virtualkeyboard.init();
    $("#word").click(function (e) {
        $.virtualkeyboard.keyboardShowForId("word");
    });
    var len = 10;//最大显示个数
    var page = 1;//当前页数  
    var total_page = 1;//最大页数

    var wordstr = decodeURIComponent($.getUrlVar("word"));//获取查询关键字
    page = parseInt($.getUrlVar("page"));//获取当前页

    var ullist = $(".ul-list");//获取商品列表容器
    var ulpage = $(".ul-page");//获取分页按钮容器

    ullist.html("");//清空原有内容
    ulpage.html("");//清空原有内容

    if (wordstr != "undefined" && wordstr != "null") {
        $("#word").val(wordstr);//渲染提交回来的关键字         
    } else {

        return;
    }

    if (!page || page < 1) {//判断当前是否有效
        page = 1;
    }

    API.getProductList(wordstr, "", "sale",len, page, function (datas) {
       
        if (datas.pro_list.goodsList.length < 1) {//判断
            return;
        }
        total_page = datas.total_page;//记录最大页数
        /*---分页效果---*/
        if (total_page > 1) {
            //翻页按钮计算和显示

            //填写最左边的箭头
            if (page == 1) {//当前在第一页
                ulpage.append('<a><li class="first"><</li></a>');
            }
            else {//当前不在第一页
                ulpage.append('<a href="?word=' + wordstr + '&page=' + (page - 1) + '"><li class="first"><</li></a>');
            }

            //判断翻页列出的数据
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

            for (var count = 1 ; i <= total_page && count != len; i++, count++) {//循环加载页数选项
                if (page == i) {
                    ulpage.append('<a><li class="selpage">' + i + '</li></a>');
                } else if (page < i) {
                    ulpage.append('<a href="?word=' + wordstr + '&page=' + i + '"><li>' + i + '</li></a>');
                } else {
                    ulpage.append('<a href="?word=' + wordstr + '&page=' + i + '"><li>' + i + '</li></a>');
                }
            }

            //填写最右边的箭头
            if (page == total_page) {//如果当前是最后一页
                ulpage.append('<a><li class="last">></li></a>');
            }
            else {//当前不是最后一页
                ulpage.append('<a href="?word=' + wordstr + '&page=' + (page +1) + '"><li class="last">></li></a>');
            }
        }
        /*---商品列表---*/

        var goodsList = datas.pro_list.goodsList;//获取商品数据
        
        $.each(goodsList, function (i, item) {
            if (!item.true_name) { item.true_name = ""; }
            var hhtml = ("<a href='products.html?goods_id=" + item.id + "'>");
            hhtml += ("<li><div class='ulc'>");
            hhtml += ('<img src="' + item.img + '" width="120" height="120" alt="" />')
            hhtml += ('</div><div class="ult">');
            hhtml += ('<h4>' + item.name + '</h4>');
            hhtml += ('<div class="price">' + item.sell_price + '</div>');

            hhtml += ('<div class="shopname">' + item.true_name + '</div>');
            hhtml += ('</div><div class="clearfix"></div></li></a>');
            ullist.append(hhtml)//渲染商品列表
        });
    });
});