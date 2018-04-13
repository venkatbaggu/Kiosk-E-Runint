require(["jquery", "jsuitl/yirunapi"], function ($, API) {

    var layout = $(".mall-category");//获取渲染容器
    layout.html("");//清空原有数据

    API.getBrandCatList(function (resultData) {//获取制造商列表
        var onelist = JSLINQ(resultData.brandCatlist).Where(function (item) { return item.pid == ""; }).items;//获取制造商第一级分类
        $.each(onelist, function (i, oneitem) {//循环制造商第一级分类，实现渲染
            var html = '<div class="mcb"><a href="javascript:;" class="mca">' + oneitem.name + '<div class="xbs">▾</div></a><div class="mch">';//构造第一级分类元素
            var twolist = JSLINQ(resultData.brandCatlist).Where(function (item2) { return item2.pid == oneitem.id }).items;//获取第二级分类数据
            $.each(twolist, function (i, twoitem) {//循环制造商第二级分类，实现渲染
                html += '<div class="fl2"><a><h4>' + twoitem.name + 'Bathroom Sanitary Ware </h4></a>'//构造第二级分类元素
                var threelist = JSLINQ(resultData.brandCatlist).Where(function (item3) { return item3.pid == twoitem.id }).items;//获取第三级制造商列表
                $.each(threelist, function (i, threeitem) {//循环第三级制造商列表，实现渲染
                    html += '<a href="sp.html?root=' + encodeURIComponent("Manufacturers") + '&type=' + encodeURIComponent(threeitem.name) + '&id=' + threeitem.id + '" class="zmc">' + threeitem.name + '</a>';//构造第三级制造商元素
                });
                html += '</div>';//构造制造商第二级分类结束元素
            });
            html += '</div></div>';//构造制造商第一级分类结束元素
            layout.append(html);//渲染到界面
        });
        $("a.mca").click(function () {//添加商品类型列表的元素事件
            $(".mch").slideUp(200);
            $(this).parents(".mcb").children(".mch").stop().slideDown(200);
        });
    });

});