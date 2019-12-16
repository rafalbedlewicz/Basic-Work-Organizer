import angular from 'angular';
import app from 'app';

import template from './employees.template.html';
import controller from './employees.controller';
import './employees.scss';

let bindings = {
    employees: '<'
}; 

export default angular
            .module(app)
            .component('employees', { template, controller, bindings })
            .name;

