app.controller('LoginController', ['$scope', '$http', 'Config',
    function ($scope, $http, Config) {
        $scope.user = {};
        localStorage.removeItem('token');

        $scope.login = function (form) {
            if (form.$invalid) {
                //alert('Hay datos invalidos');
                return;
                
            }


            //esto se debe reemplazar por la validacion contra AD
            localStorage.setItem('token', 'autenticado');
            window.location = '#!/';
            /*$http.post(Config.HostServices + '/api/Account/Login',
                $scope.user)
                .then(function (response) {
                    // On Sucess
                    if (response && (response.status == 204 || response.status == 200) && response.data) {
                        localStorage.setItem('token', response.data);
                        window.location = '#!/';
                    }
                    else {
                        alert('Email or password wrongsdfsdfsdfs!');
                    }
                }, function (response) {
                    // On Error
                    console.error('Login Service Error!!!');
                });
            */
        }
    }
]);