/**
 * @description The <strong>sharedConstants.js</strong> module contains a collection of categoric constant member objects.
 * @module
 * 
 */
export {

    Electron,
    Event,
    FileSource,
    Keys,
    Label,
    Orientation,
    Role,
    Type
};

/**
 * @description Properties of type <strong>{string}</strong> consist of:
 * <ul>
 *     <li> DIALOG_OPEN_FILE </li>
 *     <li> ELECTRON </li>
 *     <li> NODE_FILE_SYSTEM </li>
 *     <li> NODE_PATH </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Electron = {

    DIALOG_OPEN_FILE: "openFile",
    ELECTRON: "electron",
    NODE_FILE_SYSTEM: "fs",
    NODE_PATH: "path"
};

Object.freeze(Electron);

/**
 * @description Properties of type <strong>{string}</strong> consist of:
 * <ul>
 *     <li> APPLICATION_BEFORE_QUIT </li>
 *     <li> APPLICATION_READY </li>
 *     <li> APPLICATION_WILL_QUIT </li>
 *     <li> APPLICATION_WINDOW_ALL_CLOSED </li>
 *     <li> MENU_ABOUT </li>
 *     <li> MENU_EXAMPLE_BASIC </li>
 *     <li> MENU_EXAMPLE_HEARTS </li>
 *     <li> MENU_EXAMPLE_MARIO_BROS </li>
 *     <li> MENU_EXECUTE </li>
 *     <li> MENU_EXPORT_DATA_PIXELS_FILE </li>
 *     <li> MENU_IMPORT_IMAGE_FILE </li>
 *     <li> MENU_LAYOUT_HORIZONTAL </li>
 *     <li> MENU_LAYOUT_VERTICAL </li>
 *     <li> MENU_REFLECT_HORIZONTAL </li>
 *     <li> MENU_REFLECT_VERTICAL </li>
 *     <li> MENU_RESET </li>
 *     <li> MENU_SCALE_DOWN </li>
 *     <li> MENU_SCALE_UP </li>
 *     <li> MENU_SETTINGS </li>
 *     <li> REQUEST_EXECUTE_BUTTON </li>
 *     <li> REQUEST_FRAME_VIEW_HAS_IMAGE </li>
 *     <li> REQUEST_ORIENTATION </li>
 *     <li> UPDATE_EXECUTE_BUTTON </li>
 *     <li> UPDATE_FRAME_VIEW_HAS_IMAGE </li>
 *     <li> UPDATE_ORIENTATION </li>
 *     <li> WINDOW_DID_FINISH_LOAD </li>
 *     <li> WINDOW_ENTER_FULL_SCREEN </li>
 *     <li> WINDOW_LEAVE_FULL_SCREEN </li>
 *     <li> WINDOW_MAXIMIZE </li>
 *     <li> WINDOW_NEW </li>
 *     <li> WINDOW_READY_TO_SHOW </li>
 *     <li> WINDOW_UNMAXIMIZE </li>
 * </ul>
 * 
 * @constant
 * 
 */

const Event = {

    APPLICATION_BEFORE_QUIT: "before-quit",
    APPLICATION_READY: "ready",
    APPLICATION_WILL_QUIT: "will-quit",
    APPLICATION_WINDOW_ALL_CLOSED: "window-all-closed",
    MENU_ABOUT: "menuAbout",
    MENU_EXAMPLE_BASIC: "menuExampleBasic",
    MENU_EXAMPLE_HEARTS: "menuExampleHearts",
    MENU_EXAMPLE_MARIO_BROS: "menuExampleMarioBros",
    MENU_RUN: "menuRun",
    MENU_EXPORT_DATA_PIXELS_FILE: "menuExportDataPixelsFile",
    MENU_IMPORT_IMAGE_FILE: "menuImportImageFile",
    MENU_LAYOUT_HORIZONTAL: "menuLayoutHorizontal",
    MENU_LAYOUT_VERTICAL: "menuLayoutVertical",
    MENU_REFLECT_HORIZONTAL: "menuReflectHorizontal",
    MENU_REFLECT_VERTICAL: "menuReflectVertical",
    MENU_RESET: "menuReset",
    MENU_SCALE_DOWN: "menuScaleDown",
    MENU_SCALE_UP: "menuScaleUp",
    MENU_SETTINGS: "menuSettings",
    REQUEST_EXECUTE_BUTTON: "requestExecuteButton",
    REQUEST_FRAME_VIEW_HAS_IMAGE: "requestFrameViewHasImage",
    REQUEST_ORIENTATION: "requestOrientation",
    UPDATE_EXECUTE_BUTTON: "updateExecuteButton",
    UPDATE_FRAME_VIEW_HAS_IMAGE: "updateFrameViewHasImage",
    UPDATE_ORIENTATION: "updateOrientation",
    WINDOW_DID_FINISH_LOAD: "did-finish-load",
    WINDOW_ENTER_FULL_SCREEN: "enter-full-screen",
    WINDOW_LEAVE_FULL_SCREEN: "leave-full-screen",
    WINDOW_MAXIMIZE: "maximize",
    WINDOW_NEW: "new-window",
    WINDOW_READY_TO_SHOW: "ready-to-show",
    WINDOW_UNMAXIMIZE: "unmaximize",
};

