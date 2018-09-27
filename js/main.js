$(document).ready(function() {
	// Header Scroll

	var _vue = new Vue({
		delimiters: ['[[', ']]'],
		el:'#contact',
		data:{
			form:{
				'name': '',
				'email': '',
				'description': '',
				'message':''
			}
		},
		methods:{
			form_init : function(){
				this.form.name =''
				this.form.email =''
				this.form.description =''
				$('.form-check-input').prop('checked', false);
			},
			send_email : function(){
				if(this.form.name == '' || this.form.email == '' || this.form.description == ''){
					this.form.message = '*No pueden haber campos vacíos*'
					return
				}else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.form.email)){
					this.form.message = '*El campo de correo no tiene un formato correcto*'
					return
				}
				this.form.message = 'Enviando correo...'
				axios.post('http://localhost:8100/users/send_email/',this.form)
				// axios.post('http://www.manos.pe/users/send_email',this.form)
				// axios.post('http://localhost:8000/users/send_email',this.form)
				.then((response) => {
					this.form.message = 'Tú correo ha sido recibido, te responderemos en breve.'
					this.form_init()
				})
				.catch((e) => {
					this.form.message = 'Correo no enviado, inténtelo más tarde por favor.'
				})
			}
		}
	})

	var _vue = new Vue({
		delimiters: ['[[', ']]'],
		el:'#applyModal',
		data:{
			form:{
				'name':'Anthony Del Pozo',
				'email': 'delan1997@gmail.com',
			}
		},
		methods:{
			apply : function(){
				axios.post('http://localhost:8100/users/apply_worker/',this.form)
			},
		}
	})


	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();
		if (scroll >= 50) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}

		// if (scroll >= 450){
		// 	$('.custom-icon').removeClass('small').addClass('large')
		// }else{
		// 	$('.custom-icon').removeClass('large').addClass('small')
		// }

		// if (scroll >= 1000){
		// 	$('.card-left').addClass('center-left')
		// 	$('.card-right').addClass('center-right')
		// }else{
		// 	$('.card-left').removeClass('center-left')
		// 	$('.card-right').removeClass('center-right')
		// }

		// if (scroll >= 1750){
		// 	$('.custom-icon-2').addClass('medium')
		// }else{
		// 	$('.custom-icon-2').removeClass('medium')
		// }

	});

	// Fancybox
	$('.work-box').fancybox();

	// Flexslider
	$('.flexslider').flexslider({
		animation: "slide",
		directionNav: false,
		slideshowSpeed:8000,
	});
	// Page Scroll
	var sections = $('section')
		nav = $('nav[role="navigation"],div[class="banner-text text-center"],#packages .card-body');
	$(window).on('scroll', function () {
	  	var cur_pos = $(this).scrollTop();
	  	sections.each(function() {
	    	var top = $(this).offset().top - 82
	        	bottom = top + $(this).outerHeight();
	    	if (cur_pos >= top && cur_pos <= bottom) {
	      		nav.find('a').removeClass('active');
	      		nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
	    	}
	  	});
	});
	nav.find('a').on('click', function () {
	  	var $el = $(this)
	    	id = $el.attr('href');
		$('html, body').animate({
			scrollTop: $(id).offset().top - 80
		},800);
	  return false;
	});

	// Mobile Navigation
	$('.nav-toggle').on('click', function() {
		$(this).toggleClass('close-nav');
		nav.toggleClass('open');
		return false;
	});
	$('.primary-nav li a').on('click', function() {
		$(this).toggleClass('close-nav');
		nav.toggleClass('open');
		return false;
	});
});
