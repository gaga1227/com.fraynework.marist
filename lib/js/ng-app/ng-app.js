'use strict';

alert('You are on TEST branch!');

/* App */
angular.module('myApp', [
	//official modules
	//'ngTouch',
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
		controller:  'ListController',
		depth:1
	});
	$routeProvider.when('/sec-:sectionID/cate-:categoryID', {
		templateUrl: 'partials/list.html', 
		controller:  'ListController',
		depth:1
	});
	//article
	$routeProvider.when('/sec-:sectionID/article-:articleID', {
		templateUrl: 'partials/article.html', 
		controller:  'ArticleController',
		depth:2
	});
	//page
	$routeProvider.when('/pg-:pageID', {
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
	//default
	$routeProvider.otherwise({
		redirectTo:  '/sec-events'
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