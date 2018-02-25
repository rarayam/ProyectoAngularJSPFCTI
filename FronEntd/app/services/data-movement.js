app.service('MovementData', ['$http', 'Config',
    function ($http, Config) {

        //aca se llama al servicio web, la promesa se manipula en el controlador
        this.PostMovement = function (movement) {
            return $http.post(Config.HostServices + '/api/ASSETMOVEMENTs', movement);
        }

    }
]);