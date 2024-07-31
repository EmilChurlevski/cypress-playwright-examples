import { UploadDownloadSelectors } from '../../../../helpers/selectors/elements';

describe('Upload and download test', () => {

  beforeEach('Visit', () => {
    cy.visit('/upload-download');
  });

  it('uploads a file', () => {
    cy.get(UploadDownloadSelectors.UPLOAD)
      .selectFile('cypress/fixtures/test.jpg');
    cy.get(UploadDownloadSelectors.UPLOADED_PATH)
      .should('contain', 'test.jpg');
  });

  it('downloads a file', () => {
    const fileName: string = 'sampleFile.jpeg';
    cy.get(UploadDownloadSelectors.DOWNLOAD_BTN)
      .click();
    cy.readFile(`${Cypress.config('downloadsFolder')}/${fileName}`)
      .should('exist');
  });
});