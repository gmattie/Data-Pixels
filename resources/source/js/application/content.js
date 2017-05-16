//Imports
import { SharedStates as S } from "../support/sharedStates.js";
import * as App from "./app.js";
import * as C from "../support/constants.js";
import * as Layout from "./layout.js";

/**
 * @description The <strong>content.js</strong> module contains properties and functions pertaining to the Code Editor, iFrame and the Drag Bar.
 * @requires app
 * @requires constants
 * @requires layout
 * @requires sharedStates
 * @module
 * 
 */
export {
    
    init,
    updateLineNumbers
};

/**
 * @description An object containing the following members with module scope:
 * <ul>
 *     <li> DragPointOrigin </li>
 *     <li> LinesTotal </li>
 * </ul>
 * 
 * @private
 * @constant
 * 
 */
const M = {

    DragPointOrigin: undefined,
    LinesTotal: undefined
};

/**
 * @description Initializes the module.
 * @public
 * @function
 * 
 */
function init() {

    initCodeEditor();
    initDragBar();
    initFrameView();
    
    Layout.updateContentFlexSizes(S.CodeEditorFlexGrow, S.FrameViewFlexGrow);
}

/**
 * @description Initializes the Code Editor with scrolling and input event listeners and special consideration for Tab functionality.
 * @private
 * @function
 * 
 */
function initCodeEditor() {

    const textArea = C.HTMLElement.TEXT_AREA;

    textArea.autocapitalize = C.TextArea.OFF; 
    textArea.wrap = C.TextArea.OFF;
    textArea.spellcheck = false;
    textArea.selectionDirection = C.TextArea.SELECTION_FORWARD;
    textArea.addEventListener(C.Event.KEY_DOWN, (event) => {

        if (event.key === C.TextArea.TAB_KEY) {
            
            event.preventDefault();

            if (S.Mode === C.Mode.AUTO) {

                App.setMode(C.Mode.MANUAL);
            }

            const text = textArea.value;
            const caretStart = textArea.selectionStart;
            const caretEnd = textArea.selectionEnd;
            const isMultilineSelection = text.slice(caretStart, caretEnd).search(/\n/) !== -1;
            const isSingleLine = text.search(/\n/) === -1;
            const spaces = (C.Code.SINGLE_SPACE).repeat(parseInt(S.Indentation));

            if (event.shiftKey || isMultilineSelection) {
                
                let caretLineStart = caretStart;
                let caretLineEnd = caretEnd;

                while (text.charAt(caretLineStart) !== C.TextArea.NEW_LINE && caretLineStart !== -1) {
                    
                    caretLineStart--;
                }
                
                caretLineStart++;
                
                if (isSingleLine) {

                    caretLineEnd = text.length;
                }
                else {

                    while (text.charAt(caretLineEnd) !== C.TextArea.NEW_LINE) {
                        
                        if (caretLineEnd === text.length) {
                            
                            break;
                        }
                        else {
                            
                            caretLineEnd++;
                        }
                    }
                }        
                
                let selectedText = text.slice(caretLineStart, caretLineEnd);

                if (!event.shiftKey) {

                    selectedText = selectedText.replace(/^/gm, spaces);
                }
                else {

                    selectedText = selectedText.replace(new RegExp(`^${spaces}`, "gm"), "");
                }

                textArea.selectionStart = caretLineStart;
                textArea.selectionEnd = caretLineEnd;

                document.execCommand(C.TextArea.COMMAND_INSERT, false, selectedText);
                textArea.setSelectionRange(caretLineStart, caretLineStart + selectedText.length);
            }
            else
            {
                document.execCommand(C.TextArea.COMMAND_INSERT, false, spaces);
            }
        }
    });

    textArea.addEventListener(C.Event.SCROLL, () => {

        C.HTMLElement.LINE_NUMBERS.scrollTop = textArea.scrollTop;
    });

    textArea.addEventListener(C.Event.INPUT, () => {

        updateLineNumbers();
        App.checkExecuteButton();
    });

    textArea.textContent = S.Code;

    updateLineNumbers();
    App.checkExecuteButton();
}

/**
 * @description Initializes the Drag Bar with mouse event listeners.
 * @private
 * @function
 * 
 */
