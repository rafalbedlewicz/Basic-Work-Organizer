import angular from 'angular';
import app from 'app';

class ToastsService {
   /* @ngInject */
    constructor($mdToast) {

        this.$mdToast = $mdToast;
    }   
   
    showErrorMessage(message) {

        this._showMessage({
            message,
            class: 'toast--error'
        });
    }

    showSuccessMessage(message) {
    
        this._showMessage({
            message,
            class: 'toast--success'
        });
        
    }
    
    _showMessage(confObject) {
        
        this.$mdToast.show(
            this.$mdToast.simple()
            .textContent(confObject.message || '')
            .toastClass(confObject.class || '')
            .position('bottom left')
            .hideDelay(3000)
        );
    }
}

export default angular
       .module(app)
       .service('toastsService', ToastsService)
       .name;