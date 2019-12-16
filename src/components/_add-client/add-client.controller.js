import _ from 'lodash';

export default class AddClientController {
   /* @ngInject */
    constructor(layoutConstant, $scope, clientsService, popupsService, toastsService, $state) {
           
        this.clientsService = clientsService;
        this.popupsService = popupsService;
        this.toastsService = toastsService;
        this.state = $state;
       
        
        this.postingClient = false;

        this.currentlyAddedClient = {
            name: '',
            lastname: '',
            phone: '',
            more: '',
            unwanted: '',
        };
        
        this.errors = {
            name: {
                isEmpty: {
                    isOccuring: false,
                    label: 'Field "NAME" is required!',
                    validator: () => this.currentlyAddedClient.name.length == 0
                },
                isWrong: {
                    isOccuring: false,
                    label: 'Field "NAME" can not contain special characters!',
                    validator: () => this._isNameWrong(this.currentlyAddedClient.name)
                }
            },
            lastname: {
                isEmpty: {
                    isOccuring: false,
                    label: 'Field "LAST NAME" is required!',
                    validator: () => this.currentlyAddedClient.lastname.length == 0
                },
                isWrong: {
                    isOccuring: false,
                    label: 'Field "LAST NAME" can not contain special characters!',
                    validator: () => this._isLastNameWrong(this.currentlyAddedClient.lastname)
                }
            },
            phone: {
                isEmpty: {
                    isOccuring: false,
                    label: 'Field "PHONE NUMBER" is required!',
                    validator: () => this.currentlyAddedClient.phone.length == 0
                },
                isWrong: {
                    isOccuring: false,
                    label: 'Field "PHONE" can only contain numbers!',
                    validator: () => this._isPhoneWrong(this.currentlyAddedClient.phone)
                }
            },
        }
    }
       
    addClient() {
        console.log(this.currentlyAddedClient.unwanted);
    
        this.clientPostingError = ''; 

        if(!this._validateClientInputs()) {
            return;
        }   

        this.postingClient = true;   

        this.clientsService.addClient({
            name: this.currentlyAddedClient.name,
            lastname: this.currentlyAddedClient.lastname,
            phone: this.currentlyAddedClient.phone,
            more: this.currentlyAddedClient.more,
            unwanted: this.currentlyAddedClient.unwanted,
            
        }).then(  
            response => {
                this.postingClient = false;
                this._onClientSuccessfullyAdded(response.data);
                 console.log(this.currentlyAddedClient.unwanted);
                
            },

            error => {
                this.postingClient = false;
                this._onClientAddingFailure(error);
            }
         );   
    } 
    
    _onClientSuccessfullyAdded(id) {
        this.toastsService.showSuccessMessage('Pracownik został dodany');
        this.state.go('clients');       
    }

    _onClientAddingFailure(error) {
        this.clientPostingError = error;
    }

    _validateClientInputs() {
     
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
}