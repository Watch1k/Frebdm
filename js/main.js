// loader
$(window).on('load', function () {
    $('#loader-wrapper .loader__in').fadeOut();
    $('#loader-wrapper').fadeOut('slow');
});

$(document).ready(function(){

// // ScrollTo
// 	$(function(){
// 	    $('.nav-main').onePageNav({
// 	    	currentClass: 'is-active',
// 			filter: ':not(.external)',
// 			scrollThreshold: 0.25,
// 			scrollSpeed: 1200,
// 			easing: 'swing',
// 			scrollOffset: 38
// 		});
// 	});

// // js-inview
// 	$('.js-inview').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
// 		if (isInView) {
// 				if (visiblePartY == 'top') {
// 				// top part of element is visible
// 			} else if (visiblePartY == 'bottom') {
// 				// bottom part of element is visible
// 			} else {
// 				// whole part of element is visible
// 			}
// 		} else {
// 			// element has gone out of viewport
// 		}
// 	});

// menu toggle
	$('#menu_toggle').on('click', function(){
		$(this).toggleClass('is-active');
		$('.nav-main').slideToggle();
	});

//Equal heights of team
	$(window).on('load',function(){
		var item2Height = 0,
			item2HeightMin = $('.team__item').eq(0).find('.team__img').height();
		$('.team__img').each(function(){
			item2Height = $(this).height();
			if (item2Height < item2HeightMin) {
				item2HeightMin = item2Height;
			};
		});
		$('.team__img').css('height', item2HeightMin);
	});

// WOW animation
	$(window).on('load', function(){
		new WOW({
			offset: 100
		}).init();
	});

// slider-main
	$('.slider-main').slick({
		dots: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 7000
	});

// slider-main
	$('.slider-quotes').slick({
		dots: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 7000
	});

//Gallery fancybox
	$('.pf-fancybox').fancybox({
		theme: 'light',
		padding: 5,
		openEffect	: 'elastic',
		closeEffect	: 'drop',
		prevEffect: 'none',
		nextEffect: 'none',
		caption : {
			type : 'outside'
		},
		helpers: {
			thumbs: true
		},
		locked: false,
		locale: 'ru',
		locales: {
			'ru': {
				CLOSE: 'закрыть',
				NEXT: 'вперед',
				PREV: 'назад',
				EXPAND: 'показать в полном размере'
			}
		}
	});

// Isotope Filter (portfolio)
	function hideItem() {
		if ($('.pf-gal').length > 0) {
			$('.pf-gal__item').each(function(){
				if ($(this).index() > 7) {
					console.log("fine");
					$(this).hide();
				}
			});
		};
	};

	if ($(".pf-gal").length > 0) {
		var itemWidth = $('.pf-gal__item').width();
		$('.pf-gal__item').css('height', itemWidth);
		// Add filter classes
		$(".pf-gal__item").each(function(){
			var classFilter = $(this).find("img").attr('data-category').toString().toLowerCase();
			$(this).addClass(classFilter);
		});

		$(window).load(function(){
			$('.pf-gal').isotope({
				itemSelector: '.pf-gal__item',
				layoutMode: 'fitRows',
				transitionDuration: '0.8s',
				sortBy: 'random'
			});
			$('.pf-gal').css('height', 2 * itemWidth);
		});
	};

	var $selectValueFilter;
	if ($(".portfolio-filter").length > 0) {
		$(".portfolio-filter li").on("click", function(){
			var filterRandom = false;
			var _this = $(this);
			$('.portfolio-filter li').removeClass('is-active');
			_this.addClass('is-active')
			$selectValueFilter = _this.text().toString().toLowerCase();
			$('.pf-gal .pf-gal__item img').each(function(){
				if (($(this).attr('data-category') != $selectValueFilter) && ($selectValueFilter != "all") && (($selectValueFilter != "show"))) {
					$(this).siblings('.pf-gal__mask').children('.pf-all').attr("data-fancybox-group", "");
				} else {
					$(this).siblings('.pf-gal__mask').children('.pf-all').attr("data-fancybox-group", "gallery_1");
				};
			});
			$selectValueFilter = '.' + $selectValueFilter;
			if ($selectValueFilter == '.show') {
				filterRandom = true;
			};
			if ($selectValueFilter == '.all' || $selectValueFilter == '.show') {
				$selectValueFilter = '.pf-gal__item';
			};
			$(".pf-gal").isotope({
				filter: $selectValueFilter
			});
			if (filterRandom) {
				$('.pf-gal').isotope({
					sortBy: 'random'
				});
				$('.pf-gal').css('height', 2 * itemWidth);
			} else{
				$('.pf-gal').isotope({
					sortBy: 'original-order'
				});
			};
			filterRandom = false;
		});
	};

// form
	$.validate({
		validateOnBlur: true
	});
	$('input[name="user_number"]').mask("(999) 999-99-99");

// Ajax Form
	(function () {
		$.validate({
			onSuccess : function() {
				post_data = $('#form_contact').serialize();
				
				//Ajax post data to server
				$.post('send.php', post_data, function(response){  
				    if (response.type == 'error'){ //load json data from server and output message     
				        output = '<div class="error">'+response.text+'</div>';
				        $('#form_contact .submit-btn').text('Error');
				        setTimeout(function(){
				        	$('#form_contact .submit-btn').text('Send');
				        }, 3000);
				    }
				    else {
				        output = '<div class="success">'+response.text+'</div>';
				        //reset values in all input fields
				        $('#form_contact').find('input[type=text], textarea').val("");
				        $('#form_contact .submit-btn').text('Done');
				        setTimeout(function(){
				        	$('#form_contact .submit-btn').text('Send');
				        }, 3000);
				    }
				}, 'json');
				return false;
			}
		});
	}());

// to top
	(function() {
		$(window).scroll(function() {
			if ($(this).scrollTop() != 0) {
				$('#to_top').fadeIn();
			} else {
				$('#to_top').fadeOut();
			}
		});
		$('#to_top').on("click", function() {
			$('body,html').animate({scrollTop:0},800);
		});
	}());

// 60fps scrolling
	var body = document.body,
	timer;
	window.addEventListener('scroll', function() {
		clearTimeout(timer);
		if(!body.classList.contains('disable-hover')) {
			body.classList.add('disable-hover')
		}
		timer = setTimeout(function(){
			body.classList.remove('disable-hover')
		}, 250);
	}, false);
	
	
});

// Window Scroll
jQuery(window).scroll(function () {

    'use strict';

    if (jQuery(document).scrollTop() >= 1) {
        $('.header').addClass('fixed');
    } else {
        $('.header').removeClass('fixed');
    }

});