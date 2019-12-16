import angular from 'angular';
import app from 'app';

import _ from 'lodash';

class EventsService {
    /* @ngInject */
    constructor(moment, restService, toolsService) {
        
        this.moment = moment;
        this.restService = restService;
        this.toolsService = toolsService;
    }    
    
    getAllEvents() {
        return this.restService.get('events').then(response => {
            return this._processBackendEventsDataToCalendarEvents(response.data);
        });
    }
    
    _processBackendEventsDataToCalendarEvents(events) {
       
       const actions = [{
          label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
          onClick: function(args) {
            alert.show('Edited', args.calendarEvent);
          }
        }, {
          label: '<i class=\'glyphicon glyphicon-remove\'></i>',
          onClick: function(args) {
            alert.show('Deleted', args.calendarEvent);
          }
    }];
       
       return _.map(events, event => {
            return _.assign({}, event, {
                startsAt: this.toolsService.dateStringToDateObject(event.startDate),
                endsAt: this.toolsService.dateStringToDateObject(event.endDate),
                draggable: true,
                resizable: true,
                actions
            });
        });
    }

    addEvent(eventData) {
        return this.restService.post('events', eventData);
    }

    removeEvent(eventId) {
        return this.restService.delete('events/' + eventId);
        
    }
    updateEvent(eventId, eventData){
        console.log('dotąd dociera');
        return this.restService.patch('events/' + eventId, eventData);
    }
}

export default angular
        .module(app)
        .service('eventsService', EventsService)
        .name;