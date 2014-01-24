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
		version: 	'0.1.0',
		lastUpdate:	'2014-01'
	};
	return data;
}])

//appStaticFactory
.factory('AppStaticFactory', [function(){
	var data = {
		strShowAll: 'Show All'
	};
	return data;
}])

/* ==========================================================================
   SECTIONS
   ========================================================================== */
.service('SectionService', [ 'AppStaticFactory',
	function(AppStaticFactory) {
		//vars
		var showAll = AppStaticFactory.strShowAll;
		
		//static sections data
		this.getSections = function() {
			return {
				events: [ 
					{ value: showAll },
					{ value: "Conferences, Colloquiums, Meetings" },
					{ value: "Staff Programmes" },
					{ value: "Retreats" },
					{ value: "Student Events" }
				],
				programmes: [ 
					{ value: showAll },
					{ value: "Staff Programmes" },
					{ value: "Additional Programmes by Request" }
				],
				publications: [ 
					{ value: showAll },
					{ value: "Champagnat Journal" },
					{ value: "Lavalla Publication" },
					{ value: "MSA Newsletters" }
				],
				news: [ 
					{ value: showAll },
					{ value: "2014" },
					{ value: "2013" },
					{ value: "2012" }
				],
				links: [ 
					
				]
			};
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
				queryEvents: { method:'GET', params:{sectonID:'events'}, isArray:true }
			}
		);
	}
])

/* ==========================================================================
   ARTICLE
   ========================================================================== */
.service('ArticleService', [
	function() {
		
	}
])

/* ==========================================================================
   PAGE
   ========================================================================== */
.service('PageService', [
	function() {
		
	}
]);

