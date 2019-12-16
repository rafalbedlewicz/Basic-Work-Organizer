import angular from 'angular';
import app from 'app';

import template from './app-container.template.html';
import controller from './app-container.controller';
import './app-container.scss';

export default angular
            .module(app)
            .component('appContainer', {template,controller })
            .name;