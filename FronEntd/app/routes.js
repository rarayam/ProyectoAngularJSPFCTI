app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                title: 'home',
                templateUrl: 'app/views/home.html',
                controller: 'HomeController',
                auth: true
            }).when('/login', {
                title: 'login',
                templateUrl: 'app/views/Login.html',
                controller: 'LoginController',
                auth: false
            }).when('/add', {
                title: 'add',
                templateUrl: 'app/views/addResource.html',
                controller: 'ResourceController',
                auth: true
            }).when('/movement/Outcome', {
                title: 'add',
                templateUrl: 'app/views/Movement/OutcomeMovement.html',
                controller: 'MovementController',
                auth: true            
            }).when('/movement/Income', {
                title: 'add',
                templateUrl: 'app/views/Movement/IncomeMovement.html',
                controller: 'MovementController',
                auth: true
            }).
            otherwise({
                redirecTo: '/'
            });
    }
])