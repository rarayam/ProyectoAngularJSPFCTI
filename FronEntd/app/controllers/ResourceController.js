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
            ), function (response) {
                //en caso de error
                alert('Error!');
                }

        }


        $scope.add = function () {

            $http.post(Config.HostServices + '/api/ASSETBYUSERs', $scope.Employee).then(
                function (response) {
                    //en caso exitoso                    
                    if (response.status == 200 || response.status == 204 || response.status == 201) {
                        alert('Registro exitoso!');                       
                        angular.element('#exampleModal').modal('hide');
                        $scope.list();
                    }
                }
            ), function (response) {
                //en caso de error
                alert('Error registrando activo!');
                }

        }
        
        $scope.remove = function (id,ResourceId) {
            DataEmployee.remove(id);
        }
    }
])