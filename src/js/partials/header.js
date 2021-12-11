
$(document).ready(function () {
	$('.sh-burger').click(function () {
		$(this).toggleClass('sh-burger--active');
		$('.header-nav').toggleClass('header-nav--active');
		$('.header-wrapper').toggleClass('header-wrapper--active');
		$('body').toggleClass('compensate-for-scrollbar');
		$('.header-mobile-overlay').toggleClass('active');
	});

	$('.header-mobile-overlay').on('click', function() {
		if ($('.header-mobile-overlay').hasClass('active')) {
			$('.sh-burger').removeClass('sh-burger--active');
			$('.header-nav').removeClass('header-nav--active');
			$('.header-wrapper').removeClass('header-wrapper--active');
			$('body').removeClass('compensate-for-scrollbar');
			$('.header-mobile-overlay').removeClass('active');
		}
	})
});