describe('Buyers flow:', () => {
  it('Page should be available on localhost:3000', () => {
    cy.visit('http://localhost:3000/welcome');
  });

  it('User should be redirected to signup by clicking', () => {
    cy.wait(2000);
    cy.get('.landing-page__signin').click();
    cy.url().should('include', '/signin');
  });

  it('Should log in, add the product to the cart, then delete it and log out.', () => {
    cy.get('#email').click().type('ko1p@yandex.ru');
    cy.get('#password').click().type('123123123');
    cy.get('.button-melon').click();
    cy.wait(1000);
    cy.url().should('include', '/categories');
    cy.wait(1000);
    cy.get('.browse-categories__cards').children().eq(0).click();
    cy.url().should('include', '/categories/1/products');
    cy.wait(1000);
    cy.get('.button-melon_sliced-left').first().click();
    cy.wait(1000);
    cy.get('.bucket-widget').click();
    cy.wait(1000);
    cy.get('.bucket-page__products')
      .children()
      .should(($children: Node) => {
        expect($children).to.have.class('product-card');
      });
    cy.get('.product-count-controller__delete-all').click();
    cy.wait(1000);
    cy.get('.logout-btn__icon').click();
    cy.wait(1000);
    cy.get('.ant-btn-primary').click();
  });
});
