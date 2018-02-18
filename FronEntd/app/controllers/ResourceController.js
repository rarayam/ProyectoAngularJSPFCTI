app.controller('ResourceController', ['$scope', '$http', 'Config','IpData',
    function ($scope, $http, Config, IpData) {

        

        $scope.EmployeeCollection = [];
        $scope.UserInfo = {

            'UserName': localStorage.getItem('token'),
            'UserIp': IpData.GetIp()
        };

        $scope.UserInfo2 = {
            'UserName': 'tome',
            'UserIp': 'pal pinto'
        };
      

        $scope.list = function () {
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
                    if (response.status == 200 || response.status == 204 ) {
                        alert('Registro exitoso!');
                        window.location = '#!/add'
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