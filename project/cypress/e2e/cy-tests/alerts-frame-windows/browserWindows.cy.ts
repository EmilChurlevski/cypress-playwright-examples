import { WindowsSelectors } from '../../../../helpers/selectors/alertsFrameWindow';

describe('Browser windows tests', () => {

  beforeEach('Visit', () => {
    cy.visit('/browser-windows');
  });

  it('stubs the new tab', () => {
    cy.window()
      .then((win) => {
        cy.stub(win, 'open').as('open');
      });
    cy.get(WindowsSelectors.TAB_BUTTON)
      .click();
    cy.get('@open')
      .should('have.been.calledOnceWithExactly', '/sample');
  });

  it('stubs the new window', () => {
    cy.window()
      .then((win) => {
        cy.stub(win, 'open').callsFake((url, target) => {
          expect(target).to.eq('_blank');
          //@ts-ignore
        }).as('open');
      });
    cy.get(WindowsSelectors.NEW_WINDOW_BUTTON)
      .click();
    cy.get('@open')
      .should('have.been.calledWith', '/sample');
  });

  it('stubs the new window', () => {
    //Todo how to check the text of the new message window
    const text = 'Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.';
    cy.window()
      .then(win => {
        cy.spy(win, 'open').as('open')
      })
    cy.get(WindowsSelectors.NEW_WINDOW_MSG_BUTTON)
      .click();
    cy.get('@open')
      .should('be.called');
  });
});