// const configure = ($stateProvider, $urlRouterProvider) => {
//     // config state
//     const home = {
//         url: '/',
//         templateUrl: 'home/index.view.html',
//         controller: 'Home.IndexController',
//         controllerAs: 'vm'
//     };
//
//     const login = {
//         url: '/login',
//         templateUrl: 'login/index.view.html',
//         controller: 'Login.IndexController',
//         controllerAs: 'vm'
//     };
//
//     // default route
//     $urlRouterProvider.otherwise('/');
//
//     // app route
//     $stateProvider
//         .state('home', home)
//         .state('login', login);
// };

// const run = ($rootScope, $http, $location, $localStorage) => {
//     // keep user logged after page refresh
//     if ($localStorage.currentUser) {
//         $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
//     }
//
//     // redirect to login page if not logged in and trying to access a restricted page
//     $rootScope.$on('$locationChangeStart',function (event, next, current) {
//         const publicPages = ['/login'];
//         const restrictedPage = publicPages.indexOf($location.path()) === -1;
//
//         if (restrictedPage && !$localStorage.currentUser) {
//             $location.path('/login');
//         }
//     });
// };

angular
    .module("myAuth",['ui.router', 'ngMessages', 'ngStorage', 'ngMockE2E'])
    .config(function($stateProvider, $urlRouterProvider) {
        // config state
        const home = {
            url: '/',
            templateUrl: 'home/index.view.html',
            controller: 'Home.IndexController',
            controllerAs: 'vm'
        };

        const login = {
            url: '/login',
            templateUrl: 'login/index.view.html',
            controller: 'Login.IndexController',
            controllerAs: 'vm'
        };

        // default route
        $urlRouterProvider.otherwise('/');

        // app route
        $stateProvider
            .state('home', home)
            .state('login', login);
    })
    .run(function ($rootScope, $http, $location, $localStorage) {
        // keep user logged after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart',function (event, next, current) {
            const publicPages = ['/login'];
            const restrictedPage = publicPages.indexOf($location.path()) === -1;

            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    });