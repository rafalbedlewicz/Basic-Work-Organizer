import angular from 'angular';
import app from 'app';

class ToolsService {
    /* @ngInject */
    constructor() {
        
    }     
    
    mockServerResponse(responseData) {
        return Promise.resolve(responseData);
    }
    
    dateStringToDateObject(dateString) {
        const parsedDateString = new Date(dateString.replace(' ', 'T') + '00Z').toLocaleString();
        const _dateTimeArray = parsedDateString.split(', ');
        const _dateString = _dateTimeArray[0];
        const _timeString = _dateTimeArray[1];
        const _dateArray = _dateString.split('.').reverse();
        const _timeArray = _timeString.split(':').splice(0, 2); 
        _dateArray[1]--;

        return new Date(..._dateArray, ..._timeArray);
    }
}

export default angular
        .module(app)
        .service('toolsService', ToolsService)
        .name;