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
            }).when('/edit', {
                title: 'edit',
                templateUrl: 'app/views/EditAsset.html',
                controller: 'ResourceController',
                auth: true
            }).when('/movement/Outcome', {
                title: 'OutCome',
                templateUrl: 'app/views/Movement/AddOut.html',
                controller: 'MovementController',
                auth: true            
            }).when('/movement/Income', {
                title: 'InCome',
                templateUrl: 'app/views/Movement/AddInt.html',
                controller: 'MovementController',
                auth: true
            }).when('/movement/list', {
                title: 'ListMovement',
                templateUrl: 'app/views/Movement/ListMovement.html',
                controller: 'MovementController',
                auth: true
            }).when('/addAsset', {
                title: 'AddAsset',
                templateUrl: 'app/views/addAsset.html',
                controller: 'ResourceController',
                auth: true
            }).otherwise({
                redirecTo: '#!/'
            });
    }
])