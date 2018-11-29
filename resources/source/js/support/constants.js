/**
 * @description The <strong>constants.js</strong> module contains a collection of categoric constant member objects.
 * @module
 * 
 */
export {
    
    Code,
    CSS,
    CSSClass,
    Dialog,
    Electron,
    Event,
    Example,
    HTML,
    HTMLElement,
    ImageSource,
    Indentation,
    Label,
    Measurement,
    Mode,
    Orientation,
    Persistence,
    TextArea,
    Theme,
    Type,
    Unicode
};

/**
 * @description Properties of type <strong>{string}</strong> consist of:
 * <ul>
 *     <li> A </li>
 *     <li> B </li>
 *     <li> BODY_APPEND </li>
 *     <li> CLASS_NAME </li>
 *     <li> CONSTANT </li>
 *     <li> ELECTRON_DIALOG_EXPORT_PATH </li>
 *     <li> EXTENSION_JAVASCRIPT </li>
 *     <li> G </li>
 *     <li> IMPORT_FROM </li>
 *     <li> PIXEL_SIZE </li>
 *     <li> R </li>
 *     <li> SCRIPT_URL </li>
 *     <li> SINGLE_SPACE </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Code = {

    ALPHA: "A:",
    BLUE: "B:",
    BODY_APPEND: "document.body.appendChild",
    CLASS_NAME: "DataPixels",
    CONSTANT: "const",
    ELECTRON_DIALOG_EXPORT_PATH: "~/DataPixels.js",
    EXTENSION_JAVASCRIPT: ".js",
    GREEN: "G:",
    IMPORT_FROM: "from \"./DataPixels.js\";",
    PIXEL_SIZE: "pixelSize",
    RED: "R:",
    SCRIPT_URL: "./data/DataPixels.js",
    SINGLE_SPACE: " "
};

Object.freeze(Code);

/**
 * @description Properties of type <strong>{string}</strong> consist of:
 * <ul>
 *     <li> AUTO </li>
 *     <li> BLOCK </li>
 *     <li> BORDER_BOX </li>
 *     <li> CENTER </li>
 *     <li> COLUMN </li>
 *     <li> FLEX </li>
 *     <li> GRAB </li>
 *     <li> HIDDEN </li>
 *     <li> LEFT </li>
 *     <li> NONE </li>
 *     <li> PX </li>
 *     <li> RELATIVE </li>
 *     <li> ROW </li>
 *     <li> SCALE_X </li>
 *     <li> SCALE_Y </li>
 *     <li> TRANSLATE </li>
 *     <li> ZERO </li>
 * </ul>
 * 
 * @constant
 * 
 */
const CSS = {

    AUTO: "auto",
    BLOCK: "block",
    BORDER_BOX: "border-box",
    CENTER: "center",
    COLUMN: "column",
    FLEX: "flex",
    GRAB: "-webkit-grab",
    HIDDEN: "hidden",
    LEFT: "left", 
    NONE: "none",
    PX: "px",
    RELATIVE: "relative",
    ROW: "row",
    SCALE_X: "scaleX",
    SCALE_Y: "scaleY",
    TRANSLATE: "translate",
    ZERO: "0"
};

Object.freeze(CSS);

/**
 * @description Properties of type <strong>{string}</strong> consist of:
 * <ul>
 *     <li> CONTROL_BUTTON </li>
 *     <li> CONTROL_BUTTON_THEME_DARK </li>
 *     <li> CONTROL_BUTTON_THEME_LIGHT </li>
 *     <li> DIALOG </li>
 *     <li> DIALOG_BUTTON </li>
 *     <li> DIALOG_CONTAINER </li>
 *     <li> DIALOG_CONTENT </li>
 *     <li> DIALOG_CONTENT_ABOUT </li>
 *     <li> DIALOG_CONTENT_SETTINGS </li>
 *     <li> DIALOG_FIELDSET </li>
 *     <li> DIALOG_HIDE </li>
 *     <li> DIALOG_IMAGE </li>
 *     <li> DIALOG_IMAGE_ABOUT </li>
 *     <li> DIALOG_IMAGE_SETTINGS </li>
 *     <li> DIALOG_LINK </li>
 *     <li> DIALOG_SHOW </li>
 *     <li> DIALOG_TEXT </li>
 *     <li> DIALOG_THEME_DARK </li>
 *     <li> DIALOG_THEME_LIGHT </li>
 *     <li> DIALOG_WINDOW </li>
 *     <li> DISABLED_OPACITY </li>
 *     <li> DRAG_BAR_HORIZONTAL </li>
 *     <li> DRAG_BAR_VERTICAL </li>
 *     <li> THEME_DARK </li>
 *     <li> THEME_LIGHT </li>
 * </ul>
 * 
 * @constant
 * 
 */
