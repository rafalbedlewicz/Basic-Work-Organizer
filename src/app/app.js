import angular from 'angular';
import '@uirouter/angularjs';
import 'angular-material';
import 'angular-base64-upload';
import 'angular-bootstrap-calendar';
import 'angular-ui-bootstrap';

const app = angular.module('app', [
    'ui.router',
    'ngMaterial',
    'naif.base64',
    'mwl.calendar',
    'ui.bootstrap'
    
]);

export default app.name;