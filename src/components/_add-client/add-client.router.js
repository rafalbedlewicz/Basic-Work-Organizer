import angular from 'angular';
import app from 'app';

const ADD_CLIENT_ROUTER = {
    addClientState: {
        url: '^/add-client',
        template: `<add-client></add-client>`
    }
};

/* @ngInject */
let addClientRouter = $stateProvider => $stateProvider.state(
        'add-client',
        ADD_CLIENT_ROUTER.addClientState
    );

export default angular
    .module(app)
    .config(addClientRouter)
    .name;

