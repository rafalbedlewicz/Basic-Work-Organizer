import HomeController from './home.controller';

describe('Home', () => {

  describe('HomeController', () => {
      
  let compile;
  let scope;
  let controller;

  beforeEach(inject(($rootScope, $compile) => {
    scope = $rootScope.$new();
    compile = $compile;
    controller = new HomeController(compile, scope);
  }));

  it('should be properly instantionated', () => {
    expect(controller).toBeDefined();
  });
});
});