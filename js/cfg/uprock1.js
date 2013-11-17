// тестовый набор элементов
animationCfg = {
	minProgress: 0,
	maxProgress: 2300,

	mode: 3,
	// 0 - без анимации
	// 1 - transition
	// 2 - transform2d, requestAnimationFrame()
	// 3 - transform3d, requestAnimationFrame()

	updateFrequency: 50,
	speed: 100, // стартовая скорость в секунду, которую получает курсор прогресса при скролле
	accelera: 150, // уменьшение скорости за 1 секунду

	swipeVelocity: 100, // скорость в секунду при свайпе

	touchSensitivity: -0.05,
	scrollSensitivity: -1,
	inertialScrollSensitivity: -1.5, // скролл для инерциальных Эппловских трекпадов и Magic мышек
	keyboardSensitivity: -2,

	elements: [{
		name: 's1-background',
		begin: 0,
		end: 400,
		common: {
			width: 1,
			aspectRatio: 1.4,
			left: 0,
			top: 'calc((h - 0.719 * w) / h)',
			domId: 's1-background'
		},
		milestones: [{
			progress: 0
		}, {
			progress: 400
		}]
	},{
		name: 'env-fog-1',
		begin: 0,
		end: 400,
		common: {
			width: 1.12,
			aspectRatio: 3.62,
			left: 0.06,
			top: 'calc((h - 0.23 * w) / h)', // высота рассчитывается от нижнего края вьюпорта
			//cssClass: 'uprock-logo'
			domId: 'env-fog-1'
		},
		milestones: [{
			progress: 0
		}, {
			progress: 600,
			left: -0.15
		}]
	}, {
		name: 'env-fog-2',
		begin: 0,
		end: 400,
		common: {
			width: 1.12,
			aspectRatio: 3.62,
			left: 0.06,
			top: 'calc((h - 0.23 * w) / h)', // высота рассчитывается от нижнего края вьюпорта
			//cssClass: 'uprock-logo'
			domId: 'env-fog-2'
		},
		milestones: [{
			progress: 0
		}, {
			progress: 600,
			left: -0.15
		}]
	}, {
		name: 'env-castle',
		begin: 0,
		end: 400,
		common: {
			width: 1.12,
			aspectRatio: 3.62,
			left: 0.06,
			top: 'calc((h - 0.31 * w) / h)', // высота рассчитывается от нижнего края вьюпорта
			//cssClass: 'uprock-logo'
			domId: 'env-castle'
		},
		milestones: [{
			progress: 0
		}, {
			progress: 600,
			left: -0.2
		}]
	}, {
		name: 's1-fog-4',
		begin: 0,
		end: 400,
		common: {
			width: 1.24,
			aspectRatio: 4.2,
			left: 0,
			top: 'calc((h - 0.31 * w) / h)', // высота рассчитывается от нижнего края вьюпорта
			domId: 's1-fog-4'
		},
		milestones: [{
			progress: 0
		}, {
			progress: 600,
			left: -0.3
		}]
	}, {
		name: 'logo',
		begin: 0,
		end: 400,
		common: {
			width: 0.54,
			aspectRatio: 2.64,
			left: 0.23,
			top: 'calc((h - 0.49 * w) / h)', // высота рассчитывается от нижнего края вьюпорта
			//cssClass: 'uprock-logo'
			domId: 'uprock-logo'
		},
		milestones: [{
			progress: 0
		}, {
			progress: 600,
			left: -0.75
		}]
	},{
		name: 'motto',
		begin: 0,
		end: 300,
		common: {
			width: 0.348,
			aspectRatio: 40.5,
			left: 0.326,
			top: 'calc((h - 0.248 * w) / h)', // высота рассчитывается от нижнего края вьюпорта
			domId: 'uprock-motto'
		},
		milestones: [{
			progress: 0
		}, {
			progress: 300,
			left: -0.5
		}]
	},{
		name: 'motto-from',
		begin: 0,
		end: 150,
		common: {
			width: 0.164,
			aspectRatio: 17.62,
			left: 0.418,
			top: 'calc((h - 0.228 * w) / h)', // высота рассчитывается от нижнего края вьюпорта
			domId: 'uprock-motto-from'
		},
		milestones: [{
			progress: 0
		}, {
			progress: 150,
			left: -0.5
		}]
	},{
		name: 'scroll-hint',
		begin: 0,
		end: 100,
		common: {
			width: 0.0754,
			aspectRatio: 1.11,
			left: 0.4623,
			top: 'calc((h - 0.187 * w) / h)', // высота рассчитывается от нижнего края вьюпорта
			domId: 'uprock-scroll-hint'
		},
		milestones: [{
			progress: 0,
			opacity: 1
		}, {
			progress: 100,
			opacity: 0
		}]
	},{
		name: 'stand-ninja',
		begin: 0,
		end: 400,
		common: {
			width: 0.25,
			aspectRatio: 0.51,
			left: -0.02,
			top: 'calc((h - 0.45 * w) / h)', // высота рассчитывается от нижнего края вьюпорта
			domId: 'stand-ninja'
		},
		milestones: [{
			progress: 0,
			opacity: 1
		}, {
			progress: 500,
			left: -0.35
		}]
	}, {
		name: 's1-tree-1',
		begin: 0,
		end: 400,
		common: {
			width: 0.289,
			aspectRatio: 2.16,
			left: 0.3,
			top: 'calc((h - 0.132 * w) / h)', // высота рассчитывается от нижнего края вьюпорта
			domId: 's1-tree-1'
		},
		milestones: [{
			progress: 0,
			opacity: 1
		}, {
			progress: 500,
			left: 0
		}]
	}, {
		name: 's1-fog-5',
		begin: 0,
		end: 400,
		common: {
			width: 0.881,
			aspectRatio: 3.48,
			left: 0,
			top: 'calc((h - 0.253 * w) / h)', // высота рассчитывается от нижнего края вьюпорта
			domId: 's1-fog-5'
		},
		milestones: [{
			progress: 0
		}, {
			progress: 500,
			left: -0.4
		}]
	}, {
		name: 's1-tree-3',
		begin: 0,
		end: 400,
		common: {
			width: 0.257,
			aspectRatio: 2.98,
			left: 0.65,
			top: 'calc((h - 0.0864 * w) / h)', // высота рассчитывается от нижнего края вьюпорта
			domId: 's1-tree-3'
		},
		milestones: [{
			progress: 0,
			opacity: 1
		}, {
			progress: 500,
			left: 0.3
		}]
	}, {
		name: 's1-tree-4',
		begin: 0,
		end: 400,
		common: {
			width: 0.322,
			aspectRatio: 1.9,
			left: 0.83,
			top: 'calc((h - 0.169 * w) / h)', // высота рассчитывается от нижнего края вьюпорта
			domId: 's1-tree-4'
		},
		milestones: [{
			progress: 0,
			opacity: 1
		}, {
			progress: 500,
			left: 0.48
		}]
	}, {
		name: 's1-stone-1',
		begin: 0,
		end: 400,
		common: {
			width: 0.261,
			aspectRatio: 2.79,
			left: 0.83,
			top: 'calc((h - 0.094 * w) / h)', // высота рассчитывается от нижнего края вьюпорта
			domId: 's1-stone-1'
		},
		milestones: [{
			progress: 0,
			opacity: 1
		}, {
			progress: 500,
			left: 0.43
		}]
	}, {
		name: 's1-tree-5',
		begin: 0,
		end: 400,
		common: {
			width: 0.228,
			aspectRatio: 1.54,
			left: 0.92,
			top: 'calc((h - 0.135 * w) / h)', // высота рассчитывается от нижнего края вьюпорта
			domId: 's1-tree-5'
		},
		milestones: [{
			progress: 0,
			opacity: 1
		}, {
			progress: 500,
			left: 0.4
		}]
	}, {
		name: 's1-fog-6',
		begin: 0,
		end: 400,
		common: {
			width: 0.648,
			aspectRatio: 5.09,
			left: 0.52,
			top: 'calc((h - 0.127 * w) / h)', // высота рассчитывается от нижнего края вьюпорта
			domId: 's1-fog-6'
		},
		milestones: [{
			progress: 0
		}, {
			progress: 500,
			left: 0
		}]
	}, {
		name: 's1-stone-2',
		begin: 0,
		end: 400,
		common: {
			width: 0.52,
			aspectRatio: 4.32,
			left: 0,
			top: 'calc((h - 0.119 * w) / h)', // высота рассчитывается от нижнего края вьюпорта
			domId: 's1-stone-2'
		},
		milestones: [{
			progress: 0,
			opacity: 1
		}, {
			progress: 500,
			left: -0.4
		}]
	}, {
		name: 's1-fog-7',
		begin: 0,
		end: 400,
		common: {
			width: 1.005,
			aspectRatio: 5.67,
			left: 0,
			top: 'calc((h - 0.177 * w) / h)', // высота рассчитывается от нижнего края вьюпорта
			domId: 's1-fog-7'
		},
		milestones: [{
			progress: 0
		}, {
			progress: 500,
			left: -0.4
		}]
	}, {
		name: 's2-background',
		begin: 400,
		end: 1170,
		common: {
			width: 1,
			aspectRatio: 0.59,
			left: 0,
			top: 0,
			domId: 's2-background'
		},
		milestones: [{
			progress: 400,
			top: 0
		},{
			progress: 940,
			top: 0
		}, {
			progress: 1170,
			top: -1
		}]
	}, {
		name: 's2-e-1',
		begin: 800,
		end: 1170,
		common: {
			width: 1,
			aspectRatio: 0.89,
			left: 0,
			top: 1,
			domId: 's2-e-1'
		},
		milestones: [{
			progress: 800
		}, {
			progress: 1170,
			top: 'calc((h - 1.12 * w) / h)'
		}]
	}, {
		name: 's2-e-2',
		begin: 800,
		end: 1170,
		common: {
			width: 1,
			aspectRatio: 1.14,
			left: 0,
			top: 1.04,
			domId: 's2-e-2'
		},
		milestones: [{
			progress: 800
		},{
			progress: 900
		}, {
			progress: 1170,
			top: 'calc((h - 0.87 * w) / h)'
		}]
	}, {
		name: 's2-e-3',
		begin: 800,
		end: 1170,
		common: {
			width: 0.7,
			aspectRatio: 1.19,
			left: 0.3,
			top: 1.12,
			domId: 's2-e-3'
		},
		milestones: [{
			progress: 800
		},{
			progress: 1000
		}, {
			progress: 1170,
			top: 'calc((h - 0.55 * w) / h)'
		}]
	}, {
		name: 's2-clouds',
		begin: 400,
		end: 1200,
		common: {
			width: 1,
			aspectRatio: 1.85,
			left: 0,
			top: 'calc((h - 0.43 * w) / h)',
			domId: 's2-clouds'
		},
		milestones: [{
			progress: 400
		}, {
			progress: 940
		}, {
			progress: 1200,
			top: -1
		}]
	}, {
		name: 's1-portfolio-1',
		begin: 250,
		end: 800,
		common: {
			width: 0.25,
			aspectRatio: 0.333333333,
			left: 0,
			top: 'calc((-0.75 * w) / h)',
			domId: 's1-portfolio-1'
		},
		milestones: [{
			progress: 250
		}, {
			progress: 400,
			top: 0
		}, {
			progress: 800,
			top: 1
		}]
	}, {
		name: 's1-portfolio-2',
		begin: 200,
		end: 800,
		common: {
			width: 0.25,
			aspectRatio: 0.333333333,
			left: 0.25,
			top: 1,
			domId: 's1-portfolio-2'
		},
		milestones: [{
			progress: 200,
			top: 1
		}, {
			progress: 400,
			top: 0
		}, {
			progress: 800,
			top: 'calc((-0.75 * w) / h)'
		}]
	}, {
		name: 's1-portfolio-3',
		begin: 150,
		end: 800,
		common: {
			width: 0.25,
			aspectRatio: 0.333333333,
			left: 0.5,
			top: 'calc((-0.75 * w) / h)',
			domId: 's1-portfolio-3'
		},
		milestones: [{
			progress: 150
		}, {
			progress: 400,
			top: 0
		}, {
			progress: 800,
			top: 1
		}]
	}, {
		name: 's1-portfolio-4',
		begin: 100,
		end: 800,
		common: {
			width: 0.25,
			aspectRatio: 0.333333333,
			left: 0.75,
			top: 1,
			domId: 's1-portfolio-4'
		},
		milestones: [{
			progress: 100,
			top: 1
		},{
			progress: 400,
			top: 0
		}, {
			progress: 800,
			top: 'calc((-0.75 * w) / h)'
		}]
	}, {
		name: 's2-ninja',
		begin: 780,
		end: 1170,
		common: {
			width: 0.2,
			aspectRatio: 1.08,
			left: -0.2,
			top: 0.3,
			domId: 's2-ninja'
		},
		milestones: [{
			progress: 780,
			left: -1
		}, {
			progress: 860,
			left: 0.3
		}, {
			progress: 940,
			left: 0.3
		}, {
			progress: 1170,
			top: -1.5,
			left: 0.3
		}]
	}, {
		name: 's2-tower',
		begin: 800,
		end: 1170,
		common: {
			width: 0.581,
			aspectRatio: 0.74,
			left: 0.42,
			top: 1.18,
			domId: 's2-tower'
		},
		milestones: [{
			progress: 800
		},{
			progress: 1000
		}, {
			progress: 1170,
			top: 'calc((h - 0.67 * w) / h)'
		}]
	}, {
		name: 's2-roof-1',
		begin: 800,
		end: 1170,
		common: {
			width: 1,
			aspectRatio: 3.02,
			left: 0,
			top: 1.37,
			domId: 's2-roof-1'
		},
		milestones: [{
			progress: 800
		},{
			progress: 1100
		}, {
			progress: 1170,
			top: 'calc((h - 0.2 * w) / h)'
		}]
	}, {
		name: 's2-roof-2',
		begin: 800,
		end: 1170,
		common: {
			width: 0.5,
			aspectRatio: 1.8,
			left: 0,
			top: 1.7,
			domId: 's2-roof-2'
		},
		milestones: [{
			progress: 800
		},{
			progress: 1100
		}, {
			progress: 1170,
			top: 'calc((h - 0.27 * w) / h)'
		}]
	}, {
		name: 's2-clip-left',
		begin: 1170,
		end: 1380,
		common: {
			width: 0.5,
			aspectRatio: 0.63,
			left: 0,
			top: 'calc((h - 0.8 * w) / h)',
			domId: 's2-clip-left'
		},
		milestones: [{
			progress: 1170
		},{
			progress: 1230
		},{
			progress: 1380,
			top: 1
		}]
	}, {
		name: 's2-clip-right',
		begin: 1170,
		end: 1380,
		common: {
			width: 0.5,
			aspectRatio: 0.63,
			left: 0.5,
			top: 'calc((h - 0.8 * w) / h)',
			domId: 's2-clip-right'
		},
		milestones: [{
			progress: 1170
		},{
			progress: 1230
		},{
			progress: 1380,
			top: 'calc((-0.8 * w) / h)'
		}]
	}, {
		name: 's2-about-left',
		begin: 1170,
		end: 1600,
		common: {
			width: 0.5,
			aspectRatio: 0.63,
			left: 0,
			top: 'calc((h - 1.6 * w) / h)',
			domId: 's2-about-left',
			cssClass: 'enableSelect'
		},
		milestones: [{
			progress: 1170
		},{
			progress: 1230
		}, {
			progress: 1380,
			//top: 'calc((h - 0.8 * w) / h)'
			top: 0
		}, {
			progress: 1420,
			//top: 'calc((h - 0.8 * w) / h)'
			top: 0
		}, {
			progress: 1600,
			top: 1
		}]
	}, {
		name: 's2-about-right',
		begin: 1170,
		end: 1600,
		common: {
			width: 0.5,
			aspectRatio: 0.63,
			left: 0.5,
			top: 1,
			domId: 's2-about-right',
			cssClass: 'enableSelect'
		},
		milestones: [{
			progress: 1170
		},{
			progress: 1230
		}, {
			progress: 1380,
			top: 0
		}, {
			progress: 1420,
			top: 0
		}, {
			progress: 1600,
			top: 'calc((-0.8 * w) / h)'
		}]
	}, {
		name: 's3-bg-1',
		begin: 1600,
		end: 2080,
		common: {
			width: 0.25,
			aspectRatio: 0.35,
			left: 0,
			top: 'calc((-0.715 * w) / h)',
			domId: 's3-bg-1'
		},
		milestones: [{
			progress: 1600
		}, {
			progress: 1750,
			top: 'calc((h - 0.715 * w) / h)'
		}, {
			progress: 2080,
			top: 'calc((h - 0.7151 * w) / h)'
		}]
	}, {
		name: 's3-bg-2',
		begin: 1600,
		end: 2080,
		common: {
			width: 0.25,
			aspectRatio: 0.35,
			left: 0.25,
			top: 1,
			domId: 's3-bg-2'
		},
		milestones: [{
			progress: 1600
		}, {
			progress: 1750,
			top: 'calc((h - 0.715 * w) / h)'
		}, {
			progress: 2080,
			top: 'calc((h - 0.7151 * w) / h)'
		}]
	}, {
		name: 's3-bg-3',
		begin: 1600,
		end: 2080,
		common: {
			width: 0.25,
			aspectRatio: 0.35,
			left: 0.5,
			top: 'calc((-0.715 * w) / h)',
			domId: 's3-bg-3'
		},
		milestones: [{
			progress: 1600
		}, {
			progress: 1750,
			top: 'calc((h - 0.715 * w) / h)'
		}, {
			progress: 2080,
			top: 'calc((h - 0.7151 * w) / h)'
		}]
	}, {
		name: 's3-bg-4',
		begin: 1600,
		end: 2080,
		common: {
			width: 0.25,
			aspectRatio: 0.35,
			left: 0.75,
			top: 1,
			domId: 's3-bg-4'
		},
		milestones: [{
			progress: 1600
		}, {
			progress: 1750,
			top: 'calc((h - 0.715 * w) / h)'
		}, {
			progress: 2080,
			top: 'calc((h - 0.7151 * w) / h)'
		}]
	}, {
		name: 's3-ninja',
		begin: 1750,
		end: 2080,
		common: {
			width: 0.4,
			aspectRatio: 1.13,
			left: 0,
			top: 'calc((h - 0.34 * w) / h)',
			opacity: 0,
			domId: 's3-ninja'
		},
		milestones: [{
			progress: 1750
		}, {
			progress: 1850,
			opacity: 1
		}, {
			progress: 2150,
			opacity: 1
		}]
	}, {
		name: 'google-map',
		begin: 2150,
		end: Infinity,
		common: {
			width: 1,
			height: 1,
			left: 0,
			top: 0,
			domId: 'google-map',
			cssClass: 'google-map'
		},
		milestones: [{
			progress: 2150
		}, {
			progress: Infinity
		}]
	},{
		name: 's4-room-left',
		begin: 2150,
		end: 2230,
		common: {
			width: 1,
			aspectRatio: 1.4,
			left: 0,
			top: 'calc((h - 0.71 * w) / h)',
			domId: 's4-room-left'
		},
		milestones: [{
			progress: 2149
		}, {
			progress: 2150
		}, {
			progress: 2200,
			left: -0.5
		}, {
			progress: 2230,
			left: -1.5
		}]
	}, {
		name: 's4-room-right',
		begin: 2150,
		end: 2230,
		common: {
			width: 1,
			aspectRatio: 1.4,
			left: 0,
			top: 'calc((h - 0.71 * w) / h)',
			domId: 's4-room-right'
		},
		milestones: [{
			progress: 2149
		}, {
			progress: 2150
		}, {
			progress: 2200,
			left: 0.5
		}, {
			progress: 2230,
			left: 1.5
		}]
	}, {
		name: 's4-cut-stripe',
		begin: 2130,
		end: 2150,
		common: {
			width: 2,
			aspectRatio: 140,
			left: -0.345,
			top: 1,
			rotate: -128,
			domId: 's4-cut-stripe'
		},
		milestones: [{
			progress: 2130,
			opacity: 1
		}, {
			progress: 2150,
			opacity: 0
		}]
	}]
};
