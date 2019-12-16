import angular from 'angular';
import app from 'app';

const USERS_LIST_ROUTER = {
    usersListState: {
        url: '^/users',
        template: `<users-list></users-list>`
    }
};

/* @ngInject */
let usersListRouter = $stateProvider => $stateProvider.state(
        'usersList',
        USERS_LIST_ROUTER.usersListState
    );

export default angular
    .module(app)
    .config(usersListRouter)
    .name;

