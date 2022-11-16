describe('Sellers flow:', () => {
  it('Page should be available on localhost:3000', () => {
    cy.visit('http://localhost:3000/welcome');
  });

  it('User should be redirected to signup by clicking', () => {
    cy.wait(1500);
    cy.get('.landing-page__signin').click();
    cy.url().should('include', '/signin');
  });

  it('Should log in, add the product to the cart, then delete it and log out.', () => {
    cy.get('#email').click().type('ko1p@ya.ru');
    cy.get('#password').click().type('123123123');
    cy.get('.button-melon').click();
    cy.wait(1000);
    cy.url().should('include', '/categories');
    cy.wait(1000);
    cy.get('.page-header__admin-link').click();
    cy.wait(1000);
    cy.url().should('include', '/dashboard');
    cy.wait(1000);
    cy.get('#rc-tabs-1-tab-2').click();
    cy.get('.button-melon_has-shadow').click();
    cy.get('#title').click().type('Какой-то очень хороший товар');
    cy.get('#description').click().type('Это лучший товар');
    cy.get('#techDescription').click().type('Какое-то клевое описание');
    cy.get('#categoryId').click();
    cy.get('.rc-virtual-list-holder-inner').children().eq(0).click();
    cy.get('#currency').click();
    cy.get('.ant-select-item-option-content').eq(3).click();
    cy.get('#price').click().type('100');
    cy.wait(300);
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.get('.product-card__actions .button-melon:first').click();
    cy.get('.ant-btn-primary').eq(1).click();
    cy.wait(1000);
    cy.get('.logout-btn__icon').click();
    cy.wait(1000);
    cy.get('#logout-window .ant-btn-primary').click();
  });
});
