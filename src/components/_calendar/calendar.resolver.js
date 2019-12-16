/* @ngInject */
let eventsList = (eventsService, toastsService) => {
    return eventsService.getAllEvents().then(
        responseData => responseData,
        error => {
            toastsService.showErrorMessage('Błąd ładowania danych wydarzeń: ' + error.data.message);
        }
    );
};

/* @ngInject */
let employeesColors = (employeesService, toastsService) => {
    return employeesService.getEmployeesColors().then(
            responseData => responseData,
            error => {
                toastsService.showErrorMessage('Błąd ładowania kolorów pracowników: ' + error.data.message);
            }
        ); 
};

export {
    eventsList,    
    employeesColors
}