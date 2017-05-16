//Imports
import * as C from "../support/constants.js";

/**
 * String.prototype.padEnd is scheduled for:
 * Chromium 57, March 14, 2017
 * 
 * Currently, Electron 1.6.5 builds against Chromium 56
 *  
 */
if (!String.prototype.padEnd) {

    String.prototype.padEnd = function(length) {
        
        return this + (" ").repeat(Math.max(0, length - this.length));
    };
}

/**
 * @description The <strong>DataPixelsCodeFactory</strong> class produces automatic and formated program code from an ImageData object to display in the Code Editor.
 * @requires constants
 * 
 */
class DataPixelsCodeFactory {

    /**
     * @param {string} variableName - The name given to the pixelData argument in the automatically generated program code.
     * @param {Object} imageData - An ImageData interface representing the underlying pixel data of an HTMLCanvasElement's CanvasRenderingContext2D.
     * 
     */
    constructor(variableName, imageData) {

        if (variableName && imageData) {

            const data = imageData.data;
            let columnLengths = [];
            let dataCount = 0;
            let code = `${C.Code.CONSTANT} ${variableName} = [\n`;

            for (let rows = 0; rows < imageData.height; rows++) {

                code += "[";

                for (let cols = 0; cols < imageData.width; cols++) {

                    let colorChannels = `"${data[dataCount++]},${data[dataCount++]},${data[dataCount++]},${data[dataCount++]}",`;
                    let colorChannelsLength = colorChannels.length;

                    if (columnLengths[cols] === undefined || columnLengths[cols] < colorChannelsLength) {

                        columnLengths[cols] = colorChannelsLength;
                    }

                    code += `${colorChannels}`;
                }

                code = code.slice(0, -1) + "],\n";
            }

            columnLengths[columnLengths.length - 1] = columnLengths.pop() - 1;
            code = code.slice(0, -2) + "\n];";

            this._variableName = variableName;
            this._imageDataWidth = imageData.width;
            this._imageDataHeight = imageData.height;
            this._columnLengths = columnLengths;
            this._code = code;
        }
    }

    /**
     * @description Formats the pixelData array of automatically generated program code.
     * @param {boolean} align - Visually aligns the pixelData array columns of automatically generated program code.
     * @param {boolean} describe - Prefixes R, G, B and A to the pixelData array values of automatically generated program code.
     * @public
     * @method 
     * 
     */
    formatCode(align, describe) {

        let code = this._code;

        if (describe) {
            
            code = code.replace(/(\d+),\s*(\d+),\s*(\d+),\s*(\d+)/g, `${C.Code.RED}$1,${C.Code.GREEN}$2,${C.Code.BLUE}$3,${C.Code.ALPHA}$4`);
        }
        else {

            code = code.replace(/.?\:/g, "");
        }

        if (align) {
                    
            code = code.replace(/\s*/g,"");

            let channelPattern = "";

            for (let i = 0; i < this._imageDataWidth - 1; i++) {

                channelPattern += "(\".*?\",\\s*)";
            }

            channelPattern += "(\".*?\"\\s*)";

            const regexInput = code;
            const describePadding = (describe) ? 8 : 0;
            const regex = new RegExp(channelPattern, "g");

            for (let i = 0; i < this._imageDataHeight; i++) {
                
                const match = regex.exec(regexInput);

                let matchReplacement = "";

                for (let j = 0; j < this._imageDataWidth; j++) {
                    
                    let columnSeparator = (j === this._imageDataWidth - 1) ? 0 : 1;

                    matchReplacement += `${match[j + 1].padEnd(this._columnLengths[j] + describePadding + columnSeparator)}`;
                }

                code = code.replace(match[0], matchReplacement);
            }
        }
        else {

            code = code.replace(/",\s*/g, "\", ");
            code = code.replace(/"\s*\]/g, "\"]");
        }

        code = code.replace(/\s*=\s*/, " = ");
        code = code.replace(/(\d+,)\s*/g, "$1 ");
        code = code.replace(/\n*..$/, "\n];");
        code = code.replace(/const\s*/, `${C.Code.CONSTANT}${C.Code.SINGLE_SPACE}`);

        this._code = code;
    }

    /**
     * @description Updates the indenting tab spaces of the pixelData array of automatically generated program code.
     * @param {string} indentation - A string representation of the number of spaces to indent.
     * @public
     * @method
     * 
     */
    updateIndentation(indentation) {

        const tabSpaces = (C.Code.SINGLE_SPACE).repeat(parseInt(indentation));
        this._code = this._code.replace(/[\n\s]*\["+/g, `\n${tabSpaces}["`);
    }

    /**
     * @description The automatically generated program code to display in the Code Editor.
     * @readonly
     * @type {string}
     * 
     */
    get output() {

        const frameView = C.HTMLElement.FRAME_VIEW;
        const frameViewSize = Math.round(Math.min(frameView.offsetWidth, frameView.offsetHeight) * C.Measurement.FRAME_VIEW_MARGIN);
        const imageSize = Math.max(this._imageDataWidth, this._imageDataHeight);
        const pixelSize = Math.max(1, Math.round(frameViewSize / imageSize));

        return  `import ${C.Code.CLASS_NAME} ${C.Code.IMPORT_FROM}` +
                "\n\n" + this._code +
                "\n\n" + `const ${C.Code.PIXEL_SIZE} = ${pixelSize};` +
                "\n\n" + `const dp = new ${C.Code.CLASS_NAME}(${this._variableName}, ${C.Code.PIXEL_SIZE});` +
                "\n\n" + `document.body.appendChild(dp.image);`;
    }

    /**
     * @description Recreates a DataPixelCodeFactor object from an instance that was converted to a JSON string.
     * @param {string} stringifiedObject - An instance of DataPixelsCodeFactory that has been converted to a JSON string.
     * @static
     * 
     */
    static fromJSON(stringifiedObject) {

        return (stringifiedObject) ? Object.assign(new DataPixelsCodeFactory(), JSON.parse(stringifiedObject)) : null;
    }
}

/**
 * @description DataPixelsCodeFactory class module
 * @module
 * 
 */
export default DataPixelsCodeFactory;