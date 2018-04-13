var id;


var getDetail = function () {


    api.getSchemeDetail(id, function (datas) {
        $("#home_a").html(datas.house_name);
        $("#home_a").attr("src", "c11.html?id=" + datas.house_id);
        $("#s_name").text(datas.scheme_name);
        $("#s_div").text(datas.scheme_name);
        $("#logo_img").attr("src", datas.img);
        $("#style_div").html('<span>' + datas.house_name + '</span> <span>' + datas.carpet_area + '平米</span> <span>' + datas.style_name + '</span>');
        $("#cost_span").text(datas.cost);
        $("#detail_a").html("施工方：" + datas.true_name);
        $("#detail_a").attr("href", "c2.html?id=" + datas.seller_id);
        $("#qr_img").attr("src", datas.qr_url)

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
            autoplay:3500,
            spaceBetween: 10,
        });
        var galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            centeredSlides: true,
            slidesPerView: 'auto',
            touchRatio: 0.2,
            slideToClickedSlide: true
        });
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;

    });


}

$(function () {
    id = $.getUrlVar("id");
    getDetail();

});