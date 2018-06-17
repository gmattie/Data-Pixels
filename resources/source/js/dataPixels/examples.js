/**
 * @description The <strong>examples.js</strong> module contains a collection of code literals.
 * @module
 * 
 */
export {
    
    basic,
    hearts,
    marioBros
};

/**
 * @description DataPixels basic code example
 * @constant
 * 
 */
const basic = `import DataPixels from "./DataPixels.js";

const R = "255, 0, 0, 255";    //Red
const G = "0, 255, 0, 255";    //Green
const B = "0, 0, 255, 255";    //Blue
const _ = "0, 0, 0, 0";        //Transparent

const data = [[R, G],
              [B, _]];

const size = 100;

const image = new DataPixels(data, size).image;

document.body.appendChild(image);`;

/**
 * @description DataPixels example of multiple heart shaped instances of different hues and rotations
 * @constant
 * 
 */
const hearts = `import DataPixels from "./DataPixels.js";

/**
 * @description Properties of type <strong>{number}</strong> consist of:
 * <ul>
 *     <li> S </li>
 *     <li> M </li>
 *     <li> L </li>
 *     <li> XL </li>
 * </ul>
 * 
 * @constant
 * 
 */
const Size = {

    S: 10,
    M: 15,
    L: 20,
    XL: 25
};

/**
 * @description Creates a new heart shaped pixelData object of a specified hue
 * @param {number} red - The hue's red value 
 * @param {number} green - The hue's green value
 * @param {number} blue - The hue's blue value
 * @param {number} lightness - The hue's applied value for brightness and darkness
 * 
 */
function createPixelDataHeart(red, green, blue, lightness = 20) {

    const R = red;
    const G = green;
    const B = blue;

    const L1 = lightness;
    const L2 = L1 * 2;

    const H = \`\${R}, \${G}, \${B}\`;                  //Main Hue
    const A = \`\${R + L2}, \${G + L2}, \${B + L2}\`;   //Main Hue Light
    const Y = \`\${R - L1}, \${G - L1}, \${B - L1}\`;   //Main Hue Dark
    const Z = \`\${R - L2}, \${G - L2}, \${B - L2}\`;   //Main Hue Darker
    const $ = "0, 0, 0";                           //Stroke
    const _ = "0, 0, 0, 0";                        //Transparent

    return [[_, _, $, $, $, _, _, _, $, $, $, _, _],
            [_, $, H, H, H, $, _, $, Y, Y, Z, $, _],
            [$, H, H, A, H, H, $, H, H, Y, Y, Z, $],
            [$, H, A, H, H, H, H, H, H, H, Y, Z, $],
            [$, H, A, H, H, H, H, H, H, H, Y, Z, $],
            [$, H, H, H, H, H, H, H, H, H, Y, Z, $],
            [_, $, H, H, H, H, H, H, H, Y, Z, $, _],
            [_, _, $, H, H, H, H, H, H, Y, $, _, _],
            [_, _, _, $, H, H, H, H, Y, $, _, _, _],
            [_, _, _, _, $, H, H, Y, $, _, _, _, _],
            [_, _, _, _, _, $, Y, $, _, _, _, _, _],
            [_, _, _, _, _, _, $, _, _, _, _, _, _]];
}

/* 
 * Create multiple heart canvases of different colors and sizes
 *
 */ 
const redHeart = new DataPixels(createPixelDataHeart(200, 0, 50), Size.XL).canvas;
const blueHeart = new DataPixels(createPixelDataHeart(50, 30, 210), Size.L).canvas;
const purpleHeart = new DataPixels(createPixelDataHeart(125, 70, 180), Size.M).canvas;
const greenHeart = new DataPixels(createPixelDataHeart(25, 160, 50), Size.S).canvas;

/* 
 * Create a container for the heart canvases
 *
 */ 
const heartsContainer = document.createElement("div");
heartsContainer.style.filter = "drop-shadow(0 0 30px #FFFFFF)";

document.body.appendChild(heartsContainer);

/* 
 * Rotate and append each heart canvas to the container
 *
 */ 
const rotationDelta = 15;

[redHeart, blueHeart, purpleHeart, greenHeart].forEach((heart, index) => {

    heart.style.transform = \`rotate(\${rotationDelta * index}deg)\`;
    heartsContainer.appendChild(heart);
});`;

/**
 * @description DataPixels example of Nintendo's Mario Brothers
 * @constant
 * 
 */
const marioBros = `import DataPixels from "./DataPixels.js";

/**
 * @description Creates a Mario or Luigi pixelData object
 * @param {boolean} isMario - Defines the brother's hat and shirt color.  Mario is red and Luigi is green. 
 * 
 */
function createMarioBrother(isMario = true) {

    const mainColor = (isMario) ? "255, 0, 0" : "0, 180, 0";

    const C = mainColor;        //Hat & Shirt
    const B = "100, 50, 0";     //Brown Hair & Boots
    const S = "255, 200, 150";  //Skin Tone
    const O = "0, 0, 255";      //Blue Overalls
    const Y = "255, 255, 0";    //Yellow Buckles       
    const W = "255, 255, 255";  //White Gloves
    const _ = "0, 0, 0, 0";     //Transparent (RGBA Format)

    return [[_, _, _, C, C, C, C, C, _, _, _, _],
            [_, _, C, C, C, C, C, C, C, C, C, _],
            [_, _, B, B, B, S, S, B, S, _, _, _], 
            [_, B, S, B, S, S, S, B, S, S, S, _],
            [_, B, S, B, B, S, S, S, B, S, S, B],
            [_, B, B, S, S, S, S, B, B, B, B, _],
            [_, _, _, S, S, S, S, S, S, S, _, _],
            [_, _, C, C, O, C, C, C, C, _, _, _],
            [_, C, C, C, O, C, C, O, C, C, C, _],
            [C, C, C, C, O, O, O, O, C, C, C, C],
            [W, W, C, O, Y, O, O, Y, O, C, W, W],
            [W, W, W, O, O, O, O, O, O, W, W, W],
            [W, W, O, O, O, O, O, O, O, O, W, W],
            [_, _, O, O, O, _, _, O, O, O, _, _],
            [_, B, B, B, _, _, _, _, B, B, B, _],
            [B, B, B, B, _, _, _, _, B, B, B, B]];
}

/*
 * Create and append a Mario Brother canvas instance
 * 
 */
const pixelSize = 30;

const brother = new DataPixels(createMarioBrother(true), pixelSize).canvas;
brother.style.filter = "drop-shadow(0 10px 20px #000000)";

document.body.appendChild(brother);`;