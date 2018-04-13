var schemeStyle = function () {
    var list_div = $("#list_div");
    list_div.html("");
    api.getSchemeStyle(function (datas) {

        $.each(datas, function (i, item) {
            
            var html = '<a href="javascript:;" tag="' + item.id + "|" + item.style_name+'"><div class="e2-d11-s3-block">';
            html += '<img src="' + item.img + '">';
            html += '<div class="e2-d11-s3block-title">' + item.style_name + '</div></div></a>';
            list_div.append(html);
        });

        $(".e2-d11-s3 a").bind("click", function () {
            $(this).toggleClass("active");
        });

        $(".e2-d11-btn1").bind("click", function () {
            var count = 0;
            var tmp_a = $(".e2-d11-s3 a");
            $.each(tmp_a, function (i, item) {
                if ($(item).hasClass("active")) {
                    count++;
                }
            });
            if (count == tmp_a.length) {
                $(".e2-d11-s3 a").removeClass("active");
            } else {
                $(".e2-d11-s3 a").removeClass("active");
                $(".e2-d11-s3 a").addClass("active");
            }
        });
    });
};

var selectedStyles = function () {
    var parameter = "";
    var styleName = "";
    var tmp = $(".e2-d11-s3 a");
    $.each(tmp, function (i, item) {
        if ($(item).hasClass("active")) {
            var tmp = $(item).attr("tag").split("|");
            parameter += "," + tmp[0];
            styleName += "," + tmp[1];          
        }
    });
    if (parameter.length > 0) {
        parameter = parameter.substring(1);
        styleName = styleName.substring(1);
        window.location.href = "d1.html?style_id=" + parameter + "&styleName=" + encodeURIComponent(styleName);
        decodeURIComponent
    } else {

        window.location.href = "d1.html";
    }

};


$(function () {

    schemeStyle();
});
