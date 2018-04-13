
var getSlideA = function () {
    api.getSlide(function (datas) {
        
        var ad_div = $("#e_run_ad");
        ad_div.html("");
        var ad_target = $("#ad_target_ol");
        ad_target.html("");
        var index = 0;
        $.each(datas, function (i, item) {
            if (item["location"] === 'site/index') {
                //var html = '<li><div class="img"><img src="' + item["img"] + '" height="400" width="1000" alt="" /></div></li>';
                //ul.append(html);
                var html1 = "";
                var html2 = "";
               
                if (index == 0) {

                    var html1 = ' <div class="item active"><img src= "' + item["img"] + '" /></div >';
                    var html2 = '<li data-target="#myCarousel" data-slide-to="' + index + '" class="active"></li>';
                } else {
                    var html1 = ' <div class="item"><img src= "' + item["img"] + '" /></div >';
                    var html2 = '<li data-target="#myCarousel" data-slide-to="' + index + '"></li>';

                }
                index++;               
                ad_div.append(html1);
                ad_target.append(html2);

            }         
        });
        $("#myCarousel").carousel('cycle');
    });
};
var getSlide = function () {
    api.getSlide(function (datas) {

        var ad_div = $("#adwrapper");
        ad_div.html("");
        var html = "";
        $.each(datas, function (i, item) {
            if (item["location"] === 'site/index') {

                html += '<div class="swiper-slide"><img src="' + item["img"] + '" /></div>';
            }

        });
        ad_div.html(html);

        var swiper = new Swiper('.swiper-container1', {
            pagination: '.swiper-pagination1',
            slidesPerView: 1,
            paginationClickable: true,
            spaceBetween: 3,
            autoplay: 5000,
            loop: true
        });
    });
};

var adlist1;
var adlist2;
var adlist3;
var adindex1=0;
var adindex2=0;
var adindex3=0;
var adTimer;

var footAd = function () {
    var imgs = $(".e2-ad").find("img");
  
    if (adlist1) {        
        $(imgs[0]).attr("src", adlist1[adindex1].content);
        adindex1++;
        if (adindex1 >= adlist1.length) {
            adindex1 = 0;
        }
    }
    if (adlist2) {
        $(imgs[1]).attr("src", adlist2[adindex2].content);
        adindex2++;
        if (adindex2 >= adlist2.length) {
            adindex2 = 0;
        }
    }
    if (adlist3) {
        $(imgs[2]).attr("src", adlist3[adindex3].content);
        adindex3++;
        if (adindex3 >= adlist3.length) {
            adindex3 = 0;
        }
    }

}

var getFootAd = function () {
    api.getFootsAd1(function (datas) {
        adlist1 = datas;       
        api.getFootsAd2(function (datas) {
            adlist2 = datas;       
            api.getFootsAd3(function (datas) {
                adlist3 = datas;
                footAd();
                adTimer = setInterval(footAd,3000)

            });
        });
    });
};




$(function () {
    getSlideA();
    getFootAd();

    $("body").on("onunload", function () {

        if (adTimer){
            clearInterval(adTimer);
        }

    })


});

