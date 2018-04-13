$(document).ready(function(e) {
    $("a.mca").click(function(){
		$(".mch").slideUp(200);
		$(this).parents(".mcb").children(".mch").stop().slideDown(200);
		});
    $("a.xsg").click(function(){
		var t = $(".ssnr").scrollTop();
		$('.ssnr').animate({'scrollTop':t-200},100)
		});
	$("a.xxg").click(function(){
		var t = $(".ssnr").scrollTop();
		$('.ssnr').animate({'scrollTop':t+200},100)
		});
	$("a.xsg2").click(function(){
		var t = $(".zcxynr").scrollTop();
		$('.zcxynr').stop().animate({'scrollTop':t-200},400)
		});
	$("a.xxg2").click(function(){
		var t = $(".zcxynr").scrollTop();
		$('.zcxynr').stop().animate({'scrollTop':t+200},400)
		});
	
	$("a.pia-sy").click(function(){
		var t = $(".spl2l").scrollTop();
		$('.spl2l').animate({'scrollTop':t-200},100)
		});
	$("a.pia-xy").click(function(){
		var t = $(".spl2l").scrollTop();
		$('.spl2l').animate({'scrollTop':t+200},100)
		});
	$("a.sxsg").click(function(){
		var t = $(".sbspsl").scrollTop();
		$('.sbspsl').animate({'scrollTop':t-100},100)
		});
	$("a.sxxg").click(function(){
		var t = $(".sbspsl").scrollTop();
		$('.sbspsl').animate({'scrollTop':t+100},100)
		});
		
	$("a.jiayi").click(function(){
		var oldValue=$(".guigeinput").val();
		oldValue++;
		 $(".guigeinput").val(oldValue);
		});
	$("a.jianyi").click(function(){
		var oldValue=$(".guigeinput").val();
		if(oldValue>1){
		oldValue--;
		 $(".guigeinput").val(oldValue);}
		 else
		 {}
		});
		
	$("a.pia-xq").click(function(){
		$('.lightbox').fadeIn(777);
		$('.nairong').show();
		$(".nrzp").delay(400).slideDown();
		$(".ssnr").delay(700).slideDown();
		});
	$("a.pia-qx").click(function(){
		$('.lightbox').delay(200).fadeOut(777);
		$('.guige').slideUp();
		});
	$("a.fhla").click(function(){
		$(".nrzp").slideUp();
		$(".ssnr").slideUp();
		$('.nairong').delay(700).fadeOut(200);
		$('.lightbox').delay(700).fadeOut(777);
		});
	$("a.fhla2").click(function(){
		$('.lightbox2').fadeOut(777);
		});
	
	$("a.pia-gm").click(function(){
		$('.lightbox').fadeIn(777);
		$('.guige').delay(700).slideDown();
		});
	
	$("a.pia-qr").click(function(){
		$('.lightbox').fadeIn(777);
		$('.nairong').hide();
		$('.guige').hide();
		$('.qrs').delay(700).slideDown();
		});
	$("a.pia-qrx").click(function(){
		$('.qrs').delay(700).fadeOut(200);
		$('.lightbox').delay(700).fadeOut(777);
		});
	
	$(".ggtable a").click(function(){
		$(this).siblings().removeClass("active");
		$(this).addClass("active")
		});
		
	$(".cartasel").click(function(){
		$(this).siblings().removeClass("cartactive");
		$(this).addClass("cartactive");
		});
	$(".cartbsel").click(function(){
		$(this).siblings().children("dl").removeClass("cartbctive");
		$(this).children("dl").addClass("cartbctive");
		});
		
	$("a.pia-xieyi").click(function(){
		$('.lightbox2').fadeIn(777);
		});
		
	$(".absf").click(function(){
		$(".ncxz").fadeOut();
		$(".zssf").fadeIn();
		})
	$(".abcs").click(function(){
		$(".ncxz").fadeOut();
		$(".zscs").fadeIn();
		})
	$(".abdq").click(function(){
		$(".ncxz").fadeOut();
		$(".zsdq").fadeIn();
		})
	$(".ncxz a").click(function(){
		$(".ncxz").fadeOut();
		})
	$(".zssf a").click(function(){
		$(".absf").text($(this).text())
		})
	$(".zscs a").click(function(){
		$(".abcs").text($(this).text())
		})
	$(".zsdq a").click(function(){
		$(".abdq").text($(this).text())
		})
	$("a.c2adda").click(function(){
		$('.darkbox').fadeIn(777);
		});
	$("a.pia-fzs").click(function(){
		$('.darkbox').fadeOut(777);
		});
});
