app.controller('ResourceController', ['$scope', '$http', 'Config','IpData',
    function ($scope, $http, Config, IpData) {
        $scope.Employee = {};
        $scope.EmployeeCollection = [];
        $scope.userinfo = { fn: localStorage.getItem('token') };
               

        $scope.getIpInfo =  function () {
            IpData.GetIp().then(
                function (response) {
                    if (response.status == 200 && response.data) {
                        var IpData = response.data;

                        $scope.Employee = {
                            'USERCOMPNAME': '',
                            'USERNAME': $scope.userinfo.fn,
                            'USERPERSONALID': '',
                            'ASSETIP': IpData.Ip,
                            'USERSERVICEUNIT': '',
                            'ASSETNUMBER': ''
                        };                        
                    }
                }, function myError(response) {
                    alert('Error al consultar IP! ');
                });
        }

        $scope.getIpInfo();

        $scope.list = function () {
            $scope.EmployeeCollection = [];
            $http.get(Config.HostServices + '/api/ASSETBYUSERs').then(
                function (response) {
                    //en caso exitoso
                    if (response.status == 200 && response.data) {
                        var Resources = response.data;
                        for (var i = 0; i < Resources.length; i++) {
                            if (Resources[i].USERNAME.toString() == $scope.userinfo.fn.toString()) {
                                var uEmployee = {
                                    Name: Resources[i].USERCOMPNAME,
                                    Id: Resources[i].USERPERSONALID,
                                    IP: Resources[i].ASSETIP,
                                    ServiceUnit: Resources[i].USERSERVICEUNIT,
                                    ResourceId: Resources[i].ASSETNUMBER
                                };

                                $scope.EmployeeCollection.push(uEmployee);
                            }
                        }
                    }
                }
            ), function (response) {
                //en caso de error
                alert('Error!');
                }

        }


        $scope.add = function (form) {
            if (form.$invalid) {
                //alert('Hay datos invalidos');
                return;
            }


            $http.post(Config.HostServices + '/api/ASSETBYUSERs', $scope.Employee).then(
                function (response) {
                    //en caso exitoso   
                    if (response.status == 204) {
                        alert('Por favor valide si ya tiene un activo registrado con esta información!');
                    } else {
                        if (response.status == 201) {
                            window.location = '#!/add';
                        }
                    }
                }
            ), function (response) {
                //en caso de error
                alert('Error registrando activo!');
                }

        }
        
        $scope.remove = function (ResourceId) {

            if (confirm('Esta seguro que desea borrar su registro para el activo ' + ResourceId + '?')) {
                $http.delete(Config.HostServices + '/api/ASSETBYUSERs/' + ResourceId).then(
                    function (response) {
                        //en caso exitoso
                        if (response.status == 200 && response.data) {
                            $scope.list();
                        }
                    }
                ), function (response) {
                    //en caso de error
                    alert('Error eliminando!');
                }
            }
        }
    }
])