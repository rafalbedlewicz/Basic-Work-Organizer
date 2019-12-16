import angular from 'angular';
import app from 'app';

import template from './clients.template.html';
import controller from './clients.controller';
import './clients.scss';

let bindings = {
    clients: '<'
};

export default angular
            .module(app)
            .component('clients', { template, controller, bindings })
            .name;

