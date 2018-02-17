app.service('DataEmployee', ['$http',
    function ($http) {
        var count = 0;
        var EmployeeCollection = [
        ];

        this.getAll = function () {
            return EmployeeCollection;
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