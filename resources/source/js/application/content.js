//Imports
import { SharedStates as S } from "../support/sharedStates.js";
import * as App from "./app.js";
import * as C from "../support/constants.js";
import * as C_IPC from "../../../build/js/support/constants.js";
import * as Controls from "./controls.js";
import * as Layout from "./layout.js";

/**
 * @description The <strong>content.js</strong> module contains properties and functions pertaining to the Code Editor, Frame View and the Drag Bar.
 * @requires app
 * @requires constants
 * @requires constantsIPC
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
 *     <li> AutoExecuteTimeout </li>
 *     <li> DragPointOrigin </li>
 *     <li> LinesTotal </li>
 *     <li> Image </li>
 *     <li> IsCodeExecutable </li>
 *     <li> Transform 
 *         <ul>
 *             <li> X </li>
 *             <li> Y </li>
 *             <li> Scale </li>
 *             <li> ReflectH </li>
 *             <li> ReflectV </li>
 *         </ul>
 *     </li>
 * </ul>
 * 
 * @private
 * @constant
 * 
 */
const M = {

    AutoExecuteTimeout: undefined,
    DragPointOrigin: undefined,
    LinesTotal: undefined,
    Image: undefined,
    IsCodeExecutable: undefined,

    Transform: {

        X: 0,
        Y: 0,
        Scale: 1.00,
        ReflectH: false,
        ReflectV: false
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

            if (S.CodeEditorMode === C.Mode.AUTO) {

                App.setCodeEditorMode(C.Mode.MANUAL);
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

        const code = textArea.value.trim();
        
        if (S.AutoExecute) {

            clearTimeout(M.AutoExecuteTimeout);
            M.AutoExecuteTimeout = setTimeout(App.executeCode, C.Measurement.AUTO_EXECUTE_TIMEOUT);
        }
        else {
            
            if ((M.IsCodeExecutable && code === "") || (!M.IsCodeExecutable && code !== "")) {
                
                Controls.updateExecuteButton();
            }
        }
        
        M.IsCodeExecutable = (code !== "");
        updateLineNumbers();
    });

    M.IsCodeExecutable = Boolean(S.Code);

    const isAutoMode = (S.CodeEditorMode === C.Mode.AUTO);

    textArea.textContent = S.Code;
    textArea.dispatchEvent(new Event(C.Event.INPUT));

    if (isAutoMode) {

        App.setCodeEditorMode(C.Mode.AUTO);
    }
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

    if (S.Orientation === C_IPC.Orientation.HORIZONTAL) {

        const offset = event.clientY - M.DragPointOrigin.y;

        const codeEditorMaxHeight = S.CodeEditorSize.height + S.FrameViewSize.height - contentMinSize;
        const codeEditorHeight = Math.min(Math.max(S.CodeEditorSize.height + offset, contentMinSize), codeEditorMaxHeight);
        
        const frameViewMaxHeight = S.FrameViewSize.height + S.CodeEditorSize.height - contentMinSize;
        const frameViewHeight = Math.min(Math.max(S.FrameViewSize.height - offset, contentMinSize), frameViewMaxHeight);

        codeEditor.style.height = `${codeEditorHeight}${C.CSS.PX}`;
        frameView.style.height = `${frameViewHeight}${C.CSS.PX}`;

        return;
    }

    if (S.Orientation === C_IPC.Orientation.VERTICAL) {

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

			const x = M.Transform.X + event.movementX;
            const y = M.Transform.Y + event.movementY;
            
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

	M.Transform.X = (x === null) ? M.Transform.X : x;
	M.Transform.Y = (y === null) ? M.Transform.Y : y;

    M.Transform.Scale = (scale === null) ? M.Transform.Scale : (() => {

        if (typeof scale === C.Type.BOOLEAN) {
        
            const step = (scale) ? C.Measurement.SCALE_STEP : -(C.Measurement.SCALE_STEP);

            return Math.max(0.01, M.Transform.Scale + step);
        }
        
        return scale;
    })();

    M.Transform.ReflectH = (reflectH === null) ? M.Transform.ReflectH : (reflectH) ? !M.Transform.ReflectH : false;
    M.Transform.ReflectV = (reflectV === null) ? M.Transform.ReflectV : (reflectV) ? !M.Transform.ReflectV : false;

	M.Image.style.transform = `
    
    	${C.CSS.TRANSLATE}(${M.Transform.X}${C.CSS.PX}, ${M.Transform.Y}${C.CSS.PX})
        ${C.CSS.SCALE_Y}(${(M.Transform.ReflectH) ? "-" : "+"}${M.Transform.Scale})
        ${C.CSS.SCALE_X}(${(M.Transform.ReflectV) ? "-" : "+"}${M.Transform.Scale})
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

    C.HTMLElement.FRAME_VIEW_INFO_SCALE.textContent = M.Transform.Scale.toFixed(2);
    C.HTMLElement.FRAME_VIEW_INFO_WIDTH.textContent = Math.round(M.Image.offsetWidth * M.Transform.Scale);
    C.HTMLElement.FRAME_VIEW_INFO_HEIGHT.textContent = Math.round(M.Image.offsetHeight * M.Transform.Scale);
}