const CSSClass = {

    CONTROL_BUTTON_THEME_DARK: "controlButtonThemeDark",
    CONTROL_BUTTON_THEME_LIGHT: "controlButtonThemeLight",
    CONTROL_BUTTON: "controlButton",
    DIALOG_BUTTON: "dialogButton",
    DIALOG_CONTAINER: "dialogContainer",
    DIALOG_CONTENT_ABOUT: "dialogContentAbout",
    DIALOG_CONTENT_SETTINGS: "dialogContentSettings",
    DIALOG_CONTENT: "dialogContent",
    DIALOG_FIELDSET: "dialogFieldset",
    DIALOG_HIDE: "dialogHide",
    DIALOG_IMAGE_ABOUT: "dialogImageAbout",
    DIALOG_IMAGE_SETTINGS: "dialogImageSettings",
    DIALOG_IMAGE: "dialogImage",
    DIALOG_LINK: "dialogLink",
    DIALOG_SHOW: "dialogShow",
    DIALOG_TEXT: "dialogText",
    DIALOG_THEME_DARK: "dialogThemeDark",
    DIALOG_THEME_LIGHT: "dialogThemeLight",
    DIALOG_WINDOW: "dialogWindow",
    DIALOG: "dialog",
    DISABLED_OPACITY: "disabledOpacity",
    DRAG_BAR_HORIZONTAL: "dragBarHorizontal",
    DRAG_BAR_VERTICAL: "dragBarVertical",
    THEME_DARK: "themeDark",
    THEME_LIGHT: "themeLight"
};

Object.freeze(CSSClass);

