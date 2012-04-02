(function($) {
	var resized = false;
	
	$(window).bind( "resize", function() {
		resized = true;
	});
	
	$.fn.moltenLeading = function( config ) {
		var o = $.extend( {
				minline: 1.2,
				maxline: 1.6,
				minwidth: 320,
				maxwidth: 1024
			}, config ),
			resizeTimer,
			hotlead = function( el ) {
				var $el = $( this !== window ? this : el ),
					widthperc = parseInt( ( $el.width() - o.minwidth ) / ( o.maxwidth - o.minwidth ) * 100, 10 ),
					linecalc = o.minline + ( o.maxline - o.minline ) * widthperc / 100;

				if ( widthperc <= 0 || linecalc < o.minline ) {
					linecalc = o.minline;
				} else if ( widthperc >= 100 || linecalc > o.maxline ) {
					linecalc = o.maxline;
				}

				$el.css( "lineHeight", linecalc );
				
				clearInterval(resizeTimer);
				resizeTimer = setInterval(function() {
					if ( resized ) {
						hotlead( $el );
					}
					resize = false;
				}, 250);
			};

		return this.each( hotlead );
	};
})(jQuery);