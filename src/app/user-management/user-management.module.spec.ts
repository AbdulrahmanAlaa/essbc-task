import { CustomerManagementModule } from './user-management.module';

describe('CustomerManagementModule', () => {
  let customerManagementModule: CustomerManagementModule;

  beforeEach(() => {
    customerManagementModule = new CustomerManagementModule();
  });

  it('should create an instance', () => {
    expect(customerManagementModule).toBeTruthy();
  });
});
