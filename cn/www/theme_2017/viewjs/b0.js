var myCategoryList;
var selected_id;
var selected_name;

var getCategoryList = function () {
    api.getCategoryList(function (datas) {
        myCategoryList = datas;
        var rootList = JSLINQ(myCategoryList).Where(function (item) { return item.pid == "" }).items;//查询首级商品类型列表
        var rootList_div = $("#rootList_div");

        $.each(rootList, function (i, item) {

            var html = "";
            if (i == 0 && selected_id == "") {
                html = '<a href="#" class="e2-menu-actvie">' + item.name + '</a>';
                selected_id = item.id;
                selected_name = item.name;
            } else if (selected_id == item.id) {
                html = '<a href="#" class="e2-menu-actvie">' + item.name + '</a>';
                selected_id = item.id;
                selected_name = item.name;
            } else {
                html = '<a href="?id=' + item.id + '">' + item.name + '</a>';
            }

            rootList_div.append(html);

        });
        type_nodeInit();
    });
}

var type_nodeInit = function () {
    var oneList = JSLINQ(myCategoryList).Where(function (item) { return item.pid == selected_id }).items;//查询首级商品类型列表
    var type_node_div = $("#type_node_div");
    $.each(oneList, function (i, item1) {
        var html = '<dl class="dl-horizontal">';
        html += '<dt><a  href="b1.html?id=' + item1.id + '&name=' + encodeURIComponent(item1.name) + '&rootName=' + encodeURIComponent(selected_name) + '&rootid=' + selected_id + '">' + item1.name + ' ></a></dt>';
        var towList = JSLINQ(myCategoryList).Where(function (item) { return item.pid == item1.id }).items;
        $.each(towList, function (i, item2) {
            html += '<dd><a  href="b1.html?id=' + item2.id + '&name=' + encodeURIComponent(item2.name) + '&rootName=' + encodeURIComponent(selected_name) + '&rootid=' + selected_id + '">' + item2.name + '</a></dd>';
        });
        html += '</dl>';
        type_node_div.append(html);
    });
};


$(function () {
    selected_id = $.getUrlVar("id");
    getCategoryList();
});