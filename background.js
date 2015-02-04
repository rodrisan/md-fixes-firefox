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

	var $src = $content.attr('src');
	if ($src.toLowerCase().indexOf(".txt") >= 0){
		$('embed').changeElementType('iframe');
		var $content = $('iframe');
	}
	
    var $window = $(window).on('resize', function(){
		var height = $(this).height() - $header.outerHeight() - 9;
		$content.css('margin-top', $header.outerHeight());
		$content.css('width', "100%");
		$content.css('border', '0', 'important');
		$content.height(height);
    }).trigger('resize'); //on page load
	
});