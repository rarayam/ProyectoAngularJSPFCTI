app.service('IpData', ['$http',
    function ($http) {
        this.GetIp = function () {
            var Ip = 'No se pudo obtener, verifique conexión de red';
            $http.get(Config.HostServices + '/api/Ip').then(
                function (response) {
                    //en caso exitoso
                    if (response.status == 200 && response.data) {
                        var Ip = response.data;
                    }
                }
            ), function (response) {
                //en caso de error
                alert('Error al consultar IP!');
            }

        }


    }
]);