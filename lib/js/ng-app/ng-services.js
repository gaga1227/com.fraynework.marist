'use strict';

/* Services */
angular.module('myApp.services', [])

/* ==========================================================================
   APP DATA
   ========================================================================== */

//appInfoFactory
.factory('AppInfoFactory', [function(){
	var data = {
		name: 		'Marist School App',
		version: 	'0.2.0',
		lastUpdate:	'2014-01'
	};
	return data;
}])

//appStaticFactory
.factory('AppStaticFactory', [function(){
	var data = {
		strShowAll: 'Show All',
		html404:	'<div class="acenter"><h3>Cannot find the requested page, please try again later!</h3></div>',
	};
	return data;
}])

/* ==========================================================================
   SECTIONS
   ========================================================================== */
.service('SectionService', ['$http', 
	function($http) {		
		//static sections data
		this.getSections = function() {
			return $http.get('data/sections.json');
		};
		//themes (static)
		this.getThemes = function(sec) {
			var theme = 'org';
			if (sec === 'events') {
				theme = 'blu'	
			} else if (sec === 'programmes') {
				theme = 'ppl'
			} else if (sec === 'publications') {
				theme = 'grn'
			} else if (sec === 'news') {
				theme = 'red'
			}
			return theme;
		};
	}
])

/* ==========================================================================
   LIST
   ========================================================================== */
.factory('ListFactory', [ '$resource',
	function($resource) {
		//get list from remote
		return $resource('data/:sectonID.json',
			{ 
				//paramDefaults 
			},
			{
				//override actions methods:
				query_events: 		{ method:'GET', params:{sectonID:'events'}, isArray:true },
				query_programmes:	{ method:'GET', params:{sectonID:'programmes'}, isArray:true },
				query_publications:	{ method:'GET', params:{sectonID:'publications'}, isArray:true },
				query_news:			{ method:'GET', params:{sectonID:'news'}, isArray:true },
				query_links:		{ method:'GET', params:{sectonID:'links'}, isArray:true }
			}
		);
	}
])

/* ==========================================================================
   PAGE(ARTICLE)
   ========================================================================== */
.factory('PageFactory', [ '$http',
	function($http) {
		//get page from remote
		return {
			getPage: function(id) {
				return $http.get('data/pages/' + id + '.html');
			}
		};
	}
])

/* ==========================================================================
   ALERT
   ========================================================================== */
.factory('alertFactory', [ '$resource',
	function($resource) {
		//get list from remote
		return $resource('data/alert.json',
			{ 
				//paramDefaults 
			},
			{
				//override actions methods:
				query: { method:'GET', params:{}, isArray:false },
			}
		);
	}
])

/* ==========================================================================
   LOCAL STORAGE
   ========================================================================== */
.service('LocalStorageService',
	function() {
		//vars
		var LS = window.localStorage;
		
		/* -------------------------------------------------------------------------- */
		/* methods */
		
		//getItem
		this.getItem = function(key) {
			var val = JSON.parse(LS.getItem(key));
			console.log('[LocalStorageService -> getItem()]', key, val);
			return val;
		};
		
		//setItem
		this.setItem = function(key, val) {
			LS.setItem(key, JSON.stringify(val));
			console.log('[LocalStorageService -> setItem()]', key, JSON.stringify(val));
		};
	}
);


