// тестовый набор элементов
animationCfg = {
	minProgress: 0,
	maxProgress: 1000,

	mode: 2,

	updateFrequency: 50, // частота просчёта скорости и прогресса в герцах
	speed: 200, // абстрактные единицы прогресса за одну секунду
	accelera: 300, // абстрактные единицы прогресса за квадрат секунды
	// равенство скорости и замедления означает, что скорость уменьшается до нуля за 1 секунду

	touchSensitivity: 0.05,
	scrollSensitivity: -1,
	keyboardSensitivity: -1,

	elements: [{
		name: 'left-test',
		begin: 0, // точка прогресса, на которой появляется элемент
		end: 800, // точка прогресса, на которой исчезает элемент
		common: {  // статичные атрибуты, общие для всех интервалов
			width: 0.1,
			cssClass: 'left-test',
			//height: 0.1,
			opacity: 1,
			aspectRatio: 1.7 // отношение ширины к высоте (используется если задана только высота или только ширина)
		},
		milestones: [{ // точки изменения анимаций
			progress: 0,
			left: -0.1,
			top: 0,
			opacity: 0.2
		}, {
			progress: 200,
			left: 0.4,
			top: 0.4
		}, {
			progress: 400,
			left: 0.4,
			top: 0.7
		}, {
			progress: 800,
			left: 0.4,
			top: 1,
			opacity: 0.2
		}]
	}, {
		name: 'right-test',
		begin: 0,
		end: 800,
		common: {
			width: 0.1,
			cssClass: 'right-test', // css-класс можно переопределить для отдельного milestone
			//height: 0.1,
			opacity: 1,
			aspectRatio: 1.7
		},
		milestones: [{
			progress: 0,
			left: 1,
			top: 0,
			opacity: 0.2
			// cssClass, указанный здесь, будет действовать для интервала 0-200
		}, {
			progress: 200,
			left: 0.5,
			top: 0.4
		}, {
			progress: 400,
			left: 0.5,
			top: 0.7
		}, {
			progress: 800,
			left: 0.5,
			top: 1,
			opacity: 0.2
		}]
	}, {
		// узкая полоска в нижней части экрана, показывающая прогресс
		name: 'ползунок',
		begin: 0,
		end: 1000,
		common: {
			width: 0.1,
			height: 0.01,
			opacity: 1,
			cssClass: 'progress-bar'
		},
		milestones: [{
			progress: 0,
			left: 0,
			top: 0.99
		}, {
			progress: 1000,
			left: 0.9,
			top: 0.99
		}]
	}]
};
