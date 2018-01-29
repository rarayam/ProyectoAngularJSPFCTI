app.controller('UserController', ['$scope','DataUsers',
    function ($scope, DataUsers) {
        $scope.user = {};

        $scope.users = DataUsers.getAll();

        $scope.save = function () {
            //Se inserta el contenido de user que fue seteado en la vista
            DataUsers.Insert($scope.user);
            // se limpia el formulario
            $scope.user = {};
            //Se cierra la ventana de modal
            angular.element('#exampleModal').modal('hide');

        }

        $scope.remove = function (id) {
            DataUsers.remove(id);
        }
    }
])