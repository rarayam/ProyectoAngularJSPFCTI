app.service('IpData', ['$http', 'Config',
    function ($http, Config) {
        var UserName = 'deafult';

        //aca se llama al servicio web, la promesa se manipula en el controlador
        this.GetIp =  function () {
            return  $http.get(Config.HostServices + "/api/Ip");
        }

        //aca se llama al servicio web, la promesa se manipula en el controlador
        this.PostLogin = function (user) {
            return $http.post(Config.HostServices + '/api/Login', user);
        }

        this.SetUserName = function (userSent) {
            UserName = userSent;
            console.log('usuario ' + UserName );
        }

        this.GetUserName = function(){
            console.log('usuario devuelto ' + UserName);
            return UserName;
        }

    }
]);