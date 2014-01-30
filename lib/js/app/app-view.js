/* ------------------------------------------------------------------------------ */
/* App - view */
/* ------------------------------------------------------------------------------ */
window.App = (function(app){

	//create empty App obj if none found
	var App = app || {};

	/* ------------------------------------------------------------------------------ */
	/* view */
	App.view = {

		/* ------------------------------------------------------------------------------ */
		/* properties */
		
		//branch
		branch: '',

		//touch delay
		touchDelay: 100,
		
		//double click treshold
		dblClickTresh: 400,
		lastClick: { 
			el:			undefined, 
			timestamp:	undefined
		},
	
		//sliders
		slider: 			undefined, //new PageSlider( $('#container') ),
		
		//scrollers
		Scroller:			undefined,
		
		//transitionStatus
		transitionStatus: {
			pageSlider:		false,
		},
		
		//selectors
		selectors:	{
			
		},
		
		/* ------------------------------------------------------------------------------ */
		/* common */
		
		//initButtonsEvents
		initButtonsEvents: function() {
			var $doc = $(document);
			//common
			$doc.on('touchstart', '[data-role="button"], .btnTap', function(e) {
					console.log('------------------------------------------------');
					console.log('e:touchstart');
					var $this = $(this);
					$this.data('touchend', false);
					setTimeout( function(){
						if ( !$this.data('touchmove') && !$this.data('touchend') ) {
							$this.addClass('active');
						}
					}, App.view.touchDelay );
				})
				.on('touchmove', '[data-role="button"], .btnTap', function(e) {
					console.log('e:touchmove');
					$(this)
						.data('touchmove', true)
						.removeClass('active');
				})
				.on('touchend', '[data-role="button"], .btnTap', function(e) {
					console.log('e:touchend');
					$(this)
						.data('touchmove', false)
						.data('touchend', true)
						.removeClass('active');
				})
				.on('tap', '[data-role="button"], .btnTap', function(e) {
					console.log('e:tap');
					//alert('tap');
				})
				.on('longTap', '[data-role="button"], .btnTap', function(e) {
					console.log('e:longTap');
				})
				.on('click', '[data-role="button"], .btnTap', function(e) {
					//vars
					var tgt = e.target,
						ts = new Date().getTime(),
						lastClick = App.view.lastClick;
 
 					//if has last click, check if is double
					if (lastClick.el && lastClick.timestamp) {
						if ( ((ts - lastClick.timestamp) < App.view.dblClickTresh) && (tgt === lastClick.el) ) {
							console.log('Invalid double e:click blocked');
							e.preventDefault();
							return false;
						}
					}
					
					//otherwise, click is valid	
					App.view.lastClick = { el: tgt, timestamp: ts };
					console.log('e:click');
					//alert('click');
				});
		},
		
		//toggleLoader
		toggleLoader: function(showflag) {
			var $loader = $('#loader'),
				activeCls = 'active';
			if (!$loader.length) return 'no loader elem found';
			showflag ? $loader.addClass(activeCls) : $loader.removeClass(activeCls);
		},
		
		//initExternalLinks
		initExternalLinks: function(){
			$(document).on('click', '[data-link=external]', function(e){
				e.preventDefault();
				var $link = $(this),
					href = $link.attr('href');
				window.open(href, '_blank', 'location=yes,closebuttoncaption=Close,enableViewportScale=yes,transitionstyle=fliphorizontal');
			});
		},

		//initPageSlider
		initPageSlider: function(){
			//skip slicing files
			if ( window.location.href.indexOf('slicing') != -1 ) return false;
			//hashchange event handler
			function route(e) {
				var url = App.utils.getURLFromHash(),
					params = App.utils.getVarsFromSearch();
				App.data.getPage( url, params.dir );
			}
			//bind hashchange events
			$(window).on('hashchange', route);
			//kick-off initial update
			route();
		},

		/* ------------------------------------------------------------------------------ */
		/* scroller */
		
		//initScroller (requires FTScroll/iScroll)
		initScroller: function(){
			var	$container = $('[data-role=scroller]'),
				container;
			if (!$container.length) { return 'no scroller container found'; }
			//assign container, in case multiple instances
			container = ($container.length > 1) ? $container[1] : $container[0];
			//destroy scroller instance
			if (App.view.Scroller) {
				App.view.Scroller.destroy();
			}						
			//init scrolling plugin
			if (typeof(IScroll) == 'function') {
				App.view.Scroller = new IScroll(container, {
					scrollbars: 			true,
					click: 					Platform.iOS ? false : true,
					useTransition:			true,
					useTransform:			true,
					HWCompositing:			true
				});
			} else if (typeof(FTScroller) == 'function') {
				App.view.Scroller = new FTScroller(container, {
					scrollingX: 			false,
					scrollbars: 			true,
					updateOnChanges: 		true,
					updateOnWindowResize: 	true,
					bouncing:				true
				});	
			}
		},	
		
		/* ------------------------------------------------------------------------------ */
		/* controls */
		
		//initSwitch
		initSwitch: function(){
			var $switches = $('[data-role=switch]'),
				activeCls = 'checked';
			
			if (!$switches.length) {
				return 'no switch ctrl found!';
			}
	
			//event handler
			function updateSwitch($tgt, toggle){
				var $switch = $tgt,
					$chkbox = $switch.find('input'),
					checked = toggle ? !$chkbox.prop('checked') : $chkbox.prop('checked');
				if (checked) {
					$switch.addClass(activeCls);
				} else {
					$switch.removeClass(activeCls);
				}
				$chkbox.prop('checked', checked);
			}
	
			//bind button event
			$switches.on('click', function(e){
				var $switch = $(this);
				updateSwitch($switch, true);
			});
			$switches.on('swipeLeft swipeRight', function(e){
				console.log('b');
				var $switch = $(this),
					checked = $switch.find('input').prop('checked'),
					type = e.type;
				if ( (type == 'swipeLeft' && checked) || (type == 'swipeRight' && !checked) ) {
					updateSwitch($switch, true);
				}
			});
	
			//init states
			$.each($switches, function(idx,ele){
				updateSwitch($(ele), false);
			});
		},
		
		/* ------------------------------------------------------------------------------ */
		/* page */

		//initPage
		initPage: function( $page ){
			//vars
			var pageID = $page.attr('id');
			console.log( '[page load]: ' + pageID );
			
			//common
			$('body').addClass('inPageTransition inTransition');		
			
			//home
			if ( pageID == 'pgHome' ) {
				
			}
			
			//weeks
			else if ( pageID == 'pgCustom' ) {
				
			}
			
			//extra
			else {
				
			}
		},

		//initPageShown
		initPageShown: function( $page ){
			//vars
			var pageID = $page.attr('id'),
				hasScroller = ($page.attr('data-scroller') == '1') ? true : false;
			console.log( '[page shown]: ' + pageID + (hasScroller ? ' (has scroller)' : '') );
			
			//common
			$('body').removeClass('inPageTransition inTransition');
			
			if ( hasScroller ){ 
				App.view.initScroller();
			}
			
			//home
			if ( pageID == 'pgHome' ) {
				
			}
		},
		
		/* ------------------------------------------------------------------------------ */
		/* init */
		init: function(){
			//alert('app.view.init()');
			this.initButtonsEvents();
			//this.initPageSlider();
			this.initExternalLinks();
		}

	};

	return App;

})(window.App);
