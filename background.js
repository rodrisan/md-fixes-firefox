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

	// Define: Linkify plugin
	(function($){

	  var url1 = /(^|&lt;|\s)(www\..+?\..+?)(\s|&gt;|$)/g,
		  url2 = /(^|&lt;|\s)(((https?|ftp):\/\/|mailto:).+?)(\s|&gt;|$)/g,

		  linkifyThis = function () {
			var childNodes = this.childNodes,
				i = childNodes.length;
			while(i--)
			{
			  var n = childNodes[i];
			  if (n.nodeType == 3) {
				var html = $.trim(n.nodeValue);
				if (html)
				{
				  html = html.replace(/&/g, '&amp;')
							 .replace(/</g, '&lt;')
							 .replace(/>/g, '&gt;')
							 .replace(url1, '$1<a href="http://$2">$2</a>$3')
							 .replace(url2, '$1<a href="$2">$2</a>$5');
				  $(n).after(html).remove();
				}
			  }
			  else if (n.nodeType == 1  &&  !/^(a|button|textarea)$/i.test(n.tagName)) {
				linkifyThis.call(n);
			  }
			}
		  };

	  $.fn.linkify = function () {
		return this.each(linkifyThis);
	  };

	})(jQuery);

	// Usage example:
	$('div.cfContent').linkify();
	
});