export enum ButtonSelectors {
  DB_CLICK_BTN = 'div button#doubleClickBtn',
  DB_CLICK_MSG = 'div p#doubleClickMessage',
  NORMAL_CLICK_BTN = 'button.btn',
  NORMAL_CLICK_MSG = 'div p#dynamicClickMessage',
  RIGHT_CLICK_BTN = 'div button#rightClickBtn',
  RIGHT_CLICK_MSG = 'div p#rightClickMessage'
}

export enum CheckboxSelectors {
  INPUT_FIELD = 'div label input',
  LABEL = 'div label',
  RESULT = 'div#result'
}
export enum DynamicSelectors {
  COLOR_CHANGE_BTN = 'button#colorChange',
  DYNAMIC_BTN = 'button#enableAfter',
  VISIBLE_AFTER_BTN = 'button#visibleAfter'
}

export enum ImageSelectors {
  BROKEN_IMG = 'div img:nth-of-type(2)'
}

export enum LinkSelectors {
  LINKS = '#linkWrapper a',
  LINK_RESPONSE = 'p#linkResponse'
}

export enum RadioButtonsSelectors {
  LABEL = 'div label',
  NO_RADIO_BTN = 'div input#noRadio',
  YES_RADIO_BTN = 'div input#yesRadio'
}

export enum TextBoxSelectors {
  FORM = 'div form',
  H1_HEADER = 'div h1',
  INPUT_FIELD = 'div input',
  SUBMIT_BTN = 'div button#submit'
}

export enum UploadDownloadSelectors {
  DOWNLOAD_BTN = 'a#downloadButton',
  UPLOAD = 'div input[type="file"]',
  UPLOADED_PATH = 'p#uploadedFilePath'
}

export enum WebTableSelectors {
  SEARCH_BOX_INPUT = 'div input#searchBox',
  TABLE_CELL = '.rt-tbody div[role="row"] > div'
}