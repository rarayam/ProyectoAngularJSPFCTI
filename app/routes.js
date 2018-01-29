app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                title: 'home',
                templateUrl: 'app/views/home.html',
                controller: 'HomeController'
            }).when('/user', {
                title: 'user',
                templateUrl: 'app/views/users.html',
                controller: 'UserController'
            }).
            otherwise({
                redirecTo: '/'
            });
    }
])