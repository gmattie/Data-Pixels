//Imports
import { SharedStates as S } from "../support/sharedStates.js";
import * as App from "./app.js";
import * as C from "../support/constants.js";
import * as Content from "./content.js";
import * as Main from "../main.js";

/**
 * @description The <strong>controls.js</strong> module contains properties and functions pertaining to the initialization and control of UI elements.
 * @requires app
 * @requires constants
 * @requires sharedStates
 * @module
 * 
 */
export {
    
    disableFrameViewControls,
    init,
    toggleLayout,
    updateExecuteButton,
    updateTheme
};

/**
 * @description An object containing the following members with module scope:
 * <ul>
 *      <li> Buttons </li>
 *      <li> ScaleTimeout </li>
 *      <li> ScaleInterval </li>
 * </ul>
 * 
 * @private
 * @constant
 * 
 */
const M = {

    Buttons: undefined,
    ButtonsFrameView: undefined,
    ScaleTimeout: undefined,
    ScaleInterval: undefined,
};

/**
 * @description Initializes the module.
 * @public
 * @function
 * 
 */
function init() {

    const execute = buildControlButton(
        
        C.HTMLElement.BUTTON_EXECUTE,
        C.ImageSource.RUN,
        C.Label.CONTROLS_EXECUTE,
        App.executeCode
    );

    const settings = buildControlButton(
        
        C.HTMLElement.BUTTON_SETTINGS,
        C.ImageSource.SETTINGS,
        C.Label.CONTROLS_SETTINGS,
        App.displaySettingsDialog
    );

    const layoutHorizontal = buildControlButton(
        
        C.HTMLElement.BUTTON_LAYOUT_HORIZONTAL,
        C.ImageSource.DOCK,
        C.Label.CONTROLS_LAYOUT_HORIZONTAL,
        layoutButtonClickHandler
    );

    const layoutVertical = buildControlButton(
        
        C.HTMLElement.BUTTON_LAYOUT_VERTICAL,
        C.ImageSource.DOCK,
        C.Label.CONTROLS_LAYOUT_VERTICAL,
        layoutButtonClickHandler
    );

    const reset = buildControlButton(

        C.HTMLElement.BUTTON_RESET,
        C.ImageSource.RESET,
        C.Label.CONTROLS_RESET,
        Content.resetImageTransform
    );

    const reflectHorizontal = buildControlButton(

        C.HTMLElement.BUTTON_REFLECT_HORIZONTAL,
        C.ImageSource.REFLECT,
        C.Label.CONTROLS_REFLECT_HORIZONTALLY,
        reflectButtonClickHandler
    );

    const reflectVertical = buildControlButton(

        C.HTMLElement.BUTTON_REFLECT_VERTICAL,
        C.ImageSource.REFLECT,
        C.Label.CONTROLS_REFLECT_VERTICALLY,
        reflectButtonClickHandler
    );

    const scaleEvents = [C.Event.MOUSE_UP, C.Event.MOUSE_DOWN, C.Event.MOUSE_LEAVE];
    
    const scaleUp = buildControlButton(

        C.HTMLElement.BUTTON_SCALE_UP,
        C.ImageSource.SCALE_UP,
        C.Label.CONTROLS_SCALE_UP,
        scaleButtonClickHandler,
        scaleEvents
    );

    const scaleDown = buildControlButton(

        C.HTMLElement.BUTTON_SCALE_DOWN,
        C.ImageSource.SCALE_DOWN,
        C.Label.CONTROLS_SCALE_DOWN,
        scaleButtonClickHandler,
        scaleEvents
    );

    M.ButtonsFrameView = [

        reset,
        reflectHorizontal,
        reflectVertical,
        scaleUp,
        scaleDown
    ];

    M.Buttons = [
        
        execute,
        settings,
        layoutHorizontal,
        layoutVertical,
        ...M.ButtonsFrameView        
    ];

    updateExecuteButton();
    disableFrameViewControls();

    App.toggleLayout();
}

/**
 * @description Assigns attributes and event handling to an HTMLInputElement object that is of type "image".
 * @param {Object} button - The target HTMLInputElement object that is of type "image".
 * @param {string} src - The URL of the button's image.
 * @param {string} title - The label assigned as the button's tooltip.
 * @param {function} clickHandler - The callback function for the button's events.
 * @param {string[]} [events = [C.Event.CLICK]] - An array of event types assigned to the button.
 * @private
 * @function
 * 
 */
