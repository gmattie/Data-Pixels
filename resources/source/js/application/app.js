//Imports
import { SharedStates as S } from "../support/sharedStates.js";
import * as C from "../support/constants.js";
import * as Content from "./content.js";
import * as Controls from "./controls.js";
import * as Examples from "../dataPixels/examples.js";
import * as File from "./file.js";
import * as Layout from "./layout.js";
import * as Main from "../main.js";
import * as Popups from "./popups.js";
import DataPixelsCodeFactory from "../dataPixels/DataPixelsCodeFactory.js";

/**
 * @description The <strong>app.js</strong> module contains properties and functions pertaining to the initialization and control of the application.
 * @requires constants
 * @requires content
 * @requires controls
 * @requires examples
 * @requires file
 * @requires layout
 * @requires main
 * @requires popups
 * @requires sharedStates
 * @module
 * 
 */
export {

    displayAboutDialog,
    writeExampleCode,
    displayCode,
    displaySettingsDialog,
    executeCode,
    init,
    loadDataPixelsClassCode,
    setErrorMessage,
    setFrameViewHasImage,
    setCodeEditorMode,
    setTheme,
    toggleLayout,
    updateAutoCode
};

/**
 * @description An object containing the following members with module scope:
 * <ul>
 *     <li> DataPixelsClassCode </li>
 *     <li> DataPixelsClassCodeInternal </li>
 *     <li> ExecuteAfterLoad </li>
 * </ul>
 * 
 * @private
 * @constant
 * 
 */
const M = {

    DataPixelsClassCode: undefined,
    DataPixelsClassCodeInternal: undefined,
    ExecuteAfterLoad: undefined
};

/**
 * @description Initializes the application.
 * @public
 * @function
 * 
 */
function init() {

    readStates();
    
    Content.init();
    Controls.init();
    File.init();
}

/**
 * @description Gets the saved or default values from the localStorage object and distributes them via sharedStates.
 * @private
 * @function
 * 
 */
function readStates() {

    S.Alignment = (localStorage.length) ? JSON.parse(localStorage.getItem(C.Persistence.ALIGNMENT)) : true;
    S.AutoCode = DataPixelsCodeFactory.fromJSON(localStorage.getItem(C.Persistence.AUTO_CODE)) || null;
    S.AutoExecute = (localStorage.length) ? JSON.parse(localStorage.getItem(C.Persistence.AUTO_EXECUTE)) : false;
    S.Code = (localStorage.length) ? localStorage.getItem(C.Persistence.CODE) : Examples.basic;
    S.CodeEditorFlexGrow = localStorage.getItem(C.Persistence.CODE_EDITOR_FLEX_GROW) || 0.65;
    S.Description = (localStorage.length) ? JSON.parse(localStorage.getItem(C.Persistence.DESCRIPTION)) : true;
    S.FrameViewFlexGrow = localStorage.getItem(C.Persistence.FRAME_VIEW_FLEX_GROW) || 0.35;
    S.CodeEditorMode = localStorage.getItem(C.Persistence.MODE) || C.Mode.MANUAL;
    S.Indentation = localStorage.getItem(C.Persistence.INDENTATION) || C.Indentation.INDENT_4;
    S.Orientation = localStorage.getItem(C.Persistence.ORIENTATION) || C.Orientation.VERTICAL;
    S.Theme = localStorage.getItem(C.Persistence.THEME) || C.Theme.DARK;

    window.addEventListener(C.Event.BEFORE_UNLOAD, writeStates);

    setCodeEditorMode(S.CodeEditorMode);
    setTheme(S.Theme);
}

/**
 * @description Sets the localStorage object with values from sharedStates to facilitate application persistence.
 * @public
 * @function
 * 
 */
function writeStates() {

    window.removeEventListener(C.Event.BEFORE_UNLOAD, writeStates);

    try {

        localStorage.setItem(C.Persistence.ALIGNMENT, S.Alignment);
        localStorage.setItem(C.Persistence.AUTO_CODE, (S.CodeEditorMode === C.Mode.AUTO) ? JSON.stringify(S.AutoCode) : null);
        localStorage.setItem(C.Persistence.AUTO_EXECUTE, S.AutoExecute);
        localStorage.setItem(C.Persistence.CODE_EDITOR_FLEX_GROW, S.CodeEditorFlexGrow);
        localStorage.setItem(C.Persistence.CODE, C.HTMLElement.TEXT_AREA.value);
        localStorage.setItem(C.Persistence.DESCRIPTION, S.Description);
        localStorage.setItem(C.Persistence.FRAME_VIEW_FLEX_GROW, S.FrameViewFlexGrow);
        localStorage.setItem(C.Persistence.MODE, S.CodeEditorMode);
        localStorage.setItem(C.Persistence.INDENTATION, S.Indentation);
        localStorage.setItem(C.Persistence.ORIENTATION, S.Orientation);
        localStorage.setItem(C.Persistence.THEME, S.Theme);
    }
    catch (error) {

        setErrorMessage(error);
    }
}

