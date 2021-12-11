$(document).ready(function () {
  maskPhone('.info-form__phone');
  maskPhone('.hero-form__phone');
  maskPhone('.order-popup-form__phone');
  
  $('.hero-slider').slick({
      draggable: false,
      arrows:true,
      dots: true,
      adaptiveHeight: true,
      prevArrow:'.hero-slider__prev',
      nextArrow:'.hero-slider__next',
      dotsClass: 'hero-slider__pagination',
      customPaging : function(slider, i) {
         return '<div class="hero-slider__pagin"></div>'
     },
   });

   try {
      $('.hero-form__select').msDropDown()
  } catch (e) {
      console.log(e.message)
  }
 
  $('[data-fancybox=gallery]').fancybox()


  const isExistForm = document.querySelector('form');

	if (isExistForm) {

		const heroSuccessPopup = document.querySelector('.hero__popup--success');
		const heroErrorPopup = document.querySelector('.hero__popup--error');
		
		const infoSuccessPopup = document.querySelector('.info__popup--success');
		const infoErrorPopup = document.querySelector('.info__popup--error');

		const orderSuccessPopup = document.querySelector('.order__popup--success');
		const orderErrorPopup = document.querySelector('.order__popup--error');

		const showSuccess = (form) => {

			if (form === 'hero') {
				heroSuccessPopup.classList.add('active');

				setTimeout(() => {
					heroSuccessPopup.classList.remove('active');
				}, 3000);
			}

			if (form === 'info') {
				infoSuccessPopup.classList.add('active');

				setTimeout(() => {
					infoSuccessPopup.classList.remove('active');
				}, 3000);
			}

			if (form === 'order') {
				orderSuccessPopup.classList.add('active');

				setTimeout(() => {
					orderSuccessPopup.classList.remove('active');
					if ($('.order-popup__overlay').hasClass('active')) {
						$('.order-popup__overlay').removeClass('active');
					}
				}, 3000);
			}

		}

		const showError = (form) => {

			if (form === 'hero') {
				heroErrorPopup.classList.add('active');

				setTimeout(() => {
					heroErrorPopup.classList.remove('active');
				}, 3000);
			}

			if (form === 'info') {
				infoErrorPopup.classList.add('active');

				setTimeout(() => {
					infoErrorPopup.classList.remove('active');
				}, 3000);
			}

			if (form === 'order') {
				orderErrorPopup.classList.add('active');

				setTimeout(() => {
					orderErrorPopup.classList.remove('active');
				}, 3000);
			}

		}
	

		new JustValidate('.js-form', {
			rules: {
			  checkbox: {
				required: true
			  },
			  email: {
				required: false,
			  },
			  name: {
				required: false,
			  },
			  phone:{
				required: true,
				minLength: 17,
			  },
			  text:{
				required: false,
  
			  },
			  select: {
				required: false
			  }
			},

			submitHandler: function (form, values, ajax) {
				values.action = 'hero_form';

				ajax({
				  url: adminAjax.url,
				  method: 'POST',
				  data: values,
				  async: true,
				  callback: function(response){					

					if (response === 'ok') {
						showSuccess('hero');
						form.reset();
					} else {
						showError('hero');
					}
				  }
				});
			  },
		})

	if (document.querySelector('.js-form-info')) {
	  new JustValidate('.js-form-info', {
		  rules: {
			checkbox: {
				required: true
			},
			email: {
				required: false
			},
			name: {
				required: false
			},
			phone:{
				required: true,
				minLength: 17,
			},
			text:{
				required: false

			},
			select: {
				required: false
			},  
		  },

			submitHandler: function (form, values, ajax) {

				values.action = 'info_form';

				ajax({
				  url: adminAjax.url,
				  method: 'POST',
				  data: values,
				  async: true,
				  callback: function(response){

					if (response === 'ok') {
						showSuccess('info');
						form.reset();
					} else {
						showError('info');
					}
				  }
				});
			  },
		})
	}

	if (document.querySelector('.js-form-order-popup')) {
		new JustValidate('.js-form-order-popup', {
			rules: {
			  checkbox: {
				required: true
			  },
			  email: {
				required: false
			  },
			  name: {
				required: false
			  },
			  phone:{
				required: true,
				minLength: 17,
			  },
			  text:{
				required: false,
	
			  }
			},

			submitHandler: function (form, values, ajax) {

				values.item = document.item;
				values.action = 'order_form';

				ajax({
				  url: adminAjax.url,
				  method: 'POST',
				  data: values,
				  async: true,
				  callback: function(response){

					if (response === 'ok') {
						showSuccess('order');
						form.reset();
					} else {
						showError('other');
					}
				  }
				});
			  },
		})
	}
}
  
if ($('.video__wrapper').length) {
  var $msnry;
  const videoWrapper = document.querySelector('.video__wrapper');
  const videoContainer = document.querySelectorAll('.video-container');

  const createMasonry = () => {
    videoContainer.forEach(item => item.style.cssText = 'position: absolute;');

    $msnry = $('.video__wrapper').masonry({
      itemSelector: '.video-container',
      columnWidth: 1,
      percentPosition: true
    });

    videoWrapper.classList.add('masonry--active');
    
  }

  const createSlider = () => {
    sliderWrap = $('.video__wrapper').slick({
      draggable: false,
      arrows:true,
      dots: true,
      infinite: false,
      adaptiveHeight: true,
      prevArrow:'.video-slider__prev',
      nextArrow:'.video-slider__next',
      dotsClass: 'video-slider__pagination',
      customPaging : function(slider, i) {
        videoSlider = slider;
        return `<span class="video-slider__dot">${(i + 1)}</span>/${slider.slideCount}`;
      }
    });

    $('.video__wrapper').addClass('slider--active');

    const videoDot = $('.video-slider__dot').eq(0)

    $('.video__wrapper').on('afterChange', function() {
      $(videoDot).text(videoSlider.currentSlide + 1);
    });
  }

   const sliderAdaptive = (media) => {

    if (media.matches) {
      createSlider();
      if ($('.price__head-price').length) {
        $('.price__head-price').each(function(idx, item) {
          $(item).text('Стоимость')
        });
      }

   } else {
     if (document.querySelector('.video__wrapper').classList.contains('slider--active')) {
       $('.video__wrapper').slick('unslick');
       $('.video__wrapper').removeClass('slider--active');
        if ($('.price__head-price').length) {
          $('.price__head-price').each(function(idx, item) {
            $(item).text('Стоимость (за точку)')
          });
        }
     }
   }

     if (!media.matches && !videoWrapper.classList.contains('masonry--active')) {
        createMasonry();

     } else if (media.matches && videoWrapper.classList.contains('masonry--active')) {
        $msnry.masonry('destroy');
        videoWrapper.classList.remove('masonry--active');
     }

   }
   const videos = $('.video__item-video iframe')
   const videoImg = $('.video__item-img')
   const videoInfo = $('.video__item-wrap')
   const videoBtn = $('.video__button')
 
   $(videoBtn).each(function(idx, item) {
     $(item).on('click', () => {
       const src = $(videos).eq(idx).attr('src')
       $(videoBtn).eq(idx).css('display', 'none')
       $(videoInfo).eq(idx).css('display', 'none')
       $(videoImg).eq(idx).css('display', 'none')
     })
   })
   //
   videoWrapper.addEventListener('click', event => {
    let target = event.target;

    target = target.closest('.video-container');

    if (target) {
      const videoBtn = target.querySelector('.video__button');
      target = target.querySelector('.video__item-video');
      if (videoBtn) {
        videoStart(target);
      }
    }
  });
  //
  function videoStart(target) {

    var youtube = document.querySelectorAll( ".video__item-video" );

    var iframe = document.createElement( "iframe" );

        iframe.setAttribute( "frameborder", "0" );
        iframe.setAttribute( "allowfullscreen", "" );
        iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ target.dataset.embed +"?rel=0&showinfo=0&autoplay=1" );

        target.innerHTML = "";
        target.appendChild( iframe );
  
  }
  //
   const checkWidth = () => {
    const media = window.matchMedia("(max-width: 767px)");

    sliderAdaptive(media);

    media.addEventListener('change', sliderAdaptive);
  };

  checkWidth();
}
$('.info-form__btn').on('click', function(){
  if(!$('.info-form__checkbox').prop('checked')){
    $('.info-form__label').addClass('error')
  } else {
    $('.info-form__label').removeClass('error')
  }
})
$('.order-popup-form__btn').on('click', function(){
  if(!$('.order-popup-form__checkbox').prop('checked')){
    $('.order-popup-form__label').addClass('error')
  } else {
    $('.order-popup-form__label').removeClass('error')
  }
})
//
$('.hero-form__btn').on('click', function(){
if(!$('.hero-form__checkbox').prop('checked')){
  $('.hero-form__label').addClass('error')
} else {
  $('.hero-form__label').removeClass('error')
}
})
//
$('.info-form__checkbox').on('change', function(){
if($('.info-form__checkbox').prop('checked')){
  $('.info-form__label').removeClass('error').addClass('complete')
} else {
  $('.info-form__label').addClass('error').removeClass('complete')
}})

$('.order-popup-form__checkbox').on('change', function(){
if($('.order-popup-form__checkbox').prop('checked')){
  $('.order-popup-form__label').removeClass('error').addClass('complete')
} else {
  $('.order-popup-form__label').addClass('error').removeClass('complete')
}})
//
$('.hero-form__checkbox').on('change', function(){
  if($('.hero-form__checkbox').prop('checked')){
    $('.hero-form__label').removeClass('error').addClass('complete')
  } else {
    $('.hero-form__label').addClass('error').removeClass('complete')
  }
})
//
$('input').on('input', function () {
  if($(this).hasClass('js-validate-error-field')){
    $(this).addClass('iscomplete')
  } else {
    $(this).removeClass('iscomplete')
  }
});
$('textarea').on('input', function () {
  if($(this).hasClass('js-validate-error-field')){
    $(this).addClass('iscomplete')
  } else {
    $(this).removeClass('iscomplete')
  }
});

const orderPopup = $('.order-popup__overlay');
const otherSection = document.querySelector('.other__inner');

if (otherSection) {
  otherSection.addEventListener('click', e => {

    let target = e.target;
    target = target.closest('.other__item-btn');

    if (target) {
      const hash = target.getAttribute('href');

      if (hash === '#') {
        e.preventDefault();

        document.item = target.dataset.item;

        if (!orderPopup.hasClass('active')) {
          orderPopup.addClass('active');
        }
      }
    }
  });
}

$(orderPopup).on('click', function(event) {

  const target = event.target;

  if (orderPopup.hasClass('active') && $('.order-popup__overlay').is(target) || target.closest('.order-popup__close')) {
    orderPopup.removeClass('active');
  }
})

$('ul>li>a[href*="#"]').on('click', function (e) {
  e.preventDefault();

  if ($('.header-mobile-overlay').hasClass('active')) {
    $('.sh-burger').removeClass('sh-burger--active');
    $('.header-nav').removeClass('header-nav--active');
    $('.header-wrapper').removeClass('header-wrapper--active');
    $('body').removeClass('compensate-for-scrollbar');
    $('.header-mobile-overlay').removeClass('active');
  }

  $('html, body').animate(
    {
      scrollTop: $($(this).attr('href')).offset().top - 70,
    },
    500,
    'linear'
  )
})
});

