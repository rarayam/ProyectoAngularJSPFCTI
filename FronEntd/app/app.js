var app = angular.module('MyApp', [
    'ngRoute'
]);


app.run(['$rootScope',
    function ($rootScope) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            var token = localStorage.getItem('token');

            if (next.$$route == 'home' && next.$$route.auth && !token) {
                event.preventDefault();
                window.location = '#!/login';
            }

            if (next.$$route && next.$$route.auth && !token) {
                event.preventDefault();
                window.location = '#!/login';
            }


        });
    }
]);