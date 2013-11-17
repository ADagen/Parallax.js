/**
 * Элемент для параллакса, provide html-контейнер для контента
 * @param {object} options - опции отдельного элемента из конфига анимации
 */
Parallax.ElementTransform2D = function(options) {
	this.initialize(options);
};
Parallax.ElementTransform2D.prototype = Object.create(Parallax.Element.prototype);
Parallax.ElementTransform2D.prototype.constructor = Parallax.ElementTransform2D;

Parallax.ElementTransform2D.prototype.render = function() {
	//console.log(this.name, 'render', this.style);
	var transformString = '',
		style = this.style,
		o = this.oldStyle,
		html = this.html;

//	if (style['transform-origin'] && o['transform-origin'] !== style['transform-origin']) {
//		o['transform-origin'] = style['transform-origin'];
//		html.style['-webkit-transform-origin'] = style['transform-origin'];
//		html.style['-moz-transform-origin'] = style['transform-origin'];
//		html.style['-ms-transform-origin'] = style['transform-origin'];
//		html.style['-o-transform-origin'] = style['transform-origin'];
//		html.style['transform-origin'] = style['transform-origin'];
//	}

	if ((style.left || style.top) && (o.left !== style.left || o.top !== style.top)) {
		transformString += 'translate(' + style.left + 'px, ' + style.top + 'px) ';
		o.left = style.left;
		o.top = style.top;
	}

	if (style.rotate && o.rotate !== style.rotate) {
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

	if (style.width && o.width !== style.width) {
		html.style.width = style.width + 'px';
		o.width = style.width;
	}

	if (style.height && o.height !== style.height) {
		html.style.height = style.height + 'px';
		o.height = style.height
	}

	if (style.opacity && o.opacity !== style.opacity) {
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
/**
 * Основная точка входа для вызова в рендере параллакса, вычисляет параметры и при необходимости рендерит
 */
Parallax.ElementTransform2D.prototype.process = function(forced) {
	var f = forced === 'forced'; // в RAF первым параметом передаётся текущий таймстамп в милисекундах
	if (!this.checkActive()) return;
	this.checkInterval(f);
	this.reflow();
	this.render(f);
};
