//Imports
import { SharedStates as S } from "../support/sharedStates.js";
import * as App from "./app.js";
import * as C from "../support/constants.js";
import * as Utils from "../support/utils.js";
import Dialog from "../support/Dialog.js";

/**
 * @description The <strong>popups.js</strong> module contains properties and functions pertaining to the initialization and control of modal dialog windows.
 * @requires app
 * @requires constants
 * @requires dialog
 * @requires sharedStates
 * @requires utils
 * @module
 * 
 */
export {
    
    display,
    updateTheme
};

/**
 * @description An object containing the following members with module scope:
 * <ul>
 *     <li> AboutDialog </li>
 *     <li> FileTypeErrorDialog </li>
 *     <li> ImageSizeWarningDialog </li>
 *     <li> SettingsDialog </li>
 * </ul>
 * 
 * @private
 * @constant
 * 
 */
const M = {

    AboutDialog: undefined,
    FileTypeErrorDialog: undefined,
    ImageSizeWarningDialog: undefined,
    SettingsDialog: undefined
};

/**
 * @description Initializes and/or displays a previously initialized modal dialog window.
 * @param {number} dialogID - The dialogID value is either 0 ("About"), 1 ("File Type Error"), 2 ("Image Size Warning") or 3 ("Settings").
 * @public
 * @function
 * 
 */
function display(dialogID) {

    switch(dialogID) {

        case C.Dialog.ABOUT:

            (M.AboutDialog) ? M.AboutDialog.display() : initAboutDialog();
            break;

        case C.Dialog.FILE_TYPE_ERROR:

            (M.FileTypeErrorDialog) ? M.FileTypeErrorDialog.display() : initFileTypeErrorDialog();
            break;

        case C.Dialog.IMAGE_SIZE_WARNING:

            (M.ImageSizeWarningDialog) ? M.ImageSizeWarningDialog.display() : initImageSizeWarningDialog();
            break;

        case C.Dialog.SETTINGS:
        
            (M.SettingsDialog) ? M.SettingsDialog.display() : initSettingsDialog();
            break;
    }
}

/**
 * @description Updates the theme, "Dark" to "Light" or "Light" to "Dark", for each dialog window that has already been initialized.
 * @public
 * @function
 * 
 */
function updateTheme() {

    for (const dialog of Object.keys(M)) {

        if (M[dialog]) {

            M[dialog].updateTheme();
        }
    }
}

/**
 * @description Initializes and displays the "About" modal dialog window with specific content and user response options.
 * @private
 * @function
 * 
 */
function initAboutDialog() {

    const image = createImage(C.ImageSource.APPLICATION, C.CSSClass.DIALOG_IMAGE_ABOUT);
    const link = createLink(C.Label.DIALOG_ABOUT_URL);
    const text = createText(C.Label.DIALOG_ABOUT);
    text.appendChild(link);

    const content = createContent(C.CSSClass.DIALOG_CONTENT_ABOUT, image, text);

    M.AboutDialog = new Dialog(content, Dialog.Type.ALERT);
    M.AboutDialog.display();
}

/**
 * @description Initializes and displays the "File Type Error" modal dialog window with specific content and user response options.
 * @private
 * @function
 * 
 */
function initFileTypeErrorDialog() {

    const image = createImage(C.ImageSource.ERROR, C.CSSClass.DIALOG_IMAGE);
    const text = createText(C.Label.DIALOG_FILE_TYPE);
    const content = createContent(C.CSSClass.DIALOG_CONTENT, image, text);

    M.FileTypeErrorDialog = new Dialog(content, Dialog.Type.ALERT);
    M.FileTypeErrorDialog.display();
}

/**
 * @description Initializes and displays the "Image Size Error" modal dialog window with specific content and user response options.
 * @private
 * @function
 * 
 */
function initImageSizeWarningDialog() {

    const image = createImage(C.ImageSource.ALERT, C.CSSClass.DIALOG_IMAGE);
    const text = createText(C.Label.DIALOG_LARGE_IMAGE);
    const content = createContent(C.CSSClass.DIALOG_CONTENT, image, text);

    M.ImageSizeWarningDialog = new Dialog(content, Dialog.Type.CONFIRM);
    M.ImageSizeWarningDialog.addListener(Dialog.Event.OK, App.imageSizeOKHandler);
    M.ImageSizeWarningDialog.addListener(Dialog.Event.CANCEL, App.imageSizeCancelHandler);
    M.ImageSizeWarningDialog.display();
}

