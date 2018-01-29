app.service('DataUsers', [
    function () {
        var count = 0;
        var users = [
            {
                id: 1,
                Nombre: 'Roger',
                Apellido: 'Araya',
                Telefono: 88606902,
                Edad: 32
            },
            {
                id: 2,
                Nombre: 'Sonia',
                Apellido: 'Fallas',
                Telefono: 88216089,
                Edad: 32
            },
            {
                id: 3,
                Nombre: 'Alicia',
                Apellido: 'Montero',
                Telefono: 22742920,
                Edad: 53
            }
        ];

        this.getAll = function () {
            return users;
        }

        this.getHome = function () {
            var userhome = [];
            for (var i = 0; i < users.length; i++) {
                var uHome = {
                    NombreCompleto: users[i].Nombre + ' ' + users[i].Apellido,
                    Edad: users[i].Edad
                            };
                userhome.push(uHome);
            }
            return userhome;
        }

        this.Insert = function (user) {
            var u = {
                id: count++,
                Nombre: user.Nombre,
                Apellido: user.Apellido,
                Telefono: user.Telefono,
                Edad: user.Edad
            }

            users.push(u);
        }

        this.remove = function (id, user) {
            var u = users.find(function (item, index) {
                return item.id == id;
            });

            var index = users.indexOf(u);
            users.splice(index, 1);
        }

        
    }
]);