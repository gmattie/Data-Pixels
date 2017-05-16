//Imports
import { SharedStates as S } from "../support/sharedStates.js";
import * as C from "./constants.js";
import Dispatcher from "./Dispatcher.js";

/**
 * @description The <strong>Dialog</strong> class creates a modal window of a specified type that contains the supplied Node content.
 * @requires constants
 * @requires dispatcher
 * @requires sharedStates
 * 
 * @example
 * const content = document.createElement("div");
 * content.textContent = "Do you want to proceed?";
 * content.style.width = "500px";
 * content.style.textAlign = "left";
 * 
 * const dialog = new Dialog(content, Dialog.Type.CONFIRM);
 * dialog.addListener(Dialog.Event.OK, dialogOKHandler);
 * dialog.addListener(Dialog.Event.CANCEL, dialogCancelHandler);
 * dialog.display();
 * 
 * function dialogOKHandler(...data) {
 * 
 *     console.log("OK Button pressed");
 * }
 * 
 * function dialogCancelHandler(...data) {
 * 
 *     console.log("Cancel Button pressed");
 * }
 * 
 */
class Dialog extends Dispatcher {

    /**
     * @param {Object} content - A Node element contained within the Dialog window.
     * @param {string} type - Determines the buttons and events of the Dialog window.  Dialog.Type.ALERT produces an "OK" button while Dialog.Type.CONFIRM produces both "OK" and "Cancel" buttons. 
     * 
     */
    constructor(content, type = Dialog.Type.ALERT) {

        super();

        this._content = content;
        this._type = type;
        this._clickButtonHandler = this._clickButtonHandler.bind(this);
        this._previousTheme = undefined;
        
        const window = document.createElement(C.HTML.DIV);
        window.classList.add(C.CSSClass.DIALOG_WINDOW);
        window.appendChild(this._content);
        window.appendChild(this._createButton(Dialog.Event.OK));

        if (this._type === Dialog.Type.CONFIRM) {

            window.appendChild(this._createButton(Dialog.Event.CANCEL));
        }

        this._container = document.createElement(C.HTML.DIV);
        this._container.classList.add(C.CSSClass.DIALOG);
        this._container.appendChild(window);
    }

    /**
     * @description Creates an HTMLButtonElement with applicable styling and event handlers
     * @param {string} label - The label of the HTMLButtonElement.
     * @private
     * @method
     * 
     */
    _createButton(label) {
        const result = document.createElement(C.HTML.INPUT);
        result.type = C.HTML.BUTTON;
        result.value = label;
        result.classList.add(C.CSSClass.DIALOG_BUTTON);
        result.addEventListener(C.Event.CLICK, this._clickButtonHandler);

        return result;
    }

    /**
     * @description Event handler called when a button is clicked, which dispatches either Dialog.Event.OK or Dialog.Event.CANCEL and hides the Dialog window.
     * @param {Object} event - The event object.
     * @private
     * @method
     * 
     */
    _clickButtonHandler(event) {

        this.dispatch(event.target.value);
        this.display(false);
    }

    /**
     * @description Sets the visibility of the Dialog window and, if visible, sets focus on the OK button.
     * @param {boolean} [visible = true] - The visible value is either true (to show) or false (to hide).
     * @public
     * @method
     * 
     */
    display(visible = true) {

        this._container.classList.remove((visible) ? C.CSSClass.DIALOG_HIDE : C.CSSClass.DIALOG_SHOW);
        this._container.classList.add((visible) ? C.CSSClass.DIALOG_SHOW : C.CSSClass.DIALOG_HIDE);

        if (visible) {

            this.updateTheme();

            for (const element of this._container.getElementsByTagName(C.HTML.INPUT)) {

                if (element.type === C.HTML.BUTTON && element.value === C.Label.OK) {

                    element.focus();
                }
            }

            document.body.appendChild(this._container);
        }
    }

    /**
     * @description Updates the dialog theme with either the "dialogThemeLight" or "dialogThemeDark" CSS class.
     * @public
     * @method
     *  
     */
    updateTheme() {

        if (S.Theme !== this._previousTheme) {
        
            let oldTheme;
            let newTheme;

            switch (S.Theme) {

                case C.Theme.DARK:

                    oldTheme = C.CSSClass.DIALOG_THEME_LIGHT;
                    newTheme = C.CSSClass.DIALOG_THEME_DARK;

                    break;

                case C.Theme.LIGHT:

                    oldTheme = C.CSSClass.DIALOG_THEME_DARK;
                    newTheme = C.CSSClass.DIALOG_THEME_LIGHT;

                    break;
            }

            this._container.classList.remove(oldTheme);
            this._container.classList.add(newTheme);

            this._previousTheme = S.Theme;
        }
    }

    /**
     * @description Removes the click event listeners from the Dialog window's buttons.
     * @public
     * @method
     * 
     */
    dispose() {

        for (const element of this._container.getElementsByTagName("*")) {

            if (element.type === C.HTML.BUTTON) {

                element.removeEventListener(C.Event.CLICK, this._clickButtonHandler);
            }
        }
    }

    /**
     * @description Properties of type <strong>{string}</strong> consist of:
     * <ul>
     *     <li> OK </li>
     *     <li> CANCEL </li>
     * </ul>
     * 
     * @static
     * @constant
     * 
     */
    static get Event() {

        return {

            OK: "OK",
            CANCEL: "Cancel"
        };
    }

    /**
     * @description Properties of type <strong>{string}</strong> consist of:
     * <ul>
     *     <li> ALERT </li>
     *     <li> CONFIRM </li>
     * </ul>
     * 
     * @static
     * @constant
     * 
     */
    static get Type() {

        return {

            ALERT: "alert",
            CONFIRM: "confirm"
        };
    }
}

/**
 * @description Dialog class module
 * @module
 * 
 */
export default Dialog;