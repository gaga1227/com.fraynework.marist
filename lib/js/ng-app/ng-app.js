'use strict';

/* App */
angular.module('myApp', [
	//official modules
	//'ngTouch',
	'ngRoute',
	'ngAnimate',
	'ngResource',
	//lib modules
	'ng-iscroll',
	'pasvaz.bindonce',
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
	$routeProvider.when('/events', {
		templateUrl: 'partials/lists.html',
		controller:  'ListsController',
		depth:1
	});
	$routeProvider.when('/programmes', {
		templateUrl: 'partials/list.html', 
		controller:  'ListController',
		depth:1
	});
	$routeProvider.when('/publications', {
		templateUrl: 'partials/list.html', 
		controller:  'ListController',
		depth:1
	});
	$routeProvider.when('/news', {
		templateUrl: 'partials/lists.html',
		controller:  'ListsController',
		depth:1
	});
	$routeProvider.when('/links', {
		templateUrl: 'partials/list.html',
		controller:  'ListController',
		depth:1
	});
	//article
	$routeProvider.when('/article/:articleID', {
		templateUrl: 'partials/article.html', 
		controller:  'ArticleController',
		depth:2
	});
	//page
	$routeProvider.when('/page/:pageID', {
		templateUrl: 'partials/page.html', 
		controller:  'PageController',
		depth:1
	});
	//menu
	$routeProvider.when('/menu', {
		templateUrl: 'partials/menu.html', 
		controller:  'MenuController',
		depth:10
	});
	//home
	$routeProvider.when('/home', {
		templateUrl: 'partials/home.html', 
		controller:  'HomeController',
		depth:10
	});
	//default
	$routeProvider.otherwise({
		redirectTo:  '/home'
	});
}])

/* ==========================================================================
   RUN
   ========================================================================== */
.run(['$rootScope', '$window', function($rootScope, $window) {
	//switch view transition by view types on route updates
	$rootScope.$on('$routeChangeStart', function(e, newRoute, curRoute) {
		if (newRoute && !curRoute) {
			//home
			$rootScope.viewAnim = 'fade';
		}
		else {
			//default
			$rootScope.viewAnim = 'rtl'; //(curRoute && newRoute && (curRoute.depth > newRoute.depth)) ? 'ltr':'rtl';
		}
	});
}]);