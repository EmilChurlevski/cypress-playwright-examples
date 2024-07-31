import { LinkSelectors } from '../../../../helpers/selectors/elements';

describe('API Tests', () => {

  const desiredStatusResponses: number[] = [
    201,
    204,
    301,
    400,
    401,
    403,
    404
  ];

  const endpoints: string[] = [
    '/created',
    '/no-content',
    '/moved',
    '/bad-request',
    '/unauthorized',
    '/forbidden',
    '/invalid-url'
  ];

  it('checks the status of each api call via backend', () => {
    // checking the status codes via backend by sending a request on each endpoint
    endpoints.forEach((endpoint, index) => {
      cy.request({ url: endpoint,  failOnStatusCode: false })
        .then(response => {
          expect(response.status).to.eq(desiredStatusResponses[index]);
        });
    });
  });

  it('checks the status code via frontend', () => {
    cy.visit('/links');
    desiredStatusResponses.forEach((status, index) => {
      cy.intercept(endpoints[index])
        .as('apiCall');
      cy.get(LinkSelectors.LINKS)
        // we get all the links, but the links to be tested start from the third link
        .eq(index + 2)
        .click();
      // the message should include the status code
      // if we want to check the whole message, then all the messages can be put into an array
      // and each message can be tested for 100% match
      cy.get(LinkSelectors.LINK_RESPONSE)
        .should('contain', status);

      // check if the correct call was triggered with the correct status
      cy.get('@apiCall')
        .its('response.statusCode')
        .should('eq', status);
    });
  });
});