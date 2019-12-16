import angular from 'angular';
import app from 'app';

import template from './add-new-event-popup.template.html';
import controller from './add-new-event-popup.controller';
import './add-new-event-popup.scss';

let bindings = {
    test: '<'
};

export default angular
            .module(app)
            .component('addNewEventPopup', { template, controller, bindings})
            .name;

