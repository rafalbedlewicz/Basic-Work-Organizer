import angular from 'angular';
import app from 'app';

class ClientsService {
    /* @ngInject */
    constructor(restService) {
        this.restService = restService;
    }     

    getAllClients() {
        return this.restService.get('clients');
    }

    addClient(clientData) {
         console.log(clientData.unwanted);
        return this.restService.post('clients', clientData);
    }

    removeClient(clientId) {
        return this.restService.delete('clients/' + clientId);
        
    }
    updateClient(clientId, clientData){
        return this.restService.patch('clients/' + clientId, clientData);
    }
}

export default angular
        .module(app)
        .service('clientsService', ClientsService)
        .name;