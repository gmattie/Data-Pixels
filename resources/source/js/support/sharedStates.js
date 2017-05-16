/**
 * @description The <strong>sharedStates.js</strong> module contains a stateful object consisting of predefined properties with read/write accessibility.
 * @module
 * 
 */
export { SharedStates };

/**
 * @description Properties consist of:
 * <ul>
 *     <li> Alignment </li>
 *     <li> AutoCode </li>
 *     <li> Code </li>
 *     <li> CodeEditorFlexGrow </li>
 *     <li> CodeEditorSize </li>
 *     <li> Description </li>
 *     <li> FrameViewFlexGrow </li>
 *     <li> FrameViewSize </li>
 *     <li> Indentation </li>
 *     <li> Mode </li>
 *     <li> Orientation </li>
 *     <li> Theme </li>
 * </ul>
 * 
 * @constant
 * 
 */
const SharedStates = {

    Alignment: undefined,
    AutoCode: undefined,
    Code: undefined,
    CodeEditorFlexGrow: undefined,
    CodeEditorSize: undefined,
    Description: undefined,
    FrameViewFlexGrow: undefined,
    FrameViewSize: undefined,
    Indentation: undefined,
    Mode: undefined,
    Orientation: undefined,
    Theme: undefined
};

Object.seal(SharedStates);