import angular from 'angular';
import app from 'app';

const SETTINGS_ROUTER = {
    settingsState: {
        url: '^/settings',
        template: `<settings></settings>`
    }
};

/* @ngInject */
let settingsRouter = $stateProvider => $stateProvider.state(
        'settings',
        SETTINGS_ROUTER.settingsState
    );

export default angular
    .module(app)
    .config(settingsRouter)
    .name;

