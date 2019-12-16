import SettingsController from './settings.controller';

describe('Settings', () => {

  describe('SettingsController', () => {
      
  let compile;
  let scope;
  let controller;

  beforeEach(inject(($rootScope, $compile) => {
    scope = $rootScope.$new();
    compile = $compile;
    controller = new SettingsController(compile, scope);
  }));

  it('should be properly instantionated', () => {
    expect(controller).toBeDefined();
  });
});
});