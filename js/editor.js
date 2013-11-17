(function($) {

	var cfgFile = '',
		cfg = {},
		parallax = {},
		$editorContent = {};

	$(document).ready(initEditor);

	function initEditor() {
		$('.editCfg').draggable();
		$editorContent = $('.editCfg textarea');

		if (!location.hash) {
			error();
			return
		}
		cfgFile = location.hash.split('#')[1];
		if (!cfgFile) {
			error();
			return
		}
		$('.editorHead').html(cfgFile);
		loadConfig();
	}

	function loadConfig() {
		$.ajax({
			url: 'js/cfg/' + cfgFile,
			dataType: 'script',
			success: function(response) {
				$editorContent.val(response);
				cfg = animationCfg;
				startParallax();
				$editorContent.on('keyup paste', editHandler);
			},
			error: function() {
				error();
			}
		});
	}

	function startParallax() {
		parallax = new Parallax({
			cfg: animationCfg,
			auto: true,
			root: document.getElementById('parallaxWrap'),
			beforeRender: function() {},
			afterRender: function() {}
		});
	}

	function editHandler() {
		var newCfg = '';
		try {
			newCfg = eval($editorContent.val())
		} catch(e) {
			return;
		}
		parallax.stop();
		parallax.options.cfg = newCfg;
		parallax.start();
	}

	function error(msg) {
		alert(msg || 'error');
	}

}(jQuery));