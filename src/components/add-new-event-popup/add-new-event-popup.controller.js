import _ from 'lodash';
import angular from 'angular';

export default class addNewEventPopupController {
   /* @ngInject */
    constructor(clientsService, employeesService, toastsService, $mdDialog, 
    moment, date, eventsService, $state, calendarEvent, onDelete) {
        
        console.log(this);
        
        this.$mdDialog = $mdDialog;
        this.moment = moment;
        
        this.clientsService = clientsService;
        this.employeesService = employeesService;
        this.eventsService = eventsService;
        this.toastsService = toastsService;
        this.state = $state;
        this.calendarEvent = calendarEvent;
        this.onDelete = onDelete;

        this.postingEvent = false;
        
        this.eventTitle = '';
        this.eventDescription = '';
        this.selectedEmployee = '';
        this.selectedClient = '';
        this.eventTakesMinutes = '';
        this.eventTakesHours = '';
        
        this.errors = {
            title: {
                isEmpty: {
                    isOccuring: false,
                    label: 'The "TITLE" field cannot be empty!',
                    validator: () => this.eventTitle.length == 0
                },
                isWrong: {
                    isOccuring: false,
                    label: 'The "TITLE" field cannot contain special characters!',
                    validator: () => this._isTitleWrong(this.eventTitle)
                }
            },
            description: {
                isEmpty: {
                    isOccuring: false,
                    label: 'The "DESCRIPTION" field cannot be empty!',
                    validator: () => this.eventDescription.length == 0
                },
            },
            employee: {
                isEmpty: {
                    isOccuring: false,
                    label: 'The "EMPLOYEE" field cannot be empty!',
                    validator: () => this.selectedEmployee.length == 0
                },
            },
            client: {
                isEmpty: {
                    isOccuring: false,
                    label: 'The "CLIENT" field cannot be empty!',
                    validator: () => this.selectedClient.length == 0
                },
            },
            endMinutes: {
                isEmpty: {
                    isOccuring: false,
                    label: 'The time is incorrect. The event must take at least 15 minutes!',
                    validator: () => (this.eventTakesMinutes.length == 0 || this.eventTakesMinutes <= 14) && (this.eventTakesHours.length == 0 || this.eventTakesHours == 0)
                },
                isWrong: {
                    isOccuring: false,
                    label: 'The time is incorrect. The event must take at least 15 minutes!',
                    validator: () => this._isEndMinutesWrong(this.eventTakesMinutes)                   
                }
            },
            endHours: {
                isEmpty: {
                    isOccuring: false,
                    label: 'The time is incorrect. The event must take at least 15 minutes!',
                    validator: () => this.eventTakesHours.length == 0 && this.eventTakesMinutes.length == 0
                },
                isWrong: {
                    isOccuring: false,
                    label: 'The time is incorrect. The event must take at least 15 minutes!',
                    validator: () => this._isEndHoursWrong(this.eventTakesHours)
                }
            },
        }

        this.clients = [];
        this.employees = [];
        
        clientsService.getAllClients().then(
            response => {
                this.clients = response.data;
                this.clients = this.clients.filter(function( obj ) {
                    return obj.unwanted !== true;
                });
                if(calendarEvent !== null) {
                    this.selectedClient = this.clients.find(client => (client.id === +this.calendarEvent.client));
                }                
            },
            error => {
                this.toastsService.showErrorMessage('Nie udało się pobrać klientów do popupa zdarzeń');
            }
        );
        window.test = this;
        employeesService.getAllEmployees().then(
                
            response => {
                this.employees = response.data;
                if(calendarEvent !== null) {
                    this.selectedEmployee = this.employees.find(employee => employee.id === +this.calendarEvent.employee);
                }
            },
            error => {
                this.toastsService.showErrorMessage('Nie udało się pobrać pracowników do popupa zdarzeń');
            }    
        );
        window.test = this;

        if (this.calendarEvent != null ) {
            this.eventTitle = calendarEvent.title;
            this.eventDescription = calendarEvent.description;
            //this.startDate = angular.copy(date);
            //this.endDate = angular.copy(date);
            console.log(calendarEvent.startDate);
            console.log(calendarEvent.endDate);
            this.startDate = calendarEvent.startDate;
            this.endDate = calendarEvent.endDate;
            this.eventEndHour = this.calendarEvent.endsAt.getHours();
            this.eventEndMinute = this.calendarEvent.endsAt.getMinutes();
            this.endHourToNumber = '';
            this.endMinuteToNumber = '';
            this.eventTakesHours  = Math.floor(Math.abs(this.calendarEvent.startsAt - this.calendarEvent.endsAt) / 3600000);
            this.eventTakesMinutes = (Math.abs(this.calendarEvent.startsAt - this.calendarEvent.endsAt) % 3600000) / 60000;
            this.startMinutes = '';
            this.endMinutes = '';
            this.minutesResult = '';
            this.minutes = ''; 
            this.hours = ''; 
        }
        else {
            
        this.startDate = angular.copy(date);
        this.endDate = angular.copy(date);
        this.eventTitle = '';
        this.eventDescription = '';
        this.eventEndHour = '';
        this.eventEndMinute = '';
        this.endHourToNumber = '';
        this.endMinuteToNumber = '';
        this.startMinutes = '';
        this.endMinutes = '';
        this.minutesResult = '';
        this.minutes = ''; 
        this.hours = ''; 
        }
        
    }
    
