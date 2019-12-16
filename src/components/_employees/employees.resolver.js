/* @ngInject */
let employeesList = (employeesService, toastsService) => {
    return employeesService.getAllEmployees().then(
        response => response.data,
        error => {
            toastsService.showErrorMessage('Błąd ładowania danych pracowników: ' + error.data.message);
        }
    );
};

export {
    employeesList    
}