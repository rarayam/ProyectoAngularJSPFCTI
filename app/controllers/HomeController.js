app.controller('HomeController', ['$scope', 'DataEmployee',
    function ($scope, DataEmployee) {
        $scope.EmployeeHome = DataEmployee.getHome();
        $scope.Employee = DataEmployee.getAll();
    }
])