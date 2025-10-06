$(function () {
	var top = 70,
		header = $('.header-aside');

	$(window).on('load resize', function () {
		var vw = $(window).width();
		if (vw > 1250) {
			top = 50;
		} else {
			top = 70;
		}
	});

	// toggle menu
	$('#toggle-menu').click(function () {
		$(this).toggleClass('active');
		$('body').toggleClass('menu-open');
		if (!$('body').hasClass('menu-open')) {
			setTimeout(function () {
				$('.menu .j-heading').removeClass('is-open');
				$('.menu .j-content').slideUp();
			}, 500);
		}
	});

	// j-toggle
	$('.j-heading').click(function (e) {
		e.preventDefault();
		$(this).toggleClass('is-open').next('.j-content').slideToggle();
	});

	// tabs
	$('.tabs li').click(function () {
		var num = $('.tabs li').index(this);
		$('.tabs-item').hide();
		$('.tabs-item').eq(num).show();
		$('.tabs li').removeClass('is-select');
		$(this).addClass('is-select');
		$('.map').addClass('is-show');
	});

	// smooth scroll
	$('a[href*=\\#]:not([href=\\#])')
		.not('.j-modal')
		.click(function () {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html,body').animate(
						{
							scrollTop: target.offset().top - top,
						},
						1000
					);
					return false;
				}
			}
		});

	// check inview
	$(window).on('scroll', function () {
		$('.fade-up').each(function () {
			if ($(window).scrollTop() + $(window).height() > $(this).offset().top) {
				$(this).addClass('is-inview');
			}
		});
		if ($(window).scrollTop() > 50) {
			header.addClass('is-fixed');
		} else {
			header.removeClass('is-fixed');
		}
	});
	$('.header-aside .h-scroll').on('scroll', function () {
		var t = 169 - $(this).scrollTop();
		$('.submenu').each(function (index) {
			if (index == 0) {
				$(this).css('top', t + 10 + index * 70);
			} else {
				$(this).css('top', t + index * 70);
			}
		});
	});
	$(window).on('resize', function () {
		var vh = $(window).width();
		if (vh > 700) {
			$('.submenu').removeAttr('style');
		}
	});

	// js for modal
	$(document).on('click', '.j-modal', function () {
		var modal = '#' + $(this).data('modalid');
		var video = $(modal).find('video').get(0);
		$('.modal_main').append('<div class="modal_bg"></div>');
		$('.modal_bg').fadeIn();
		$(modal).fadeIn();
		$('body').addClass('modal-open');
		if (video) {
			video.play();
		}
	});
	$(document).on('click', '.modal_bg, .modal_close', function () {
		var video = $(this).closest('.modal_body').find('video').get(0);
		var player = $(this).closest('.modal_body').find('iframe');
		$('.modal_body').fadeOut();
		$('.modal_bg').fadeOut('slow', function () {
			$('.modal_bg').remove();
			$('body').removeClass('modal-open');
		});
		// stop video
		if (video) {
			video.pause();
		}
		// stop video with iframe
		if (player) {
			player.attr('src', player.attr('src'));
		}
	});
});

$(document).ready(function () {
	'use strict';
	// -------------totop---------------
	$('#totop').hide();
	$('#totop a').click(function () {
		$('body,html').animate(
			{
				scrollTop: 0,
			},
			800
		);
	});
	$(window).scroll(function () {
		if ($(this).scrollTop() > 500) {
			$('#totop').fadeIn();
		} else {
			$('#totop').fadeOut();
		}
	});

	// -------------tab---------------
	var oldClass = 'day0';
	$('.tabs_item').each(function (index, tab) {
		const tabActive = document.querySelector('.tabs_item.active');
		const line = document.querySelector('.tabs .line');
		line.style.left = tabActive.offsetLeft + 'px';
		line.style.width = tabActive.offsetWidth + 'px';
		tab.onclick = function () {
			line.style.left = this.offsetLeft + 'px';
			line.style.width = this.offsetWidth + 'px';
			$('.tabs_item.active').removeClass('active');
			$('.tabs_pane.active').removeClass('active');
			this.classList.add('active');
			const pane = $('.tabs_pane')[index];
			pane.classList.add('active');
			$('.tabs .line').removeClass(oldClass);
			line.classList.add('day' + index);
			oldClass = 'day' + index;
		};
	});
});
