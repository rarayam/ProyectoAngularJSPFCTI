app.service('IpData', ['$http','Config',
    function ($http, Config) {
        var IpInfo = {};

        this.GetIp = function () {            
            $http.get(Config.HostServices + '/api/Ip').then(
                function (response) {
                    //en caso exitoso                   
                    if (response.status == 200 && response.data) {
                        var IpData = response.data;
                        IpInfo = { fn: IpData.Ip };
                        console.log('Esto indica que el servicio si lo trajo: ' + IpInfo.fn);                        
                    }
                }
            ), function (response) {
                //en caso de error
                alert('Error al consultar IP!');
                }

            console.log('esto es lo que debería devolver - ' + IpInfo.fn + ' - si dice "undefined" entonces no se guardó');
            return IpInfo;
        }

        

    }
]);