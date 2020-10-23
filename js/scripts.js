$(function(){
	// Ленивая загрузка
	observer = lozad('.lozad:not(loaded)', {
		rootMargin: '400px 600px',
		threshold: 0,
		loaded: function(el) {
			el.classList.add('loaded')
		}
	})

	observer.observe()


	// Проверка браузера
	if ( !supportsCssVars() ) {
		$('body').addClass('lock')
		$('.supports_error').addClass('show')
	}


	// Плавный скролл
	$('body').on('click', '.scroll-next', function(e) {
		e.preventDefault()

		var heightHead = $('.layout-header-holder').height()

		$('body, html').stop(false, false).animate({
			scrollTop: $('#section-info').offset().top - heightHead
		}, 1000)
	})


	// Запустить видео
	$('body').on('click', '.video-section__play', function(e) {
    	e.preventDefault()

    	$(this).fadeOut()

    	var video = $(this).data('video')

    	$(this).next().attr("src", video+'?autoplay=1;rel=0;enablejsapi=1&amp')
    })


    // Информация
	infoSlider = $('.info-slider').owlCarousel({
		items: 1,
		margin: 20,
		nav: true,
		dots: true,
		loop: true,
		smartSpeed: 750,
		autoplay: true,
		autoplayTimeout: 5000,
		onInitialized: function(event){
			$(event.target).trigger('stop.owl.autoplay')

			if( $(window).width() < 768 ){
				$(event.target).find('.owl-nav .owl-next, .owl-nav .owl-prev').css(
					'top', ( ($(event.target).find('.info-slider__boxImg').innerHeight()/2) + 'px')
				)
			}
		},
		onResized: function(event){
			if( $(window).width() < 768 ){
				$(event.target).find('.owl-nav .owl-next, .owl-nav .owl-prev').css(
					'top', ( ($(event.target).find('.info-slider__boxImg').innerHeight()/2) + 'px')
				)
			}
		},
		onTranslate: function(event) {
			$(event.target).trigger('stop.owl.autoplay')

			$(event.target).find('.owl-dot').find('svg').remove()

			observer.observe()
		},
	    onTranslated: function(event) {
	    	$(event.target).find('.owl-dot.active').append('<svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19" cy="18.9998" r="18.5" stroke="#494949"/></svg>')

			$(event.target).trigger('play.owl.autoplay',[5000])
	    }
	})



	// Движение стрелки за курсором
	if( $(window).width() > 1024 ){
	    $('body').on('mousemove', '.moment-grid__item', function(e) {
			var pos = $(this).offset()
			var pageX = event.pageX
			var pageY = event.pageY
			var x = pageX - pos.left + 10
			var y = pageY - pos.top + 10

			$(this).find('.moment-arrow').css({
				'left' : x + 'px',
				'top' : y + 'px'
			})
	    })
	}


    // Поделись моментами
    $('body').on('click', '.moment-social__open', function(e) {
    	e.preventDefault()

		$(this).next().addClass('show')
    })


    $('body').on('click', '.moment-social__close', function(e) {
    	e.preventDefault()

		$(this).parent().removeClass('show')
    })
})


