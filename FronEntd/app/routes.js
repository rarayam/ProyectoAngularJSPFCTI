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
                title: 'OutCome',
                templateUrl: 'app/views/Movement/ListMovement.html',
                controller: 'Movement-Controller',
                auth: true            
            }).
            otherwise({
                redirecTo: '#!/'
            });
    }
])