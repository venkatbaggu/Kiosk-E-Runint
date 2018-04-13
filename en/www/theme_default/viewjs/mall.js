require(["jquery", "jsuitl/yirunapi"], function ($, API) {

    var layout = $(".mall-category");//获取加载html的元素容器
    layout.children("div").remove();//清空原来的html元素

    API.getCategoryList(function (datas) {//获取商品类型服务
        var rootList = JSLINQ(datas).Where(function (item) { return item.pid == "" }).items;//查询首级商品类型列表

        $.each(rootList, function (i, obj) {//循环获取首级商品类型

            //编写首级商品类型的html元素
            var tmphtml = '<div class="mcb">'
            + '<a href="javascript:;" class="mca">'
            + obj.name
            + '<div class="xbs">▾</div>'
            + '</a>'
            + '<div class="mch">';
            var onelist = JSLINQ(datas).Where(function (item) { return item.pid == obj.id }).items;//查询第一级的商品类型列表
            $.each(onelist, function (i, oneobj) {//循环获取第一级的商品类型

                //编写第一级的商品类型的html元素
                tmphtml += '<div class="fl2">'
                + '<a href="list.html?id='
                + oneobj.id
                + '&type='
                + encodeURIComponent(oneobj.name)
                + '">'
                + '<h4>' + oneobj.name
                + '</h4>'
                + '</a>';

                var towlist = JSLINQ(datas).Where(function (item) { return item.pid == oneobj.id }).items;//查询第二级的商品类型列表

                $.each(towlist, function (i, towobj) {//循环获取第二级的商品类型

                    //编写第二级的商品类型的html元素
                    tmphtml += '<a href="list.html?id='
                        + towobj.id
                        + '&type='
                        + encodeURIComponent(towobj.name)
                        + '" class="zmc">'
                        + towobj.name
                        + '</a>';
                });

                tmphtml += '</div>';//结束第一级商品类型的html元素
            });

            tmphtml += '</div></div>';//结束首级商品类型的html元素
            layout.append(tmphtml);//加载到页面指定html的元素容器
        });

        $("a.mca").click(function () {//添加商品类型列表的元素事件
            $(".mch").slideUp(200);
            $(this).parents(".mcb").children(".mch").stop().slideDown(200);
        });
    });
});
