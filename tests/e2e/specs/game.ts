const rockSelector = '[data-cy=choice-0]';
const paperSelector = '[data-cy=choice-1]';
const scissorsSelector = '[data-cy=choice-2]';

const playAgainSelector = '[data-cy=play-again]';

describe('App test', () => {
  it('can play the game', () => {
    cy.visit('/');
    cy.get(rockSelector).click();
    cy.get(playAgainSelector).click();
    cy.get(paperSelector).click();
    cy.get(playAgainSelector).click();
    cy.get(scissorsSelector).click();
    cy.get(playAgainSelector).click();
  });
});
