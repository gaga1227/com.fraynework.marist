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
	
	//sections and categories
	$scope.sections = SectionService.getSections();
	$scope.sectionID = $routeParams.sectionID;
	$scope.categoryID = $routeParams.categoryID;
	$scope.categories = $scope.sections[$scope.sectionID];
	$scope.hasCategories = $scope.categories.length ? true : false;
	//filter
	$scope.currentFilter = $routeParams.categoryID ? $routeParams.categoryID : showAll;
	$scope.listFilter = $scope.currentFilter == showAll ? '' : $scope.currentFilter;
	//view flags
	$scope.showFilter = $scope.hasCategories && ($scope.currentFilter != showAll);
	$scope.hasArticle = $scope.sectionID !== 'publications' && $scope.sectionID !== 'links';
	$scope.order = ($scope.sectionID == 'links' || $scope.sectionID == 'programmes') ? 'title' : ($scope.sectionID == 'news') ? '!date' : 'date';
	$scope.charLimit = (function(sec){
		var limit = 0;
		if (sec === "events" || sec === "news") 			{ limit = 65; }
		else if (sec === "publications" || sec === "links") { limit = 75; }
		else if (sec === "programmes") 						{ limit = 80; }
		return limit;
	})($scope.sectionID);
	
	/* -------------------------------------------------------------------------- */
	/* data */
	
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
	/* plugins */
	
	//custom scroller options
	$scope.$parent.myScrollOptions = {};
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
.controller('MenuController', ['$scope', '$routeParams', 'LocalStorageService',
function($scope, $routeParams, LocalStorageService) {
	//vars
	var LSKey = 'settings'; 
	
	/* -------------------------------------------------------------------------- */
	/* properties */
	$scope.settings = LocalStorageService.getItem(LSKey);
	if (!$scope.settings) {
		$scope.settings = {
			notification: false,
			custom: false
		};	
	}
	App.data.settings = $.extend({}, $scope.settings);
	
	/* -------------------------------------------------------------------------- */
	/* functions */
	$scope.toggleSetting = function(key) {
		//alert($event.type);
		$scope.settings[key] = !$scope.settings[key];
		console.log('[MenuController -> toggleSetting()]', key, $scope.settings[key]);
		LocalStorageService.setItem(LSKey, $scope.settings);
		App.data.settings = $.extend({}, $scope.settings);
	}
	$scope.setSetting = function(key, val) {
		$scope.settings[key] = val;
		console.log('[MenuController -> setSetting()]', key, val);
		LocalStorageService.setItem(LSKey, $scope.settings);
		App.data.settings = $.extend({}, $scope.settings);
	}
}])

/* ==========================================================================
   HOME
   ========================================================================== */
.controller('HomeController', ['$scope', 'alertFactory', '$location',
function($scope, alertFactory, $location) {
	//vars
	var alertPromise = alertFactory.query().$promise;
	alertPromise.then(function(data) {
        $scope.alert = data;
		console.log(data);
    }, function(data) {
        console.log(data);
		$scope.alert = {
			"title": "Cannot retrieve latest data, please try again later.",
			"label": "Data not available",
			"icon":	 "typcn-warning",
			"id":	 null
		};
    });
	
	/* -------------------------------------------------------------------------- */
	/* properties */
	$scope.charLimit = 100;
			
	/* -------------------------------------------------------------------------- */
	/* functions */
	$scope.gotoAlert = function(id) {
		if (id === null) return;
		$location.path('/pg-' + id);
		console.log('[HomeController -> gotoAlert()]', id);
	}
}]);