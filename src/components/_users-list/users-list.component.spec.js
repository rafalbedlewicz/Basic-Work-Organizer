import UsersListController from './users-list.controller';

describe('UsersList', () => {

  describe('UsersListController', () => {
      
  let compile;
  let scope;
  let controller;

  beforeEach(inject(($rootScope, $compile) => {
    scope = $rootScope.$new();
    compile = $compile;
    controller = new UsersListController(compile, scope);
  }));

  it('should be properly instantionated', () => {
    expect(controller).toBeDefined();
  });
});
});