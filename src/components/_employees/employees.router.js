import angular from 'angular';
import app from 'app';

import {employeesList} from './employees.resolver.js';

const EMPLOYEES_ROUTER = {
    employeesState: {
        url: '^/employees',
        template: `<employees employees="$resolve.employeesList"></employees>`,
        resolve: {
            employeesList
        }
    }
};

/* @ngInject */
let employeesRouter = $stateProvider => $stateProvider.state(
        'employees',
        EMPLOYEES_ROUTER.employeesState
    );

export default angular
    .module(app)
    .config(employeesRouter)
    .name;

