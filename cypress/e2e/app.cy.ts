describe('App', () => {
  it('Deve apresentar um alerta quando clicar em um campo indisponível', () => {
    cy.visit('/');

    cy.get('main').find('button').eq(0).click();
    cy.get('main').find('button').eq(1).click();
    cy.get('main').find('button').eq(1).click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Campo indisponível!');
    });
  });

  it('Deve ganhar a partida', () => {
    cy.visit('/');

    cy.get('main').find('button').eq(0).click();
    cy.get('main').find('button').eq(4).click();
    cy.get('main').find('button').eq(1).click();
    cy.get('main').find('button').eq(5).click();
    cy.get('main').find('button').eq(2).click();

    cy.get('article').should('be.visible');

    cy.get('article').contains('Vitória do jogador:').should('exist');
  });

  it('Deve reiniciar o jogo', () => {
    cy.visit('/');

    cy.get('header').should('contains.text', 'Round: 1');

    cy.get('main').find('button').eq(2).click();
    cy.get('main').find('button').eq(8).click();
    cy.get('main').find('button').eq(4).click();
    cy.get('main').find('button').eq(5).click();

    cy.get('header').should('contains.text', 'Round: 5');

    cy.get('header').find('button').click();

    cy.get('header').should('contains.text', 'Round: 1');
  });

  it('Deve empatar a partida', () => {
    cy.visit('/');

    cy.get('main').find('button').eq(0).click();
    cy.get('main').find('button').eq(1).click();
    cy.get('main').find('button').eq(2).click();
    cy.get('main').find('button').eq(5).click();
    cy.get('main').find('button').eq(4).click();
    cy.get('main').find('button').eq(6).click();
    cy.get('main').find('button').eq(7).click();
    cy.get('main').find('button').eq(8).click();
    cy.get('main').find('button').eq(3).click();

    cy.get('article').should('contains.text', 'Jogo empatado!');
    cy.get('header').should('contains.text', 'Round: 10');
  });

  it('Deve fechar o modal quando clicar no botão', () => {
    cy.visit('/');

    cy.get('main').find('button').eq(0).click();
    cy.get('main').find('button').eq(4).click();
    cy.get('main').find('button').eq(1).click();
    cy.get('main').find('button').eq(5).click();
    cy.get('main').find('button').eq(2).click();

    cy.get('article').contains('Vitória do jogador:').should('exist');
    cy.get('article button').click();

    cy.get('article').should('not.exist');
  });
});
