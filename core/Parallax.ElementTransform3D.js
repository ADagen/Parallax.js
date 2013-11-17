/**
 * Элемент для параллакса, provide html-контейнер для контента
 * @param {object} options - опции отдельного элемента из конфига анимации
 */
Parallax.ElementTransform3D = function(options) {
	this.initialize(options);
	this.addTransformStyles();
};
Parallax.ElementTransform3D.prototype = Object.create(Parallax.Element.prototype);
Parallax.ElementTransform3D.prototype.constructor = Parallax.ElementTransform3D;

Parallax.ElementTransform3D.prototype.addTransformStyles = function() {
	var s = this.html.style;
	s['-webkit-transform-style'] = 'flat';
	s['-moz-transform-style'] = 'flat';
	s['-o-transform-style'] = 'flat';
	s['transform-style'] = 'flat';
};

Parallax.ElementTransform3D.prototype.render = function() {
	//console.log(this.name, 'render', this.style);
	var transformString = '',
		style = this.style,
		o = this.oldStyle,
		html = this.html;

	if ((style.left || style.top) && (o.left !== style.left || o.top !== style.top)) {
		transformString += 'translate3d(' + style.left + 'px, ' + style.top + 'px, 0px) ';
		o.left = style.left;
		o.top = style.top;
	}

	if (style.rotate && o.rotate !== style.rotate) {
		transformString += 'rotateZ(' + style.rotate + 'deg) ';
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