/**
 * @description Initializes and displays the "Settings" modal dialog window with specific content and user response options.
 * @private
 * @function
 * 
 */
function initSettingsDialog() {

    const image = createImage(C.ImageSource.SETTINGS, C.CSSClass.DIALOG_IMAGE_SETTINGS);

    const themeDropdownMenu = createDropdownMenu(C.Label.DIALOG_SETTINGS_THEME,
                                                 C.Label.DIALOG_SETTINGS_THEME_TOOLTIP,
                                                 [C.Theme.DARK, C.Theme.LIGHT],
                                                 S.Theme,
                                                 themeChangeHandler);

    const indentationDropdownMenu = createDropdownMenu(C.Label.DIALOG_SETTINGS_DEFAULT_INDENTATION,
                                                       C.Label.DIALOG_SETTINGS_DEFAULT_INDENTATION_TOOLTIP,
                                                       [C.Indentation.INDENT_2, C.Indentation.INDENT_4, C.Indentation.INDENT_8],
                                                       S.Indentation,
                                                       indentationChangeHandler);

    const alignmentCheckBox = createCheckBox(C.Label.DIALOG_SETTINGS_AUTO_CODE_ALIGNMENT,
                                             C.Label.DIALOG_SETTINGS_AUTO_CODE_ALIGNMENT_TOOLTIP,
                                             S.Alignment,
                                             alignmentChangeHandler);
    
    const descriptionCheckBox = createCheckBox(C.Label.DIALOG_SETTINGS_AUTO_CODE_DESCRIPTION,
                                               C.Label.DIALOG_SETTINGS_AUTO_CODE_DESCRIPTION_TOOLTIP,
                                               S.Description,
                                               descriptionChangeHandler);

    const appearanceFieldSet = createFieldSet(C.Label.DIALOG_SETTINGS_APPEARANCE, createContainer(themeDropdownMenu));
    const codeFieldSet = createFieldSet(C.Label.DIALOG_SETTINGS_CODE, createContainer(indentationDropdownMenu, alignmentCheckBox, descriptionCheckBox));
    const settingsFieldSet = createFieldSet(null, appearanceFieldSet, codeFieldSet);

    const content = createContent(C.CSSClass.DIALOG_CONTENT_SETTINGS, image, settingsFieldSet);

    M.SettingsDialog = new Dialog(content, Dialog.Type.ALERT);
    M.SettingsDialog.display();
}

/**
 * @description Creates an HTMLImageElement.
 * @param {string} src - The URL of the image.
 * @param {string} CSSClass - The name of the CSS class to add to the element's class list.
 * @private
 * @function
 * 
 */
function createImage(src, CSSClass) {

    const result = document.createElement(C.HTML.IMAGE);
    result.src = src;
    result.classList.add(CSSClass);

    return result;
}

/**
 * @description Creates an HTMLAnchorElement.
 * @param {string} url - The URL of the link.
 * @param {string} [text = null] The text to be displayed as the link.  If null, the link text will appear as the URL.
 * @private
 * @function
 * 
 */
function createLink(url, text = null) {

    const result = document.createElement(C.HTML.ANCHOR);
    result.href = url;
    result.target = C.HTML.BLANK;
    result.textContent = text || url;
    result.classList.add(C.CSSClass.DIALOG_LINK);

    return result;
}

/**
 * @description Creates an HTMLDivElement.
 * @param {string} text - The text to be displayed as the element's textContent.
 * @private
 * @function
 * 
 */
function createText(text) {

    const result = document.createElement(C.HTML.DIV);
    result.textContent = text;
    result.classList.add(C.CSSClass.DIALOG_TEXT);

    return result;
}

/**
 * @description Creates and HTMLDivElement with optional child objects.
 * @param {string} CSSClass - The name of the CSS class to add to the element's class list.
 * @param {...Object} children - Optional objects to be appended to the element.
 * @private
 * @function
 * 
 */
function createContent(CSSClass, ...children) {

    const result = document.createElement(C.HTML.DIV);
    result.classList.add(CSSClass);

    for (const child of children) {

        result.appendChild(child);
    }

    return result;
}

