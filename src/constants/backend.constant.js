import angular from 'angular';
import app from 'app';
 
const BACKEND_CONSTANT = {
       apiUrl: 'http://localhost:4567/'
};
 
export default angular
       .module(app)
       .constant('backendConstant', BACKEND_CONSTANT)
       .name;