function buildControlButton(button, src, title, clickHandler, events = [C.Event.CLICK]) {

    button.src = src;
    button.title = title;
    button.classList.add(C.CSSClass.CONTROL_BUTTON);
    button.classList.add(S.Theme === C.Theme.LIGHT ? C.CSSClass.CONTROL_BUTTON_THEME_DARK : C.CSSClass.CONTROL_BUTTON_THEME_LIGHT);

    for (let event of events) {

        button.addEventListener(event, clickHandler);
    }

    return button;
}

/**
 * @description Event handler called when either of the layout control buttons are clicked.
 * @param {Object} event - The event object.
 * @private
 * @function
 * 
 */
function layoutButtonClickHandler(event) {

    const clickedVertical = (event.target === C.HTMLElement.BUTTON_LAYOUT_VERTICAL);
    S.Orientation = (clickedVertical) ? C.Orientation.VERTICAL : C.Orientation.HORIZONTAL;

    App.toggleLayout();
}

/**
 * @description Event handler called when either of the scale control buttons are clicked.
 * @param {Object} event - The event object.
 * @private
 * @function
 * 
 */
function scaleButtonClickHandler(event) {

    switch (event.type) {
            
        case C.Event.MOUSE_DOWN: {

            const scaleDirection = event.target === C.HTMLElement.BUTTON_SCALE_UP;
            const updateScale = () => Content.updateImageTransform(null, null, scaleDirection);
            
            updateScale();
            
            M.ScaleTimeout = setTimeout(() => M.ScaleInterval = setInterval(updateScale, 20), 500);
            
            break;
        }
            
        case C.Event.MOUSE_UP:
        case C.Event.MOUSE_LEAVE:

            clearTimeout(M.ScaleTimeout);
            clearInterval(M.ScaleInterval);
            
            break;
    }
}

/**
 * @description Event handler called when either of the reflect control buttons are clicked.
 * @param {Object} event - The event object.
 * @private
 * @function
 * 
 */
function reflectButtonClickHandler(event) {
    
    const reflectH = (event.target === C.HTMLElement.BUTTON_REFLECT_HORIZONTAL) ? true : null;
    const reflectV = (event.target === C.HTMLElement.BUTTON_REFLECT_VERTICAL) ? true : null;
    
    Content.updateImageTransform(null, null, null, reflectH, reflectV);
}

/**
 * @description Determines whether or not to disable or enable the Execute button.
 * @public
 * @function
 * 
 */
function updateExecuteButton() {

    const textArea = C.HTMLElement.TEXT_AREA;
    const executeButton = C.HTMLElement.BUTTON_EXECUTE;

    executeButton.disabled = (textArea.value === "");

    Main.updateElectronRunMenuItem();
}

/**
 * @description Updates the theme, "Dark" to "Light" or "Light" to "Dark", for each control that has already been initialized.
 * @public
 * @function
 * 
 */
function updateTheme() {

    if (M.Buttons) {

        for (const button of M.Buttons) {

            button.classList.remove((S.Theme === C.Theme.DARK) ? C.CSSClass.CONTROL_BUTTON_THEME_DARK : C.CSSClass.CONTROL_BUTTON_THEME_LIGHT);
            button.classList.add((S.Theme === C.Theme.DARK) ? C.CSSClass.CONTROL_BUTTON_THEME_LIGHT : C.CSSClass.CONTROL_BUTTON_THEME_DARK);
        }
    }
}

/**
 * @description Alters the visual appearance of the layout control buttons according to the current orientation.
 * @public
 * @function
 * 
 */
function toggleLayout() {

    const isVertical = (S.Orientation === C.Orientation.VERTICAL);

    C.HTMLElement.BUTTON_LAYOUT_HORIZONTAL.disabled = (isVertical) ? false : true;
    C.HTMLElement.BUTTON_LAYOUT_VERTICAL.disabled   = (isVertical) ? true  : false;
}

/**
 * @description Disables or enables the Reset, Scale and Reflect buttons and info labels for the Frame View.
 * @public
 * @function
 * 
 */
function disableFrameViewControls(disabled = true) {

    if (M.ButtonsFrameView) {

        for (const button of M.ButtonsFrameView) {

            button.disabled = disabled;
        }

        const infoLabels = [

            C.HTMLElement.FRAME_VIEW_INFO_SCALE,
            C.HTMLElement.FRAME_VIEW_INFO_WIDTH,
            C.HTMLElement.FRAME_VIEW_INFO_HEIGHT
        ];

        for (let label of infoLabels) {

            label.textContent = "";
            label.classList.toggle(C.CSSClass.DISABLED_OPACITY);
        }
    }
}