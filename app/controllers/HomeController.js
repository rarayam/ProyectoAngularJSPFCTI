app.controller('HomeController', ['$scope', 'DataUsers',
    function ($scope, DataUsers) {
        $scope.usersHome = DataUsers.getHome();
        $scope.users = DataUsers.getAll();
    }
])