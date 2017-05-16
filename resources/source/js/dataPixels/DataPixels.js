/**
 * @description <strong>DataPixels</strong> facilitates programmatically created instances of pixel art within an HTMLImageElement and/or HTMLCanvasElement.
 * 
 * @example
 * import DataPixels from "./DataPixels.js";
 * 
 * const R = "255, 0, 0";      //Red Hat & Shirt
 * const B = "100, 50, 0";     //Brown Hair & Boots
 * const S = "255, 200, 150";  //Skin Tone
 * const O = "0, 0, 255";      //Blue Overalls
 * const Y = "255, 255, 0";    //Yellow Buckles       
 * const W = "255, 255, 255";  //White Gloves
 * const _ = "0, 0, 0, 0";     //Transparent (RGBA Format)
 * 
 * const marioPixelData = [
 *     [_, _, _, R, R, R, R, R, _, _, _, _],
 *     [_, _, R, R, R, R, R, R, R, R, R, _],
 *     [_, _, B, B, B, S, S, B, S, _, _, _], 
 *     [_, B, S, B, S, S, S, B, S, S, S, _],
 *     [_, B, S, B, B, S, S, S, B, S, S, B],
 *     [_, B, B, S, S, S, S, B, B, B, B, _],
 *     [_, _, _, S, S, S, S, S, S, S, _, _],
 *     [_, _, R, R, O, R, R, R, R, _, _, _],
 *     [_, R, R, R, O, R, R, O, R, R, R, _],
 *     [R, R, R, R, O, O, O, O, R, R, R, R],
 *     [W, W, R, O, Y, O, O, Y, O, R, W, W],
 *     [W, W, W, O, O, O, O, O, O, W, W, W],
 *     [W, W, O, O, O, O, O, O, O, O, W, W],
 *     [_, _, O, O, O, _, _, O, O, O, _, _],
 *     [_, B, B, B, _, _, _, _, B, B, B, _],
 *     [B, B, B, B, _, _, _, _, B, B, B, B]
 * ];
 * 
 * const pixelSize = 50;
 * 
 * const dp = new DataPixels(marioPixelData, pixelSize);
 * 
 * const image = dp.image; //or dp.canvas
 * image.style.filter = "drop-shadow(-10px 10px 20px #000000)";
 * 
 * document.body.appendChild(image);
 * 
 */
class DataPixels {

    /**
     * @param {string[][]} pixelData - An array containing one or more arrays of equal length (image height) consisting of strings composed of 0-255 integer values per "RGB" or "RGBA" color channels (image width).
     * @param {number} pixelSize - The size of each color data unit in pixels.
     * 
     */
    constructor(pixelData, pixelSize) {

        this.pixelData = pixelData;
        this.pixelSize = pixelSize;
    }

    /**
     * @description An array containing one or more arrays of equal length (image height) consisting of strings composed of 0-255 integer values per "RGB" or "RGBA" color channels (image width).
     * @type {string[][]}
     * 
     */
    set pixelData(value) {

        if (this._pixelData) {

            this.dispose();
        }

        this._pixelData = value;
        this.imageData = value;
    }

    get pixelData() {

        return this._pixelData;
    }

    /**
     * @description The size of each color data unit in pixels.
     * @type {number}
     * 
     */
    set pixelSize(value) {

        this._pixelSize = Math.max(1, Math.round(value));

        this._canvas = null;
        this._image = null;
    }

    get pixelSize() {
        
        return this._pixelSize;
    }

    /**
     * @description An ImageData interface representing the underlying pixelData class member used to produce HTMLCanvasElement and HTMLImageElement class members.
     * @readonly
     * @type {Object}
     * 
     */
    set imageData(value) {

        if (this._imageData) {

            this.dispose();
        }

        try {

            if (!Array.isArray(value) || !value.length || !value[0].length) {

                throw new Error(`type: {${typeof value}}`);
            } 
            else {

                const regexIntFloat = /(?:\d*\.)?\d+/g;
                const regexInt = /^\d+$/;
                const colorData = [];

                value.forEach((element) => {

                    if (!Array.isArray(element)) {

                        throw new Error(`element type: {${typeof element}}`);
                    } 
                    else {

                        element.forEach((color) => {

                            if ((typeof color) !== "string") {

                                throw new Error(`color type: {${typeof color}}`);
                            }
                            else {

                                let colorChannels = color.match(regexIntFloat);
                                const colorChannelsLength = colorChannels.length;
                                colorChannels = colorChannels.filter(x => regexInt.test(x));
                                const colorChannelsFilteredLength = colorChannels.length;

                                if (colorChannels == null || (colorChannelsLength !== colorChannelsFilteredLength)) {

                                    throw new Error(`color format: "${color}"`);
                                }
                                else {

                                    if ((colorChannelsLength < 3) || (colorChannelsLength > 4)) {

                                        throw new Error(`color format: "${color}"`);
                                    }
                                    else {

                                        let alpha = colorChannels[3];

                                        if (!alpha) {

                                            colorChannels[3] = 255;
                                        }
                                        
                                        for (const channel of colorChannels) {

                                            colorData.push(channel);
                                        }
                                    }
                                }
                            }
                        });
                    }
                });

                let data = Uint8ClampedArray.from(colorData);
                const width = value[0].length;
                const height = value.length;
                const dataLength = data.length;

                if ((4 * width * height) !== dataLength) {

                    throw new Error(`length: [${dataLength}]`);
                }
                else {

                    this._imageData = new ImageData(data, width, height);
                }

                data = null;
            }
        } 
        catch (error) {

            throw new Error(`Invalid pixelData ${error}.  pixelData must be an array containing one or more arrays of equal length (image height) consisting of strings composed of 0-255 integer values per "RGB" or "RGBA" color channels (image width).`);
        }
    }

    get imageData() {
        
        return this._imageData;
    }

    /**
     * @description An HTMLCanvasElement representing both pixelData and pixelSize class members.
     * @readonly
     * @type {Object}
     * 
     */
    get canvas() {
      
        if (!this._canvas) {

            const imageDataWidth = this.imageData.width;
            const imageDataHeight = this.imageData.height;
            const pixelSize = this.pixelSize;

            let tempCanvas = document.createElement("canvas");
            tempCanvas.width = imageDataWidth;
            tempCanvas.height = imageDataHeight;

            const tempContext = tempCanvas.getContext("2d");
            tempContext.putImageData(this.imageData, 0, 0);

            this._canvas = document.createElement("canvas");
            this._canvas.width = imageDataWidth * pixelSize;
            this._canvas.height = imageDataHeight * pixelSize;

            const context = this._canvas.getContext("2d");
            context.imageSmoothingEnabled = false;
            context.scale(pixelSize, pixelSize);
            context.drawImage(tempCanvas, 0, 0);

            tempCanvas = null;
        }

        return this._canvas;
    }

    /**
     * @description An HTMLImageElement representing both pixelData and pixelSize class members.
     * @readonly
     * @type {Object}
     * 
     */
    get image() {
        
        if (!this._image) {

            this._image = new Image();
            this._image.src = this.canvas.toDataURL();
        }

        return this._image;
    }

    /**
     * @description Nullifies pixelData, imageData, canvas and image class members.
     * @public
     * @method
     * 
     */
    dispose() {

        this._pixelData = null;
        this._imageData = null;
        this._canvas = null;
        this._image = null;
    }
}

/**
 * @description DataPixels class module
 * @module
 * 
 */
export default DataPixels;