var pagesize = 20;




var getMydesignFn = function () {
    var design_div = $("#design_div");
    design_div.html("");

    api.getMydesign(1, pagesize, function (datas) {

        $.each(datas.designs, function (i, item) {
            var html = '<div class="swiper-slide">';
            html += '<a href="e2.html?type=2&id=' + item.obsDesignId + '">';
            html += '<img src="' + item.mainPic + '">';
            html += '<div class="title e2-owt">' + item.name + '</div>'
            html += '</a>';
            html += '</div>';
            design_div.append(html);
        });

        //var swiper = new Swiper('.swiper-container2', {
        //    pagination: '.swiper-pagination',
        //    slidesPerView: 5,
        //    paginationClickable: true,
        //    nextButton: '.swiper-button-next',
        //    prevButton: '.swiper-button-prev',
        //    spaceBetween: 30
        //});
        getMyfloorplanFn();
    });

};

var getMyfloorplanFn = function () {
    var floorplan_div = $("#floorplan_div");
    floorplan_div.html("");
    api.getMyfloorplan(1, pagesize, function (datas) {

        $.each(datas.floorPlans, function (i, item) {
            var html = '<div class="swiper-slide">'
            html += '<a href="e2.html?type=1&id=' + item.obsPlanId + '">';
            html += '<img src="' + item.smallPics + '">';
            html += '<div class="title e2-owt">' + item.name + '</div>';
            html += '</a>';
            html += '</div>';
            floorplan_div.append(html);
        });
        var swiper = new Swiper('.swiper-container2', {
            pagination: '.swiper-pagination',
            slidesPerView: 5,
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30
        });
    });

};


$(function () {
    getMydesignFn();
    
    //var swiper = new Swiper('.swiper-container', {
    //    pagination: '.swiper-pagination',
    //    nextButton: '.swiper-button-next',
    //    prevButton: '.swiper-button-prev',
    //    paginationClickable: true
    //});

});