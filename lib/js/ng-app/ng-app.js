'use strict';

/* App */

// Declare app level module which depends on filters, and services
angular.module('myApp', [
	'ngRoute',
	'ngAnimate',
	'myApp.filters',
	'myApp.services',
	'myApp.directives',
	'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
	//sections
	$routeProvider.when('/sec-:sectionID', {
		templateUrl: 'partials/section.html',
		controller:  'SectionController'
	});
	$routeProvider.when('/sec-:sectionID/cate-:categoryID', {
		templateUrl: 'partials/section.html', 
		controller:  'SectionController'
	});
	//articles
	$routeProvider.when('/sec-:sectionID/article-:articleID', {
		templateUrl: 'partials/article.html', 
		controller:  'ArticleController'
	});
	//page
	$routeProvider.when('/pg-:pageID', {
		templateUrl: 'partials/page.html', 
		controller:  'PageController'});
	//custom
	$routeProvider.when('/menu', {
		templateUrl: 'partials/menu.html', 
		controller:  'MenuController'});
	//default
	$routeProvider.otherwise({
		redirectTo:  '/sec-events'
	});
}]);