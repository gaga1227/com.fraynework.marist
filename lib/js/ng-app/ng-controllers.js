'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngSanitize'])

/* section */
.controller('ListController', ['$scope', '$routeParams', '$location',
function($scope, $routeParams, $location) {

	/* -------------------------------------------------------------------------- */
	/* data */
	
	//sections
	$scope.sections = {
		events: 
		{ categories: [ 
			"Conferences, Colloquiums, Meetings",
			"Staff Programmes",
			"Retreats",
			"Student Events"
		]},
		programmes: 
		{ categories: [ 
			"Staff Programmes",
			"Additional Programmes by Request"
		]},
		publications: 
		{ categories: [ 
			"Champagnat Journal",
			"Lavalla Publication",
			"MSA Newsletters"
		]},
		news: 
		{ categories: [ 
		
		]},
		links: 
		{ categories: [ 
		
		]}
	};
	
	/* -------------------------------------------------------------------------- */
	/* properties */
	
	//get current params
	$scope.sectionID = $routeParams.sectionID;
	$scope.categoryID = $routeParams.categoryID;
	
	//currentSection
	$scope.categories = $scope.sections[$scope.sectionID];
	
	//check categories	
	$scope.hasCategories = $scope.categories.categories.length ? true : false;
	
	//filter value
	$scope.currentFilter = '';
	
	/* -------------------------------------------------------------------------- */
	/* functions */
	
	//filterList
	$scope.filterList = function(){
		var filter = $scope.currentFilter;
		$location.path($location.path() + '/cate-' + filter);
		console.log('[ListController] filtering list to:' + $location.path());
	}
	
}])

/* article */
.controller('ArticleController', ['$scope', '$routeParams',
function($scope, $routeParams) {
	
	$scope.sectionID = $routeParams.sectionID;
	$scope.articleID = $routeParams.articleID;
	
}])

/* page */
.controller('PageController', ['$scope', '$routeParams',
function($scope, $routeParams) {
	
	$scope.pageID = $routeParams.pageID;
	
}])

/* menu */
.controller('MenuController', ['$scope', '$routeParams',
function($scope, $routeParams) {
	//controls
	App.view.initSwitch();
}]);