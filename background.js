$(function(){

    var $header = $('#file-toolbar');
    var $content = $('embed');
    var $window = $(window).on('resize', function(){
       var height = $(this).height() - $header.outerHeight();
       $content.height(height);
    }).trigger('resize'); //on page load

});