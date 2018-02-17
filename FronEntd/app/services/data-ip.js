app.service('IpData', ['$http','Config',
    function ($http, Config) {
        this.GetIp = function () {
            var Ip = 'No se pudo obtener, verifique conexión de red';
            $http.get(Config.HostServices + '/api/Ip').then(
                function (response) {
                    //en caso exitoso
                    var status = response.status;
                    console.log("apso por sdfse");
                    if (response.status == 200 && response.data) {
                        console.log("anduvo yes2");                        
                        Ip = response.data.Ip;
                        console.log(Ip);
                        return Ip;
                    }
                }
            ), function (response) {
                //en caso de error
                alert('Error al consultar IP!');
            }
           
        }


    }
]);