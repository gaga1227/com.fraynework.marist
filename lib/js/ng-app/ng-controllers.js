'use strict';

/* Controllers */
angular.module('myApp.controllers', ['ngSanitize'])

/* ==========================================================================
   LIST
   ========================================================================== */
.controller('ListController', 
['$scope', '$routeParams', '$location', 
 'AppStaticFactory', 'SectionService', 'ListFactory',
function($scope, $routeParams, $location, AppStaticFactory, SectionService, ListFactory) {
	//vars
	var showAll = AppStaticFactory.strShowAll;
	
	/* -------------------------------------------------------------------------- */
	/* properties */
	
	//sections and filter
	$scope.sections = SectionService.getSections();
	$scope.sectionID = $routeParams.sectionID;
	$scope.categoryID = $routeParams.categoryID;
	$scope.categories = $scope.sections[$scope.sectionID];
	$scope.hasCategories = $scope.categories.length ? true : false;
	$scope.currentFilter = $routeParams.categoryID ? $routeParams.categoryID : showAll;
	$scope.listFilter = $scope.currentFilter == showAll ? '' : $scope.currentFilter;
	$scope.showFilter = $scope.hasCategories && ($scope.currentFilter != showAll);
	
	//list entries
	$scope.entries = ListFactory.queryEvents($scope.sectionID);
	
	/* -------------------------------------------------------------------------- */
	/* functions */
	
	//filterList
	$scope.filterList = function(){
		var sec = $scope.sectionID,
			cate = $scope.currentFilter;
		$location.path('/sec-' + sec + '/cate-' + cate);
		console.log('[ListController -> filterList()]', $location.path());
	};
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