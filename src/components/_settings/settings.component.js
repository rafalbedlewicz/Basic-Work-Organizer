import angular from 'angular';
import app from 'app';

import template from './settings.template.html';
import controller from './settings.controller';
import './settings.scss';

export default angular
            .module(app)
            .component('settings', { template, controller })
            .name;

