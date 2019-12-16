import angular from 'angular';
import app from 'app';

import template from './add-employee.template.html';
import controller from './add-employee.controller';
import './add-employee.scss';

export default angular
            .module(app)
            .component('addEmployee', { template, controller})
            .name;

