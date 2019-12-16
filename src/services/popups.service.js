import angular from 'angular';
import app from 'app';

class PopupsService {
   /* @ngInject */
   constructor($mdDialog) {
       
       this.$mdDialog = $mdDialog;
       this.customFullscreen = false;
       this.defaultParentElement = angular.element(document.body);
   }   
   
   showPopup(title, content) {
   
    alert = this.$mdDialog.alert({
        title: title,
        textContent: content,
        ok: 'Close'
      });

      this.$mdDialog
        .show( alert )
        .finally(function() {
            alert = undefined;
        });
    }
   
    showConfirm (myFunctionConfirmed, employeeId) {   
   
    confirm = this.$mdDialog.confirm( {
          title: 'Are you sure you want to delete the employee?',
          textContent: 'The data will be permanently deleted from the database',
          ariaLabel: 'Lucky day',
          ok: 'Yes',
          cancel:'No'
    });

      this.$mdDialog
              .show(confirm)
              .then(
                () => {myFunctionConfirmed(employeeId);}
              );
    }
    
    showCustomPopup(template, controller, locals) {

       this.$mdDialog.show({
         parent: this.defaultParentElement,
         template,
         locals,
         controller,
         bindToController: true,
         controllerAs: '$ctrl'
      });
    }
}

export default angular
       .module(app)
       .service('popupsService', PopupsService)
       .name;