    acceptPopup() {  
        this.eventPostingError = ''; 

        if(!this._validateEventInputs()) {
            return;
        }   
            
        this.postingEvent = true;  
                
        if (this.calendarEvent == null) {
            this.eventsService.addEvent({
                title: this.eventTitle,
                startsAt: this.moment(this.startDate).toDate(),
                endsAt: this.moment(this.startDate)
                    .add(this.eventTakesHours, 'hours')
                    .add(this.eventTakesMinutes, 'minutes'),
                description: this.eventDescription,
                clientId: this.selectedClient.id,
                employeeId: this.selectedEmployee.id
            }).then(  
                response => {
                    this.postingEvent = false;
                    this._onEventSuccessfullyAdded(response.data);

                },

                error => {
                    this.postingEvent = false;
                    this._onEventAddingFailure(error);
                }
             ); 
            this.$mdDialog.hide();
        }
        else {
            this.eventsService.updateEvent(this.calendarEvent.id,{
                title: this.eventTitle,
                startDate: this.moment(this.calendarEvent.startsAt).toDate().toISOString().replace('T', ' ').replace('Z', ''),
                endDate: this.moment(this.calendarEvent.startsAt)
                    .add(this.eventTakesHours, 'hours')
                    .add(this.eventTakesMinutes, 'minutes').toDate().toISOString().replace('T', ' ').replace('Z', ''),
                description: this.eventDescription,
                client: this.selectedClient.id,
                employee: this.selectedEmployee.id
            }).then(  
                response => {
                    this.postingEvent = false;
                    this._onEventSuccessfullyAdded(response.data);

                },

                error => {
                    this.postingEvent = false;
                    this._onEventAddingFailure(error);
                }
             ); 
            this.$mdDialog.hide();
        }
    }
    
        
    _onEventSuccessfullyAdded(id) {
        this.toastsService.showSuccessMessage('Zdarzenie zostało dodane');
        this.state.reload();       
    }

    _onEventAddingFailure(error) {
        this.eventPostingError = error;
    }
    
    cancelPopup() {
        this.$mdDialog.hide();
    }
    
    hoursValidation() {
        if (isNaN(this.eventEndHour) || 0 > this.eventEndHour || this.eventEndHour > 23) {
            this.eventEndHour = '00';
        }
    }
    
    minutesValidation() {
        if (isNaN(this.eventEndMinute) || 0 > this.eventEndMinute || this.eventEndMinute > 60) {
            this.eventEndMinute = '00';
        }
    }
    
    onDeleteEvent() {
        this.onDelete(this.calendarEvent.id);
        this.$mdDialog.hide();
    }
    
    /*takenHoursValidation() {
        if (isNaN(this.eventTakesHours) || 0 > this.eventTakesHours || this.eventTakesHours > 23) {
            this.eventTakesHours = '00';
        }
    }
    
    takenMinutesValidation() {
        if (isNaN(this.eventTakesMinutes) || 0 > this.eventTakesMinutes || this.eventTakesMinutes > 60) {
            this.eventTakesMinutes = '00';
        }
    }*/
    
    updateEventEndTime() {
        
        const _endDate = this.moment(this.startDate);
        _endDate.add(parseInt(this.eventTakesHours || 0), 'hours');
        _endDate.add(parseInt(this.eventTakesMinutes || 0), 'minutes');
        
        const _endDateObject = _endDate.toDate();;

        this.eventEndHour = _endDateObject.getHours();
        this.eventEndMinute = _endDateObject.getMinutes();
    }
    
    updateEventLastingTime() {
        
        if (typeof this.endDate === 'string') {
        this.endDate = this.endDate.replace(' ', 'T').replace('.0', '');
        this.endDate = this.moment(this.endDate);
        }
        
        const _endDateObject = this.endDate.toDate();
        
        _endDateObject.setHours(parseInt(this.eventEndHour || 0));
        _endDateObject.setMinutes(parseInt(this.eventEndMinute || 0));

        this.endDate = this.moment(_endDateObject);
        
        const duration = this.moment.duration(this.endDate.diff(this.startDate));
        const timeBetweenStartAndEndinMinutes = duration.asMinutes();
        const minutesBetweenStartAndEnd = timeBetweenStartAndEndinMinutes % 60;
        const hoursBetweenStartAndEnd = (timeBetweenStartAndEndinMinutes - minutesBetweenStartAndEnd) / 60;
        
        if (this.calendarEvent == null) {
        this.eventTakesHours = hoursBetweenStartAndEnd;
        }
        else {
        this.eventTakesHours = hoursBetweenStartAndEnd - 2;
        }
        this.eventTakesMinutes = minutesBetweenStartAndEnd;
    }
    
    _validateEventInputs() {
     
        let _areThereNoErros = true;
     
        for (let inputErrorLabel in this.errors) {
            for (let specificError in this.errors[inputErrorLabel]) {
                this.errors[inputErrorLabel][specificError].isOccuring = this.errors[inputErrorLabel][specificError].validator();
                _areThereNoErros = !this.errors[inputErrorLabel][specificError].isOccuring && _areThereNoErros;
            }
        } 
        return _areThereNoErros;
    }
    
    _isTitleWrong(inputName) {
        
        var re = new RegExp("^(?![()_.])(?!.*[)(_.])[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ'-._]+(?<![()_.])$");
         console.log('a tu działa');
        if (re.test([inputName])) {
           return false;
        } 
        else {
           return true;
        }
    }
     _isEndMinutesWrong(inputName) {
        if (!(inputName >= 0) || (6 > this.eventTakesHours > 22 ) || this.eventEndHour < 0 || this.eventEndMinute < 0 )  {
           return true;
        } 
        else {
           return false;
        }
    }
     _isEndHoursWrong(inputName) {
        if (!(inputName >= 0) || (6 > this.eventTakesHours > 22) || this.eventEndHour < 0 || this.eventEndMinute < 0)  {
           return true;
        } 
        else {
           return false;
        }
    }
}