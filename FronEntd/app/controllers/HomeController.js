app.controller('HomeController', ['$scope', 'DataEmployee',
    function ($scope, DataEmployee) {
        $scope.Employee = DataEmployee.List();
    }
])