'use strict';
/* ==========================================================================
   APP
   ========================================================================== */
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
   RUN
   ========================================================================== */
.run(['$rootScope','$filter', function($rootScope, $filter) {
	//routeChangeStart
	$rootScope.$on('$routeChangeStart', function(e, curr, prev) {
		//toggle loader
		App.view.toggleLoader(true);
		
		//getting route data
		if (curr.$$route && curr.$$route.resolve) {
			$rootScope.sectionID = $filter('cleanPath')(curr.$$route.originalPath);
			$rootScope.articleID = curr.params.articleID;
			$rootScope.pageID = curr.params.pageID;
			console.log('e:$routeChangeStart', curr.$$route.originalPath, curr.pathParams);
		}
		
		//view anim selector
		
		//initial view
		if (!prev && curr) {
			$rootScope.viewAnim = 'fade';
		}
		//between views
		else if (prev && curr) {
			if (prev.depth > curr.depth) {
				//to lower depth
				$rootScope.viewAnim = 'ltr';
			} else if (prev.depth === curr.depth) {
				//to same depth
				$rootScope.viewAnim	= 'fade';
			} else {
				//to higher depth
				$rootScope.viewAnim	= 'rtl';	
			}
		}
		//default|fallback
		else {
			$rootScope.viewAnim = 'rtl'; 
		}
	});
	
	//routeChangeSuccess
	$rootScope.$on('$routeChangeSuccess', function(e, curr, prev) { 	
		//toggle loader
		App.view.toggleLoader(false);
		
		if (curr.$$route) {
			console.log('e:$routeChangeSuccess', curr.$$route.originalPath, curr.pathParams);
		}
	});
	
	//routeChangeError
	$rootScope.$on('$routeChangeError', function(e, curr, prev, reject) { 		
		//toggle loader
		App.view.toggleLoader(false);
		
		if (curr.$$route) {
			console.log('e:$routeChangeError', curr.$$route.originalPath, curr.pathParams, reject);
		}
	});
}])

/* ==========================================================================
   CONFIG
   ========================================================================== */
.config(['$routeProvider', function($routeProvider) {	
	
	/* -------------------------------------------------------------------------- */
	//resolve functions
	var Resolve = {
			sections: function(SectionService, $location) {
				var promise = SectionService.getSections();
				promise.then(function(response) {
					return response.data;
				}, function(response) {
					App.utils.popMsg(App.data.msg.connection_error);
					return response;
				});
				return promise;
			},
			list: function(ListFactory, $rootScope, $location) {
				var promise = ListFactory['query_' + $rootScope.sectionID]().$promise;
				promise.then(function(data) {
					return data;
				}, function(data) {
					App.utils.popMsg(App.data.msg.connection_error);
					return data;
				});
				return promise;
			},
			article: function(ArticleFactory, $rootScope, $location) {
				var method = 'query_' + $rootScope.sectionID + '_article',
					promise = ArticleFactory[method]({ id: $rootScope.articleID }).$promise;
				promise.then(function(data) {
					return data;
				}, function(data) {
					App.utils.popMsg(App.data.msg.connection_error);
					return data;
				});
				return promise;
			},
			page: function(PageFactory, $rootScope, $location) {
				var promise = PageFactory.getPage($rootScope.pageID);
				promise.then(function(data) {
					return data;
				}, function(data) {
					$location.path(urlError);
					return data;
				});
				return promise;
			},
			localpage: function(PageFactory, $rootScope, $location) {
				var promise = PageFactory.getLocalPage($rootScope.pageID);
				promise.then(function(data) {
					return data;
				}, function(data) {
					App.utils.popMsg(App.data.msg.connection_error);
					return data;
				});
				return promise;
			}	
		};
	
	/* -------------------------------------------------------------------------- */
	//routes
	
	//list
	$routeProvider.when('/events', {
		templateUrl: 'partials/lists.html',
		controller:  'ListsController',
		resolve: {
			sections: Resolve.sections,
			groups: Resolve.list
		},
		depth:2
	});
	$routeProvider.when('/programmes', {
		templateUrl: 'partials/list.html', 
		controller:  'ListController',
		resolve: {
			sections: Resolve.sections,
			entries: Resolve.list
		},
		depth:2
	});
	$routeProvider.when('/publications', {
		templateUrl: 'partials/list.html', 
		controller:  'ListController',
		resolve: {
			sections: Resolve.sections,
			entries: Resolve.list
		},
		depth:2
	});
	$routeProvider.when('/news', {
		templateUrl: 'partials/lists.html',
		controller:  'ListsController',
		resolve: {
			sections: Resolve.sections,
			groups: Resolve.list
		},
		depth:2
	});
	$routeProvider.when('/links', {
		templateUrl: 'partials/list.html',
		controller:  'ListController',
		resolve: {
			sections: Resolve.sections,
			entries: Resolve.list
		},
		depth:2
	});
	
	//article
	$routeProvider.when('/events/article/:articleID', {
		templateUrl: 'partials/article.html', 
		controller:  'ArticleController',
		resolve: {
			article: Resolve.article
		},
		depth:4
	});
	$routeProvider.when('/programmes/article/:articleID', {
		templateUrl: 'partials/article.html', 
		controller:  'ArticleController',
		resolve: {
			article: Resolve.article
		},
		depth:4
	});
	$routeProvider.when('/news/article/:articleID', {
		templateUrl: 'partials/article.html', 
		controller:  'ArticleController',
		resolve: {
			article: Resolve.article
		},
		depth:4
	});
	
	//page
	$routeProvider.when('/page/:pageID', {
		templateUrl: 'partials/page.html', 
		controller:  'PageController',
		resolve: {
			page: Resolve.page
		},
		depth:3
	});
	
	//localpage
	$routeProvider.when('/localpage/:pageID', {
		templateUrl: 'partials/page.html', 
		controller:  'PageController',
		resolve: {
			page: Resolve.localpage
		},
		depth:3
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
}]);