/**
 * @description Properties of type <strong>{number}</strong> consist of:
 * <ul>
 *     <li> ABOUT </li>
 *     <li> FILE_TYPE_ERROR </li>
 *     <li> IMAGE_SIZE_WARNING </li>
 *     <li> SETTINGS </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Dialog = {

    ABOUT: 0,
    FILE_TYPE_ERROR: 1,
    IMAGE_SIZE_WARNING: 2,
    SETTINGS: 3
};

Object.freeze(Dialog);

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
 *     <li> BEFORE_UNLOAD </li>
 *     <li> CHANGE </li>
 *     <li> CLICK </li>
 *     <li> DRAG_ENTER </li>
 *     <li> DRAG_OVER </li>
 *     <li> DRAG_START </li>
 *     <li> DROP </li>
 *     <li> ELECTRON_MENU_ABOUT </li>
 *     <li> ELECTRON_MENU_EXAMPLE_BASIC </li>
 *     <li> ELECTRON_MENU_EXAMPLE_HEARTS </li>
 *     <li> ELECTRON_MENU_EXAMPLE_MARIO_BROS </li>
 *     <li> ELECTRON_MENU_EXECUTE </li>
 *     <li> ELECTRON_MENU_EXPORT_DATA_PIXELS_FILE </li>
 *     <li> ELECTRON_MENU_REFLECT_HORIZONTAL </li>
 *     <li> ELECTRON_MENU_REFLECT_VERTICAL </li>
 *     <li> ELECTRON_MENU_IMPORT_IMAGE_FILE </li>
 *     <li> ELECTRON_MENU_LAYOUT_HORIZONTAL </li>
 *     <li> ELECTRON_MENU_LAYOUT_VERTICAL </li>
 *     <li> ELECTRON_MENU_RESET </li>
 *     <li> ELECTRON_MENU_SCALE_DOWN </li>
 *     <li> ELECTRON_MENU_SCALE_UP </li>
 *     <li> ELECTRON_MENU_SETTINGS </li>
 *     <li> ELECTRON_REQUEST_EXECUTE_BUTTON </li>
 *     <li> ELECTRON_REQUEST_FRAME_VIEW_HAS_IMAGE </li>
 *     <li> ELECTRON_REQUEST_ORIENTATION </li>
 *     <li> ELECTRON_UPDATE_EXECUTE_BUTTON </li>
 *     <li> ELECTRON_UPDATE_FRAME_VIEW_HAS_IMAGE </li>
 *     <li> ELECTRON_UPDATE_ORIENTATION </li>
 *     <li> ERROR </li>
 *     <li> INPUT </li>
 *     <li> KEY_DOWN </li>
 *     <li> LOAD </li>
 *     <li> MOUSE_DOWN </li>
 *     <li> MOUSE_LEAVE </li>
 *     <li> MOUSE_MOVE </li>
 *     <li> MOUSE_UP </li>
 *     <li> MOUSE_WHEEL </li>
 *     <li> SCROLL </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Event = {

    BEFORE_UNLOAD: "beforeunload",
    CHANGE: "change",
    CLICK: "click",
    DRAG_ENTER: "dragenter",
    DRAG_OVER: "dragover",
    DRAG_START: "dragstart",
    DROP: "drop",
    ELECTRON_MENU_ABOUT: "menuAbout",
    ELECTRON_MENU_EXAMPLE_BASIC: "menuExampleBasic",
    ELECTRON_MENU_EXAMPLE_HEARTS: "menuExampleHearts",
    ELECTRON_MENU_EXAMPLE_MARIO_BROS: "menuExampleMarioBros",
    ELECTRON_MENU_EXECUTE: "menuExecute",
    ELECTRON_MENU_EXPORT_DATA_PIXELS_FILE: "menuExportDataPixelsFile",
    ELECTRON_MENU_REFLECT_HORIZONTAL: "menuReflectHorizontal",
    ELECTRON_MENU_REFLECT_VERTICAL: "menuReflectVertical",
    ELECTRON_MENU_IMPORT_IMAGE_FILE: "menuImportImageFile",
    ELECTRON_MENU_LAYOUT_HORIZONTAL: "menuLayoutHorizontal",
    ELECTRON_MENU_LAYOUT_VERTICAL: "menuLayoutVertical",
    ELECTRON_MENU_RESET: "menuReset",
    ELECTRON_MENU_SCALE_DOWN: "menuScaleDown",
    ELECTRON_MENU_SCALE_UP: "menuScaleUp",
    ELECTRON_MENU_SETTINGS: "menuSettings",
    ELECTRON_REQUEST_EXECUTE_BUTTON: "requestExecuteButton",
    ELECTRON_REQUEST_FRAME_VIEW_HAS_IMAGE: "requestFrameViewHasImage",
    ELECTRON_REQUEST_ORIENTATION: "requestOrientation",
    ELECTRON_UPDATE_EXECUTE_BUTTON: "updateExecuteButton",
    ELECTRON_UPDATE_FRAME_VIEW_HAS_IMAGE: "updateFrameViewHasImage",
    ELECTRON_UPDATE_ORIENTATION: "updateOrientation",
    ERROR: "error",
    INPUT: "input",
    KEY_DOWN: "keydown",
    LOAD: "load",
    MOUSE_DOWN: "mousedown",
    MOUSE_LEAVE: "mouseleave",
    MOUSE_MOVE: "mousemove",
    MOUSE_UP: "mouseup",
    MOUSE_WHEEL: "wheel",
    SCROLL: "scroll"    
};

Object.freeze(Event);

/**
 * @description Properties of type <strong>{string}</strong> consist of:
 * <ul>
 *     <li> BASIC </li>
 *     <li> HEARTS </li>
 *     <li> MARIO_BROS </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Example = {

    BASIC: "basic",
    HEARTS: "hearts",
    MARIO_BROS: "marioBros"
};

Object.freeze(Example);

/**
 * @description Properties of type <strong>{string}</strong> consist of:
 * <ul>
 *     <li> ANCHOR </li>
 *     <li> BUTTON </li>
 *     <li> BLANK </li>
 *     <li> CHECKBOX </li>
 *     <li> CANVAS </li>
 *     <li> CANVAS_RENDERING_CONTEXT_2D </li>
 *     <li> COPY </li>
 *     <li> DIV </li>
 *     <li> FIELDSET </li>
 *     <li> HEAD </li>
 *     <li> IMAGE </li>
 *     <li> INPUT </li>
 *     <li> LABEL </li>
 *     <li> LEGEND </li>
 *     <li> OPTION </li>
 *     <li> SCRIPT_TYPE </li>
 *     <li> SCRIPT </li>
 *     <li> SELECT </li>
 *     <li> XML_HTTP_GET </li>
 * </ul>
 * 
 * @constant
 * 
 */
