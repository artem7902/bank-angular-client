import { BankAngularClientPage } from './app.po';

describe('bank-angular-client App', () => {
  let page: BankAngularClientPage;

  beforeEach(() => {
    page = new BankAngularClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
