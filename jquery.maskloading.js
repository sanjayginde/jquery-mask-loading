/**
 * @author Sanjay Ginde
 */

(function($) {
    $.fn.exists = function() {
		return ($(this).length > 0) ? true : false;
    };

	$.fn.is_empty = function() {
		return ($(this).length === 0) ? true : false;
    };
})(jQuery);

(function($) {

	function getContainer(element) {
		var $container = $(element);
		if (!$container.hasClass('maskable') && $container.closest('.maskable').exists()) {
			$container = $container.closest('.maskable');
		}

		return $container;
	}

	$.fn.maskLoading = function(options) {
		var defaults = {
			maskClass : 'loading-mask',
			maskInnerHtml : '<div class="loading"></div>',
			load_url: null
		};

    var settings = $.extend(defaults, options);
    return this.each(function() {
      var $container = getContainer($(this));

      if($container.find('.' + settings.maskClass).exists()) {
        return;
      }

      var loadingMask = $('<div></div>').addClass(settings.maskClass);
      if (settings.maskInnerHtml) {
        loadingMask.html(settings.maskInnerHtml);
      }
      loadingMask.height('100%');
      loadingMask.width('100%');

      $container.append(loadingMask);

			//IE wasn't displaying the mask without a repaint
			var visible = $container.is(':visible');
			$container.hide().toggle(visible);

			if (!!settings.load_url) {
				$container.load(settings.load_url)
			}

		});
	};

	$.fn.unmaskLoading = function(options) {
		var defaults = {
			maskSelector : '.loading-mask'
		};

		var settings = $.extend(defaults, options);
		return this.each(function() {
			var $container = getContainer($(this));
			$container.find(settings.maskSelector).remove();
		});
	};


})(jQuery);
