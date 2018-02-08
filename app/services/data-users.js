app.service('DataEmployee', [
    function () {
        var count = 0;
        var EmployeeCollection = [
        ];

        this.getAll = function () {
            return EmployeeCollection;
        }

        this.getHome = function () {
            var userhome = [];
            for (var i = 0; i < EmployeeCollection.length; i++) {
                var uHome = {
                    NombreCompleto: EmployeeCollection[i].Nombre + ' ' + EmployeeCollection[i].Apellido,
                    Edad: Employee[i].Edad
                            };
                userhome.push(uHome);
            }
            return userhome;
        }

        this.Insert = function (Employee) {
            var u = {
                Name: Employee.Name,
                Id: Employee.Id,
                IP: Employee.IP,
                ServiceUnit: Employee.ServiceUnit,
                ResourceId: Employee.ResourceId
            }


            EmployeeCollection.push(u);
        }

        this.Remove = function (id, Employee) {
            
        }

        
    }
]);