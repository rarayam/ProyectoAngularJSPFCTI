app.controller('LoginController', ['$scope', '$http', 'Config','IpData',
    function ($scope, $http, Config, IpData) {
        $scope.user = {
            "UserName": "",
            "Password": "",
            "SuccessAuthentication": false
        };

        localStorage.removeItem('token');

        $scope.login = function (form) {
            if (form.$invalid) {                
                return;                
            }

            //Con esto se llama al servicio web de login
            IpData.PostLogin($scope.user).then(function (response) {
                if (response && (response.status == 201 || response.status == 200) && response.data) {
                    var result = response.data;
                    console.log('1: ' + result.UserName);
                    console.log('2: ' + result.Password);
                    console.log('3: ' + result.SuccessAuthentication);
                    if (result.SuccessAuthentication) {
                        localStorage.setItem('token', result.UserName);                                      
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