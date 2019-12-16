import angular from 'angular';
import app from 'app';

const ADD_EMPLOYEE_ROUTER = {
    addEmployeeState: {
        url: '^/add-employee',
        template: `<add-employee></add-employee>`
    }
};

/* @ngInject */
let addEmployeeRouter = $stateProvider => $stateProvider.state(
        'add-employee',
        ADD_EMPLOYEE_ROUTER.addEmployeeState
    );

export default angular
    .module(app)
    .config(addEmployeeRouter)
    .name;