/**
 * @description The code editor mode determines which formatting options are available to the automatically generated program code written in the Code Editor.
 * @param {number} mode - The mode value must be either C.Mode.AUTO or C.Mode.MANUAL.
 * @private
 * @function
 * 
 */
function setCodeEditorMode(mode) {

    S.CodeEditorMode = mode;

    if (S.CodeEditorMode === C.Mode.AUTO) {

        C.HTMLElement.TEXT_AREA.addEventListener(C.Event.INPUT, textInputManualModeHandler);
    }
    else if (S.CodeEditorMode === C.Mode.MANUAL) {

        C.HTMLElement.TEXT_AREA.removeEventListener(C.Event.INPUT, textInputManualModeHandler);
    }
}

/**
 * @description Event handler called when text is manually entered in the Code Editor. 
 * @public
 * @function
 * 
 */
function textInputManualModeHandler() {

    setCodeEditorMode(C.Mode.MANUAL);
}

/**
 * @description The set theme applies a cohesive visual style throughout the application.  
 * @param {string} theme - The theme value must be either C.Theme.DARK or C.Theme.LIGHT.
 * @private
 * @function
 * 
 */
function setTheme(theme) {

    if (theme === C.Theme.DARK || theme === C.Theme.LIGHT) {
        
        S.Theme = theme;

        document.body.classList.remove((S.Theme === C.Theme.DARK) ? C.CSSClass.THEME_LIGHT : C.CSSClass.THEME_DARK);
        document.body.classList.add((S.Theme === C.Theme.DARK) ? C.CSSClass.THEME_DARK : C.CSSClass.THEME_LIGHT);

        Controls.updateTheme();
        Popups.updateTheme();
    }
}

/**
 * @description Updates the controls and layout of the application according to the current orientation. 
 * @public
 * @function
 * 
 */
function toggleLayout() {

    Controls.toggleLayout();
    Layout.toggleLayout();

    Main.updateElectronOrientationMenuItems();
}

/**
 * @description Displays either manual or automatically generated program code in the Code Editor.
 * @param {string} code - The code to display in the Code Editor.
 * @param {boolean} [autoMode = true] - Sets the application mode based on how the supplied code was produced.
 * @public
 * @function
 * 
 */
function displayCode(code, autoMode = true) {

    const textArea = C.HTMLElement.TEXT_AREA;
    textArea.focus();
    textArea.setSelectionRange(0, textArea.value.length);

    document.execCommand(C.TextArea.COMMAND_INSERT, false, code);


    if (autoMode) {
        
        setCodeEditorMode(C.Mode.AUTO);
    }

    if (!S.AutoExecute) {
    
        Controls.updateExecuteButton();
    }
}

/**
 * @description Executes the program code that is written in the Code Editor.
 * @public
 * @function
 * 
 */
function executeCode() {

    const frameViewDocument = C.HTMLElement.FRAME_VIEW.contentDocument;
    const frameViewBody = frameViewDocument.body;
    const headTag = frameViewDocument.getElementsByTagName(C.HTML.HEAD)[0];

    if (!M.DataPixelsClassCodeInternal) {

        window.setErrorMessageDelegate = function(error) {

            setErrorMessage(error);
        };

        M.ExecuteAfterLoad = true;

        loadDataPixelsClassCode();

        const compileScript = document.createElement(C.HTML.SCRIPT);
        compileScript.type = C.HTML.SCRIPT_TYPE;
        compileScript.text = `window.addEventListener("error", (error) => { parent.setErrorMessageDelegate(error.message); })`;

        headTag.appendChild(compileScript);

        return;
    }

    while (frameViewBody.firstChild) {

        frameViewBody.removeChild(frameViewBody.firstChild);

        setFrameViewHasImage(false);
    }

    setErrorMessage(null);

    let code = C.HTMLElement.TEXT_AREA.value;

    if (code) {

        code = code.replace(/import .*?[;|\n]/gmi, "");

        const runtimeScript = document.createElement(C.HTML.SCRIPT);
        runtimeScript.type = C.HTML.SCRIPT_TYPE;
        runtimeScript.text = `try{ (function(){ ${M.DataPixelsClassCodeInternal}${code} })(); }catch(error){ parent.setErrorMessageDelegate(error); }`;

        headTag.appendChild(runtimeScript);
        headTag.removeChild(runtimeScript);

        frameViewBody.firstChild.style.pointerEvents = C.CSS.NONE;
        frameViewBody.firstChild.style.userSelect = C.CSS.NONE;

        setFrameViewHasImage(true);
    }
}

