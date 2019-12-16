import angular from 'angular';
import app from 'app';

import template from './calendar.template.html';
import controller from './calendar.controller';
import './calendar.scss';

let bindings = {
    events: '<',
    employeesColors: '<'
};

export default angular
            .module(app)
            .component('calendar', { template, controller, bindings })
            .name;

