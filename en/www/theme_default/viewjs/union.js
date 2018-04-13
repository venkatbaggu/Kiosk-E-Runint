require(["jquery", "jsuitl/yirunapi"], function ($, API) {

    var listlayout = $(".mall-category");
    listlayout.html("");

    API.getUnionCatList(function (resultData) {
        var unionCatlist = resultData.unionCatlist;
        var onelist = JSLINQ(unionCatlist).Where(function (obj) { return obj.pid == ""; }).items;

        $.each(onelist, function (i, item) {
            var html = "";
            html += '<div class="mcb">';
            html += '<a href="javascript:;" class="mca">' + item.name + '<div class="xbs">▾</div></a>';

            html += '<div class="mch">';
            var towlist = JSLINQ(unionCatlist).Where(function (obj) { return obj.pid == item.id; }).items;
            $.each(towlist, function (y, towitem) {
                html += '<a href="ulist.html?type=' + encodeURIComponent(item.name) + '&id=' + towitem.id + '&name=' + encodeURIComponent(towitem.name) + '" class="zmc">' + towitem.name + '</a>';


            });
            html += '</div>';
            html += '</div>';
            listlayout.append(html);
        });

        $("a.mca").click(function () {
            $(".mch").slideUp(200);
            $(this).parents(".mcb").children(".mch").stop().slideDown(200);
        });
    });
});