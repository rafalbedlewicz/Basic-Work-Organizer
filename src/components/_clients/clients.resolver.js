/* @ngInject */
let clientsList = (clientsService, toastsService) => {
    return clientsService.getAllClients().then(
        response => response.data,
        error => {
            toastsService.showErrorMessage('Błąd ładowania danych pracowników: ' + error.data.message);
        }
    );
};

export {
    clientsList    
}