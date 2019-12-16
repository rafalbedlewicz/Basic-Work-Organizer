import _ from 'lodash';

import addNewEventPopupTemplate from '../add-new-event-popup/add-new-event-popup.template.html';
import addNewEventPopupController from '../add-new-event-popup/add-new-event-popup.controller';

export default class CalendarController {
   /* @ngInject */
    constructor(moment, popupsService, employeesService, eventsService, $state) { //constructor znika po tym, jak zostanie wykonany. to, co jest z "this" nie zniknie     
 
        this.moment = moment;
        this.popupsService = popupsService;
        this.eventsService = eventsService;
        this.$state = $state;
            
            //These variables MUST be set as a minimum for the calendar to work
        this.calendarView = 'day';
        this.viewDate = new Date();
    
        // trzeba powyższą funkcję przerobić tak, żeby kolory były pobierane w resolverze, \
        // a nie dopiero tu. Kombinuj. ale to wczesniej trzeba tu tego resolvera zrobic
        this.defaultNewEventConfig = {
            title: 'New event',
            startsAt: moment().startOf('day').toDate(),
            endsAt: moment().endOf('day').toDate(),
            draggable: true,
            resizable: true,
          };
        this.cellIsOpen = true;  
    
    }
    
    $onInit() {
        this.events.forEach(event => event.color = {
            secondary: this.employeesColors[event.employee]
        });
        //this._processBackendEventsDataToCalendarEvents(this.events);
    }

    
    
    addEvent(eventConfig) {
      const _eventConfig = _.assign(
        {},
        this.defaultNewEventConfig,
        eventConfig,
        {
            color: {
                primary: '#e3bc08',
                secondary: '#FFA07A'
            }
        }
      );
        
      this.events.push(_eventConfig);
    };

    eventClicked(calendarEvent) {
      if(this.calendarView === 'day') {
      this.popupsService.showCustomPopup(
            addNewEventPopupTemplate, 
            addNewEventPopupController,
            {
                date: null,
                calendarEvent,

                onOk: eventConfig => {
                    this.addEvent(eventConfig)
                },
                onDelete: eventId => {
                    this.deleteEvent(eventId)
                }
            }
        );
        } else {
            var title = "Do you want to add an event?";
            var content = "Go to the day view";
            this.popupsService.showPopup(title, content);
        }
    };

    eventEdited(event) {
      alert.show('Edited', event);
    };

    eventDeleted(event) {
      alert.show('Deleted', event);
    };

    eventTimesChanged(event, calendarNewEventStart, calendarNewEventEnd) {
      this.eventsService.updateEvent(event.id,{
                startDate: this.moment(calendarNewEventStart).toDate().toISOString().replace('T', ' ').replace('Z', ''),
                endDate: this.moment(calendarNewEventEnd).toDate().toISOString().replace('T', ' ').replace('Z', '')
            }).then(  
                response => {
                    // TODO toast, ze poszlo ok
                    console.log('ok!');
                },

                error => {
                    // TODO toast, ze nie poszlo ok
                    event.startsAt = new Date(event.startDate.replace(' ', 'T') + 'Z');
                    event.endsAt = new Date(event.endDate.replace(' ', 'T') + 'Z');
                    console.log(event);
                }
             ); 
    };
    
    modifyCell() {
    }
    
    deleteEvent(id) {
        this.eventsService.removeEvent(id).then(
            () => {
                this.$state.reload(); 
            }
        ); 
    }

    toggle($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    test8() {
          var popup = document.getElementById("myPopup");
          popup.classList.toggle("show");
      };

    timespanClicked(selectedDate, cell) {
        if(this.calendarView === 'day') {
        this.popupsService.showCustomPopup(
            addNewEventPopupTemplate, 
            addNewEventPopupController,
            {
                calendarEvent: null,
                date: selectedDate,
                onOk: eventConfig => {
                    this.addEvent(eventConfig)
                },
                onDelete: eventId => {
                    this.deleteEvent(eventId)
                }
            }
                    
        );    
        } else {
            var title = "Do you want to add an event?";
            var content = "Go to the day view";
            this.popupsService.showPopup(title, content);
        }
      if (this.calendarView === 'month') {
        if ((this.cellIsOpen && this.moment(date).startOf('day').isSame(this.moment(this.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          this.cellIsOpen = false;
        } else {
          this.cellIsOpen = true;
          this.viewDate = date;
        }
      } else if (this.calendarView === 'year') {
        if ((this.cellIsOpen && this.moment(date).startOf('month').isSame(this.moment(this.viewDate).startOf('month'))) || cell.events.length === 0) {
          this.cellIsOpen = false;
        } else {
          this.cellIsOpen = true;
          this.viewDate = date;
        }
      }
    } 
  }