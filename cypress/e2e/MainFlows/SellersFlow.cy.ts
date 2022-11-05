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
    cy.contains('Товары').click();
    cy.contains('Разместить продукт').click();
    cy.contains('Название').click().type('Какой-то очень хороший товар');
    cy.contains('Описание').click().type('Это лучший товар');
    cy.contains('Техническое описание')
      .click()
      .type('Какое-то клевое описание');
    cy.contains('Цена').click().type('100');
    cy.get('#categoryId').click();
    cy.contains('Телефоны').click();
    cy.get('#currency').click();
    cy.get('.ant-select-item-option-content').eq(3).click();
    cy.wait(300);
    cy.contains('Отправить').click();
    cy.wait(1000);
    cy.contains('Удалить').click();
    cy.contains('OK').click();
    cy.get('.logout-btn__icon').click();
    cy.wait(1000);
    cy.contains('Да').click();
  });
});
