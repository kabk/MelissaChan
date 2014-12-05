// Menu Bar Animation jQuery Plugin 
// Created by Justin McMahon from noticeeverythingcreative.com
// Permission is given to use this plugin in whatever way you want :)
(function ($) {

	$.fn.menuBar = function (options) {

		var defaults = {

			width: 145, // Width of Sidebar
			left: false, // If true, sidebar is positioned left. If false, it's positioned right
			height: 80, // Height of footer
			barColor: '#0000ff', // Color of three-bar menu before it's opened
			menuBackground: '#e1e1e1', // Background color of sidebar and footer
			closeColor: '#ffff00' // Color of close-button
		};

		var options = $.extend(defaults, options);

		return this.each(function () {
			var i = $(this);
			var o = options;
			var barOne = $('.menu-bar-top');
			var barTwo = $('.menu-bar-bottom');
			var barThree = $('.menu-bar-mid');
			var menuTrigger = $('nav.sidebar a');
			var fadeWrapper = $('#fade-wrapper');
			var nav = $('nav.sidebar');
			var footerHidden  = $('footer.hidden');
			var bar = $('.bar');
			var obj = {}; // So we can pass a variable as a property to .animate()
			var direction = o.left ? 'left' : 'right'; // If option 'left' is false, then element is positioned right 

			bar.css('background', o.barColor);

			nav.css({
				'width': o.width,
				'background': o.menuBackground
			}).css(direction, o.width - (o.width * 2)); // left or right twice the width of the element - positions element off screen

 			$('.menu-trigger').css(direction, 0);

			footerHidden.css({
				'height': o.height,
				'bottom': o.height - (o.height * 2), 
				'background': o.menuBackground
			});

	    	i.click(function(){
	    		if (i.hasClass('open')) {

					closeMenu();
					i.removeClass('open');

					// Allow scrolling again when menu is closed
					$('body').css('overflow', '');

				} else {

					openMenu();
					i.addClass('open');

					// No scrolling while menu is open
					$('body').css('overflow', 'hidden');

				}
	    	});

	    	$('#fade-wrapper').click(function(){
				closeMenu();
				i.removeClass('open');
				$('body').css('overflow', '');
			});


	/*Opening/Closing Functions*/

			function transformMenu(top, transform) {
    			return {
        			'top': top,
        			'transform': transform,
        			'-webkit-transform': transform,
        			'-moz-transform': transform,
        			'-ms-transform': transform,
        			'-o-transform': transform              
    			};
			}

			function openMenu() {
				obj[direction] = "+=" + o.width;
				fadeWrapper.fadeIn(100);
				barOne.css(transformMenu('10px' , 'rotate(405deg)'));
				barTwo.css(transformMenu('10px', 'rotate(-405deg)'));
				nav.animate(obj, 200);
				footerHidden.animate({'bottom': '+=' + o.height}, 200);
				barThree.fadeOut(1);
				bar.not(barThree).css('background', o.closeColor);
				barThree.css('background', o.menuBackground);
			}

			function closeMenu() {
				obj[direction] = '-=' + o.width;
				fadeWrapper.fadeOut(100);
				nav.stop(true, true).animate(obj, 200);
				footerHidden.stop(true, true).animate({'bottom': '-=' + o.height}, 200);
				bar.css('background', o.barColor);
				barOne.css(transformMenu('3px' , 'rotate(360deg)'));
				barTwo.css(transformMenu('13px', 'rotate(-360deg)'));
				barThree.fadeTo(200, 1);
			}
		});
    };
})(jQuery);
