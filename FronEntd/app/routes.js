app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                title: 'home',
                templateUrl: 'app/views/home.html',
                controller: 'HomeController'
            }).when('/add', {
                title: 'add',
                templateUrl: 'app/views/addResource.html',
                controller: 'ResourceController'
            }).
            otherwise({
                redirecTo: '/'
            });
    }
])