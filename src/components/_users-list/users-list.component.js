import angular from 'angular';
import app from 'app';

import template from './users-list.template.html';
import controller from './users-list.controller';
import './users-list.scss';

export default angular
            .module(app)
            .component('usersList', { template, controller })
            .name;