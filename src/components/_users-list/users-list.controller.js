import _ from 'lodash';

export default class UsersListController {
   /* @ngInject */
    constructor(popupsService) {
       
        this.popupsService = popupsService;
     
        this.currentlyAddedUser = {
            name: '',
            lastName: ''
        };
     
        this.errors = {
            name: {
                isEmpty: {
                    isOccuring: false,
                    label: 'User name cannot be empty!',
                    validator: () => this.currentlyAddedUser.name.length == 0
                },
                isWrong: {
                    isOccuring: false,
                    label: 'User name cannot contain any special characters!',
                    validator: () => this._isNameWrong(this.currentlyAddedUser.name)
                }
            },
            lastName: {
                isEmpty: {
                    isOccuring: false,
                    label: 'User last name cannot be empty!',
                    validator: () => this.currentlyAddedUser.lastName.length == 0
                },
                isWrong: {
                    isOccuring: false,
                    label: 'User last name cannot contain any special characters!',
                    validator: () => this._isLastNameWrong(this.currentlyAddedUser.lastName)
                }
            },
    };
     
     this.users = [];
   }
   
   addUser() {
       
       if(!this._validateUserInputs()) {
           return;
       }
       
       this.users.push({
           name: this.currentlyAddedUser.name,
           lastName: this.currentlyAddedUser.lastName,
           isCurrentlyEdited: false
       });

       this.currentlyAddedUser.name = '';
       this.currentlyAddedUser.lastName = ''; 
   }
   
   removeUser(index) {
       
       this.popupsService.showPopup('', 'Użytkownik został usunięty');
       this.users.splice(index, 1);
   }
   
    onUserEdit(index) {
       
        this.users[index].isCurrentlyEdited = !this.users[index].isCurrentlyEdited;
    }
   
    hasInputAnyErrors(inputName) {
        return _.some(this.errors[inputName], (singleError) => singleError.isOccuring);
    }
   
   
    _validateUserInputs() {
     
        let _areThereNoErros = true;
     
        for (let inputErrorLabel in this.errors) {
            for (let specificError in this.errors[inputErrorLabel]) {
                this.errors[inputErrorLabel][specificError].isOccuring = this.errors[inputErrorLabel][specificError].validator();
                
                /*if (this.errors[inputErrorLabel][specificError].isOccuring) {
                  _areThereNoErros = false;  
                }*/
                _areThereNoErros = !this.errors[inputErrorLabel][specificError].isOccuring && _areThereNoErros;
            }
        }
        
        
        return _areThereNoErros;
        
       /*
        this.errors.name.isEmpty.isOccuring = !this.errors.name.isEmpty.validator(); // () sprawia, że zwraca to, co funkcja zwraca, a nie samą funkcję
       */
    } 
       
    clearInputErrors(inputName) {
        
         for (let specificError in this.errors[inputName]) {
             this.errors[inputName][specificError].isOccuring = false;
         }
    }   
    
   _isNameWrong(inputName) {
         var re = new RegExp("^(?![()_.])(?!.*[)(_.])[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ'-._]+(?<![()_.])$");
         if (re.test([inputName])) {
            return false;
         } else {
            return true;
         }
   }
   
   _isLastNameWrong(inputName) {
       var re = new RegExp("^(?![()_.])(?!.*[)(_.])[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ'-._]+(?<![()_.])$");
         if (re.test([inputName])) {
            return false;
         } else {
            return true;
         }
   }
}