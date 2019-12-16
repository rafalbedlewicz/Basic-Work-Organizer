import angular from 'angular';
import app from 'app';

import {clientsList} from './clients.resolver.js';

const CLIENTS_ROUTER = {
    clientsState: {
        url: '^/clients',
        template: `<clients clients="$resolve.clientsList"></clients>`,
        resolve: {
            clientsList
        }
    }
};

/* @ngInject */
let clientsRouter = $stateProvider => $stateProvider.state(
        'clients',
        CLIENTS_ROUTER.clientsState
    );

export default angular
    .module(app)
    .config(clientsRouter)
    .name;

