/**
 * ядро, управляющее параллаксом
 * @param {Object} options - animationConfig
 */
Parallax = function(options) {
	this.initialize(options);
};

Parallax.prototype = {
	constructor: Parallax,
	progress: 0,
	speed: 0,
	elements: [],
	viewport: {
		width: 0,
		height: 0
	},

	initialize: function(options) {
		this.options = options;
		this.root = options.root || window;

        [
            'beforeRender',
            'afterRender',
            'onElementCreate',
            'onElementShow',
            'onWindowResize'
        ].forEach(function(funcName) {
                if (typeof this.options[funcName] !== 'function') {
                    this.options[funcName] = function(){};
                }
            }.bind(this));

		this.getRAF();
		this.bindUserInput();
		this.bindResize();
		if (this.options.auto) {
			if (document.body) {
				this.start();
			} else {
				document.addEventListener("DOMContentLoaded", this.start.bind(this));
			}
		}
	},

	start: function() {
		this.setCfg(this.options.cfg);

		// cfg.mode:
		// 0 - без анимации (не реализован)
		// 1 - css transition (не поддерживатся, могут быть недоработки)
		// 2 - анимация с transform2d и requestAnimationFrame()
		// 3 - анимация с transform3d и requestAnimationFrame()
		var mode = this.cfg.mode,
			start = {
				1 : function() {
						var period = 1000 / this.cfg.updateFrequency;
						this.worldTickId = setInterval(this.worldTick.bind(this), period);
						this.render.call(this, 'forced', 0);
					},
				2 : function() {
						this.rafId = this.requestAnimationFrame(this.render.bind(this));
					},
				3 : function() {
						this.rafId = this.requestAnimationFrame(this.render.bind(this));
					}
			}[mode].call(this);

	},

	stop: function() {

		var mode = this.cfg.mode,
			stop = {
				1 : function() {
						clearInterval(this.worldTickId);
					},
				2 : function() {
						this.cancelAnimationFrame(this.rafId);
					},
				3 : function() {
						this.cancelAnimationFrame(this.rafId);
					}
			}[mode].call(this);

	},

	setProgress: function(progress) {
		if (!progress) return;
		this.progress = progress;
		this.progress = Math.min(this.progress, this.cfg.maxProgress);
		this.progress = Math.max(this.progress, this.cfg.minProgress);

		//this.render('forced', this.progress);
	},

	/**
	 * Создаёт элементы набора
	 */
	createElements: function() {
		var elementFabric = {
			1: Parallax.ElementTransition,
			2: Parallax.ElementTransform2D,
			3: Parallax.ElementTransform3D
		}[this.cfg.mode];

		// создаёт набор элементов
		this.cfg.elements.forEach(function(options) {
			if (!options) return;
			options['root'] = this.root;
			options['parent'] = this;
			var newElement = new elementFabric(options);
			this.elements.push(newElement);
			this.options.onElementCreate(newElement, this.progress);
		}.bind(this));
	},

	setCfg: function(cfg) {
		this.cfg = cfg;
		// возможно производит какие-то вычисления с конфигом

		// обнуление в случае установки нового конфига
		this.removeElements();
		this.createElements();
	},

	/**
	 * Полифил для requestAnimationFrame
	 */
	getRAF: function() {
		// находит нужный раф и ставит его в this.RAF()
		var requestAnimationFrame = (
				window.requestAnimationFrame
					|| window.mozRequestAnimationFrame
					|| window.webkitRequestAnimationFrame
					|| window.msRequestAnimationFrame // IE10
					|| window.oRequestAnimationFrame  // а вдруг фанат Presto
				).bind(window),
		// webkitCancelRequestAnimationFrame не нужен: https://bugs.webkit.org/show_bug.cgi?id=74231
			cancelAnimationFrame = (
				window.cancelAnimationFrame
					|| window.mozCancelAnimationFrame
					|| window.webkitCancelAnimationFrame
					|| window.msCancelAnimationFrame // IE10
					|| window.oCancelAnimationFrame  // а вдруг фанат Presto
					|| clearTimeout
				).bind(window);

		// https://gist.github.com/paulirish/1579671, MIT
		var lastTime = 0;
		if (!requestAnimationFrame)
			requestAnimationFrame = function(callback) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() {
					callback(currTime + timeToCall);
				}, timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};

		this.requestAnimationFrame = requestAnimationFrame;
		this.cancelAnimationFrame = cancelAnimationFrame;
	},

	/**
	 * Подключение к ивентам ввода (скролл, тач-события, пробел, стрелки курсора)
	 * todo: разбить этого монстра по отдельным функциям
	 */
	bindUserInput: function() {
		var detectOSX = navigator.userAgent.indexOf('Mac OS X') > -1,
			// вешается просто по определению OSX, так как иначе хардварный инерционный скроллинг не определить
			// точнее я не придумал, как иначе определить. Придумаете - напишите на github.com/dagen-niger
			detectInertial = detectOSX,

			mouseWheelHandler = function(event) {
				var e = window.event || event,
					delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

				//this.speed = delta * this.speedPerTick * this.cfg.scrollSensitivity;
				this.setNewMove(delta * this.cfg.speed * this.cfg.scrollSensitivity);

				e.preventDefault && e.preventDefault();
				return false
			}.bind(this),

			currentInertialOffset = 0,
			currentInertialDelta = 0,
			lastScrollingTimestamp = 0,
			inertialWheelHandler = function(event) {
				var speed = this.cfg.speed,
					scrollSensitivity = this.cfg.inertialScrollSensitivity,
					setNewMove = this.setNewMove.bind(this),
					now = +(new Date());

				currentInertialOffset = Math.max(Math.abs(event.wheelDelta), Math.abs(event.detail));
				currentInertialDelta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

				// давно ничего не двигалось, надо вызвать событие
				// обработка случая, если у макоси выключен инерциальный скроллинг
				// или сейчас используется адекватное устройства ввода без наркоманского скроллинга
				if (now - lastScrollingTimestamp > 500) {
					setNewMove(currentInertialDelta * speed * scrollSensitivity);
				}
				lastScrollingTimestamp = now;

				// если через 0.2 секунды сдвиг за хардварное событие увеличивается в 10 раз,
				// значит вызвать событие скролла
				// соответственно если "сильно" скроллить, то newMove вызовется несколько раз,
				// каждый раз обновляя стартовую скорость параллакса,
				// а такое поведение ближе к ожидаемому пользователями с инерционными устройствами ввода
				(function(savedOffset) {
					setTimeout(function() {
						if (currentInertialOffset >= 10 * savedOffset) {
							// для рассчёта скорости используется знак смещения из "будущего"
							setNewMove(currentInertialDelta * speed * scrollSensitivity);
						}
					}, 200);
				}(currentInertialOffset));

				event.preventDefault && event.preventDefault();
				return false
			}.bind(this),

			keyboardHandler = function(event) {
				var callMove = function(direction) {
					this.setNewMove(direction * this.cfg.speed * this.cfg.keyboardSensitivity);
				}.bind(this);

				switch (event.keyCode) {
					case 32: // пробел
						event.shiftKey ? callMove(1) : callMove(-1);
						break;
					case 34: // pageDown
					case 39: // стрелка вниз
					case 40: // стрелка вправо
						callMove(-1);
						return false;
						break;
					case 33: // pageUp
					case 37: // стрелка вверх
					case 38: // стрелка влево
						callMove(1);
						return false;
						break;
				}

			}.bind(this);

		this.root.addEventListener("mousewheel",    detectInertial ? inertialWheelHandler : mouseWheelHandler, false);
		this.root.addEventListener("DOMMouseScroll",mouseWheelHandler, false);
//		this.root.addEventListener("touchmove",     touchMoveHandler);
//		this.root.addEventListener("touchstart",    touchStartHandler);
		window   .addEventListener("keydown",       keyboardHandler);
	},

	/**
	 * Вешает обработчик ресайза корневого элемента
	 */
	bindResize: function() {
		// вешает обработчики на ресайз окна, по ресайзу пересчитывает размер элементов (render?)
		var timeout = false,
			resizeHandler = function() {
				if (timeout) return;
				timeout = true;
				setTimeout(function() { timeout = false }, 20);

				var	rect = {};

				//if (this.root === window) {
				rect.width = (window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.offsetWidth));
				rect.height = (window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight));
				//} else {
				//	rect = this.root.getBoundingClientRect();
				//}

				this.viewport = rect;
				if (this.root) {
					this.root.style.height = rect.height + 'px';
					this.root.style.width = rect.width + 'px';
				}

				this.render('forced', this.progress);

				this.options.onWindowResize();
			}.bind(this);

		window.addEventListener("resize", resizeHandler);
		resizeHandler();
	},

	/**
	 * Проверяет, надо ли рендерить, изменяет элементы и рендерит
	 * @param {*} forced - при true игнорирует проверку на изменение прогресса (скролла)
	 * @param {number} futureProgress - прогресс по завершению анимации, используется для transition
	 */
	render: function(forced, futureProgress) {
		this.options.beforeRender(this.progress, this.speed);

		this.calculateActualProgress();
		if (this.progress != this.oldProgress || forced) {
			this.oldProgress = this.progress;
			this.elements.forEach(function(element) {
				element && element.process && element.process(forced, futureProgress);
			});
		}

		this.options.afterRender(this.progress, this.speed);
		this.lastTickTimeStamp = +(new Date());

		if (this.options.cfg.mode === 2 || this.options.cfg.mode === 3) {
			this.requestAnimationFrame(this.render.bind(this));
		}
	},

	/**
	 * Вычисляет параметры параллакса, которые не должны зависеть от частоты кадров
	 * используется для режима transition (mode 1 и mode 0)
	 */
	worldTick: function() {
		this.calculateActualProgress();
	},

	/**
	 * Начинает новое движение по шкале прогресса с инерцией
	 * @param {number} velocity стартовая скорость
	 */
	setNewMove: function(velocity) {
		var transitionTime = Math.abs(velocity / this.cfg.accelera), // в секундах
			offset = transitionTime * velocity / 2, // интеграл графика скорости
			futureProgress = this.progress + offset;

		futureProgress = Math.min(futureProgress, this.cfg.maxProgress);
		futureProgress = Math.max(futureProgress, this.cfg.minProgress);

		this.transitionTime = transitionTime;
		this.futureProgress = futureProgress;
		this.startProgress = this.progress;
		this.startTime = new Date().getTime();
		this.startVelocity = velocity;

		if (this.cfg.mode === 1) {
			this.requestAnimationFrame(this.render.bind(this, 'forced', futureProgress));
		}
	},

	/**
	 * Начинает новое движение по шкале прогресса с постоянной скоростью
	 * @param {Number} progress целевой прогресс
	 */
	setNewTarget: function(progress) {
		progress = Math.min(progress, this.cfg.maxProgress);
		progress = Math.max(progress, this.cfg.minProgress);
		this.targetProgress = progress;

		// todo: добавить поддержку
//		if (this.cfg.mode === 1) {
//			this.requestAnimationFrame(this.render.bind(this, 'forced', futureProgress));
//		}
	},

	/**
	 * Вычисляет текущую точку на шкале анимаций
	 */
	calculateActualProgress: function() {
		if (typeof this.targetProgress != 'undefined') {
			this.calculatePermanentMove();
		} else if (this.startTime) {
			this.calculateInertialMove();
		}
	},

	calculateInertialMove: function() {
		var timeDelta = (new Date().getTime() - this.startTime) / 1000, // в секундах
			direction = this.startVelocity > 0 ? 1 : -1,
			accelera = this.cfg.accelera * direction,
			startOffset = this.startProgress,
			currentVelocity = this.startVelocity - accelera * timeDelta;

		if (Math.abs(this.startVelocity) < Math.abs(accelera * timeDelta)) {
			this.startTime = 0;
			this.progress = this.futureProgress;

			// убрать этот костыль, когда отлажен transition будет
			if (this.cfg.mode === 1) {
				//this.requestAnimationFrame(this.render.bind(this, 'forced', this.progress));
			}
			return;
		}

		var	vOffset = this.startVelocity * timeDelta,
			aOffset = accelera * timeDelta * timeDelta / 2,
			progress = startOffset + vOffset - aOffset;

		//console.log(this.startVelocity, accelera, timeDelta, currentVelocity, progress);

		progress = Math.min(progress, this.cfg.maxProgress);
		progress = Math.max(progress, this.cfg.minProgress);
		this.progress = progress;
	},

	calculatePermanentMove: function() {
		var target = this.targetProgress,
			timeDelta = (new Date().getTime() - this.lastTickTimeStamp) / 1000, // в секундах;
			offset = this.cfg.swipeVelocity * timeDelta,
			rest = target - this.progress,
			absRest = Math.abs(rest),
			direction = absRest / rest,
			progress = this.progress;

		if (absRest <= offset) {
			progress = this.targetProgress;
			this.targetProgress = undefined;
		} else {
			progress += offset * direction;
		}

		progress = Math.min(progress, this.cfg.maxProgress);
		progress = Math.max(progress, this.cfg.minProgress);
		this.progress = progress;
	},

	removeElements: function() {
		this.elements.forEach(function(element) { element.destroy(); });
		this.elements = [];
	}
};
