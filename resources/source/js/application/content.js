//Imports
import { SharedStates as S } from "../support/sharedStates.js";
import * as App from "./app.js";
import * as C from "../support/constants.js";
import * as Controls from "./controls.js";
import * as Layout from "./layout.js";

/**
 * @description The <strong>content.js</strong> module contains properties and functions pertaining to the Code Editor, Frame View and the Drag Bar.
 * @requires app
 * @requires constants
 * @requires layout
 * @requires sharedStates
 * @module
 * 
 */
export {
    
    init,
    resetImageTransform,
    setFrameViewMouseEvents,
    updateImageTransform,
    updateLineNumbers
};

/**
 * @description An object containing the following members with module scope:
 * <ul>
 *     <li> DragPointOrigin </li>
 *     <li> LinesTotal </li>
 *     <li> Image </li>
 *     <li> Transform </li>
 * </ul>
 * 
 * @private
 * @constant
 * 
 */
const M = {

    DragPointOrigin: undefined,
    LinesTotal: undefined,
    Image: undefined,

    Transform: {

        x: 0,
        y: 0,
        scale: 1.00,
        reflectH: false,
        reflectV: false
    }
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

    textArea.addEventListener(C.Event.SCROLL, () => C.HTMLElement.LINE_NUMBERS.scrollTop = textArea.scrollTop);
    textArea.addEventListener(C.Event.INPUT, () => {

        updateLineNumbers();

        Controls.updateExecuteButton();
    });

    textArea.textContent = S.Code;
    textArea.dispatchEvent(new Event(C.Event.INPUT));
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

        if (event.target === dragBar) {
            
            event.preventDefault();

            M.DragPointOrigin = {
                
                x: event.clientX,
                y: event.clientY
            };

            Layout.setContentDisplayType(C.CSS.BLOCK);

            addEventListener(C.Event.MOUSE_MOVE, dragBarMouseMoveHandler);
            addEventListener(C.Event.MOUSE_UP, dragBarMouseUpHandler);
        }
    });
}

/**
 * @description Initializes the Frame View with inline CSS styling.
 * @private
 * @function
 * 
 */
function initFrameView() {

    const frameViewBody = C.HTMLElement.FRAME_VIEW.contentDocument.body;

    frameViewBody.style.boxSizing= C.CSS.BORDER_BOX;
    frameViewBody.style.margin = C.CSS.ZERO;
    frameViewBody.style.padding = C.CSS.ZERO;
    frameViewBody.style.position = C.CSS.RELATIVE;
    frameViewBody.style.display = C.CSS.FLEX;
    frameViewBody.style.justifyContent = C.CSS.CENTER;
    frameViewBody.style.alignItems = C.CSS.CENTER;
    frameViewBody.style.overflow = C.CSS.HIDDEN;

    const info = new Map([

        [C.HTMLElement.FRAME_VIEW_INFO_SCALE, C.Label.FRAME_VIEW_SCALE],
        [C.HTMLElement.FRAME_VIEW_INFO_WIDTH, C.Label.FRAME_VIEW_WIDTH],
        [C.HTMLElement.FRAME_VIEW_INFO_HEIGHT, C.Label.FRAME_VIEW_HEIGHT],
    ]);

    info.forEach((value, key) => key.setAttribute("data-info", value));

    App.setFrameViewHasImage(false);
}

/**
 * @description Toggles mouse event handling for the Frame View
 * @param {boolean} [value = true] - Adds or removes the mouse events.
 * @public
 * @function
 * 
 */
function setFrameViewMouseEvents(value = true) {

    const frameViewBody = C.HTMLElement.FRAME_VIEW.contentDocument.body;
    frameViewBody.style.cursor = (value) ? C.CSS.GRAB : C.CSS.AUTO;

    [C.Event.MOUSE_DOWN, C.Event.MOUSE_WHEEL].forEach((eventType) => {
    
        if (value) {
        
            M.Image = C.HTMLElement.FRAME_VIEW.contentDocument.body.firstChild;

            frameViewBody.addEventListener(eventType, frameViewMouseHandler);
            
            updateImageTransform();
            setTimeout(updateImageInfo, 0);
        }
        else {

            frameViewBody.removeEventListener(eventType, frameViewMouseHandler);
        }
    });
}

