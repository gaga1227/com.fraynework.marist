'use strict';

/* Controllers */
angular.module('myApp.controllers', ['ngSanitize'])

/* ==========================================================================
   LIST
   ========================================================================== */
.controller('ListController', ['$scope', '$routeParams', '$location', 'AppStaticFactory', 'SectionService', 'ListFactory',
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
	$scope.hasArticle = $scope.sectionID !== 'publications' && $scope.sectionID !== 'links';
	$scope.order = ($scope.sectionID == 'links') ? 'title' : ($scope.sectionID == 'news') ? '!date' : 'date';
		
	//list entries
	$scope.entries = ListFactory['query_' + $scope.sectionID]();
	
	/* -------------------------------------------------------------------------- */
	/* functions */
	
	//removeSelf
	$scope.removeSelf = function(index) {
		$scope.entries.splice(index, 1);
		console.log('[ListController -> removeSelf()]', index );
	};
	
	//filterList
	$scope.filterList = function() {
		var sec = $scope.sectionID,
			cate = $scope.currentFilter;
		$location.path('/sec-' + sec + '/cate-' + cate);
		console.log('[ListController -> filterList()]', $location.path());
	};
	
	/* -------------------------------------------------------------------------- */
	/* scroller */
	
	//custom scroller options
	$scope.$parent.myScrollOptions = {  };	
}])

/* ==========================================================================
   ARTICLE
   ========================================================================== */
.controller('ArticleController', ['$scope', '$routeParams', 'AppStaticFactory', 'PageFactory',
function($scope, $routeParams, AppStaticFactory, PageFactory) {
	//vars
	var q;
	
	/* -------------------------------------------------------------------------- */
	/* properties */
	
	//section and article
	$scope.sectionID = $routeParams.sectionID;
	$scope.articleID = $routeParams.articleID;
	
	//article content
	q = PageFactory.getPage($scope.articleID);
	q.then(function(response) {
		$scope.articleHTML = response.data;
		console.log('[ArticleController -> PageFactory.getPage()]', $scope.articleID );
	});
	q.error(function(data, status, headers, config) {
		$scope.articleHTML = AppStaticFactory.html404;
		console.log('[ArticleController -> PageFactory.getPage()]', $scope.articleID, status );
	});
}])

/* ==========================================================================
   PAGE
   ========================================================================== */
.controller('PageController', ['$scope', '$routeParams', 'AppStaticFactory', 'PageFactory',
function($scope, $routeParams, AppStaticFactory, PageFactory) {
	//vars
	var q;
	
	/* -------------------------------------------------------------------------- */
	/* properties */
	
	//section and article
	$scope.sectionID = $routeParams.sectionID;
	$scope.pageID = $routeParams.pageID;
	
	//page content
	q = PageFactory.getPage($scope.pageID);
	q.then(function(response) {
		$scope.pageHTML = response.data;
		console.log('[PageController -> PageFactory.getPage()]', $scope.pageID );
	});
	q.error(function(data, status, headers, config) {
		$scope.pageHTML = AppStaticFactory.html404;
		console.log('[PageController -> PageFactory.getPage()]', $scope.pageID, status );
	});
}])

/* ==========================================================================
   MENU
   ========================================================================== */
.controller('MenuController', ['$scope', '$routeParams',
function($scope, $routeParams) {
	//vars
	
	/* -------------------------------------------------------------------------- */
	/* properties */
	$scope.settings = {
		notification: false
	};
	
	/* -------------------------------------------------------------------------- */
	/* functions */
	$scope.toggleSetting = function(key) {
		$scope.settings[key] = !$scope.settings[key];
		console.log('[MenuController -> toggleSetting()]', key, $scope.settings[key]);	
	}
}]);