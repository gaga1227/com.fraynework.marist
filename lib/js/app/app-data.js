/* ------------------------------------------------------------------------------ */
/* App - data */
/* ------------------------------------------------------------------------------ */
window.App = (function(app){

	//create empty App obj if none found
	var App = app || {};

	/* ------------------------------------------------------------------------------ */
	/* data */
	App.data = {
		
		/* ------------------------------------------------------------------------------ */
		/* data */
		
		//settings
		settings: {},
		
		//msg
		msg: {
			connection_error:[
				"Data request failed",
				"Please make sure your device has a working connection and try again."
			]
		},
		
		/* ------------------------------------------------------------------------------ */
		//init
		init: function() {
			
		}
		
	}

	return App;

})(window.App);
