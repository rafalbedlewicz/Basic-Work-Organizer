import angular from 'angular';
import app from 'app';

import template from './side-menu.template.html';
import controller from './side-menu.controller';
import './side-menu.scss';

export default angular
            .module(app)
            .component('sideMenu', { template, controller })
            .name;

