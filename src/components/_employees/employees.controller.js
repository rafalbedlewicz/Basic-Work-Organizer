import _ from 'lodash';

export default class EmployeesController {
   /* @ngInject */
    constructor(layoutConstant, $scope, employeesService, popupsService, toastsService) {
           
        this.employeesService = employeesService;
        this.popupsService = popupsService;
        this.toastsService = toastsService;
        
        this.NO_EMPLOYEE_EDITED_INDEX = -1;
        this.EDITABLE_EMPLOYEE_VALUES = [
            {
                requestParamName: 'name'
            },
            {
                requestParamName: 'lastname'
            },
            {
                requestParamName: 'photo'
            },
            {
                requestParamName: 'phone'
            }
        ];

        this.fetchingEmployees = false;
        this.postingEmployee = false;
        this.removingEmployee = false;
        this.transformingStopped = false;
        this.editButtonMovingStart = false;
        this.editButtonMovingStop = false;
        this.employeesFetchingError = '';   
        this.employeeRemovingError = '';
        this.photo = '';        
        
        this.currentlyEditedEmployee = {
            name: '',
            lastname: '',
            photo: '',
            id: '',
            phone: ''
        };
        
        this.giveUpThePhoto = false;
        
        this.errors = {
            name: {
                isEmpty: {
                    isOccuring: false,
                    label: 'Pole "IMIĘ" nie może być puste!',
                    validator: () => this.currentlyAddedEmployee.name.length == 0
                },
                isWrong: {
                    isOccuring: false,
                    label: 'Pole "IMIĘ" nie może zawierać znaków specjalnych!',
                    validator: () => this._isNameWrong(this.currentlyAddedEmployee.name)
                }
            },
            lastname: {
                isEmpty: {
                    isOccuring: false,
                    label: 'Pole "NAZWISKO" nie może być puste!',
                    validator: () => this.currentlyAddedEmployee.lastname.length == 0
                },
                isWrong: {
                    isOccuring: false,
                    label: 'Pole "NAZWISKO" nie może zawierać znaków specjalnych!',
                    validator: () => this._isLastNameWrong(this.currentlyAddedEmployee.lastname)
                }
            },
            phone: {
                isEmpty: {
                    isOccuring: false,
                    label: 'Pole "NUMER TELEFONU" nie może być puste!',
                    validator: () => this.currentlyAddedEmployee.phone.length == 0
                },
                isWrong: {
                    isOccuring: false,
                    label: 'Pole "NUMER TELEFONU" nie może zawierać znaków specjalnych!',
                    validator: () => this._isPhoneWrong(this.currentlyAddedEmployee.phone)
                }
            },
        };
        
        $scope.$watch('$ctrl.currentlyEditedEmployee.photo', (newValue, oldValue) => {
            if(newValue.base64) {
                this.currentlyEditedEmployee.photo = newValue.base64;
            }
        });
    }
    
   onEmployeeRemovalConfirmed(employeeId) {
       
        this.employeeRemovingError = '';       
        this.removingEmployee = true;
       
        this.employeesService.removeEmployee(employeeId).then(
            response => {
                this.removingEmployee = false;
                this._onEmployeeSuccessfullyRemoved(employeeId);
            },
            error => {
                this.removingEmployee = false;
                this._onEmployeeRemovingFailure(error);
            }
        );  
    }
    
    removeEmployee(myFunctionConfirmed, employeeId) {

        this.popupsService.showConfirm(myFunctionConfirmed.bind(this), employeeId)
  
    }
      
    _onEmployeeSuccessfullyRemoved(employeeId) {
        
       _.remove(this.employees, employee => employee.id === employeeId);
    }
    
    _onEmployeeRemovingFailure(error) {
        this.employeeRemovingError = error;
    }
    
    _onEmployeeEditingFailure(error) {
        this.employeeRemovingError = error;
     }
    
    onStartEmployeeEditing(employeeId) {
         
         // PRACA, SOURCETREE I ROZPISAC, CO TU ZROBIC
         
         this.transformingStopped = true;   
         this.currentlyEditedEmployeeId = employeeId;
         this.currentlyEditedEmployee = angular.copy(_.find(this.employees, {id: this.currentlyEditedEmployeeId}));
    }
    
    isNameLastnameEdited() {
        var dupa;
        setTimeout(dupa, 1000);
        return dupa;
    }
    
