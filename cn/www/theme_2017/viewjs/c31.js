var id;
var initSellerCatList = function () {
    var accordion_content = $("#accordion");
    accordion_content.html("");
    api.getSellerCatList(id, function (datas) {
        $("#title_div").html(datas.name);

        $.each(datas.child, function (i, item1) {
            var html = '<div class="panel panel-default">';
            html += '<div class="panel-heading">';
            html += '<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + item1.id + '">';
            html += '<h3 class="panel-title">';
            html += '<span>' + item1.name + '</span>';
            if (i == 0) {
                html += '<span class="pull-right e2-c31-arr active"> ></span>';
            } else {
                html += '<span class="pull-right e2-c31-arr"> ></span>';
            }
            html += '</h3>';
            html += '</a>';
            html += '</div>';
            if (i == 0) {
                html += '<div id="collapse' + item1.id + '" class="panel-collapse collapse in">';
            } else {
                html += '<div id="collapse' + item1.id + '" class="panel-collapse collapse">';
            }
            html += '<div class="panel-body">';
            $.each(item1.child, function (i, item2) {
                html += '<a href="c32.html?id=' + item2.id + '&typename=' + encodeURIComponent(datas.name + ' ' + item1.name + ' ' + item2.name) + '">' + item2.name + '</a>';
            });
            html += '</div>';
            html += '</div>';
            html += '</div>';
            accordion_content.append(html);
        });
    });
};

$(function () {
    id = $.getUrlVar("id");
    initSellerCatList();

});