import _ from 'lodash';

export default class AddEmployeeController {
   /* @ngInject */
    constructor(layoutConstant, $scope, employeesService, popupsService, toastsService, $state) {
           
        this.employeesService = employeesService;
        this.popupsService = popupsService;
        this.toastsService = toastsService;
        this.state = $state;
       
        
        this.postingEmployee = false;
        this.photo = '';

        this.currentlyAddedEmployee = {
            name: '',
            lastname: '',
            photo: ''.base64,
            id: '',
            phone: '',
            color: ''
        };
        
        this.giveUpThePhoto = false;
        
        this.errors = {
            name: {
                isEmpty: {
                    isOccuring: false,
                    label: 'Field "NAME" is required!',
                    validator: () => this.currentlyAddedEmployee.name.length == 0
                },
                isWrong: {
                    isOccuring: false,
                    label: 'Field "NAME" can not contain special characters!',
                    validator: () => this._isNameWrong(this.currentlyAddedEmployee.name)
                }
            },
            lastname: {
                isEmpty: {
                    isOccuring: false,
                    label: 'Field "LAST NAME" is required!',
                    validator: () => this.currentlyAddedEmployee.lastname.length == 0
                },
                isWrong: {
                    isOccuring: false,
                    label: 'Field "LAST NAME" can not contain special characters!',
                    validator: () => this._isLastNameWrong(this.currentlyAddedEmployee.lastname)
                }
            },
            phone: {
                isEmpty: {
                    isOccuring: false,
                    label: 'Field "PHONE NUMBER" is required!',
                    validator: () => this.currentlyAddedEmployee.phone.length == 0
                },
                isWrong: {
                    isOccuring: false,
                    label: 'Field "PHONE NUMBER" can not contain special characters!',
                    validator: () => this._isPhoneWrong(this.currentlyAddedEmployee.phone)
                }
            },
            color: {
                isEmpty: {
                    isOccuring: false,
                    label: 'Field "PHONE" can only contain numbers!',
                    validator: () => this.currentlyAddedEmployee.color.length == 0
                },
            },
        };
    }
       
    addEmployee() {

    
        this.employeePostingError = ''; 
        this.giveUpThePhoto = false

        if(!this._validateEmployeeInputs()) {
            return;
        }   

        this.postingEmployee = true;   

        this.employeesService.addEmployee({
            name: this.currentlyAddedEmployee.name,
            lastname: this.currentlyAddedEmployee.lastname,
            photo: _.get(this.currentlyAddedEmployee, 'photo.base64', ''),
            phone: this.currentlyAddedEmployee.phone,
            color: this.currentlyAddedEmployee.color,
        }).then(  
            response => {
                this.postingEmployee = false;
                this._onEmployeeSuccessfullyAdded(response.data);
                
            },

            error => {
                this.postingEmployee = false;
                this._onEmployeeAddingFailure(error);
            }
         );
    } 
    
    _onEmployeeSuccessfullyAdded(id) {
        this.toastsService.showSuccessMessage('Pracownik został dodany');
        this.state.go('employees');       
    }
    
    _onDeletePhotoInEmployeeAdding() {
        this.currentlyAddedEmployee.photo = '';
            this.giveUpThePhoto = true;
    }

    _onEmployeeAddingFailure(error) {
        this.employeePostingError = error;
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
        
        var re = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$");
        
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