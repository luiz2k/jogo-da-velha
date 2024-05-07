describe('App', () => {
  it('Deve apresentar um alerta quando clicar em um campo indisponível', () => {
    cy.visit('/');

    cy.get('main').find('div').eq(0).click();
    cy.get('main').find('div').eq(1).click();
    cy.get('main').find('div').eq(1).click();

    // Configurar uma interceptação para o alerta.
    cy.on('window:alert', (alertText) => {
      // Verifica se o alerta contém o texto esperado.
      expect(alertText).to.equal('Campo indisponível!');
    });
  });

  it('Deve ganhar a partida', () => {
    cy.visit('/');

    // Primeiro obtemos todas os elementos da tag main.
    // Depois dentro de main procuramos por elementos div.
    // Selecionamos o primeiro elemento das divs (Começa por 0).
    // E por últimos demos um click
    cy.get('main').find('div').eq(0).click();
    cy.get('main').find('div').eq(4).click();
    cy.get('main').find('div').eq(1).click();
    cy.get('main').find('div').eq(5).click();
    cy.get('main').find('div').eq(2).click();

    // Verifica o elemento selecionado está visivel.
    cy.get('article').should('be.visible');

    // Verificamos se o elemento selecionado contém o texto informado.
    cy.get('article').contains('Vitória do jogador:').should('exist');
  });

  it('Deve reiniciar o jogo', () => {
    cy.visit('/');

    cy.get('header').should('contains.text', 'Round: 1');

    cy.get('main').find('div').eq(2).click();
    cy.get('main').find('div').eq(8).click();
    cy.get('main').find('div').eq(4).click();
    cy.get('main').find('div').eq(5).click();

    // Verificamos se a tag header possui um texto escrito Round: 5.
    cy.get('header').should('contains.text', 'Round: 5');

    cy.get('button').click();

    cy.get('header').should('contains.text', 'Round: 1');
  });

  it('Deve empatar a partida', () => {
    cy.visit('/');

    cy.get('main').find('div').eq(0).click();
    cy.get('main').find('div').eq(1).click();
    cy.get('main').find('div').eq(2).click();
    cy.get('main').find('div').eq(5).click();
    cy.get('main').find('div').eq(4).click();
    cy.get('main').find('div').eq(6).click();
    cy.get('main').find('div').eq(7).click();
    cy.get('main').find('div').eq(8).click();
    cy.get('main').find('div').eq(3).click();

    cy.get('article').should('contains.text', 'Jogo empatado!');
    cy.get('header').should('contains.text', 'Round: 10');
  });

  it('Deve fechar o modal quando clicar no botão', () => {
    // Visitamos a página que iremos testar
    cy.visit('/');

    cy.get('main').find('div').eq(0).click();
    cy.get('main').find('div').eq(4).click();
    cy.get('main').find('div').eq(1).click();
    cy.get('main').find('div').eq(5).click();
    cy.get('main').find('div').eq(2).click();

    cy.get('article').contains('Vitória do jogador:').should('exist');
    cy.get('article button').click();

    // Verifica se o elemento não existe
    cy.get('article').should('not.exist');
  });
});
