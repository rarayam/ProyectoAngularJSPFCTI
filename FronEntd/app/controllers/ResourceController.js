app.controller('ResourceController', ['$scope', '$http', 'Config','IpData','AssetByUserInfo',
    function ($scope, $http, Config, IpData, AssetByUserInfo) {
        $scope.Employee = {};

        $scope.EmployeeCollection = [];
        $scope.userinfo = { fn: localStorage.getItem('token') };                     

        
        //Metodo para establecer datos tanto para agregar un nuevo activo o editar uno existente
        $scope.SetInitialDataForAsset = function () {
            if (!AssetByUserInfo.get().USERNAME) { //Si no tiene data de edición, entonces queda listo para agregar un nuevo activo
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
            } else {
                $scope.Employee = AssetByUserInfo.get();
            }
        }

        $scope.SetInitialDataForAsset();

        //Listar los activos por usuario
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
                                    USERCOMPNAME: Resources[i].USERCOMPNAME,
                                    USERNAME: Resources[i].USERNAME,
                                    USERPERSONALID: Resources[i].USERPERSONALID,
                                    ASSETIP: Resources[i].ASSETIP,
                                    USERSERVICEUNIT: Resources[i].USERSERVICEUNIT,
                                    ASSETNUMBER: Resources[i].ASSETNUMBER
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

        //Agregar un activo por usuario
        $scope.add = function (form) {
            if (form.$invalid) {               
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

        //Eliminar un registro de activo por usuario
        $scope.remove = function (ResourceId, UserName, Ip) {

            if (confirm('Esta seguro que desea borrar su registro para el activo ' + ResourceId + '?')) {
                $http.delete(Config.HostServices + '/api/ASSETBYUSERs/' + ResourceId + '?id2=' + UserName + '&id3=' + Ip).then(
                    function (response) {
                        //en caso exitoso
                        if (response.status == 200 && response.data) {
                            $scope.list();
                        } else {
                            alert('No es posible eliminar este registro, revise si  el activo tiene movimientos registrados!');
                        }
                    }                    
                ), function (response) {
                    //en caso de error
                    alert('Error eliminando!');
                }
            }
        }

        //Abre la pagina de edición de activo por usuario
        $scope.openEdit = function (ASSETNUMBER) {

            var abu = $scope.EmployeeCollection.find(function (item, index) {
                return item.ASSETNUMBER == ASSETNUMBER;
            });

            //$scope.EditEmployee = abu;

            AssetByUserInfo.set(abu);

            window.location = '#!/edit';

        }


        $scope.backFromEdit = function () {
            AssetByUserInfo.set({});
            window.location = '#!/add';
        }

        //Guarda la información de activo por usuario editada
        $scope.edit = function (form) {
            if (form.$invalid) {
                return;
            }

            if (confirm('Esta seguro que desea actualizar?')) {
                $http.put(Config.HostServices + '/api/ASSETBYUSERs/' + 'UPDATE', $scope.Employee).then(
                    function (response) {
                        //en caso exitoso
                        if (response.status == 204) {
                            //$scope.EditEmployee = null;
                            AssetByUserInfo.set({});
                            window.location = '#!/add';
                        } else {
                            if (response.status == 201) {
                                alert('No fue posible actualizar la información en este momento.');
                            }
                        }
                    }
                ), function (response) {
                    //en caso de error
                    alert('Error actualizando!');
                }
            }
        }
    }
])