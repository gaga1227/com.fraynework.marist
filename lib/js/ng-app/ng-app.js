'use strict';

/* App */
angular.module('myApp', [
	//official modules
	'ngRoute',
	'ngAnimate',
	'ngResource',
	//lib modules
	'ng-iscroll',
	//custom app modules
	'myApp.filters',
	'myApp.services',
	'myApp.directives',
	'myApp.controllers'
])

/* ==========================================================================
   CONFIG
   ========================================================================== */
.config(['$routeProvider', function($routeProvider) {
	//list
	$routeProvider.when('/sec-:sectionID', {
		templateUrl: 'partials/list.html',
		controller:  'ListController'
	});
	$routeProvider.when('/sec-:sectionID/cate-:categoryID', {
		templateUrl: 'partials/list.html', 
		controller:  'ListController'
	});
	//article
	$routeProvider.when('/sec-:sectionID/article-:articleID', {
		templateUrl: 'partials/article.html', 
		controller:  'ArticleController'
	});
	//page
	$routeProvider.when('/pg-:pageID', {
		templateUrl: 'partials/page.html', 
		controller:  'PageController'});
	//menu
	$routeProvider.when('/menu', {
		templateUrl: 'partials/menu.html', 
		controller:  'MenuController'});
	//default
	$routeProvider.otherwise({
		redirectTo:  '/sec-events'
	});
}]);