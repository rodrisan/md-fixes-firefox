$(function(){

	(function($) {
		$.fn.changeElementType = function(newType) {
			var attrs = {};

			$.each(this[0].attributes, function(idx, attr) {
				attrs[attr.nodeName] = attr.nodeValue;
			});

			this.replaceWith(function() {
				return $("<" + newType + "/>", attrs).append($(this).contents());
			});
		}
	})(jQuery);

    var $header = $('#file-toolbar');
    var $content = $('embed');

	// Check file extension
	var $src = $content.attr('src');
	if (typeof $src !== "undefined"){
		var $extension = $src.substr( ($src.lastIndexOf('.') +1) );
		
		switch($extension){
			case 'txt':
			case 'sql':
			case 'csv':
				$('embed').changeElementType('iframe');
				var $content = $('iframe');
			break;
		}
		
		var $window = $(window).on('resize', function(){
			var height = $(this).height() - $header.outerHeight() - 9;
			$content.css('margin-top', $header.outerHeight());
			$content.css('width', "100%");
			$content.css('border', '0', 'important');
			$content.height(height);
		}).trigger('resize'); //on page load
	}
	
});