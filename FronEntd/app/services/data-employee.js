app.service('DataEmployee', ['$http', 'Config',
    function ($http, Config) {       
        //aca se llama al servicio web, la promesa se manipula en el controlador
        this.GetUser = function (user) {
            return $http.post(Config.HostServices + '/api/ASSETBYUSERs/' , user);
        }
    }
]);