    isNameLastnameEditedStarted() {
        return true;
    }
    
    onFinishEmployeeEditing() {
        this._sendUpdatedEmployeeData();
        this.transformingStopped = false;   
    }
    
    onResignEmployeeEditing() {
        this.currentlyEditedEmployeeId = this.NO_EMPLOYEE_EDITED_INDEX;
        this.transformingStopped = false; 
    }
    
    _onDeletePhotoInEmployeeEditing() {
        this.currentlyEditedEmployee.photo = '';
        this.giveUpThePhoto = false;
    }
        
    _sendUpdatedEmployeeData() {
        
        const currentlyEditedEmployeeOldData = _.find(this.employees, {id: this.currentlyEditedEmployeeId});
        const employeeDataChanges = {};
        
        this.EDITABLE_EMPLOYEE_VALUES.forEach(editableEmployeeValue => {
            
            const _oldValue = _.get(currentlyEditedEmployeeOldData, editableEmployeeValue.requestParamName, '');
            const _newValue = _.get(this.currentlyEditedEmployee, editableEmployeeValue.requestParamName, '');
            
            if(_oldValue != _newValue) {
                employeeDataChanges[editableEmployeeValue.requestParamName] = _newValue;
            }
        });

        this.employeeEditingError = '';       
        this.sendingUpdatedEmployeeData = true;
       
        if(Object.keys(employeeDataChanges).length === 0) {
            return;
        }
       
        this.employeesService.updateEmployee(
                this.currentlyEditedEmployeeId, 
                employeeDataChanges
        )
        .then(
            response => {
                this.sendingUpdatedEmployeeData = false;
                this._onEmployeeSuccessfullyEdited(this.currentlyEditedEmployeeId);
            },
            error => {
                this.sendingUpdatedEmployeeData = false;
                this._onEmployeeEditingFailure(error);
            }
        ); 
        
    }
    
    _onEmployeeSuccessfullyEdited(currentlyEditedEmployeeId) {
        
        var i;
        for (i = 0; i < this.employees.length; i++) { 
            if (this.employees[i].id === currentlyEditedEmployeeId) {
                
                        this.employees[i].name = this.currentlyEditedEmployee.name;
                        this.employees[i].lastname = this.currentlyEditedEmployee.lastname;
                        this.employees[i].photo = this.currentlyEditedEmployee.photo;
                        this.employees[i].phone = this.currentlyEditedEmployee.phone;
                        
                        this.currentlyEditedEmployee.name = '';
                        this.currentlyEditedEmployee.lastname = ''; 
                        this.currentlyEditedEmployee.photo = '';   
                        this.currentlyEditedEmployee.phone = '';  

                        this.toastsService.showSuccessMessage('Data has been changed');

                        this.currentlyEditedEmployeeId = this.NO_EMPLOYEE_EDITED_INDEX;
            }
        }
    } 

    _validateEmployeeInputs() {
     
        let _areThereNoErros = true;
     
        for (let inputErrorLabel in this.errors) {
            for (let specificError in this.errors[inputErrorLabel]) {
                this.errors[inputErrorLabel][specificError].isOccuring = this.errors[inputErrorLabel][specificError].validator();
                _areThereNoErros = !this.errors[inputErrorLabel][specificError].isOccuring && _areThereNoErros;
            }
        } 
        return _areThereNoErros;
    } 
    
    _isNameWrong(inputName) {
        
        var re = new RegExp("^(?![()_.])(?!.*[)(_.])[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ'-._]+(?<![()_.])$");
         
        if (re.test([inputName])) {
           return false;
        }
        else {
           return true;
        }
    }
   
    _isLastNameWrong(inputName) {
        
        var re = new RegExp("^(?![()_.])(?!.*[)(_.])[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ'-._]+(?<![()_.])$");
        
        if (re.test([inputName])) {
           return false;
        } 
        else {
           return true;
        }
    }
    
    _isPhoneWrong(inputName) {
        
        var re = new RegExp();
        
        if (re.test([inputName])) {
           return false;
        } 
        else {
           return true;
        }
    }
    
    handlePhoto(base64Photo) {
        return base64Photo ? 'data:image/png;base64,' + base64Photo
        : (this.giveUpThePhoto === true? '': 'img/default_photo.png');
    }
}