app.controller('LoginController', ['$scope', '$http', 'Config',
    function ($scope, $http, Config) {
        $scope.user = {
            "UserName": "",
            "Password": "",
            "SuccessAuthentication": false
        };

        localStorage.removeItem('token');

        $scope.login = function (form) {
            if (form.$invalid) {
                //alert('Hay datos invalidos');
                return;
                
            }

            $http.post(Config.HostServices + '/api/Login',
                $scope.user)
                .then(function (response) {
                    // On Sucess
                    if (response && (response.status == 201 || response.status == 200) && response.data) {
                        var result = response.data;
                        if (result.SuccessAuthentication) {
                            localStorage.setItem('token', response.UserName);
                            window.location = '#!/';
                        } else {
                            alert('Usuario o password inválido');
                        }                        
                    }
                    else {
                        alert('No es posible autenticarse en este momento');
                    }
                }, function (response) {
                    // On Error
                    alert('No es posible acceder al servicio de autenticación en este momento');
                    console.error(response.data);
                });            
        }
    }
]);