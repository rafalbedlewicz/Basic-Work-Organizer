import angular from 'angular';
import app from 'app';
import _ from 'lodash';

class EmployeesService {
    /* @ngInject */
    constructor(restService) {
        this.restService = restService;
    }     

    getAllEmployees() {
        return this.restService.get('employees');
    }

    addEmployee(employeeData) {
        return this.restService.post('employees', employeeData);
    }

    removeEmployee(employeeId) {
        return this.restService.delete('employees/' + employeeId);
    }
    updateEmployee(employeeId, employeeData){
        return this.restService.patch('employees/' + employeeId, employeeData);
    }
    // mozna by to zoptyamilzowac-  zeby byl endpoint do pobierania samych kolorow, bo na teraz niepotrzebnie pobiera calych employerow
    getEmployeesColors() {
        return this.getAllEmployees().then(
            response => {
                return _.mapValues(_.keyBy(response.data, 'id'), 'color')
            }   
        );
    }
}

export default angular
        .module(app)
        .service('employeesService', EmployeesService)
        .name;