const HTML = {

    ANCHOR: "a",
    BUTTON: "button",
    BLANK: "_blank",
    CANVAS: "canvas",
    CANVAS_RENDERING_CONTEXT_2D: "2d",
    CHECKBOX: "checkbox",
    COPY: "copy",
    DIV: "div",
    FIELDSET: "fieldset",
    HEAD: "head",
    IMAGE: "img",
    INPUT: "input",
    LABEL: "label",
    LEGEND: "legend",
    OPTION: "option",
    SCRIPT_TYPE: "text/javascript",
    SCRIPT: "script",
    SELECT: "select",
    XML_HTTP_GET: "GET"
};

Object.freeze(HTML);

/**
 * @description Properties of type <strong>{Object}</strong> consist of:
 * <ul>
 *     <li> BUTTON_EXECUTE </li>
 *     <li> BUTTON_REFLECT_HORIZONTAL </li>
 *     <li> BUTTON_REFLECT_VERTICAL </li>
 *     <li> BUTTON_LAYOUT_HORIZONTAL </li>
 *     <li> BUTTON_LAYOUT_VERTICAL </li>
 *     <li> BUTTON_RESET </li>
 *     <li> BUTTON_SCALE_DOWN </li>
 *     <li> BUTTON_SCALE_UP </li>
 *     <li> BUTTON_SETTINGS </li>
 *     <li> CODE_EDITOR </li>
 *     <li> CONTENT </li>
 *     <li> DRAG_BAR </li>
 *     <li> DRAG_ICON </li>
 *     <li> ERROR </li>
 *     <li> FRAME_VIEW </li>
 *     <li> FRAME_VIEW_HUD </li>
 *     <li> FRAME_VIEW_INFO_HEIGHT </li>
 *     <li> FRAME_VIEW_INFO_SCALE </li>
 *     <li> FRAME_VIEW_INFO_WIDTH </li>
 *     <li> FRAME_VIEW_INFO_X_POS </li>
 *     <li> FRAME_VIEW_INFO_Y_POS </li>
 *     <li> LINE_NUMBERS </li>
 *     <li> TEXT_AREA </li>
 * </ul>
 * 
 * @constant
 * 
 */
const HTMLElement = {

    BUTTON_EXECUTE: document.getElementById("execute"),
    BUTTON_REFLECT_HORIZONTAL: document.getElementById("reflectHorizontal"),
    BUTTON_REFLECT_VERTICAL: document.getElementById("reflectVertical"),
    BUTTON_LAYOUT_HORIZONTAL: document.getElementById("layoutHorizontal"),
    BUTTON_LAYOUT_VERTICAL: document.getElementById("layoutVertical"),
    BUTTON_RESET: document.getElementById("reset"),
    BUTTON_SCALE_DOWN: document.getElementById("scaleDown"),
    BUTTON_SCALE_UP: document.getElementById("scaleUp"),
    BUTTON_SETTINGS: document.getElementById("settings"),
    CODE_EDITOR: document.getElementById("codeEditor"),
    CONTENT: document.getElementById("content"),
    DRAG_BAR: document.getElementById("dragBar"),
    DRAG_ICON: document.getElementById("dragIcon"),
    ERROR: parent.document.getElementById("error"),
    FRAME_VIEW_CONTROLS: document.getElementById("frameViewControls"),
    FRAME_VIEW_INFO_HEIGHT: document.getElementById("height"),
    FRAME_VIEW_INFO_SCALE: document.getElementById("scale"),
    FRAME_VIEW_INFO_WIDTH: document.getElementById("width"),
    FRAME_VIEW: document.getElementById("frameView"),
    LINE_NUMBERS: document.getElementById("lineNumbers"),
    TEXT_AREA: document.getElementById("textArea")
};

Object.freeze(HTMLElement);

