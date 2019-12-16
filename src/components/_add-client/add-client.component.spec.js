import AddClientController from './add-client.controller';

describe('AddClient', () => {

  describe('AddClientController', () => {
      
  let compile;
  let scope;
  let controller;

  beforeEach(inject(($rootScope, $compile) => {
    scope = $rootScope.$new();
    compile = $compile;
    controller = new AddClientController(compile, scope);
  }));

  it('should be properly instantionated', () => {
    expect(controller).toBeDefined();
  });
});
});