function initDragBar() {

    const dragIcon = C.HTMLElement.DRAG_ICON;
    const dragBar = C.HTMLElement.DRAG_BAR;

    dragIcon.textContent = C.Unicode.TRIPLE_BAR;

    dragBar.addEventListener(C.Event.MOUSE_DOWN, (event) => {

        event.preventDefault();

        M.DragPointOrigin = {
            
            x: event.clientX,
            y: event.clientY
        };

        Layout.setContentDisplayType(C.CSS.BLOCK);

        addEventListener(C.Event.MOUSE_MOVE, mouseMoveHandler);
        addEventListener(C.Event.MOUSE_UP, mouseUpHandler);
    });
}

/**
 * @description Initializes the iFrame with local CSS styling.
 * @private
 * @function
 * 
 */
function initFrameView() {

    const frameViewDocument = C.HTMLElement.FRAME_VIEW.contentDocument;
    const frameViewBody = frameViewDocument.body;

    frameViewBody.style.boxSizing= C.CSS.BORDER_BOX;
    frameViewBody.style.margin = C.CSS.ZERO;
    frameViewBody.style.padding = C.CSS.ZERO;
    frameViewBody.style.display = C.CSS.FLEX;
    frameViewBody.style.justifyContent = C.CSS.CENTER;
    frameViewBody.style.alignItems = C.CSS.CENTER;
    frameViewBody.style.overflow = C.CSS.HIDDEN;
}

/**
 * @description Updates the Code Editor's line numbers according to the total number of lines present in the text area.
 * @public
 * @function
 * 
 */
function updateLineNumbers() {

    const text = C.HTMLElement.TEXT_AREA.value;
    const newLinesLength = (text.match(/\n/gm)||[]).length + 1;

    if (M.LinesTotal !== newLinesLength) {

        M.LinesTotal = newLinesLength;
        C.HTMLElement.LINE_NUMBERS.textContent = "";

        for (let i = 1; i <= M.LinesTotal; i++) {

            C.HTMLElement.LINE_NUMBERS.textContent += `${i}\n`;
        }

        C.HTMLElement.LINE_NUMBERS.textContent += C.Unicode.NO_BREAK_SPACE;
    }
}

/**
 * @description Event handler for moving the Drag Bar with the mouse.
 * @param {object} event - The event object.
 * @private
 * @function
 * 
 */
function mouseMoveHandler(event) {

    const codeEditor = C.HTMLElement.CODE_EDITOR;
    const frameView = C.HTMLElement.FRAME_VIEW;
    const contentMinSize = C.Measurement.CONTENT_MIN_SIZE;

    if (S.Orientation === C.Orientation.HORIZONTAL) {

        const offset = event.clientY - M.DragPointOrigin.y;

        const codeEditorMaxHeight = S.CodeEditorSize.height + S.FrameViewSize.height - contentMinSize;
        const codeEditorHeight = Math.min(Math.max(S.CodeEditorSize.height + offset, contentMinSize), codeEditorMaxHeight);
        
        const frameViewMaxHeight = S.FrameViewSize.height + S.CodeEditorSize.height - contentMinSize;
        const frameViewHeight = Math.min(Math.max(S.FrameViewSize.height - offset, contentMinSize), frameViewMaxHeight);

        codeEditor.style.height = `${codeEditorHeight}${C.CSS.PX}`;
        frameView.style.height = `${frameViewHeight}${C.CSS.PX}`;

        return;
    }

    if (S.Orientation === C.Orientation.VERTICAL) {

        const offset = event.clientX - M.DragPointOrigin.x;

        const codeEditorMaxWidth = S.CodeEditorSize.width + S.FrameViewSize.width - contentMinSize;
        const codeEditorWidth = Math.min(Math.max(S.CodeEditorSize.width + offset, contentMinSize), codeEditorMaxWidth);

        const frameViewMaxWidth = S.FrameViewSize.width + S.CodeEditorSize.width - contentMinSize;
        const frameViewWidth = Math.min(Math.max(S.FrameViewSize.width - offset, contentMinSize), frameViewMaxWidth);

        codeEditor.style.width = `${codeEditorWidth}${C.CSS.PX}`;
        frameView.style.width = `${frameViewWidth}${C.CSS.PX}`;
    }
}

/**
 * @description Event handler for releasing the Drag Bar from the mouse.
 * @private
 * @function
 * 
 */
function mouseUpHandler() {

    Layout.setContentDisplayType(C.CSS.FLEX);

    removeEventListener(C.Event.MOUSE_UP, mouseUpHandler);
    removeEventListener(C.Event.MOUSE_MOVE, mouseMoveHandler);
}