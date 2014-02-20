'use strict';

/* Controllers */
angular.module('myApp.controllers', ['ngSanitize'])

/* ==========================================================================
   MAIN
   ========================================================================== */
.controller('MainController', ['$scope', '$rootScope', '$window', '$location',
function ($scope, $rootScope, $window, $location) {
	/* -------------------------------------------------------------------------- */
	/* properties */
	
	//view
	//$scope.viewAnim = '';
	
	/* -------------------------------------------------------------------------- */
	/* functions */
	
	/* view anim manual */
	/*
	$rootScope.back = function() {
		$scope.viewAnim = 'ltr';
		$window.history.back();
	}
	$rootScope.go = function(path){
		$scope.viewAnim = 'rtl';
		$location.url(path);
	}
	*/
}])

/* ==========================================================================
   LISTS (events, news)
   ========================================================================== */
.controller('ListsController', ['$scope', '$routeParams', '$location', '$filter', 'AppStaticFactory', 'SectionService', 'sections', 'groups',
function($scope, $routeParams, $location, $filter, AppStaticFactory, SectionService, sections, groups) {
	//vars
	var showAll = AppStaticFactory.strShowAll,
		sections = sections.data[0];
		console.log(sections);

	/* -------------------------------------------------------------------------- */
	/* properties */
	
	//section
	$scope.section = {};
	$scope.section.id = $filter('cleanPath')($location.path());
	
	//categories
	$scope.section.categories = sections[$scope.section.id];
	//add show all to categories
	if ($scope.section.categories && $scope.section.categories[0] !== showAll) {
		$scope.section.categories.unshift({ "value": showAll });
	}

	//filter
	$scope.section.filter = $routeParams.filter;
	$scope.section.currentFilter = $routeParams.filter ? $routeParams.filter : showAll;
	$scope.section.listFilter = $scope.section.currentFilter == showAll ? '' : $scope.section.currentFilter;

	//view
	$scope.section.theme = SectionService.getThemes($scope.section.id);
	$scope.section.hasCategories = ($scope.section.categories && $scope.section.categories.length) ? true : false;
	$scope.section.showFilter = $scope.section.hasCategories && ($scope.section.currentFilter != showAll);
	$scope.section.hasArticle = $scope.section.id === 'programmes';
	$scope.section.order = ($scope.section.id === 'news') ? '!date' : 'date';
	$scope.charLimit = 65;
	
	/* -------------------------------------------------------------------------- */
	/* data */
	
	//list entries
	$scope.groups = groups;
	$scope.filteredGroups = $filter("filter")($scope.groups, $scope.section.listFilter);

	for (var i=0; i<$scope.groups.length; i++) {
		var list = $filter("filter")($scope.groups[i].entries, $scope.section.listFilter);
		if (list.length) {
			$scope.section.hasEntry = true;
			break;	
		}
	}
	
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
.controller('ListController', ['$scope', '$routeParams', '$location', '$filter', 'AppStaticFactory', 'SectionService', 'sections', 'entries',
function($scope, $routeParams, $location, $filter, AppStaticFactory, SectionService, sections, entries) {
	//vars
	var showAll = AppStaticFactory.strShowAll,
		sections = sections.data[0];
	
	/* -------------------------------------------------------------------------- */
	/* properties */
	
	//section
	$scope.section = {};
	$scope.section.id = $filter('cleanPath')($location.path());
	
	//categories
	$scope.section.categories = sections[$scope.section.id];
	//add show all to categories
	if ($scope.section.categories && $scope.section.categories[0] !== showAll) {
		$scope.section.categories.unshift({ "value": showAll });
	}
	
	//filter
	$scope.section.filter = $routeParams.filter;
	$scope.section.currentFilter = $routeParams.filter ? $routeParams.filter : showAll;
	$scope.section.listFilter = $scope.section.currentFilter == showAll ? '' : $scope.section.currentFilter;
	
	//view
	$scope.section.theme = SectionService.getThemes($scope.section.id);	
	$scope.section.hasCategories = ($scope.section.categories && $scope.section.categories.length) ? true : false;
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
	$scope.section.id = $filter('cleanPath')($location.path());
	$scope.section.articleID = $routeParams.articleID;
	
	//article content
	$scope.section.article = article[0];
	
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
.controller('MenuController', ['$scope', '$rootScope', '$routeParams', 'LocalStorageService',
function($scope, $rootScope, $routeParams, LocalStorageService) {
	//vars
	var LSKey = 'settings';
		
	/* -------------------------------------------------------------------------- */
	/* functions */
	$scope.toggleSetting = function(key) {
		$rootScope.settings[key] = !$rootScope.settings[key];
		console.log('[MenuController -> toggleSetting()]', key, $rootScope.settings[key]);
		LocalStorageService.setItem(LSKey, $rootScope.settings);
		App.utils.updatePushService($rootScope.settings[key]);
	}
	$scope.setSetting = function(key, val) {
		$rootScope.settings[key] = val;
		console.log('[MenuController -> setSetting()]', key, val);
		LocalStorageService.setItem(LSKey, $rootScope.settings);
		App.utils.updatePushService(val);
	}
}])

/* ==========================================================================
   HOME
   ========================================================================== */
.controller('HomeController', ['$scope', '$rootScope', '$location', 'notif',
function($scope, $rootScope, $location, notif) {

	/* -------------------------------------------------------------------------- */
	/* properties */
	$scope.notif = notif.data[0];
	$scope.charLimit = 100;
		
	/* -------------------------------------------------------------------------- */
	/* view */
	$scope.notifIsOn = $rootScope.settings.notification;
	$scope.hasNotifDetail = !!$scope.notif.id;
	$scope.notif.icon = $scope.notif.icon ? $scope.notif.icon : 'typcn-bell';
	
	//prompt to turn on notif
	if (!$scope.notifIsOn) {
		$scope.notif.title = 'Turn on the Notification setting in Menu page to receive push notifications on your device';
		$scope.notif.label = 'Push Notification is Off'; 
		$scope.notif.icon = 'typcn-info-large';
	}
	
	/* -------------------------------------------------------------------------- */
	/* functions */
	$scope.onNotifClick = function() {	
		//notif is off
		if (!$scope.notifIsOn) {
			$location.path('/menu');
			console.log('[HomeController -> onNotifClick()] goes to menu page');
			return 'goes to menu page';
		} 
		//has notif details
		else if ($scope.hasNotifDetail) {
			var id = $scope.notif.id;
			$location.path('/notifications/article/' + id);
			console.log('[HomeController -> onNotifClick()] go to details', id);
			return 'goes to details page';	
		}
		//no notif details
		else {
			console.log('[HomeController -> onNotifClick()] no details to show');
			return 'no details to show';
		}
	}
}]);