/**
 * @description Properties of type <strong>{Object}</strong> consist of:
 * <ul>
 *     <li> ALERT </li>
 *     <li> APPLICATION </li>
 *     <li> DOCK </li>
 *     <li> ERROR </li>
 *     <li> REFLECT </li>
 *     <li> RESET </li>
 *     <li> RUN </li>
 *     <li> SCALE_DOWN </li>
 *     <li> SCALE_UP </li>
 *     <li> SETTINGS </li>
 * </ul>
 * 
 * @constant
 * 
 */
const ImageSource = {

    ALERT: "./images/Alert.png",
    APPLICATION: "./images/Application.png",
    DOCK: "./images/Dock.png",
    ERROR: "./images/Error.png",
    REFLECT: "./images/Reflect.png",
    RESET: "./images/Reset.png",
    RUN: "./images/Run.png",
    SCALE_DOWN: "./images/ScaleDown.png",
    SCALE_UP: "./images/ScaleUp.png",
    SETTINGS: "./images/Settings.png"
};

Object.freeze(ImageSource);

/**
 * @description Properties of type <strong>{Object}</strong> consist of:
 * <ul>
 *     <li> INDENT_2 </li>
 *     <li> INDENT_4 </li>
 *     <li> INDENT_8 </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Indentation = {

    INDENT_2: "2",
    INDENT_4: "4",
    INDENT_8: "8"
};

Object.freeze(Indentation);

/**
 * @description Properties of type <strong>{string}</strong> consist of:
 * <ul>
 *     <li> CANCEL </li>
 *     <li> CONTROLS_EXECUTE </li>
 *     <li> CONTROLS_LAYOUT_HORIZONTAL </li>
 *     <li> CONTROLS_LAYOUT_VERTICAL </li>
 *     <li> CONTROLS_REFLECT_HORIZONTALLY </li>
 *     <li> CONTROLS_REFLECT_VERTICALLY </li>
 *     <li> CONTROLS_RESET </li>
 *     <li> CONTROLS_SCALE_DOWN </li>
 *     <li> CONTROLS_SCALE_UP </li>
 *     <li> CONTROLS_SETTINGS </li>
 *     <li> DIALOG_ABOUT_URL </li>
 *     <li> DIALOG_ABOUT </li>
 *     <li> DIALOG_FILE_TYPE </li>
 *     <li> DIALOG_LARGE_IMAGE </li>
 *     <li> DIALOG_SETTINGS_APPEARANCE </li>
 *     <li> DIALOG_SETTINGS_AUTO_EXECUTION_TOOLTIP </li>
 *     <li> DIALOG_SETTINGS_AUTO_EXECUTION </li>
 *     <li> DIALOG_SETTINGS_CODE_EDITOR </li>
 *     <li> DIALOG_SETTINGS_DEFAULT_INDENTATION_TOOLTIP </li>
 *     <li> DIALOG_SETTINGS_DEFAULT_INDENTATION </li>
 *     <li> DIALOG_SETTINGS_IMAGE_IMPORTS_ALIGNMENT_TOOLTIP </li>
 *     <li> DIALOG_SETTINGS_IMAGE_IMPORTS_ALIGNMENT </li>
 *     <li> DIALOG_SETTINGS_IMAGE_IMPORTS_DESCRIPTION_TOOLTIP </li>
 *     <li> DIALOG_SETTINGS_IMAGE_IMPORTS_DESCRIPTION </li>
 *     <li> DIALOG_SETTINGS_IMAGE_IMPORTS </li>
 *     <li> DIALOG_SETTINGS_THEME_TOOLTIP </li>
 *     <li> DIALOG_SETTINGS_THEME </li>
 *     <li> ELECTRON_DIALOG_EXPORT_TITLE </li>
 *     <li> ELECTRON_DIALOG_EXPORT_TYPE </li>
 *     <li> ELECTRON_DIALOG_IMPORT_TITLE </li>
 *     <li> ELECTRON_DIALOG_IMPORT_TYPE </li>
 *     <li> ELECTRON_DIALOG_IMPORT </li>
 *     <li> ERROR </li>
 *     <li> FILE_CORRUPT </li>
 *     <li> FILE_NOT_FOUND </li>
 *     <li> FILE_READ </li>
 *     <li> FRAME_VIEW_HEIGHT </li>
 *     <li> FRAME_VIEW_SCALE </li>
 *     <li> FRAME_VIEW_WIDTH </li>
 *     <li> OK </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Label = {
    
    CANCEL: "Cancel",
    CONTROLS_EXECUTE: "Execute code",
    CONTROLS_LAYOUT_HORIZONTAL: "Layout Horizontal",
    CONTROLS_LAYOUT_VERTICAL: "Layout Vertical",
    CONTROLS_REFLECT_HORIZONTALLY: "Reflect Horizontally",
    CONTROLS_REFLECT_VERTICALLY: "Reflect Vertically",
    CONTROLS_RESET: "Reset",
    CONTROLS_SCALE_DOWN: "Scale Down",
    CONTROLS_SCALE_UP: "Scale Up",
    CONTROLS_SETTINGS: "Settings",
    DIALOG_ABOUT_URL: "https://github.com/gmattie/Data-Pixels",
    DIALOG_ABOUT: `Data Pixels Playground\n\nCopyright © 2017-${new Date().getFullYear()} Geoffrey Mattie\n`,
    DIALOG_FILE_TYPE: "Illegal file type.  This application only supports raster based image files with the following type extensions:\n\nPNG, JPG, GIF.",
    DIALOG_LARGE_IMAGE: "This application is designed to process small, icon-sized image files.  Importing larger image files may result in decreased performance.\n\nDo you wish to proceed?",
    DIALOG_SETTINGS_APPEARANCE: "APPEARANCE",
    DIALOG_SETTINGS_AUTO_EXECUTION_TOOLTIP: "Toggles automatic execution of code while the code is being written.",
    DIALOG_SETTINGS_AUTO_EXECUTION: "Automatic Code Execution:",
    DIALOG_SETTINGS_CODE_EDITOR: "CODE EDITOR",
    DIALOG_SETTINGS_DEFAULT_INDENTATION_TOOLTIP: "Updates the indenting tab spaces of the Code Editor.",
    DIALOG_SETTINGS_DEFAULT_INDENTATION: "Default Indentation:",
    DIALOG_SETTINGS_IMAGE_IMPORTS_ALIGNMENT_TOOLTIP: "Visually aligns the \"pixelData\" array columns of unedited, automatically generated code from imported image files.",
    DIALOG_SETTINGS_IMAGE_IMPORTS_ALIGNMENT: "Generate Aligned Code:",
    DIALOG_SETTINGS_IMAGE_IMPORTS_DESCRIPTION_TOOLTIP: "Prefixes \"R\", \"G\", \"B\" and \"A\" to the \"pixelData\" array values of unedited, automatically generated code from imported image files.",
    DIALOG_SETTINGS_IMAGE_IMPORTS_DESCRIPTION: "Generate Descriptive Code:",
    DIALOG_SETTINGS_IMAGE_IMPORTS: "IMAGE IMPORTS",
    DIALOG_SETTINGS_THEME_TOOLTIP: "Updates the visual appearance of the application.",
    DIALOG_SETTINGS_THEME: "Theme:",
    ELECTRON_DIALOG_EXPORT_TITLE: "Save DataPixels.js File",
    ELECTRON_DIALOG_EXPORT_TYPE: "JavaScript",
    ELECTRON_DIALOG_IMPORT_TITLE: "Select Image File",
    ELECTRON_DIALOG_IMPORT_TYPE: "Images",
    ELECTRON_DIALOG_IMPORT: "Import",
    ERROR: "ERROR:",
    FILE_CORRUPT: "Image file is corrupt.",
    FILE_NOT_FOUND: "DataPixels.js file not found.",
    FILE_READ: "File could not be read.",
    FRAME_VIEW_HEIGHT: "Height: ",
    FRAME_VIEW_SCALE: "Scale: ",
    FRAME_VIEW_WIDTH: "Width: ",
    OK: "OK"
};

Object.freeze(Label);

/**
 * @description Properties of type <strong>{number}</strong> consist of:
 * <ul>
 *     <li> AUTO_EXECUTE_TIMEOUT </li>
 *     <li> CONTENT_MIN_SIZE </li>
 *     <li> FRAME_VIEW_MARGIN </li>
 *     <li> IMAGE_MAX_AREA </li>
 *     <li> SCALE_STEP </li>
 *     <li> SCALE_TIMEOUT </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Measurement = {

    AUTO_EXECUTE_TIMEOUT: 500,
    CONTENT_MIN_SIZE: 160,
    FRAME_VIEW_MARGIN: 0.85,
    IMAGE_MAX_AREA: 10000,
    SCALE_STEP: 0.01,
    SCALE_TIMEOUT: 500
};

Object.freeze(Measurement);

/**
 * @description Properties of type <strong>{string}</strong> consist of:
 * <ul>
 *     <li> AUTO </li>
 *     <li> MANUAL </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Mode = {

    AUTO: 0,
    MANUAL: 1
};

Object.freeze(Mode);

/**
 * @description Properties of type <strong>{number}</strong> consist of:
 * <ul>
 *     <li> HORIZONTAL </li>
 *     <li> VERTICAL </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Orientation = {

    HORIZONTAL: "horizontal",
    VERTICAL: "vertical"
};

Object.freeze(Orientation);

/**
 * @description Properties of type <strong>{string}</strong> consist of:
 * <ul>
 *     <li> ALIGNMENT </li>
 *     <li> AUTO_CODE </li>
 *     <li> AUTO_EXECUTE </li>
 *     <li> DESCRIPTION </li>
 *     <li> CODE_EDITOR_FLEX_GROW </li>
 *     <li> CODE </li>
 *     <li> INDENTATION </li>
 *     <li> FRAME_VIEW_FLEX_GROW </li>
 *     <li> MODE </li>
 *     <li> ORIENTATION </li>
 *     <li> THEME </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Persistence = {

    ALIGNMENT: "alignment",
    AUTO_CODE: "autoCode",
    AUTO_EXECUTE: "autoExecute",
    DESCRIPTION: "description",
    CODE_EDITOR_FLEX_GROW: "codeEditorFlexGrow",
    CODE: "code",
    INDENTATION: "indentation",
    FRAME_VIEW_FLEX_GROW: "frameViewFlexGrow",
    MODE: "mode",
    ORIENTATION: "orientation",
    THEME: "theme"
};

Object.freeze(Persistence);

/**
 * @description Properties of type <strong>{string}</strong> consist of:
 * <ul>
 *     <li> OFF </li>
 *     <li> SELECTION_FORWARD </li>
 *     <li> TAB_KEY </li>
 *     <li> NEW_LINE </li>
 *     <li> COMMAND_INSERT </li>
 *     <li> COMMAND_DELETE </li>
 * </ul>
 * 
 * @constant
 * 
 */
