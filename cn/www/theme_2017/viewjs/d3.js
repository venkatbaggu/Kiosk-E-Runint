var id;

var initSchemeDetail = function () {
    api.getSchemeDetail(id, function (datas) {       
        $("#title_bar").html('<a href="d0.html">设计首页</a> > <a href="d1.html?style_id=' + datas.style_id+'">' + datas.style_name + '</a> > ' + datas.scheme_name);
        $("#logo_img").attr("src", datas.img);
        $("#title_div").html(datas.scheme_name);
        $("#style_div").html('<span>' + datas.house_name + '</span> <span>' + datas.carpet_area + '平米</span> <span>' + datas.style_name + '</span>');
        $("#design_name_span").html(datas.true_name);
        $("#cost_span").html(datas.cost);
        $("#qr_url_img").attr("src", datas.qr_url);
        var show_div = $("#show_div");
        show_div.html("");
        var show_list_div = $("#show_list_div");
        show_list_div.html("");
        $.each(datas.photoList, function (i, item) {
            var html1 = '<div class="swiper-slide"><img src="' + item.img + '" style="height:560px; width:100%" /><div style="height:80px; width:100% ; font-size:26px; line-height:80px; text-align:center; background-color:#FFF;">' + item.cat_text + '</div></div>';
            show_div.append(html1);
            var html2 = '<div class="swiper-slide" ><img src="' + item.img + '" style="height:100%; width:100%" /><div style="height:30px; width:100% ; font-size:16px; bottom:0px; position:absolute; line-height:30px; text-align:center; background-color:#FFF;">' + item.cat_text + '</div></div>';
            show_list_div.append(html2);

        });

        var galleryTop = new Swiper('.gallery-top', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 10,
        });
        var galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            centeredSlides: true,
            slidesPerView: 'auto',
            autoplay: 3500,
            touchRatio: 0.2,
            slideToClickedSlide: true
        });
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;

    });
}
$(function () {
    id = $.getUrlVar("id");
    initSchemeDetail();
});