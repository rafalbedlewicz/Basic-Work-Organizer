import SideMenuController from './side-menu.controller';

describe('SideMenu', () => {

  describe('SideMenuController', () => {
      
  let compile;
  let scope;
  let controller;

  beforeEach(inject(($rootScope, $compile) => {
    scope = $rootScope.$new();
    compile = $compile;
    controller = new SideMenuController(compile, scope);
  }));

  it('should be properly instantionated', () => {
    expect(controller).toBeDefined();
  });
});
});