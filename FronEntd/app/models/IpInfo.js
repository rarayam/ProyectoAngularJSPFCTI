app.factory('IpInfo', ['$http', 'Config', 'IpInfo',
    function ($http, Config, IpInfo) {
        function IpInfo(data) {
            angular.extend(this, data);
        }

        return IpInfo;
    }
]);