Object.freeze(Event);

/**
 * @description Properties of type <strong>{string}</strong> consist of:
 * <ul>
 *     <li> HTML </li>
 *     <li> ICON </li>
 * </ul>
 * 
 * @constant
 * 
 */
const FileSource = {

    HTML: "../../index.html",
    ICON: "../../images/Application.png"
};

Object.freeze(FileSource);

/**
 * @description Properties of type <strong>{string}</strong> consist of:
 * <ul>
 *     <li> ESCAPE </li>
 *     <li> QUIT </li>
 *     <li> REFLECT_HORIZONTALLY </li>
 *     <li> REFLECT_VERTICALLY </li>
 *     <li> RESET </li>
 *     <li> RUN </li>
 *     <li> SCALE_DOWN </li>
 *     <li> SCALE_UP </li>
 *     <li> TOGGLE_DEV_TOOLS </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Keys = {

    ESCAPE: "Escape",
    QUIT: "CommandOrControl+Q",
    REFLECT_HORIZONTALLY: "CommandOrControl+Left",
    REFLECT_VERTICALLY: "CommandOrControl+Right",
    RESET: "CommandOrControl+R",
    RUN: "F5",
    SCALE_DOWN: "CommandOrControl+Down",
    SCALE_UP: "CommandOrControl+Up",
    TOGGLE_DEV_TOOLS: "F12"
};

Object.freeze(Keys);

/**
 * @description Properties of type <strong>{string}</strong> consist of:
 * <ul>
 *     <li> APPLICATION_TITLE </li>
 *     <li> DIALOG_EXPORT_EXTENSION </li>
 *     <li> DIALOG_EXPORT_TITLE </li>
 *     <li> DIALOG_EXPORT_TYPE </li>
 *     <li> DIALOG_EXPORT_PATH </li>
 *     <li> DIALOG_IMPORT </li>
 *     <li> DIALOG_IMPORT_TITLE </li>
 *     <li> DIALOG_IMPORT_TYPE </li>
 *     <li> MENU_ITEM_ABOUT </li>
 *     <li> MENU_ITEM_CODE_EXAMPLES </li>
 *     <li> MENU_ITEM_CODE_EXAMPLES_BASIC </li>
 *     <li> MENU_ITEM_CODE_EXAMPLES_HEARTS </li>
 *     <li> MENU_ITEM_CODE_EXAMPLES_MARIO_BROS </li>
 *     <li> MENU_ITEM_EDIT </li>
 *     <li> MENU_ITEM_EXPORT </li>
 *     <li> MENU_ITEM_FILE </li>
 *     <li> MENU_ITEM_HELP </li>
 *     <li> MENU_ITEM_IMPORT </li>
 *     <li> MENU_ITEM_LAYOUT_HORIZONTAL </li>
 *     <li> MENU_ITEM_LAYOUT_VERTICAL </li>
 *     <li> MENU_ITEM_MAXIMIZE </li>
 *     <li> MENU_ITEM_REFLECT_HORIZONTALLY </li>
 *     <li> MENU_ITEM_REFLECT_VERTICALLY </li>
 *     <li> MENU_ITEM_RESET </li>
 *     <li> MENU_ITEM_RESTORE </li>
 *     <li> MENU_ITEM_RUN </li>
 *     <li> MENU_ITEM_SCALE_DOWN </li>
 *     <li> MENU_ITEM_SCALE_UP </li>
 *     <li> MENU_ITEM_SETTINGS </li>
 *     <li> MENU_ITEM_VIEW </li>
 *     <li> MENU_ITEM_WINDOW </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Label = {
    
    APPLICATION_TITLE: "Data Pixels Playground",
    DIALOG_EXPORT_EXTENSION: ".js",
    DIALOG_EXPORT_TITLE: "Save DataPixels.js File",
    DIALOG_EXPORT_TYPE: "JavaScript",
    DIALOG_EXPORT_PATH: "~/DataPixels.js",
    DIALOG_IMPORT_TITLE: "Select Image File",
    DIALOG_IMPORT_TYPE: "Images",
    DIALOG_IMPORT: "Import",
    MENU_ITEM_ABOUT: "About",
    MENU_ITEM_CODE_EXAMPLES_BASIC: "Basic",
    MENU_ITEM_CODE_EXAMPLES_HEARTS: "Hearts",
    MENU_ITEM_CODE_EXAMPLES_MARIO_BROS: "Mario Bros",
    MENU_ITEM_CODE_EXAMPLES: "Code Examples",
    MENU_ITEM_EDIT: "Edit",
    MENU_ITEM_EXPORT: "Export DataPixels.js File",
    MENU_ITEM_FILE: "File",
    MENU_ITEM_HELP: "Help",
    MENU_ITEM_IMPORT: "Import Image File...",
    MENU_ITEM_LAYOUT_HORIZONTAL: "Layout Horizontal",
    MENU_ITEM_LAYOUT_VERTICAL: "Layout Vertical",
    MENU_ITEM_MAXIMIZE: "Maximize",
    MENU_ITEM_REFLECT_HORIZONTALLY: "Reflect Horizontally",
    MENU_ITEM_REFLECT_VERTICALLY: "Reflect Vertically",
    MENU_ITEM_RESET: "Reset",
    MENU_ITEM_RESTORE: "Restore",
    MENU_ITEM_RUN: "Run",
    MENU_ITEM_SCALE_DOWN: "Scale Down",
    MENU_ITEM_SCALE_UP: "Scale Up",
    MENU_ITEM_SETTINGS: "Settings",
    MENU_ITEM_VIEW: "View",
    MENU_ITEM_WINDOW: "Window"
};

Object.freeze(Label);

/**
 * @description Properties of type <strong>{string}</strong> consist of:
 * <ul>
 *     <li> HORIZONTAL </li>
 *     <li> VERTICAL </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Orientation = {

    HORIZONTAL: "H",
    VERTICAL: "V"
};

Object.freeze(Orientation);

/**
 * @description Properties of type <strong>{string}</strong> consist of:
 * <ul>
 *     <li> COPY </li>
 *     <li> CUT </li>
 *     <li> DELETE </li>
 *     <li> FRONT </li>
 *     <li> HIDE_OTHERS </li>
 *     <li> HIDE </li>
 *     <li> MINIMIZE </li>
 *     <li> PASTE </li>
 *     <li> QUIT </li>
 *     <li> REDO </li>
 *     <li> SELECT_ALL </li>
 *     <li> SERVICES </li>
 *     <li> TOGGLE_DEV_TOOLS </li>
 *     <li> TOGGLE_FULL_SCREEN </li>
 *     <li> UNDO </li>
 *     <li> UNHIDE </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Role = {

    COPY: "copy",
    CUT: "cut",
    DELETE: "delete",
    FRONT: "front",
    HIDE_OTHERS: "hideothers",
    HIDE: "hide",
    MINIMIZE: "minimize",
    PASTE: "paste",
    QUIT: "quit",
    REDO: "redo",
    SELECT_ALL: "selectall",
    SERVICES: "services",
    TOGGLE_DEV_TOOLS: "toggledevtools",
    TOGGLE_FULL_SCREEN: "togglefullscreen",
    UNDO: "undo",
    UNHIDE: "unhide"
};

Object.freeze(Role);

/**
 * @description Properties of type <strong>{string}</strong> consist of:
 * <ul>
 *     <li> MAC_OS </li>
 *     <li> SEPARATOR </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Type = {

    MAC_OS: "darwin",
    SEPARATOR: "separator"
};

Object.freeze(Type);