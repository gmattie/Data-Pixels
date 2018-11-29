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
 *     <li> AutoExecute </li>
 *     <li> Code </li>
 *     <li> CodeEditorFlexGrow </li>
 *     <li> CodeEditorMode </li>
 *     <li> CodeEditorSize </li>
 *     <li> Description </li>
 *     <li> FrameViewFlexGrow </li>
 *     <li> FrameViewHasImage </li>
 *     <li> FrameViewSize </li>
 *     <li> Indentation </li>
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
    AutoExecute: undefined,
    Code: undefined,
    CodeEditorFlexGrow: undefined,
    CodeEditorMode: undefined,
    CodeEditorSize: undefined,
    Description: undefined,
    FrameViewFlexGrow: undefined,
    FrameViewHasImage: undefined,
    FrameViewSize: undefined,
    Indentation: undefined,
    Orientation: undefined,
    Theme: undefined
};

Object.seal(SharedStates);