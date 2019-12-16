import angular from 'angular';
import app from 'app';

class RestService {
    /* @ngInject */
    constructor(backendConstant, $http) {

        this.$http = $http;

        this.restApiUrl = backendConstant.apiUrl;
    }     
   
    get(endpointUrl, data, headers) {
        return this.$http.get(
            this.restApiUrl + endpointUrl, 
            {
               params: data
            }
        );
    }
   
    post(endpointUrl, data) {
        return this.$http.post(
           this.restApiUrl + endpointUrl, data
        );
    }
   
    delete(endpointUrl) {
        return this.$http.delete(
            this.restApiUrl + endpointUrl
        );
    }
    patch(endpointUrl, data) {
        console.log(data);
        return this.$http.patch(
            this.restApiUrl + endpointUrl, data
        );
    }
}

export default angular
        .module(app)
        .service('restService', RestService)
        .name;