app.controller('ResourceController', ['$scope','DataEmployee',
    function ($scope, DataEmployee) {
        $scope.user = {};

        $scope.Employee = DataEmployee.getAll();

        $scope.save = function () {
            //Se inserta el contenido de user que fue seteado en la vista
            DataEmployee.Insert($scope.Employee);
            // se limpia el formulario
            $scope.user = {};
            //Se cierra la ventana de modal
            angular.element('#exampleModal').modal('hide');

        }

        $scope.remove = function (id) {
            DataEmployee.remove(id);
        }
    }
])