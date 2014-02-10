'use strict';

/* Controllers */
angular.module('myApp.controllers', ['ngSanitize'])

/* ==========================================================================
   LISTS (events, news)
   ========================================================================== */
.controller('ListsController', ['$scope', '$routeParams', '$location', '$filter', 'AppStaticFactory', 'SectionService', 'entries',
function($scope, $routeParams, $location, $filter, AppStaticFactory, SectionService, entries) {
	//vars
	var showAll = AppStaticFactory.strShowAll,
		sections = SectionService.getSections();
	
	/* -------------------------------------------------------------------------- */
	/* properties */
	
	//section
	$scope.section = {};
	$scope.section.id = $filter('cleanPath')($location.path());
	
	//categories
	$scope.section.categories = sections[$scope.section.id];

	//filter
	$scope.section.filter = $routeParams.filter;
	$scope.section.currentFilter = $routeParams.filter ? $routeParams.filter : showAll;
	$scope.section.listFilter = $scope.section.currentFilter == showAll ? '' : $scope.section.currentFilter;

	//view
	$scope.section.theme = SectionService.getThemes($scope.section.id);
	$scope.section.hasCategories = $scope.section.categories.length ? true : false;
	$scope.section.showFilter = $scope.section.hasCategories && ($scope.section.currentFilter != showAll);
	$scope.section.hasArticle = $scope.section.id === 'programmes';
	$scope.section.order = ($scope.section.id === 'news') ? '!date' : 'date';
	$scope.charLimit = 65;
	
	/* -------------------------------------------------------------------------- */
	/* data */
	
	//list entries
	$scope.entries = entries;
	
	/* -------------------------------------------------------------------------- */
	/* functions */
	
	//filterList
	$scope.filterList = function() {
		$location.search({'filter': $scope.section.currentFilter});
		console.log('[ListController -> filterList()]', $location.path(), $location.search());
	};
}])

/* ==========================================================================
   LIST ( programmes, publications, links )
   ========================================================================== */
.controller('ListController', ['$scope', '$routeParams', '$location', '$filter', 'AppStaticFactory', 'SectionService', 'entries',
function($scope, $routeParams, $location, $filter, AppStaticFactory, SectionService, entries) {
	//vars
	var showAll = AppStaticFactory.strShowAll,
		sections = SectionService.getSections();
	
	/* -------------------------------------------------------------------------- */
	/* properties */
	
	//section
	$scope.section = {};
	$scope.section.id = $filter('cleanPath')($location.path());
	
	//categories
	$scope.section.categories = sections[$scope.section.id];
	
	//filter
	$scope.section.filter = $routeParams.filter;
	$scope.section.currentFilter = $routeParams.filter ? $routeParams.filter : showAll;
	$scope.section.listFilter = $scope.section.currentFilter == showAll ? '' : $scope.section.currentFilter;
	
	//view
	$scope.section.theme = SectionService.getThemes($scope.section.id);
	$scope.section.hasCategories = $scope.section.categories.length ? true : false;
	$scope.section.showFilter = $scope.section.hasCategories && ($scope.section.currentFilter != showAll);
	$scope.section.hasArticle = $scope.section.id === 'programmes';
	$scope.section.order = 'title';
	$scope.charLimit = (function(sec){
		var limit = 0;
		if (sec === "publications" || sec === "links")	{ limit = 75; }
		else if (sec === "programmes") 					{ limit = 80; }
		return limit;
	})($scope.section.id);
	
	/* -------------------------------------------------------------------------- */
	/* data */
	
	//list entries
	$scope.entries = entries;
	
	/* -------------------------------------------------------------------------- */
	/* functions */
	
	//filterList
	$scope.filterList = function() {
		$location.search({'filter': $scope.section.currentFilter});
		console.log('[ListController -> filterList()]', $location.path(), $location.search());
	};
}])

/* ==========================================================================
   ARTICLE
   ========================================================================== */
.controller('ArticleController', ['$scope', '$routeParams', '$location', '$filter', 'AppStaticFactory', 'SectionService', 'article',
function($scope, $routeParams, $location, $filter, AppStaticFactory, SectionService, article) {
	//vars
	
	/* -------------------------------------------------------------------------- */
	/* properties */
	
	//section and article
	$scope.section = {};
	$scope.section.id = $routeParams.sectionID;
	$scope.section.articleID = $routeParams.articleID;
	
	//article content
	$scope.section.articleHTML = article.data;
	
	//view
	$scope.section.theme = SectionService.getThemes($scope.section.id);
}])

/* ==========================================================================
   PAGE
   ========================================================================== */
.controller('PageController', ['$scope', '$routeParams', '$location', '$filter', 'AppStaticFactory', 'SectionService', 'page',
function($scope, $routeParams, $location, $filter, AppStaticFactory, SectionService, page) {
	//vars
	
	/* -------------------------------------------------------------------------- */
	/* properties */
	
	//section and article
	$scope.section = {};
	$scope.section.id = 'page';
	$scope.section.pageID = $routeParams.pageID;	
	
	//page content
	$scope.section.pageHTML = page.data;
	
	//view
	$scope.section.theme = SectionService.getThemes($scope.section.id);
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
		console.log('[HomeController -> alertFactory.query()]', data);
    }, function(data) {
        console.log('[HomeController -> alertFactory.query()] Failed', data);
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