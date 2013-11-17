(function() {

	var anchors = {
			"default"   : 0,
			"portfolio" : 400,
			"clients"   : 1400,
			"posts"     : 2050,
			"contacts"  : Infinity
		},
		mobile = isMobileDevice(),
		router = {
			initialize: function() {
				var lastHash = false,
					resolveUri = this.resolveUri.bind(this);

				window.addEventListener("hashchange", resolveUri, false);
				resolveUri({});

				Backbone.history.start({
					pushState: false,
					hashChange: true
				});
			},
			resolveUri: function(event) {
				var resolved = false,
					pages = this.pages,
					pageName = '';

				for (pageName in pages) {
					if (!pages[pageName].hash) continue;
					if (window.location.hash == pages[pageName].hash) {
						resolved = true;
						break;
					}
				}
				if (!resolved) pageName = 'default';
				this.navigate(pageName);
			},
			navigate: function(name) {
				var page = this.pages[name];
				if (!page) return;
				page.activate();
			},
			pages: {
				// todo: странички внизу надо отрефакторить, конечно (сделать какой-нить общий прототип Router.page)
				'default': {
					hash: "",
					selector: '#parallaxWrap',
					activate: function() {
						Backbone.history.navigate(this.hash, {
							trigger: false,
							replace: false
						});
						this.isLoad() ? this.show() : this.init();
					},
					isLoad: function() {
						return !!parallax.viewport;
					},
					init: function() {
						//startProgress = anchors.default;
						parallaxRunPreload(this.show.bind(this));
					},
					show: function() {
						var $wrap = $('.wrap'),
							toHide = $wrap.not(this.selector);

						$wrap.css({ opacity : 0 });
						setTimeout(function() {
							parallax.setProgress(anchors.default);
							toHide.hide();
							$(this.selector).show().css({ opacity : 1 });
						}.bind(this), 500);
					}
				},
				'portfolio': {
					hash: "#portfolio",
					selector: '#parallaxWrap',
					activate: function() {
						Backbone.history.navigate(this.hash, {
							trigger: false,
							replace: false
						});
						this.isLoad() ? this.show() : this.init();
					},
					isLoad: function() {
						return ('viewport' in parallax);
						//debugger;
					},
					init: function() {
						//startProgress = anchors.portfolio;
						parallaxRunPreload(this.show.bind(this));
					},
					show: function() {
						var $wrap = $('.wrap'),
							toHide = $wrap.not(this.selector);

						$wrap.css({ opacity : 0 });
						setTimeout(function() {
							parallax.setProgress(anchors.portfolio);
							toHide.hide();
							$(this.selector).show().css({ opacity : 1 });
						}.bind(this), 500);
					}
				},
				'clients': {
					hash: "#clients",
					selector: '#parallaxWrap',
					activate: function() {
						Backbone.history.navigate(this.hash, {
							trigger: false,
							replace: false
						});
						this.isLoad() ? this.show() : this.init();
					},
					isLoad: function() {
						return !!parallax.viewport;
					},
					init: function() {
						//startProgress = anchors.clients;
						parallaxRunPreload(this.show.bind(this));
					},
					show: function() {
						var $wrap = $('.wrap'),
							toHide = $wrap.not(this.selector);

						$wrap.css({ opacity : 0 });
						setTimeout(function() {
							parallax.setProgress(anchors.clients);
							toHide.hide();
							$(this.selector).show().css({ opacity : 1 });
						}.bind(this), 500);
					}
				},
				'posts': {
					hash: "#posts",
					selector: '#parallaxWrap',
					activate: function() {
						Backbone.history.navigate(this.hash, {
							trigger: false,
							replace: false
						});
						this.isLoad() ? this.show() : this.init();
					},
					isLoad: function() {
						return !!parallax.viewport;
					},
					init: function() {
						//startProgress = anchors.posts;
						parallaxRunPreload(this.show.bind(this));
					},
					show: function() {
						var $wrap = $('.wrap'),
							toHide = $wrap.not(this.selector);

						$wrap.css({ opacity : 0 });
						setTimeout(function() {
							parallax.setProgress(anchors.posts);
							toHide.hide();
							$(this.selector).show().css({ opacity : 1 });
						}.bind(this), 500);
					}
				},
				'contacts': {
					hash: "#contacts",
					selector: '#parallaxWrap',
					activate: function() {
						Backbone.history.navigate(this.hash, {
							trigger: false,
							replace: false
						});
						this.isLoad() ? this.show() : this.init();
					},
					isLoad: function() {
						return !!parallax.viewport;
					},
					init: function() {
						//startProgress = anchors.contacts;
						parallaxRunPreload(this.show.bind(this));
					},
					show: function() {
						var $wrap = $('.wrap'),
							toHide = $wrap.not(this.selector);

						$wrap.css({ opacity : 0 });
						setTimeout(function() {
							parallax.setProgress(anchors.contacts);
							toHide.hide();
							$(this.selector).show().css({ opacity : 1 });
						}.bind(this), 500);
					}
				},
				'lab': {
					hash: "#lab",
					url: '/pages/lab.html',
					selector: '#labWrap',
					_load: false,
					activate: function() {
						Backbone.history.navigate(this.hash, {
							trigger: false,
							replace: false
						});
						this.isLoad() ? this.show() : this.init();
					},
					isLoad: function() {
						return this._load;
					},
					init: function() {
						$('.wrap').css({ opacity : 0 });
						$.ajax({
							url: this.url,
							method: 'get',
							dataType: 'text',
							success: function(response) {
								$(this.selector).html(response);
								this.show();
							}.bind(this)
						});
					},
					show: function() {
						var $wrap = $('.wrap'),
							toHide = $wrap.not(this.selector);

						$wrap.css({ opacity : 0 });
						setTimeout(function() {
							toHide.hide();
							$(this.selector).show().css({ opacity : 1 });
						}.bind(this), 500);
					}
				}
			}
		},
		startProgress = 0,
		blogPostTemplate = null, // скомпилированный шаблон поста
		parallax = {}, // здесь будет инстанс параллакса
		preloaded = {}, // загруженные ресурсы

		preloadBaseUrl = '',
		preloadList = [ // пути для загрузки ресурсов
			'js/json1.json',
			'images/s1_mountains.png',
			'images/s1_sky.jpg',
			'images/s1_fog_1.png',
			'images/s1_fog_2.png',
			'images/s1_castle.png',
			'images/logo.png',
			'images/s1_indexTxt_1.png',
			'images/s1_indexTxt_2.png',
			mobile ? 'images/swipe_down.png' : 'images/scroll_down.png',
			'images/s1_ninja.png',
			'images/s1_tree_1.png',
			'images/s1_tree_2.png',
			'images/s1_tree_3.png',
			'images/s1_tree_4.png',
			'images/s1_tree_5.png',
			'images/s1_stone_1.png',
			'images/s1_stone_2.png',
			'images/s1_fog_3.png',
			'images/s1_fog_4.png',
			'images/s1_fog_5.png',
			'images/s1_fog_6.png',
			'images/s1_fog_7.png',
			'images/newPreviews_jpeg/hello_1.jpg',
			'images/newPreviews_jpeg/hyper_1.jpg',
			'images/newPreviews_jpeg/level_1.jpg',
			'images/newPreviews_jpeg/m_shop_1.jpg',
			'images/s2_background.jpg',
			'images/s2_ninja.png',
			'images/s2_clouds.png',
			'images/s2_e_1.png',
			'images/s2_e_2.png',
			'images/s2_e_3.png',
			'images/s2_tower.png',
			'images/s2_roof_1.png',
			'images/s2_roof_2.png',
			'images/clip_left.jpg',
			'images/clip_right.jpg',
			'images/s3_bg_1.jpg',
			'images/s3_bg_2.jpg',
			'images/s3_bg_3.jpg',
			'images/s3_bg_4.jpg',
			'images/s3_ninja.png',
			'images/s4_room_left.png',
			'images/s4_room_right.png'
		],
		countLoaded = 0;

	// ставлю иконку swipe для мобильных устройств в конфиге
	// todo: добавить в Parallax.prototype работу с элементами
	if (mobile) {
		animationCfg.elements[8].common.domId = 'uprock-swipe-hint';
	}

	document.addEventListener("DOMContentLoaded", onDomReady);

	function onDomReady() {
		router.initialize();

		// downgrade для IE (только для 9 и 10, в 11 будет работать класс anim3d-hover)
		// в юзер-агент строке ИЕ11 нет 'MSIE'
		if (navigator.userAgent.indexOf('MSIE') > -1) {
			$('.anim3d-hover').addClass('anim2d-hover').removeClass('anim3d-hover');
		}

		//
		$('footer nav a').on('touch click', function(event) {
			var anchor = $(this).data('anchor');
			if (typeof anchor === 'undefined') return;

			//window.location.hash = anchor;
			//parallax.setProgress(progress);
			//router.pages[anchor].activate();
			Backbone.history.navigate('#' + anchor, {
				trigger: false,
				replace: false
			});

			event.preventDefault();
			return false;
		});

		// костыли, которые так и не заработали - 3д-дивы не перекрывают, надо смещение по оси z смотреть, а не zIndex
		$('.anim3d-hover')
			.on('mouseover', function() {
				$(this).parent('div').css({ 'z-index' : 100000 });
			})
			.on('mouseleave', function() {
				$(this).parent('div').css({ 'z-index' : 0 });
			});

		// обработка свайпа, использует точки из anchors
		Hammer(document.getElementById('parallaxWrap'))
			.on('swipeleft', function(event) {
				console.log('swipeleft', event);
				var found = false,
					next = Infinity,
					value = 0,
					progress = parallax.progress;

				for (var key in anchors) {
					value = anchors[key];
					if (value <= next && value > progress) {
						next = value;
						found = true;
					}
				}
				if (found) {
					parallax.setNewTarget(next);
				}
			})
			.on('swiperight', function(event) {
				console.log('swiperight', event);
				var found = false,
					next = 0,
					value = 0,
					progress = parallax.progress;

				for (var key in anchors) {
					value = anchors[key];
					if (value >= next && value < progress) {
						next = value;
						found = true;
					}
				}
				if (found) {
					parallax.setNewTarget(next);
				}
			});
	}

	/**
	 * Предзагрузка всех необходимых ресурсов для параллакса
	 * @param {function} then коллбек
	 */
	function parallaxRunPreload(then) {
		if (typeof then != 'function') then = function() {};

		preloadList.forEach(function(src) {
			var splitted = src.split('.'),
				extention = splitted[splitted.length-1],
				source = preloadBaseUrl + src,
				resource;

			function handleLoad() {
				++countLoaded;
				checkForParallaxLoad(then);
			}

			switch (extention) {
				case 'png':
				case 'jpg':
				case 'jpeg':
					resource = new Image();
					resource.onload = handleLoad;
					resource.src = source;
					preloaded[src] = resource;
					break;

				case 'json':
					$.ajax({
						url: source,
						dataType: 'json',
						success: function(json) {
							preloaded[src] = json;
							handleLoad();
						}
					});
					break;

				case 'js':
					var fjs = document.getElementsByTagName('script')[0];
					resource = document.createElement('script');
					resource.onload = handleLoad;
					resource.src = source;
					fjs.parentNode.insertBefore(resource, fjs);
					preloaded[src] = resource;
					break;
			}
		});
	}

	/**
	 * Служебный коллбек для проверки окончания прелоада
	 * @param {function} then
	 */
	function checkForParallaxLoad(then) {
		if (countLoaded >= preloadList.length) {
			injectPostsFromJson();
			startParallax(then);

			setTimeout(function() {
				$('footer').css({
					'opacity'   : '1',
					'bottom'    : '0'
				});
			}, 10);
		}
	}

	/**
	 * Создаёт и запускает параллакс
	 * @param {function} then коллбек
	 */
	function startParallax(then) {
		var preloaderAnimation = document.getElementById('preloaderAnimation');
			preloaderAnimation.style.display = 'none';

		var wrap = document.getElementById('parallaxWrap');
		blogPostTemplate = Handlebars.compile($("#blog-element-template").html());

		// 3 - transform3d, 2 - transform2d
		animationCfg.mode = has3d() ? 3 : 2;

		parallax = new Parallax({
			cfg             : animationCfg,
			auto            : true,
			root            : wrap,
			beforeRender    : function() {},
			afterRender     : function() {},
			onElementCreate : elementCreateHandler,
			onElementShow   : elementShowHandler,
			onWindowResize  : onWindowResize
		});

		window['parallax'] = parallax;

		then();
		// эти строчки теперь в роутере
		// parallax.setProgress(startProgress);
		//wrap.style.opacity = 1;
	}

	/**
	 * Создаёт и вставляет в animationCfg элементы постов из json1.json
	 */
	function injectPostsFromJson() {
		var shuffledPosts = shuffle(preloaded['/js/json1.json'].data),
			length = shuffledPosts.length,
			betweenPosts = 10,
			durationPost = 150,
			startProgress = 1950, // ниндзя на третьей странице полностью появился и ждёт
			injectedLength = length * betweenPosts + durationPost,
			endProgress = startProgress + injectedLength,
			grid = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]],
			fb = {
				x : Math.round(Math.random() * 3),
				y : Math.round(Math.random() * 2)
			};

		// добавляю в сетку виджет ФБ
		grid[fb.x][fb.y] = Infinity;
		grid[fb.x][fb.y+1] = Infinity;

		// добавляю посты блога, появляющиеся по очереди через betweenPosts пунктов прогресса
		// в рандомных местах, исчезающие через durationPost пунктов
		for (var i=0; i < length; i++) {
			var newCoors = getFreeCoords(),
				begin = startProgress + i * betweenPosts,
				stopFadeIn = begin + durationPost / 6,
				startFadeOut = begin + durationPost * 5 / 6,
				end = begin + durationPost;

			grid[newCoors.x][newCoors.y] = durationPost;

			animationCfg.elements.push({
				name: 'blog-post',
				context: shuffledPosts[i],
				begin: begin,
				end: end,
				common: {
					width   : 0.25,
					height  : 0.24,
					left    : newCoors.x * 0.25,
					top     : newCoors.y * 0.24,
					domId   : 'blog-post-' + i,
					opacity : 0,
					cssClass: 'blogEl'
				},
				milestones: [{
					progress: begin
				}, {
					progress: stopFadeIn,
					opacity : 1
				}, {
					progress: startFadeOut,
					opacity : 1
				}, {
					progress: end
				}]
			});

			grid.forEach(function(arr) {
				arr.forEach(function(el, index) {
					arr[index] -= betweenPosts;
					arr[index] = Math.max(arr[index], 0);
				});
			})
		}

		// добавляю плашку для фб виджета
		animationCfg.elements.push({
			name: 'for-fb-widget',
			begin: startProgress,
			end: endProgress,
			common: {
				width   : 0.25,
				height  : 0.48,
				left    : fb.x * 0.25,
				top     : fb.y * 0.24,
				domId   : 'for-fb-widget',
				cssClass: 'for-fb-widget',
				opacity : 0
			},
			milestones: [{
				progress: startProgress
			}, {
				progress: startProgress + injectedLength / 10,
				opacity : 1
			}, {
				progress: endProgress - injectedLength / 10,
				opacity : 1
			}, {
				progress: endProgress
			}]
		});

		// после всего этого безобразия устанавливаю, когда на четвёртой сцене ниндзя будет разрезать экран мечом
		// и продлеваю длину параллакса
		var googleMap = 41,
			roomLeft  = 42,
			roomRight = 43,
			cutStripe = 44,
			e = animationCfg.elements;

		animationCfg.maxProgress += injectedLength;
		e[roomLeft].milestones[1].progress += injectedLength;
		e[roomLeft].milestones[2].progress += injectedLength;
		e[roomLeft].milestones[3].progress += injectedLength;
		e[roomLeft].end += injectedLength;

		e[roomRight].milestones[1].progress += injectedLength;
		e[roomRight].milestones[2].progress += injectedLength;
		e[roomRight].milestones[3].progress += injectedLength;
		e[roomRight].end += injectedLength;

		e[cutStripe].milestones[0].progress += injectedLength;
		e[cutStripe].milestones[1].progress += injectedLength;
		e[cutStripe].begin += injectedLength;
		e[cutStripe].end += injectedLength;

		function getFreeCoords() {
			var x = 0, y = 0,
				freeCells = [];

			for (x = 0; x < 4; x++) {
				for (y = 0; y < 4; y++) {
					if (grid[x][y] === 0) freeCells.push({ x : x, y : y });
				}
			}

			if (freeCells.length) {
				return freeCells[ Math.floor(Math.random() * freeCells.length) ];
			} else {
				return getRandomCoords();
			}
		}

		function getRandomCoords() {
			var x = 0, y = 0,
				// проверяет на совпадение с плагином ФБ
				examineFbPos = function() {
					return (x === fb.x && y === fb.y || x === fb.x && y === fb.y+1)
				};

			do {
				x = Math.round(Math.random() * 3);
				y = Math.round(Math.random() * 3);
			} while (!examineFbPos);

			return {
				x : x,
				y : y
			}
		}
	}

	/**
	 * Модифицирует элементы параллакса
	 * Вызывается при создании любого элемента
	 */
	function elementCreateHandler(element, progress) {
		var options = element.options,
			name = options.name,
			html = element.html;

		if (name === 's1-portfolio-1') {
			html.innerHTML = '<div class="portfolio" data-src="m_shop"></div><div class="portfolio" data-src="sante"></div><div class="portfolio" data-src="mega"></div>'
		}
		if (name === 's1-portfolio-2') {
			html.innerHTML = '<div class="portfolio" data-src="lipton"></div><div class="portfolio" data-src="pari"></div><div class="portfolio" data-src="hello"></div>'
		}
		if (name === 's1-portfolio-3') {
			html.innerHTML = '<div class="portfolio" data-src="hyper"></div><div class="portfolio" data-src="multi"></div><div class="portfolio" data-src="vtb"></div>'
		}
		if (name === 's1-portfolio-4') {
			html.innerHTML = '<div class="portfolio" data-src="level"></div><div class="portfolio" data-src="mbl"></div><div class="portfolio" data-src="toyota"></div>'
		}

		if (name === 's2-about-left') {
			html.innerHTML = document.getElementById("s2-about-left-template").innerHTML;
		}

		if (name === 's2-about-right') {
			html.innerHTML = document.getElementById("s2-about-right-template").innerHTML;
		}

		if (name === 'blog-post') {
			html.innerHTML = blogPostTemplate(options.context);
		}

//		if (name === 'motto') {
//			html.innerHTML = "THE ART OF HARDCORE PROGRAMMING AND MINIMALISTIC DESIGN";
//		}
//
//		if (name === 'motto-from') {
//			html.innerHTML = "— Digital ninja's manuscript, line 3";
//		}

		$(html).find('.portfolio').each(function(index, sender) {
			var $sender = $(sender),
				name = $sender.data('src'),
				source = '/images/newPreviews_jpeg/' + name + '_',
				ext = '.jpg',
				images = [];

			for (var i = 0; i < 10; i++) {
				images.push($('<img>', {
						src : source + (i+1) + ext
					})
					.css({ 'opacity' : i === 0 ? 1 : 0 })
					.appendTo($sender));
			}

			var timer = 0,
				active = 0,
				period = 400, // ms
				fadeOut = function(index) {
					images[index].css({
						'z-index' : '0'
					});
					setTimeout(function() {
						images[index].css({
							'opacity' : '0'
						});
					}, 70);
				},
				fadeIn = function(index) {
					images[index].css({
						'opacity' : '1',
						'z-index' : '1'
					});
				},
				tick = function() {
					fadeOut(active);
					active += 1;
					if (active >= 10) { active = 0 }
					fadeIn(active);
				};

			$sender
				.on('mouseover', function() {
					timer = setInterval(tick, period);
				})
				.on('mouseout', function() {
				 	clearInterval(timer);
					images[active].css({
						'opacity' : '0',
						'z-index' : '0'
					});
					active = 0;
					fadeIn(active);
				});
		});

	}

	/**
	 * Модифицирует элементы параллакса
	 * Вызывается при показе любого элемента (возможен многократный вызов)
	 */
	var fbWidgetInitialized = false,
		googleWidgetInitialized = false;

	function elementShowHandler(element, progress) {

		if (!fbWidgetInitialized && element.options.name === 'for-fb-widget') {
			fbWidgetInitialized = true;

			createFbWidget(element);
		}

		if (!googleWidgetInitialized && element.options.name === 'google-map') {
			googleWidgetInitialized = true;

			createGoogleMap(element);
		}

	}

	/**
	 * Коллбек ресайза окна для параллакса
	 */
	function onWindowResize() {
		var about = {
				origin  : 640,
				width   : $('#s2-about-right').width(),
				multi   : 1
			},
			aboutImages = [91, 114, 108, 107, 99, 117, 88, 86, 85, 102, 101, 102, 86, 68, 33];

		if (about.width) {
			about.multi = about.width / about.origin;
			$('#s2-about-right .clientTxt').css('font-size', (10 * about.multi) + 'px');
			$('#s2-about-left img').each(function(index, el) {
				var $el = $(el),
					width = aboutImages[index];

				$el.removeAttr('width')
					.css('width', (width * about.multi) + 'px');
			});
		}
	}

	/**
	 * Вызов апи фб для создания виджета
	 */
	function createFbWidget(element) {
		var widgetWrapTemplate = Handlebars.compile(document.getElementById('fb-widget-template').innerHTML),
			context = {
				width: $(element.html).width(),
				height: $(element.html).height()
			};

		element.html.innerHTML = widgetWrapTemplate(context);
		FB.init({
			status: true,
			cookie: true,
			xfbml: true
		});
	}

	/**
	 * Вызов апи гуглокарт
	 */
	function createGoogleMap(element) {
		var widgetWrapTemplate = Handlebars.compile(document.getElementById('map-element-template').innerHTML),
			context = {};

		element.html.innerHTML = widgetWrapTemplate(context);
		initializeMap();
	}

	//+ Jonas Raoni Soares Silva
	//@ http://jsfromhell.com/array/shuffle [v1.0]
	function shuffle(o){ //v1.0
		for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}

	// https://gist.github.com/lorenzopolidori/3794226
	function has3d(){
		var el = document.createElement('p'),
			has3d,
			transforms = {
				'webkitTransform'   : '-webkit-transform',
				'OTransform'        : '-o-transform',
				'msTransform'       : '-ms-transform',
				'MozTransform'      : '-moz-transform',
				'transform'         : 'transform'
			};

		// Add it to the body to get the computed style
		document.body.insertBefore(el, null);

		for (var t in transforms){
			if (el.style[t] !== undefined ) {
				el.style[t] = 'translate3d(1px,1px,1px)';
				has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
			}
		}

		document.body.removeChild(el);

		return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
	}

	// http://detectmobilebrowsers.com/
	function isMobileDevice() {
		var a = navigator.userAgent||navigator.vendor||window.opera;
		return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)));
	}

}());
