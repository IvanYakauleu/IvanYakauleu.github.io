$(document).ready(function(){
	$('.carousel__slider').slick({
		speed: 1200,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
		responsive: [
			{
			  breakpoint: 992,
			  settings: {
				autoplay: true,
				dots: true,
				autoplaySpeed: 2000,
				arrows: false
			  }
			},
		  ]
	});
	$('ul.cataloge__tabs').on('click', 'li:not(.cataloge__tab_active)', function() {
		$(this)
		  .addClass('cataloge__tab_active').siblings().removeClass('cataloge__tab_active')
		  .closest('div.container').find('div.cataloge__items').removeClass('cataloge__items_active').eq($(this).index()).addClass('cataloge__items_active');
	  });

	function toggleClass(item) {
		$(item).each(function(i){
			$(this).on('click', function(e){
				e.preventDefault();
				$('.cataloge__content').eq(i).toggleClass('cataloge__content_active');
				$('.cataloge__list').eq(i).toggleClass('cataloge__list_active');
			})
		});
	};
	toggleClass('.cataloge__link-back');
	toggleClass('.cataloge__link');

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn();
	});

	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #order, #thanks').fadeOut();
	});

	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.cataloge__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn();
		})
	});
	function validateForm(Form) {
		$(Form).validate({
			rules: {
			  name: "required",
			  phone: "required",
			  email: {
				required: true,
				email: true
			  }
			},
			messages: {
			  name: "Пожалуйста введите ваше имя",
			  phone: "Пожалуйста введите ваш номер телефона",
			  email: {
				required: "Нам нужен электронный адресс, чтобы связать с вами",
				email: "Ваш электронный адресс должен быть в формате name@domain.com"
			  }
			}
		  });
	};

	validateForm('#consultation-main');
	validateForm('#consultation-second');
	validateForm('#order-form');

	$('form').submit(function(e) {
		e.preventDefault();

		if (!$(this).valid()) {
			return;
		}
		
		$.ajax({
			type: 'POST',
			url: 'mailer/smart.php',
			data: $(this).serialize()
		}).done(function() {
			$(this).find('input').val('');
			$('#consultation-second, #order-form').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');
	
			$('form').trigger('reset');
		});
		return false;
	});
	
  });
