// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
const BODY = document.body,
	OVERLAY = document.querySelector('.overlay')


document.addEventListener('DOMContentLoaded', function () {
	// Основной слайдер на главной

	/*добавить класс для элемента*/
	$("header .mob_menu .links .menu-item-18 a").addClass("catalog_link").attr("data-sub", "sub2").append('<svg class="icon"><use xlink:href="https://demo2.sokomebel.ru/wp-content/themes/raten/images/sprite.svg#ic_arr_hor"></use></svg>');


	let mainSlider = document.querySelector('.main_slider .swiper')

	if (mainSlider) {
		new Swiper('.main_slider .swiper', {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			}
		})
	}


	// Карусель товаров
	const productsSliders = [],
		products = document.querySelectorAll('.products .swiper')

	products.forEach(function (el, i) {
		el.classList.add('products_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			breakpoints: {
				0: {
					spaceBetween: 12,
					slidesPerView: 'auto'
				},
				480: {
					spaceBetween: 20,
					slidesPerView: 2
				},
				768: {
					spaceBetween: 30,
					slidesPerView: 3
				},
				1280: {
					spaceBetween: 30,
					slidesPerView: 4
				}
			},
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.product')),
				resize: swiper => {
					let products = swiper.el.querySelectorAll('.product')

					products.forEach(el => el.style.height = 'auto')

					setHeight(products)
				}
			}
		}

		productsSliders.push(new Swiper('.products_s' + i, options))
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.Image = { zoom: false }
	Fancybox.defaults.Thumbs = { autoStart: false }
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	}

	Fancybox.defaults.template = {
		closeButton: '<svg><use xlink:href="https://demo2.sokomebel.ru/wp-content/themes/raten/images/sprite.svg#ic_close"></use></svg>',
		spinner: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="25 25 50 50" tabindex="-1"><circle cx="50" cy="50" r="20"/></svg>',
		main: null
	}


	// Всплывающие окна
	const modalBtns = document.querySelectorAll('.modal_btn')

	if (modalBtns) {
		modalBtns.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				//console.log(el.getAttribute('data-modal'));
				Fancybox.close()

				Fancybox.show([{
					src: document.getElementById(el.getAttribute('data-modal')),
					type: 'inline'
				}])
			})
		})
	}


	// Моб. меню
	const mobMenuBtn = document.querySelector('.mob_header .mob_menu_btn'),
		mobMenu = document.querySelector('header'),
		mobMenuCloseBtn = document.querySelector('header .mob_close_btn')

	if (mobMenuBtn && OVERLAY) {
		mobMenuBtn.addEventListener('click', e => {
			e.preventDefault()

			mobMenuBtn.classList.toggle('active')
			BODY.classList.toggle('menu_open')
			mobMenu.classList.toggle('show')
			fadeIn(OVERLAY)
		})
	}

	if (mobMenuCloseBtn && OVERLAY) {
		mobMenuCloseBtn.addEventListener('click', e => {
			e.preventDefault()

			mobMenuBtn.classList.toggle('active')
			BODY.classList.toggle('menu_open')
			mobMenu.classList.toggle('show')
			fadeOut(OVERLAY)
		})
	}

	if (OVERLAY) {
		OVERLAY.addEventListener('click', e => {
			e.preventDefault()

			mobMenuBtn.classList.toggle('active')
			BODY.classList.toggle('menu_open')
			mobMenu.classList.toggle('show')
			fadeOut(OVERLAY)
		})
	}


	// Моб. каталог
	const mobCatalogLinks = document.querySelectorAll('.mob_menu .catalog_link'),
		mobCatalogBackBtns = document.querySelectorAll('.mob_menu .back .btn')

	if (mobCatalogLinks) {
		mobCatalogLinks.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				let sub = el.getAttribute('data-sub')

				document.querySelector('.mob_menu .step.' + sub).classList.add('show')
			})
		})
	}

	if (mobCatalogBackBtns) {
		mobCatalogBackBtns.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				el.closest('.step').classList.remove('show')
			})
		})
	}


	// Кнопка 'Вверх'
	let buttonUpBtn = document.querySelector('.buttonUp .btn'),
		buttonUp = document.querySelector('.buttonUp')

	if (typeof WH !== 'undefined' && buttonUp) {
		window.scrollY > WH
			? fadeIn(buttonUp)
			: fadeOut(buttonUp)
	}

	if (buttonUpBtn) {
		buttonUpBtn.addEventListener('click', e => {
			e.preventDefault()

			window.scrollTo({ top: 0, behavior: 'smooth' })
		})
	}


	// Моб. фильтр
	let mobFlterBtn = document.querySelector('.filter .mob_filter_btn'),
		filterForm = document.querySelector('.filter .form')

	if (mobFlterBtn) {
		mobFlterBtn.addEventListener('click', e => {
			e.preventDefault()

			mobFlterBtn.classList.toggle('active')

			mobFlterBtn.classList.contains('active')
				? fadeIn(filterForm)
				: fadeOut(filterForm)
		})
	}


	// Моя спецификация - отправка
	const specificationBtns = document.querySelectorAll('.specification .btns .btn'),
		sendSpecificationDatas = document.querySelectorAll('.send_specification .data')

	if (specificationBtns) {
		specificationBtns.forEach(el => {
			let sendData = document.querySelector(el.getAttribute('data-send'))

			if (sendData) {
				el.addEventListener('click', e => {
					e.preventDefault()

					specificationBtns.forEach(el => el.classList.remove('active'))
					el.classList.add('active')

					sendSpecificationDatas.forEach(el => el.style.display = 'none')
					sendSpecificationDatas.forEach(el => el.classList.remove('fadeIn'))
					fadeIn(sendData)
				})
			}
		})
	}


	// Страница товара - Изображения товара
	const productInfo = document.querySelector('.product_info')

	if (productInfo) {
		let productThumbs = new Swiper('.product_info .thumbs .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			preloadImages: false,

			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			/*navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},*/
			breakpoints: {
				0: {
					slidesPerView: 3,
					spaceBetween: 12,
				},
				480: {
					slidesPerView: 4,
					spaceBetween: 12,
				},
				768: {
					slidesPerView: 4,
					spaceBetween: 18,
				}
			}
		})

		new Swiper('.product_info .big .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			thumbs: {
				swiper: productThumbs
			},
			navigation: {
				nextEl: '.thumbs .swiper-button-next',
				prevEl: '.thumbs .swiper-button-prev'
			},

		})
	}


	// Страница товара - аккордионы
	const productSpolerBtns = document.querySelectorAll('.product_data .spoler_btn')

	if (productSpolerBtns) {
		productSpolerBtns.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				el.classList.toggle('active')

				el.classList.contains('active')
					? fadeIn(el.nextElementSibling)
					: fadeOut(el.nextElementSibling)
			})
		})
	}





	// Мини всплывающие окна
	const miniModalBtns = document.querySelectorAll('.mini_modal_btn'),
		miniModals = document.querySelectorAll('.mini_modal')

	miniModalBtns.forEach(el => {
		let eventName = ''

		el.classList.contains('on_hover')
			? eventName = 'mouseenter'
			: eventName = 'click'

		el.addEventListener(eventName, e => {
			e.preventDefault()

			const modalId = el.getAttribute('data-modal-id')

			if (el.classList.contains('active')) {
				el.classList.remove('active')
				miniModals.forEach(modal => modal.classList.remove('active'))

				if (el.closest('.search') || el.closest('.catalog')) {
					OVERLAY.classList.remove('show')
				}

				if (is_touch_device()) BODY.style = 'cursor: default;'
			} else {
				miniModalBtns.forEach(btn => btn.classList.remove('active'))
				el.classList.add('active')

				miniModals.forEach(modal => modal.classList.remove('active'))

				const modal = document.getElementById(modalId)

				modal.classList.add('active')

				if (el.closest('.search') || el.closest('.catalog')) {
					OVERLAY.classList.add('show')
				}

				if (is_touch_device()) BODY.style = 'cursor: pointer;'
			}
		})
	})

	// Закрываем всплывашку при клике за её пределами
	document.addEventListener('click', e => {
		if (!e.target.closest('.modal_cont')) {
			miniModals.forEach(modal => modal.classList.remove('active'))
			miniModalBtns.forEach(btn => btn.classList.remove('active'))

			OVERLAY.classList.remove('show')

			if (is_touch_device()) BODY.style = 'cursor: default;'
		}
	})


	// Маска ввода
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			let mask = IMask(el, { mask: '+{7} (000) 000-00-00' })

			el.addEventListener('focus', () => mask.updateOptions({ lazy: false }), true)
			el.addEventListener('blur', () => mask.updateOptions({ lazy: true }), true)
		})
	}


	// Изменение количества товара
	const amountMinusBtns = document.querySelectorAll('.amount .minus'),
		amountPlusBtns = document.querySelectorAll('.amount .plus'),
		amountInputs = document.querySelectorAll('.amount .input')

	if (amountMinusBtns) {
		amountMinusBtns.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				let parent = el.closest('.amount'),
					input = parent.querySelector('.input'),
					inputVal = parseFloat(input.value),
					minimum = parseFloat(input.getAttribute('data-minimum')),
					step = parseFloat(input.getAttribute('data-step')),
					unit = input.getAttribute('data-unit')

				if (inputVal > minimum) input.value = inputVal - step + unit
			})
		})
	}

	if (amountPlusBtns) {
		amountPlusBtns.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				let parent = el.closest('.amount'),
					input = parent.querySelector('.input'),
					inputVal = parseFloat(input.value),
					maximum = parseFloat(input.getAttribute('data-maximum')),
					step = parseFloat(input.getAttribute('data-step')),
					unit = input.getAttribute('data-unit')

				if (inputVal < maximum) input.value = inputVal + step + unit
			})
		})
	}

	if (amountInputs) {
		amountInputs.forEach(el => {
			el.addEventListener('keydown', e => {
				let maximum = parseInt(el.getAttribute('data-maximum'))

				setTimeout(() => {
					if (el.value == '' || el.value == 0) el.maximum = parseInt(el.getAttribute('data-minimum'))
					if (el.value > maximum) el.value = maximum
				})
			})
		})
	}


	if (is_touch_device()) {
		// Подменю на тач скрине
		const subMenus = document.querySelectorAll('header .menu_item > .sub_menu'),
			menuSublinks = document.querySelectorAll('header .menu_item > a.sub_link'),
			subMenus2 = document.querySelectorAll('header .sub_menu .sub_menu'),
			menuSublinks2 = document.querySelectorAll('header .sub_menu a.sub_link')

		if (menuSublinks) {
			menuSublinks.forEach(el => {
				el.classList.add('touch_link')

				el.addEventListener('click', e => {
					let dropdown = el.nextElementSibling

					if (getComputedStyle(dropdown).visibility == 'hidden') {
						e.preventDefault()

						subMenus.forEach(el => el.classList.remove('show'))
						dropdown.classList.add('show')

						BODY.style = 'cursor: pointer;'
					}
				})
			})
		}

		if (menuSublinks2) {
			menuSublinks2.forEach(el => {
				el.classList.add('touch_link')

				el.addEventListener('click', e => {
					let dropdown = el.nextElementSibling

					if (getComputedStyle(dropdown).visibility == 'hidden') {
						e.preventDefault()

						subMenus2.forEach(el => el.classList.remove('show'))
						dropdown.classList.add('show')

						BODY.style = 'cursor: pointer;'
					}
				})
			})
		}

		// Закрываем под. меню при клике за её пределами
		document.addEventListener('click', e => {
			if (!e.target.closest('.menu')) {
				subMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})


		// Закрытие моб. меню свайпом справо на лево
		let ts

		document.addEventListener('touchstart', e => ts = e.touches[0].clientX)

		document.addEventListener('touchend', e => {
			let te = e.changedTouches[0].clientX

			if (BODY.classList.contains('menu_open') && ts > te + 50) {
				// Свайп справо на лево
				mobMenuBtn.classList.remove('active')
				BODY.classList.remove('menu_open')
				mobMenu.classList.remove('show')
			} else if (ts < te - 50) {
				// Свайп слева на право
			}
		})
	}
})



window.addEventListener('scroll', function () {
	// Кнопка 'Вверх'
	let buttonUp = document.querySelector('.buttonUp')

	if (typeof WH !== 'undefined' && buttonUp) {
		window.scrollY > WH
			? fadeIn(buttonUp)
			: fadeOut(buttonUp)
	}
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {	
		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth

		// Моб. версия
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})




// FadeIn effect
function fadeIn(el) {
	if (!el.classList.contains('fadeIn')) {
		el.classList.remove('fadeOut')

		el.style.display = 'block'

		el.classList.add('fadeIn')
	}
}


// FadeOut effect
function fadeOut(el) {
	if (el.classList.contains('fadeIn')) {
		el.classList.remove('fadeIn')

		el.classList.add('fadeOut')

		setTimeout(() => el.style.display = 'none', 190)
	}
}