/**
 * @description Event handler called when dispatching mouse events from the Frame View.
 * @param {Object} event - The event object.
 * @private
 * @function
 * 
 */
function frameViewMouseHandler(event) {

    switch(event.type) {
    
        case C.Event.MOUSE_DOWN:

            [C.Event.MOUSE_MOVE, C.Event.MOUSE_UP, C.Event.MOUSE_LEAVE, C.Event.DRAG_START]
                .forEach((eventType) => event.target.addEventListener(eventType, frameViewMouseHandler));

            break;
            
        case C.Event.MOUSE_MOVE: {

			const x = M.Transform.x + event.movementX;
            const y = M.Transform.y + event.movementY;
            
            updateImageTransform(x, y);

            break;
        }
            
        case C.Event.MOUSE_UP:
        case C.Event.MOUSE_LEAVE:

            [C.Event.MOUSE_MOVE, C.Event.MOUSE_UP, C.Event.MOUSE_LEAVE, C.Event.DRAG_START]
                .forEach((eventType) => event.target.removeEventListener(eventType, frameViewMouseHandler));
            
            break;
            
        case C.Event.MOUSE_WHEEL:
        
            updateImageTransform(null, null, event.wheelDelta > 0);
            
            break;

        case C.Event.DRAG_START:

            event.preventDefault();

            break;
    }
}

/**
 * @description Updates the image coordinates and scale transformation.
 * @param {?number} [x = null] - The amount of pixels to translate the image along the horizontal axis.
 * @param {?number} [y = null] - The amount of pixels to translate the image along the vertical axis.
 * @param {?boolean} [scale = null] - Increments (true) or decrements (false) the image scale.
 * @param {?boolean} [reflectH = null] - Reflects the image along the horizontal axis.
 * @param {?boolean} [reflectV = null] - Reflects the image along the vertical axis.
 * @public
 * @function
 * 
 */
function updateImageTransform(x = null, y = null, scale = null, reflectH = null, reflectV = null) {

	M.Transform.x = (x === null) ? M.Transform.x : x;
	M.Transform.y = (y === null) ? M.Transform.y : y;

    M.Transform.scale = (scale === null) ? M.Transform.scale : (() => {

        if (typeof scale === C.Type.BOOLEAN) {
        
            const step = (scale) ? C.Measurement.SCALE_STEP : -(C.Measurement.SCALE_STEP);

            return Math.max(0.01, M.Transform.scale + step);
        }
        
        return scale;
    })();

    M.Transform.reflectH = (reflectH === null) ? M.Transform.reflectH : (reflectH) ? !M.Transform.reflectH : false;
    M.Transform.reflectV = (reflectV === null) ? M.Transform.reflectV : (reflectV) ? !M.Transform.reflectV : false;

	M.Image.style.transform = `
    
    	${C.CSS.TRANSLATE}(${M.Transform.x}${C.CSS.PX}, ${M.Transform.y}${C.CSS.PX})
        ${C.CSS.SCALE_Y}(${(M.Transform.reflectH) ? "-" : "+"}${M.Transform.scale})
        ${C.CSS.SCALE_X}(${(M.Transform.reflectV) ? "-" : "+"}${M.Transform.scale})
    `;

    updateImageInfo();
}

/**
 * @description Resets the image to the default properties.
 * @public
 * @function
 * 
 */
function resetImageTransform() {

    updateImageTransform(0, 0, 1.00, false, false);
}

/**
 * @description Updates the image info that displays scale, width and height.
 * @private
 * @function
 * 
 */
function updateImageInfo() {

    C.HTMLElement.FRAME_VIEW_INFO_SCALE.textContent = M.Transform.scale.toFixed(2);
    C.HTMLElement.FRAME_VIEW_INFO_WIDTH.textContent = Math.round(M.Image.offsetWidth * M.Transform.scale);
    C.HTMLElement.FRAME_VIEW_INFO_HEIGHT.textContent = Math.round(M.Image.offsetHeight * M.Transform.scale);
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
function dragBarMouseMoveHandler(event) {

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
function dragBarMouseUpHandler() {

    Layout.setContentDisplayType(C.CSS.FLEX);

    removeEventListener(C.Event.MOUSE_UP, dragBarMouseUpHandler);
    removeEventListener(C.Event.MOUSE_MOVE, dragBarMouseMoveHandler);
}