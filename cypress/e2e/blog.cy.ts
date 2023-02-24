context('Visits Webpage', () => {
  const stage: string = Cypress.env('STAGE') || 'Prod';
  console.log('Stage -> ', stage);
  const baseUrl = stage === 'Prod' ? 'https://willkronberg.dev' : 'http://localhost:3000';

  beforeEach(() => {
    cy.clearAllLocalStorage();
    cy.visit(baseUrl);
  });

  it('has a Home tab', () => {
    cy.get('.MuiToolbar-dense > :nth-child(1)').should('have.text', 'Home');
  });

  it('retrieves a list of blog entries on the home tab', () => {
    cy.get('.MuiCardContent-root').should('have.length', 1);
  });

  it('has a Record Collection tab', () => {
    cy.get('.MuiToolbar-dense > :nth-child(2)').should('have.text', 'Record Collection');
  });

  it('goes to the record collection page when the link is clicked', () => {
    cy.get('.MuiToolbar-dense > :nth-child(2)').click();

    cy.url().should('eq', `${baseUrl}/collection#`);
  });

  it('goes to the home page when the link is clicked', () => {
    cy.get('.MuiToolbar-dense > :nth-child(1)').click();

    cy.url().should('eq', `${baseUrl}/#`);
  });

  it('clicking the sun/moon icon toggles dark mode', () => {
    cy.get('body').should('have.css', 'background-color', 'rgb(250, 250, 250)');

    cy.get('.MuiToolbar-regular > div > .MuiSvgIcon-root > path').click();

    cy.get('body').should('have.css', 'background-color', 'rgb(48, 48, 48)');
  });
});
