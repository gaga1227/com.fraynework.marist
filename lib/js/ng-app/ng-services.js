'use strict';

/* Services */
angular.module('myApp.services', [])

/* ==========================================================================
   APP DATA
   ========================================================================== */

//appStaticFactory
.factory('AppStaticFactory', [function(){
	var data = {
		webServiceURL: 	'http://192.168.17.18/web/msaeduau/_lib/gcl/webservice/_lib/publicService.cfc',
		strShowAll: 	'Show All',
		html404:		'<div class="acenter"><h3>Cannot find the requested page, please try again later!</h3></div>',
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
.factory('ListFactory', [ '$resource', 'AppStaticFactory',
	function($resource, AppStaticFactory) {
		//get list from remote
		return $resource(AppStaticFactory.webServiceURL + '?method=:method',
			{ 
				//paramDefaults 
			},
			{
				//override actions methods:
				query_events: 		{ method:'GET', params:{method:'getEvents'}, isArray:true },
				query_programmes:	{ method:'GET', params:{method:'getPrograms'}, isArray:true },
				query_publications:	{ method:'GET', params:{method:'getPublications'}, isArray:true },
				query_news:			{ method:'GET', params:{method:'getNews'}, isArray:true },
				query_links:		{ method:'GET', params:{method:'getLinks'}, isArray:true }
			}
		);
	}
])

/* ==========================================================================
   ARTICLE
   ========================================================================== */
.factory('ArticleFactory', [ '$resource', 'AppStaticFactory',
	function($resource, AppStaticFactory) {
		//get article from remote
		return $resource(AppStaticFactory.webServiceURL + '?method=:method&id=:id',
			{ 
				//paramDefaults 
			},
			{
				//override actions methods:
				query_events_article: 		{ method:'GET', params:{method:'getEventsByID', id:'@id'}, isArray:true },
				query_programmes_article:	{ method:'GET', params:{method:'getProgramsByID', id:'@id'}, isArray:true },
				query_news_article:			{ method:'GET', params:{method:'getNewsByID', id:'@id'}, isArray:true },
			}
		);
	}
])

/* ==========================================================================
   PAGE
   ========================================================================== */
.factory('PageFactory', [ '$http', 'AppStaticFactory',
	function($http, AppStaticFactory) {
		//get page from remote
		return {
			getPage: function(id) {
				return $http.get(AppStaticFactory.webServiceURL + '?method=getPagesByID&id=' + id);
			},
			getLocalPage: function(id) {
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


