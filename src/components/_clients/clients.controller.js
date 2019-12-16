import _ from 'lodash';

export default class ClientsController {
   /* @ngInject */
    constructor(layoutConstant, $scope, clientsService, popupsService, toastsService) {
           
        this.clientsService = clientsService;
        this.popupsService = popupsService;
        this.toastsService = toastsService;
        
        this.NO_CLIENT_EDITED_INDEX = -1;
        this.EDITABLE_CLIENT_VALUES = [
            {
                requestParamName: 'name'
            },
            {
                requestParamName: 'lastname'
            },
            {
                requestParamName: 'phone'
            },
            {
                requestParamName: 'more'
            },
            {
                requestParamName: 'unwanted'
            }
        ];

        this.fetchingClients = false;
        this.postingClients = false;
        this.removingClient = false;
        this.clientsFetchingError = '';   
        this.clientRemovingError = '';     
        
        this.currentlyEditedClient = {
            name: '',
            lastname: '',
            phone: '',
            more: '',
            unwanted: '',
            id: '',
        };
        
        this.errors = {
            name: {
                isEmpty: {
                    isOccuring: false,
                    label: 'Pole "IMIĘ" nie może być puste!',
                    validator: () => this.currentlyAddedClient.name.length == 0
                },
                isWrong: {
                    isOccuring: false,
                    label: 'Pole "IMIĘ" nie może zawierać znaków specjalnych!',
                    validator: () => this._isNameWrong(this.currentlyAddedClient.name)
                }
            },
            lastname: {
                isEmpty: {
                    isOccuring: false,
                    label: 'Pole "NAZWISKO" nie może być puste!',
                    validator: () => this.currentlyAddedClient.lastname.length == 0
                },
                isWrong: {
                    isOccuring: false,
                    label: 'Pole "NAZWISKO" nie może zawierać znaków specjalnych!',
                    validator: () => this._isLastNameWrong(this.currentlyAddedClient.lastname)
                }
            },
            phone: {
                isEmpty: {
                    isOccuring: false,
                    label: 'Pole "TELEFON" nie może być puste!',
                    validator: () => this.currentlyAddedClient.phone.length == 0
                },
                isWrong: {
                    isOccuring: false,
                    label: 'Pole "TELEFON" może zawierać tylko cyfry!',
                    validator: () => this._isPhoneWrong(this.currentlyAddedClient.phone)
                }
            },
    }
}
    
   onClientRemovalConfirmed(clientId) {
       
        this.clientRemovingError = '';       
        this.removingClient = true;
       
        this.clientsService.removeClient(clientId).then(
            response => {
                this.removingClient = false;
                this._onClientSuccessfullyRemoved(clientId);
            },
            error => {
                this.removingClient = false;
                this._onClientRemovingFailure(error);
            }
        ); 
    }
    
    removeClient(myFunctionConfirmed, clientId) {

        this.popupsService.showConfirm(myFunctionConfirmed.bind(this), clientId)
  
    }
      
    _onClientSuccessfullyRemoved(clientId) {
        
       _.remove(this.clients, client => client.id === clientId);
    }
    
    _onClientRemovingFailure(error) {
        this.clientRemovingError = error;
    }
    
    _onClientEditingFailure(error) {
        this.clientRemovingError = error;
     }
    
    onStartClientEditing(clientId) {
         this.currentlyEditedClientId = clientId;
         this.currentlyEditedClient = angular.copy(_.find(this.clients, {id: this.currentlyEditedClientId}));
    }
    
    isNameLastnameEdited() {
        var dupa;
        setTimeout(dupa, 1000);
        return dupa;
    }
    
    isNameLastnameEditedStarted() {
        return true;
    }
    
    onFinishClientEditing() {
        this._sendUpdatedClientData();
    }
    
    onResignClientEditing() {
        this.currentlyEditedClientId = this.NO_CLIENT_EDITED_INDEX;
    }
    
    _onDeletePhotoInClientEditing() {
        this.currentlyEditedClient.photo = '';
        this.giveUpThePhoto = false;
    }
        
    _sendUpdatedClientData() {
        
        const currentlyEditedClientOldData = _.find(this.clients, {id: this.currentlyEditedClientId});
        const clientDataChanges = {};
        
        this.EDITABLE_CLIENT_VALUES.forEach(editableClientValue => {
            
            const _oldValue = _.get(currentlyEditedClientOldData, editableClientValue.requestParamName, '');
            const _newValue = _.get(this.currentlyEditedClient, editableClientValue.requestParamName, '');
            
            if(_oldValue != _newValue) {
                clientDataChanges[editableClientValue.requestParamName] = _newValue;
            }
        });

        this.clientEditingError = '';       
        this.sendingUpdatedClientData = true;
       
        if(Object.keys(clientDataChanges).length === 0) {
            return;
        }
       
        this.clientsService.updateClient(
                this.currentlyEditedClientId, 
                clientDataChanges
        )
        .then(
            response => {
                this.sendingUpdatedClientData = false;
                this._onClientSuccessfullyEdited(this.currentlyEditedClientId);
            },
            error => {
                this.sendingUpdatedClientData = false;
                this._onClientEditingFailure(error);
            }
        ); 
        
    }
    
    _onClientSuccessfullyEdited(currentlyEditedClientId) {
        
        var i;
        for (i = 0; i < this.clients.length; i++) { 
            if (this.clients[i].id === currentlyEditedClientId) {
                
                        this.clients[i].name = this.currentlyEditedClient.name;
                        this.clients[i].lastname = this.currentlyEditedClient.lastname;
                        this.clients[i].phone = this.currentlyEditedClient.phone;
                        this.clients[i].more = this.currentlyEditedClient.more;
                        this.clients[i].unwanted = this.currentlyEditedClient.unwanted;
                        
                        /*this.currentlyEditedClient.name = '';
                        this.currentlyEditedClient.lastname = ''; 
                        this.currentlyEditedCient.phone = '';    
                        this.currentlyEditedCient.more = '';  
                        this.currentlyEditedCient.unwanted = '';*/

                        this.toastsService.showSuccessMessage('Data has been changed');

                        this.currentlyEditedClientId = this.NO_CLIENT_EDITED_INDEX;
            }
        }
    }
    
    _getMoreInformation(clientId) {
        var i;
        for (i = 0; i < this.clients.length; i++) { 
            if (this.clients[i].id === clientId) {
                this.popupsService.showPopup(this.clients[i].more);
            }
        }
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
        
        var re = new RegExp();
        
        if (re.test([inputName])) {
           return false;
        } 
        else {
           return true;
        }
    }
    
}