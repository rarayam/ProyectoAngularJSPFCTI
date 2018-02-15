app.controller('Movement-controller', ['$scope','$http','Config',
    function ($scope, $http, Config) {
        
        $scope.MovementsCollection= [];

        $scope.list = function () {
            $http.get(Config.HostServices + '/api/ASSETMOVEMENTs').then(
                function (response) {
                    //en caso exitoso
                    if (response.status == 200 && response.data) {
                        var Resources = response.data;
                        for (var i = 0; i < Resources.length; i++) {
                            var uMovements = {
                                MOVEMENTID: Resources[i].MOVEMENTID,
                                ASSETNUMBER: Resources[i].ASSETNUMBER,
                                ASSETIP: Resources[i].ASSETIP,
                                USERNAME: Resources[i].USERNAME,
                                MOVEMENTTYPE: Resources[i].MOVEMENTTYPE,
                                ACCESORIESDETAIL: Resources[i].ACCESORIESDETAIL,
                                MOVEMENTREASON: Resources[i].MOVEMENTREASON,
                                MOVEMENTDATE: Resources[i].MOVEMENTDATE
                            };
                            $scope.MovementsCollection.push(uMovements);
                        }
                    }
                }
            ), function (response) {
                //en caso de error
                alert('Error!');
                }

        }


        $scope.Outcome = function (form) {
            $http.post(Config.HostServices + '/api/ASSETMOVEMENTs', $scope.Movements).then(
                function (response) {
                    //en caso exitoso
                    if (response.status == 200 || response.status == 204 ) {
                        alert('Registro exitoso!');
                        window.location = '#!/movement/OutCome'
                    }
                }
            ), function (response) {
                //en caso de error
                alert('Error registrando movimientos!');
            }
        }
        
        $scope.Income = function (form) {
            $http.delete(Config.HostServices + '/api/ASSETMOVEMENTs', $scope.Movements).then(
                function (response) {
                    //en caso exitoso
                    if (response.status == 200 || response.status == 204 ) {
                        alert('Registro exitoso!');
                        window.location = '#!/movement/InCome'
                    }
                }
            ), function (response) {
                //en caso de error
                alert('Error registrando activo movimientos!');
            }
        }
    }
])