const TextArea = {

    OFF: "off",
    SELECTION_FORWARD: "forward",
    TAB_KEY: "Tab",
    NEW_LINE: "\n",
    COMMAND_INSERT: "insertText",
    COMMAND_DELETE: "delete"
};

Object.freeze(TextArea);

/**
 * @description Properties of type <strong>{number}</strong> consist of:
 * <ul>
 *     <li> DARK </li>
 *     <li> LIGHT </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Theme = {

    DARK: "Dark",
    LIGHT: "Light"
};

Object.freeze(Theme);

/**
 * @description Properties of type <strong>{string}</strong> consist of:
 * <ul>
 *     <li> BOOLEAN </li>
 *     <li> FUNCTION </li>
 *     <li> IMAGE_GIF </li>
 *     <li> IMAGE_JPG </li>
 *     <li> IMAGE_PNG </li>
 *     <li> MIME_IMAGE_GIF </li>
 *     <li> MIME_IMAGE_JPG </li>
 *     <li> MIME_IMAGE_PNG </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Type = {

    BOOLEAN: "boolean",
    FUNCTION: "function",
    IMAGE_GIF: "gif",
    IMAGE_JPG: "jpg",
    IMAGE_PNG: "png",
    MIME_IMAGE_GIF: "image/gif",
    MIME_IMAGE_JPG: "image/jpeg",
    MIME_IMAGE_PNG: "image/png"
};

Object.freeze(Type);

/**
 * @description Properties of type <strong>{string}</strong> consist of:
 * <ul>
 *     <li> NO_BREAK_SPACE </li>
 *     <li> TRIPLE_BAR </li>
 *     <li> X </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Unicode = {

    NO_BREAK_SPACE: "\u00A0",
    TRIPLE_BAR: "\u2AFC",
    X: "\u2716"
};

Object.freeze(Unicode);