/**
 * @description Flags the Frame View as either having an image or not and updates the application accordingly.
 * @param {boolean} [image = false] - The value that signifies the presents of an image within the Frame View.
 * @private
 * @function
 * 
 */
function setFrameViewHasImage(image = false) {

    Content.setFrameViewMouseEvents(image);
    Controls.disableFrameViewControls(!image);

    S.FrameViewHasImage = image;
   
    Main.updateElectronFrameViewMenuItems();
}

/**
 * @description Sets and displays an error message when the the application encounters an error.
 * @param {string} [errorMessage = null] - The error message to display.
 * @public
 * @function
 * 
 */
function setErrorMessage(errorMessage = null) {

    const errorElement = C.HTMLElement.ERROR;
    errorElement.textContent = (errorMessage === null) ? "" : `${C.Unicode.X} ${errorMessage}`;
    errorElement.title = errorMessage;
}

/**
 * @description Instantiates an XMLHttpRequest to load the DataPixels.js file for both in-app code execution and exporting the DataPixels.js class file.
 * @public
 * @function
 * 
 */
function loadDataPixelsClassCode() {

    if (!M.DataPixelsClassCode) {

        const xhr = new XMLHttpRequest();
        xhr.addEventListener(C.Event.LOAD, XHRLoadHandler);
        xhr.addEventListener(C.Event.ERROR, XHRErrorHandler);
        xhr.open(C.HTML.XML_HTTP_GET, C.Code.SCRIPT_URL);
        xhr.send();
    }
    else {

        Main.exportClassFile(M.DataPixelsClassCode);
    }
}

/**
 * @description Event handler called when the XMLHttpRequest has finished loading the DataPixels class code.
 * @param {Object} event - The event object.
 * @private
 * @function
 * 
 */
function XHRLoadHandler(event) {

    const xhr = event.target;
    xhr.removeEventListener(C.Event.LOAD, XHRLoadHandler);
    xhr.removeEventListener(C.Event.LOAD, XHRErrorHandler);

    if (xhr.status === 404) {

        setErrorMessage(`${C.Label.ERROR} ${C.Label.FILE_NOT_FOUND}`);

        return;
    }

    M.DataPixelsClassCode = xhr.responseText;
    M.DataPixelsClassCodeInternal = xhr.responseText.replace(/(export default DataPixels;)/gi, "");

    if (M.ExecuteAfterLoad) {

        M.ExecuteAfterLoad = false;

        executeCode();
    }
    else {

        Main.exportClassFile(M.DataPixelsClassCode);
    }
}

/**
 * @description Event handler called when the XMLHttpRequest has encountered an error.
 * @param {Object} event - The event object.
 * @private
 * @function
 * 
 */
function XHRErrorHandler(event) {

    const xhr = event.target;
    xhr.removeEventListener(C.Event.LOAD, XHRLoadHandler);
    xhr.removeEventListener(C.Event.LOAD, XHRErrorHandler);

    setErrorMessage(`${C.Label.ERROR} ${C.Label.FILE_READ}`);
}

/**
 * @description Updates the format and indentation of the automatically generates program code.
 * @public
 * @function
 * 
 */
function updateAutoCode() {

    if (S.CodeEditorMode === C.Mode.AUTO && S.AutoCode) {

        S.AutoCode.formatCode(S.Alignment, S.Description);
        S.AutoCode.updateIndentation(S.Indentation);

        displayCode(S.AutoCode.output);
    }
}

/**
 * @description Displays the application's About dialog.
 * @public
 * @function
 * 
 */
function displayAboutDialog() {

    Popups.display(C.Dialog.ABOUT);
}

/**
 * @description Displays the application's Settings dialog.
 * @public
 * @function
 * 
 */
function displaySettingsDialog() {

    Popups.display(C.Dialog.SETTINGS);
}

/**
 * @description Writes code from examples.js in the Code Editor.
 * @param {string} example - the name of the example object constant in examples.js.
 * @public
 * @function
 * 
 */
function writeExampleCode(example) {

    displayCode(Examples[example], false);
}