//Imports
import { SharedStates as S } from "../support/sharedStates.js";
import * as App from "./app.js";
import * as C from "../support/constants.js";
import * as Popups from "./popups.js";
import * as Utils from "../support/utils.js";
import DataPixelsCodeFactory from "../dataPixels/DataPixelsCodeFactory.js";

/**
 * @description The <strong>app.js</strong> module contains properties and functions pertaining to importing or dropping an image file onto the application.
 * @requires app
 * @requires constants
 * @requires dataPixelsCodeFactory
 * @requires popups
 * @requires sharedStates
 * @requires utils
 * @module
 * 
 */
export {

    imageSizeCancelHandler,
    imageSizeOKHandler,
    init,
    readImageFile
};

/**
 * @description An object containing the following members with module scope:
 * <ul>
 *     <li> File </li>
 *     <li> Image </li>
 * </ul>
 * 
 * @private
 * @constant
 * 
 */
const M = {

    File: undefined,
    Image: undefined
};

/**
 * @description Initializes input file control and file drop functionality with applicable event handlers.
 * @private
 * @function
 * 
 */
function init() {

    const dropTarget = document.body;

    dropTarget.addEventListener(C.Event.DRAG_ENTER, (event) => {

        event.stopPropagation();
        event.preventDefault();

        event.dataTransfer.effectAllowed = C.HTML.COPY;
    });

    dropTarget.addEventListener(C.Event.DRAG_OVER, (event) => {

        event.stopPropagation();
        event.preventDefault();
        
        event.dataTransfer.dropEffect = C.HTML.COPY;
    });

    dropTarget.addEventListener(C.Event.DROP, (event) => {

        event.stopPropagation();
        event.preventDefault();

        validateDroppedFileType(event.dataTransfer.files[0]);
    });
}

/**
 * @description Validates the file type of the dropped file as one of the application's supported image file types.
 * @param {Object} file - The dropped file.
 * @private
 * @function
 * 
 */
function validateDroppedFileType(file) {

    if (file) {

        App.setMode(C.Mode.MANUAL);

        M.File = file;
        const fileType = M.File.type;

        if (fileType !== C.Type.MIME_IMAGE_GIF && fileType !== C.Type.MIME_IMAGE_JPG && fileType !== C.Type.MIME_IMAGE_PNG) {

            Popups.display(C.Dialog.FILE_TYPE_ERROR);

            return;
        }

        App.setMode(C.Mode.AUTO);
        readImageFile(file);
    }
}

/**
 * @description Instantiates a FireReader object to read a dropped or opened image file
 * @param {Object} blob - The Blob object read by the FileReader.  
 * @param {string} [fileName = null] - Name of the opened image file assigned to the name property of the M.File object.
 * @public
 * @function
 * 
 */
function readImageFile(blob, fileName = null) {

    if (fileName) {

        M.File = {name: fileName};
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    fileReader.addEventListener(C.Event.LOAD, fileReaderLoadHandler);
    fileReader.addEventListener(C.Event.ERROR, fileReaderErrorHandler);
}

/**
 * @description Event handler called when the FileReader has finished loading the image file's contents.
 * @param {Object} event - The event object.
 * @private
 * @function
 * 
 */
function fileReaderLoadHandler(event) {

    const fileReader = event.target;
    fileReader.removeEventListener(C.Event.LOAD, fileReaderLoadHandler);
    fileReader.removeEventListener(C.Event.ERROR, fileReaderErrorHandler);
    
    const image = new Image();
    image.src = fileReader.result;
    image.addEventListener(C.Event.LOAD, imageLoadHandler);
    image.addEventListener(C.Event.ERROR, imageErrorHandler);
}

/**
 * @description Event handler called when the FileReader has encountered an error.
 * @param {Object} event - The event object.
 * @private
 * @function
 * 
 */
function fileReaderErrorHandler(event) {

    const fileReader = event.target;
    fileReader.removeEventListener(C.Event.LOAD, fileReaderLoadHandler);
    fileReader.removeEventListener(C.Event.ERROR, fileReaderErrorHandler);

    App.setErrorMessage(`${C.Label.ERROR} ${C.Label.FILE_READ}`);
    App.setMode(C.Mode.MANUAL);
}

/**
 * @description Event handler called when the HTMLImageElement with dimension attributes has finished loading.
 * @param {Object} event - The event object.
 * @private
 * @function
 * 
 */
function imageLoadHandler(event) {

    const image = event.target;
    image.removeEventListener(C.Event.LOAD, imageLoadHandler);
    image.removeEventListener(C.Event.ERROR, imageErrorHandler);

    if (image.width * image.height > C.Measurement.IMAGE_MAX_AREA) {

        M.Image = image;

        Popups.display(C.Dialog.IMAGE_SIZE_WARNING);
    }
    else {
    
        createAutoCode(image);
    }
}

/**
 * @description Event handler called when the HTMLImageElement has encountered an error.
 * @param {Object} event - The event object.
 * @private
 * @function
 * 
 */
function imageErrorHandler(event) {

    const image = event.target;
    image.removeEventListener(C.Event.LOAD, imageLoadHandler);
    image.removeEventListener(C.Event.ERROR, imageErrorHandler);

    App.setErrorMessage(`${C.Label.ERROR} ${C.Label.FILE_CORRUPT}`);
    App.setMode(C.Mode.MANUAL);
}

/**
 * @description Automatically generates program code by parsing an image file.
 * @param {Object} image - The image file to be parsed.
 * @private
 * @function
 * 
 */
function createAutoCode(image) {

    App.setErrorMessage(null);

    const canvas = document.createElement(C.HTML.CANVAS);
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext(C.HTML.CANVAS_RENDERING_CONTEXT_2D);
    context.drawImage(image, 0, 0);

    const variableName = Utils.cleanFileName(M.File.name, "pixelData");                          
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    S.AutoCode = new DataPixelsCodeFactory(variableName, imageData);
    S.AutoCode.formatCode(S.Alignment, S.Description);
    S.AutoCode.updateIndentation(S.Indentation);

    App.displayCode(S.AutoCode.output);
}

/**
 * @description Event handler called when the OK button of the Image Size Dialog is clicked.
 * @public
 * @function
 * 
 */
function imageSizeOKHandler() {

    createAutoCode(M.Image);

    M.Image = null;
}

/**
 * @description Event handler called when the Cancel button of the Image Size Dialog is clicked.
 * @public
 * @function
 * 
 */
function imageSizeCancelHandler() {

    App.setMode(C.Mode.MANUAL);
    
    M.Image = null;
}