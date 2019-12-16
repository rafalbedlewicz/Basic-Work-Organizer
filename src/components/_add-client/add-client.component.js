import angular from 'angular';
import app from 'app';

import template from './add-client.template.html';
import controller from './add-client.controller';
import './add-client.scss';

export default angular
            .module(app)
            .component('addClient', { template, controller})
            .name;

