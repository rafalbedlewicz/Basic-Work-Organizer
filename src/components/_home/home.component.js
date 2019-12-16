import angular from 'angular';
import app from 'app';

import template from './home.template.html';
import controller from './home.controller';
import './home.scss';

let bindings = {
     home: '<'
}; 

export default angular
            .module(app)
            .component('home', { template, controller, bindings })
            .name;

