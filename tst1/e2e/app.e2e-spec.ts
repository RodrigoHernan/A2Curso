import { Tst1Page } from './app.po';

describe('tst1 App', () => {
  let page: Tst1Page;

  beforeEach(() => {
    page = new Tst1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