/**
 * @description Creates an HTMLSelectElement within an HTMLLabelElement.
 * @param {string} label - The text to be displayed as the element's textContent.
 * @param {string} tooltip - The text that is displayed when hovering the mouse over the element.
 * @param {string[]} options - An array of strings to be displayed as the element's selectable options.
 * @param {string} selectedValue - The select option upon initialization.
 * @param {function} callback - The function to call when a change event is dispatched from the element.
 * @private
 * @function
 * 
 */
function createDropdownMenu(label, tooltip, options, selectedValue, callback) {

    const select = document.createElement(C.HTML.SELECT);
    select.addEventListener(C.Event.CHANGE, callback);

    for (const item of options) {

        const option = document.createElement(C.HTML.OPTION);
        option.value = item;
        option.textContent = item;
        
        select.appendChild(option);
    }

    Utils.setSelectElementIndexByValue(select, selectedValue);

    const result = document.createElement(C.HTML.LABEL);
    result.textContent = label;
    result.title = tooltip;
    result.appendChild(select);

    return result;
}

/**
 * @description Creates and HTMLInputElement of [type="checkbox"] within an HTMLLabelElement.
 * @param {string} label - The text to be displayed as the element's textContent.
 * @param {string} tooltip - The text that is displayed when hovering the mouse over the element.
 * @param {boolean} checked - Sets the element's checked attribute upon initialization.
 * @param {function} callback - The function to call when a change event is dispatched from the element.
 * @private
 * @function
 * 
 */
function createCheckBox(label, tooltip, checked, callback) {

    const checkBox = document.createElement(C.HTML.INPUT);
    checkBox.type = C.HTML.CHECKBOX;
    checkBox.checked = checked;
    checkBox.addEventListener(C.Event.CHANGE, callback);

    const result = document.createElement(C.HTML.LABEL);
    result.textContent = label;
    result.title = tooltip;
    result.appendChild(checkBox);

    return result;
}

/**
 * @description Creates an HTMLFieldSetElement with an option HTMLLegendElement and optional child objects. 
 * @param {string} [label = null] - Optional text that is displayed as the element's textContent.
 * @param {...Object} children - Optional objects to be appended to the element.
 * @private
 * @function
 *
 */
function createFieldSet(label = null, ...children) {

    const result = document.createElement(C.HTML.FIELDSET);

    if (label) {

        const legend = document.createElement(C.HTML.LEGEND);
        legend.textContent = label;

        result.id = label.replace(/\s/g, "").toLowerCase();
        result.appendChild(legend);
    }

    for (const child of children) {

        result.appendChild(child);
    }

    result.classList.add(C.CSSClass.DIALOG_FIELDSET);

    return result;
}

/**
 * @description Creates and HTMLDivElement container with optional child objects.
 * @param {...Object} children - Optional objects to be appended to the element.
 * @private
 * @function
 * 
 */
function createContainer(...children) {

    const result = document.createElement(C.HTML.DIV);
    result.classList.add(C.CSSClass.DIALOG_CONTAINER);

    for (const child of children) {

        result.appendChild(child);
    }

    return result;
}

/**
 * @description Event handler called when the "Theme" dropdown menu value has changed.
 * @param {Object} event - The event object.
 * @private
 * @function
 * 
 */
function themeChangeHandler(event) {

    S.Theme = event.target.value;
    App.setTheme(S.Theme);
}

/**
 * @description Event handler called when the "Indentation" dropdown menu value has changed.
 * @param {Object} event - The event object.
 * @private
 * @function
 * 
 */
function indentationChangeHandler(event) {
    
    S.Indentation = event.target.value;
    App.updateAutoCode();
}

/**
 * @description Event handler called when the "Alignment" checkbox value has changed.
 * @param {Object} event - The event object.
 * @private
 * @function
 * 
 */
function alignmentChangeHandler(event) {

    S.Alignment = event.target.checked;
    App.updateAutoCode();
}

/**
 * @description Event handler called when the "Description" checkbox value has changed.
 * @param {Object} event - The event object.
 * @private
 * @function
 * 
 */
function descriptionChangeHandler(event) {

    S.Description = event.target.checked;
    App.updateAutoCode();
}