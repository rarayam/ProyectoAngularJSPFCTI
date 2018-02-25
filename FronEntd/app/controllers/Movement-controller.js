app.controller('MovementController', ['$scope', '$http', 'Config', 'IpData', 'MovementData',
    function ($scope, $http, Config, IpData, MovementData) {
        $scope.Movement = {};
        $scope.MovementsCollection= [];

        $scope.userinfo = { fn: localStorage.getItem('token') };

        //Metodo para establecer datos de ip para entradas o salidas de equipo
        $scope.SetInitialDataForAsset = function () {
            
                IpData.GetIp().then(
                    function (response) {
                        if (response.status == 200 && response.data) {
                            var IpData = response.data;

                            $scope.Movement = {
                                'MOVEMENTID': 0,
                                'ASSETNUMBER': '',
                                'ASSETIP': IpData.Ip,
                                'USERNAME': $scope.userinfo.fn,
                                'MOVEMENTTYPE': '',
                                'ACCESORIESDETAIL': '',
                                'MOVEMENTREASON': '',
                                'MOVEMENTDATE': ''
                            };
                        }
                    }, function myError(response) {
                        alert('Error al consultar IP! ');
                    });
            
        }

        $scope.SetInitialDataForAsset();

        $scope.list = function () {
            $http.get(Config.HostServices + '/api/ASSETMOVEMENTs').then(
                function (response) {
                    //en caso exitoso
                    if (response.status == 200 && response.data) {
                        var Resources = response.data;                       
                        for (var i = 0; i < Resources.length; i++) {
                            if (Resources[i].USERNAME.toString() == $scope.userinfo.fn.toString()) {
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
                }
            ), function (response) {
                //en caso de error
                alert('Error!');
                }

        }


        $scope.Outcome = function (form) {
            if (form.$invalid) {
                return;
            }

            $scope.Movement.MOVEMENTTYPE = 'OUT';
            $scope.Movement.MOVEMENTDATE =  '01/01/2018';

            MovementData.PostMovement($scope.Movement).then(
                function (response) {
                    //en caso exitoso
                    if (response.status == 200 || response.data) {
                        if (response.data.ResponseOK == '1') {
                            alert('Registro de salida exitosa!');
                            window.location = '#!/'
                        } else {
                            alert(response.data.ResultMessage);
                        }
                    }
                }
            ), function (response) {
                //en caso de error
                alert('Error registrando salida de activo!');
            }
        }
        
        $scope.Income = function (form) {
            if (form.$invalid) {
                return;
            }

            $scope.Movement.MOVEMENTTYPE = 'IN';
            $scope.Movement.MOVEMENTDATE = '01/01/2018';
            $scope.Movement.ACCESORIESDETAIL = 'N/A';
            $scope.Movement.MOVEMENTREASON = 'N/A';

            MovementData.PostMovement($scope.Movement).then(
                function (response) {
                    //en caso exitoso
                    if (response.status == 200 || response.data) {
                        if (response.data.ResponseOK == '1') {
                            alert('Registro de entrada exitosa!');
                            window.location = '#!/'
                        } else {
                            alert(response.data.ResultMessage);
                        }
                    }
                }
            ), function (response) {
                //en caso de error
                alert('Error registrando entrada de activo!');
            }
        }
    }
])