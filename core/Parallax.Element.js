/**
 * Элемент для параллакса, provide html-контейнер для контента
 * @param {object} options - опции отдельного элемента из конфига анимации
 */
Parallax.Element = function(options) {
	this.initialize(options);
};
Parallax.Element.prototype = {
	constructor: Parallax.Element,
	html: null,
	initialize: function(options) {
		this.options = options;

		// todo: document.body вроде не во всех браузерах был, проверить
		this.target = (options.root === window) ? document.body : options.root;
		this.interval = {   // текущий интервал, в котором находится элемент
			begin : {},     // и граничные значения атрибутов элемента в этом интервале
			end   : {}
		};
		this.style = {};
		this.oldStyle = {};

		this.options.milestones.forEach(function(stone, index) {
			if (typeof stone.name !== 'undefined') return;
			stone.name = 'stone' + index;
		});

		this.createHtml();
		this.appendToDom();
	},
	createHtml: function() {
		this.html = document.createElement('div');
		this.html.style.position = 'absolute';
		this.html.style.display = 'none';
	},
	appendToDom: function() {
		this.target.appendChild(this.html);
	},
	getProgress: function() {
		return this.options.parent.progress;
	},
	/**
	 * Проверяет и находит интервал между mile stones, в который попадает сейчас элемент
	 * устанавливает this.interval.begin и this.interval.end
	 * @param {string} forced при === 'forced' переустаналивает границы в любом случае (пересчитывая статичные стили)
	 */
	checkInterval: function(forced) {
		var progress = this.getProgress(),
			forwardOffset = Infinity, // расстояние до камня end
			backwardOffset = Infinity, // расстояние до камня begin
			begin = {}, // нижняя граница интервала,
			end = {}, // верхняя граница интервала
			stones = this.options.milestones,
			check = function(stone) {
				var offset = Math.abs(progress - stone.progress);
				if (progress >= stone.progress) {
					// проверка на begin-камень
					if (offset > forwardOffset) return;
					forwardOffset = offset;
					begin = stone;
				} else {
					// проверка на end-камень
					if (offset > backwardOffset) return;
					backwardOffset = offset;
					end = stone
				}
			}.bind(this);

		stones.forEach(check);

		// проверка на изменение границ интервала
		if (begin.name !== this.interval.begin.name
			|| end.name !== this.interval.end.name
			|| forced) {

			this.calculateIntervalParams(Object.create(begin), Object.create(end));
		}
	},

	calculateIntervalParams: function(begin, end) {
		var common = this.options.common;

		// расширить begin и end статичными параметрами
		for (var key in common) {
			if (!common.hasOwnProperty(key)) continue;

			var beginNeeded = typeof begin[key] === 'undefined',
				endNeeded = typeof end[key]   === 'undefined',
				newValue = null;

			if (beginNeeded || endNeeded) {
				newValue = common[key];
				//console.log('Расширяю значением:', key, newValue);
				if (beginNeeded) begin[key] = newValue;
				if (endNeeded) end[key] = newValue;
			}
		}

		//console.log('"' + this.options.name + '": interval changed to [' + begin.progress + ', ' + end.progress + ']');

		this.interval = {
			begin : begin,
			end   : end
		};

		var bounds = [this.interval.begin, this.interval.end];
		bounds.forEach(function(bound, index) {
			for (var key in bound) {
				//if (!bound.hasOwnProperty(key)) continue;
				bound[key] = this.parseCalc(bound[key]);
			}
		}.bind(this));
	},

	/**
	 * Проверка, должен ли быть элемент на сцене при текущем прогрессе
	 * @return {boolean} true, если должен быть на сцене
	 */
	checkActive: function() {
		var progress = this.getProgress(),
			active = this.options.begin <= progress && this.options.end >= progress;

		if (active && !this.displayed) {
			this.html.style.display = 'block';
			this.displayed = true;
			this.needElementShow = true;
		}

		if (!active && this.displayed) {
			this.html.style.display = 'none';
			this.displayed = false;
		}

		return active;
	},

	/**
	 * Пересчитывает визуальные атрибуты элемента
	 */
	reflow: function() {
		var style = this.style,
			common = this.options.common,
			parent = this.options.parent,
			cfg = parent.cfg,
			viewport = parent.viewport,
			progress = this.getProgress(),
			begin = this.interval.begin,
			end = this.interval.end,
			intervalProgress = 0,
			intervalDelta = {},
			interpolated = {};

		if (typeof begin.progress === 'undefined' || typeof end.progress === 'undefined') return;

		// linear function
		intervalProgress = (progress - begin.progress) / (end.progress - begin.progress);

		intervalDelta = {
			width   : end.width     - begin.width,
			height  : end.height    - begin.height,
			left    : end.left      - begin.left,
			top     : end.top       - begin.top,
			rotate  : end.rotate    - begin.rotate,
			opacity : end.opacity   - begin.opacity
		};

		interpolated = {
			width   : begin.width   + intervalDelta.width   * intervalProgress,
			height  : begin.height  + intervalDelta.height  * intervalProgress,
			left    : begin.left    + intervalDelta.left    * intervalProgress,
			top     : begin.top     + intervalDelta.top     * intervalProgress,
			rotate  : begin.rotate  + intervalDelta.rotate  * intervalProgress,
			opacity : begin.opacity + intervalDelta.opacity * intervalProgress
		};

		// 1 магический пиксель для убирания щелей
		style.width     = interpolated.width     * viewport.width + 1;
		style.height    = interpolated.height    * viewport.height + 1;
		style.left      = interpolated.left      * viewport.width;
		style.top       = interpolated.top       * viewport.height;
		style.rotate    = interpolated.rotate;
		style.opacity   = interpolated.opacity;

		style['transform-origin']   = begin['transform-origin'];
		style.cssClass  = begin.cssClass;
		style.domId     = begin.domId;

		if (style.width !== style.width) { // isNaN
			style.width = style.height * common.aspectRatio;
		}
		if (style.height !== style.height) { // isNaN
			style.height = style.width / common.aspectRatio;
		}
	}, // end of reflow()

	/**
	 * Рендер в html
	 */
	render: function() {
		//console.log(this.name, 'render', this.style);
	},

	/**
	 * Основная точка входа для вызова в рендере параллакса, вычисляет параметры и при необходимости рендерит
	 */
	process: function(forced) {
		var f = forced === 'forced'; // в RAF первым параметом передаётся текущий таймстамп в милисекундах
		if (!this.checkActive()) return;
		this.checkInterval(f);
		this.reflow();
		this.render(f);

		if (this.needElementShow) {
			this.options.parent.options.onElementShow(this, this.getProgress());
		}
	},

	/**
	 * Вычисляет выражения calc() из конфига анимаций
	 */
	parseCalc: function(value) {
		if (typeof value === 'string' && value.indexOf('calc(') === 0) {
			var newValue = 0,
				expression = value.substring(5, value.length-1),
				compiled = {},
				w = this.options.parent.viewport.width,
				h = this.options.parent.viewport.height;

			try {
				compiled = new Function('w, h', 'return ' + expression);
				newValue = compiled(w, h);
			} catch (e) {
				console.log('Error in expression: "' + expression + '"', e);
				newValue = parseInt(expression, 10);
				if (newValue !== newValue) newValue = 0;
			}

			return newValue
		} else return value
	},


	remove: function() {
		this.target.removeChild(this.html);
	},


	destroy: function() {
		// todo: отписаться от всех событий (сохранять их в _events?)
		this.remove();
		delete this.html;
	}
};

