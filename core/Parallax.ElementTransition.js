/**
 * Элемент для параллакса, provide html-контейнер для контента
 * @param {object} options - опции отдельного элемента из конфига анимации
 */
Parallax.ElementTransition = function(options) {
	this.initialize(options);
	this.transitionTime = 0;
};
Parallax.ElementTransition.prototype = Object.create(Parallax.Element.prototype);
Parallax.ElementTransition.prototype.constructor = Parallax.ElementTransition;

Parallax.ElementTransition.prototype.getTransitionTime = function() {
	return this.options.parent.transitionTime;
};

Parallax.ElementTransition.prototype.render = function(forced) {
	//console.log(this.name, 'render', this.style);
	var transformString = 0,
		transitionTime = this.getTransitionTime(),
		//transitionString = 'all ease-out ' + transitionTime + 's',
		transitionString = 'all ease-in-out ' + transitionTime + 's',
		style = this.style,
		o = this.oldStyle,
		html = this.html;

	html.style['-webkit-transition'] = transitionString;
	html.style['-moz-transition'] = transitionString;
	html.style['-o-transition'] = transitionString;
	html.style['transition'] = transitionString;

	if (style.left && (o.left !== style.left || forced)) {
		html.style.left = style.left + 'px';
		o.left = style.left;
	}

	if (style.top && (o.top !== style.top || forced)) {
		html.style.top = style.top + 'px';
		o.top = style.top
	}

	if (style.rotate && (o.rotate !== style.rotate || forced)) {
		transformString += 'rotate(' + style.rotate + 'deg) ';
		o.rotate = style.rotate;
	}

	if (transformString) {
		html.style['-webkit-transform'] = transformString;
		html.style['-moz-transform'] = transformString;
		html.style['-ms-transform'] = transformString;
		html.style['-o-transform'] = transformString;
		html.style['transform'] = transformString;
	}

	if (style.width && (o.width !== style.width || forced)) {
		html.style.width = style.width + 'px';
		o.width = style.width;
	}

	if (style.height && (o.height !== style.height || forced)) {
		html.style.height = style.height + 'px';
		o.height = style.height
	}

	if (style.opacity && (o.opacity !== style.opacity || forced)) {
		html.style.opacity = style.opacity;
		o.opacity = style.opacity;
	}

	if (style.cssClass && o.cssClass !== style.cssClass) {
		html.setAttribute("class", style.cssClass);
		o.cssClass = style.cssClass;
	}

	if (style.domId && o.domId !== style.domId) {
		html.setAttribute("id", style.domId);
		o.domId = style.domId;
	}
};

Parallax.ElementTransition.prototype.getProgress = function() {
	return this.futureProgress;
};

/**
 * Основная точка входа для вызова в рендере параллакса, вычисляет параметры и при необходимости рендерит
 */
Parallax.ElementTransition.prototype.process = function(forced, futureProgress) {
	var f = forced === 'forced'; // в RAF первым параметом передаётся текущий таймстамп в милисекундах
	this.futureProgress = futureProgress;

	//if (this.futureProgress <= 0) console.log(this.futureProgress);
	if (!this.checkActive()) return;
	this.checkInterval(f);
	this.reflow();
	this.render(f);
};