$(window).on("load", function (e) {
	inView.offset(150)

	inView('.info-slider').on('enter', function(el){
		if ( !$('.info-slider').hasClass('view') ) {
			$('.info-slider').addClass('view')

			$('.info-slider').find('.owl-dot.active').append('<svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19" cy="18.9998" r="18.5" stroke="#494949"/></svg>')

			infoSlider.trigger('play.owl.autoplay',[5000])
		}
	})

	$('.first-arrow').addClass('anim')
	$('.first-titleMob').addClass('anim')

	if( $(window).width() > 1024 ){
		$('.moment-info_pc .moment-info__block').height('auto')

		setHeight( $('.moment-info_pc').find('.moment-info__block') )

		var offsetAnimFirst = $('.layout-header-holder').height() * -1

		var offsetAnim = ($('.layout-header-holder').height() + 20) * -1

		//init
		var controller = new ScrollMagic.Controller()

		$('.first-title i').each(function(e) {
            TweenMax.set($(this), {
                opacity: 0,
                x: -3
            })
        })

		var titleAnimation = new TimelineLite()
		.to('#first-section .first-logoAnim', 1, {opacity: 0})
		.to('#first-section .first-logoAnim', .5, {width: 0, height: 0})
		.to('#first-section .first-arrow', .5, {width: 140, height: 140})
		.to('#first-section .first-arrow', .5, {width: '100%', height: '100%'})
		.to('#first-section .first-title', .5, {opacity: 1})
		.staggerTo('.first-title i', 1, { ease: Power4.easeOut, opacity: 1, x: 0}, 0.03)

		new ScrollMagic.Scene({
			triggerElement: "#first-section",
			duration: '150%',
			triggerHook: "onLeave"
		})
		.setPin('#first-section')
		.offset(offsetAnimFirst)
		.setTween(titleAnimation)
		.addTo(controller)


		new ScrollMagic.Scene({
			triggerElement: '#moments',
			duration: '100%',
			triggerHook: 'onLeave',

		})
		.on('progress', function (e) {
			if (!e.progress == 0) {
				$('.moment-info_pc').addClass('fixed')
			} else {
				$('.moment-info_pc').removeClass('fixed')
			}
		})
		.offset(offsetAnim)
		.addTo(controller)


		new ScrollMagic.Scene({
			triggerElement: '#last-section',
			triggerHook: 'onEnter',
			offset: '-20'
		})
		.setClassToggle('.moment-info_pc', 'bot')
		.addTo(controller)


		new ScrollMagic.Scene({
			triggerElement: '#moment1',
			duration: '100%',
			triggerHook: 'onLeave'
		})
		.offset(offsetAnim)
		.on('progress', function (e) {
			if (e.progress == 0) {
				$('.moment-info_pc .moment-info__block:eq(0)').removeClass('show')
			} else {
				$('.moment-info_pc .moment-info__block:eq(0)').addClass('show')
			}
		})
		.addTo(controller)


		new ScrollMagic.Scene({
			triggerElement: '#moment2',
			duration: '130%'
		})
		.on('progress', function (e) {
			if (e.progress == 0) {
				$('.moment-info_pc .moment-info__block:eq(0)').removeClass('hide')

				$('.moment-info_pc .moment-info__block:eq(1)').removeClass('show')
			} else {
				$('.moment-info_pc .moment-info__block:eq(0)').addClass('hide')

				$('.moment-info_pc .moment-info__block:eq(1)').addClass('show')
			}
		})
		.addTo(controller)

		new ScrollMagic.Scene({
			triggerElement: '#moment3',
			duration: '130%'
		})
		.on('progress', function (e) {
			if (e.progress == 0) {
				$('.moment-info_pc .moment-info__block:eq(1)').removeClass('hide')

				$('.moment-info_pc .moment-info__block:eq(2)').removeClass('show')
			} else {
				$('.moment-info_pc .moment-info__block:eq(1)').addClass('hide')

				$('.moment-info_pc .moment-info__block:eq(2)').addClass('show')
			}
		})
		.addTo(controller)

		new ScrollMagic.Scene({
			triggerElement: '#moment4',
			duration: '130%'
		})
		.on('progress', function (e) {
			if (e.progress == 0) {
				$('.moment-info_pc .moment-info__block:eq(2)').removeClass('hide')

				$('.moment-info_pc .moment-info__block:eq(3)').removeClass('show')
			} else {
				$('.moment-info_pc .moment-info__block:eq(2)').addClass('hide')

				$('.moment-info_pc .moment-info__block:eq(3)').addClass('show')
			}
		})
		.addTo(controller)


		new ScrollMagic.Scene({
			triggerElement: '#moment5',
			duration: '130%'
		})
		.on('progress', function (e) {
			if (e.progress == 0) {
				$('.moment-info_pc .moment-info__block:eq(3)').removeClass('hide')

				$('.moment-info_pc .moment-info__block:eq(4)').removeClass('show')
			} else {
				$('.moment-info_pc .moment-info__block:eq(3)').addClass('hide')

				$('.moment-info_pc .moment-info__block:eq(4)').addClass('show')
			}
		})
		.addTo(controller)
	}
})

$(window).on("resize", function (e) {
	if( $(window).width() > 1024 ){
		$('.moment-info_pc .moment-info__block').height('auto')

		setHeight( $('.moment-info_pc').find('.moment-info__block') )
	}
})


// Вспомогательные функции
var supportsCssVars = function() {
    var s = document.createElement('style'),
	support

    s.innerHTML = ":root { --tmp-var: bold; }"
    document.head.appendChild(s)
    support = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'))
    s.parentNode.removeChild(s)

    return support
}

function setHeight(className){
    var maxheight = 0
    var object = $(className)

    object.each(function() {
    	var elHeight = $(this).innerHeight()

        if( elHeight > maxheight ) {
        	maxheight = elHeight
        }
    })

    object.parent().innerHeight( maxheight )
}