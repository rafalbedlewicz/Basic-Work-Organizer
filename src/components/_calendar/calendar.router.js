import angular from 'angular';
import app from 'app';

import {eventsList, employeesColors} from './calendar.resolver.js';

const CALENDAR_ROUTER = {
    calendarState: {
        url: '^/calendar',
        template: `<calendar events="$resolve.eventsList" employees-colors="$resolve.employeesColors"></calendar>`,
        resolve: {
            eventsList,
            employeesColors
        }
    }
};

/* @ngInject */
let calendarRouter = $stateProvider => $stateProvider.state(
        'calendar',
        CALENDAR_ROUTER.calendarState
    );

export default angular
    .module(app)
    .config(calendarRouter)
    .name;

