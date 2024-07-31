import { AlertSelectors } from '../../../../helpers/selectors/alertsFrameWindow';
import { DataGenerator } from '../../../../helpers/functions/dataGenerator';

describe('Alerts tests', () => {

  beforeEach('Visit', () => {
    cy.visit('/alerts');
  });

  it('should trigger an alert', () => {
    cy.get(AlertSelectors.ALERT_BUTTON)
      .click();
    cy.on('window:alert', text => {
      expect(text).to.eq('You clicked a button');
    });
  });

  it('should trigger a delayed alert', () => {
    cy.get(AlertSelectors.TIMER_ALERT_BUTTON)
      .click();
    cy.wait(5000);
    cy.on('window:alert', text => {
      expect(text).to.eq('This alert appeared after 5 seconds');
    });
  });

  it('should trigger a confirmation alert and confirm it', () => {
    cy.get(AlertSelectors.CONFIRM_ALERT_BUTTON)
      .click();
    // confirms the pop-up
    cy.on('window:confirm', text => {
      expect(text).to.eq('Do you confirm action?');
    });
    cy.contains(AlertSelectors.CONFIRM_RESULT, 'You selected Ok')
      .should('be.visible');
  });

  it('should trigger a confirmation alert and decline it', () => {
    // the confirmation alert can be confirmed the same way
    // in the stub line if true is returned it will accept the confirmation pop up
    cy.window()
      .then(win => {
        cy.stub(win, 'confirm')
          .as('confirm')
          .returns(false);
      })
    cy.get(AlertSelectors.CONFIRM_ALERT_BUTTON)
      .click();
    cy.get('@confirm')
      .should('have.been.called');
    cy.contains(AlertSelectors.CONFIRM_RESULT, 'You selected Cancel')
      .should('be.visible');
  });

  it('triggers a prompt and returns a random name', () => {
    const name: string = DataGenerator.getRandomName();
    cy.window()
      .then(win => {
        cy.stub(win, 'prompt').returns(name);
      });
    cy.get(AlertSelectors.PROMPT_BUTTON)
      .click();
    cy.get(AlertSelectors.PROMPT_RESULT)
      .should('contain', `You entered ${name}`);
  });
});
