import { RecipePage } from './app.po';

describe('recipe App', () => {
  let page: RecipePage;

  beforeEach(() => {
    page = new RecipePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
