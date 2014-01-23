'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngSanitize'])


/* ==========================================================================
   LIST
   ========================================================================== */
.controller('ListController', ['$scope', '$routeParams', '$location',
function($scope, $routeParams, $location) {
	
	/* -------------------------------------------------------------------------- */
	/* vars */
	var stringShowAll = 'Show All';
	
	/* -------------------------------------------------------------------------- */
	/* data */
	
	//sections
	$scope.sections = {
		events: [ 
			{ value: stringShowAll },
			{ value: "Conferences, Colloquiums, Meetings" },
			{ value: "Staff Programmes" },
			{ value: "Retreats" },
			{ value: "Student Events" }
		],
		programmes: [ 
			{ value: stringShowAll },
			{ value: "Staff Programmes" },
			{ value: "Additional Programmes by Request" }
		],
		publications: [ 
			{ value: stringShowAll },
			{ value: "Champagnat Journal" },
			{ value: "Lavalla Publication" },
			{ value: "MSA Newsletters" }
		],
		news: [ 
			{ value: stringShowAll },
			{ value: "2014" },
			{ value: "2013" },
			{ value: "2012" }
		],
		links: [ 
			
		]
	};
	
	/* -------------------------------------------------------------------------- */
	/* properties */
	
	//get current params
	$scope.sectionID = $routeParams.sectionID;
	$scope.categoryID = $routeParams.categoryID;
	
	//currentSection
	$scope.categories = $scope.sections[$scope.sectionID];
	
	//check categories	
	$scope.hasCategories = $scope.categories.length ? true : false;
	
	//filter value
	$scope.currentFilter = $routeParams.categoryID ? $routeParams.categoryID : stringShowAll;
	
	//showFilter
	$scope.showFilter = $scope.hasCategories && ($scope.currentFilter != stringShowAll);
	console.log($scope.hasCategories);
	
	/* -------------------------------------------------------------------------- */
	/* functions */
	
	//filterList
	$scope.filterList = function(){
		var sec = $scope.sectionID,
			cate = $scope.currentFilter;
		$location.path('/sec-' + sec + '/cate-' + cate);
		console.log('[ListController] filtering list to:' + $location.path());
	}
	
}])


/* ==========================================================================
   ARTICLE
   ========================================================================== */
.controller('ArticleController', ['$scope', '$routeParams',
function($scope, $routeParams) {
	
	$scope.sectionID = $routeParams.sectionID;
	$scope.articleID = $routeParams.articleID;
	
}])


/* ==========================================================================
   PAGE
   ========================================================================== */
.controller('PageController', ['$scope', '$routeParams',
function($scope, $routeParams) {
	
	$scope.pageID = $routeParams.pageID;
	
}])


/* ==========================================================================
   MENU
   ========================================================================== */
.controller('MenuController', ['$scope', '$routeParams',
function($scope, $routeParams) {
	//controls
	App.view.initSwitch();
}]);