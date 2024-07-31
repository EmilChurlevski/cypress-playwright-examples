import { FrameSelectors } from '../../../../helpers/selectors/alertsFrameWindow';

describe('iFrame example tests', () => {

  function getIframeBody(frameSel: string) {
    return cy.get(frameSel)
      .its('0.contentDocument')
      .its('body')
      .then(body => cy.wrap(body));
  }

  it('checks the header of frame 1 and 2', () => {
    cy.visit('/frames');
    // cypress cannot find selectors inside an iframe
    // in order to do that we need to get the iframe body
    // and use the iframe body to get the selectors inside the iframe
    const iframe1 = () => getIframeBody(FrameSelectors.FRAME_1);
    const iframe2 = () => getIframeBody(FrameSelectors.FRAME_2);
    iframe1()
      .find(FrameSelectors.FRAME_HEADING)
      .should('contain', 'This is a sample page');
    iframe2()
      .find(FrameSelectors.FRAME_HEADING)
      .should('contain', 'This is a sample page');
  });

  it('checks the content of nested frames', () => {
    cy.visit('/nestedframes');
    // we get the parent iframe
    const parentIframe = () => getIframeBody(FrameSelectors.FRAME_1);
    parentIframe()
      .should('contain', 'Parent frame');

    // using the parent iframe we get the child iframe
    const childFrame = () => {
      return parentIframe()
        .find('iframe')
        .its('0.contentDocument')
        .its('body')
        .then(body => cy.wrap(body));
    }
    childFrame()
      .find('p')
      .should('contain', 'Child Iframe');
  });
});