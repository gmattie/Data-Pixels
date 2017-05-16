# **Data Pixels**

## **Create Pixel Art Programmatically**
The **DataPixels.js** source code facilitates production of pixel art that is entirely generated programmatically at runtime.   Additionally, the accompanying desktop application, **Data Pixels Playground**, may be used to write and execute code for displaying both customized and automated pixel art.

## **DataPixels.js** 

The DataPixels.js source code features a modular, ES2015 Class design for accessible and effortless construction of new instances.  Each instance contains both **HTMLCanvasElement** and **HTMLImageElement** public accessors whose sources consist of the programmatically generated pixel art.

The DataPixels.js constructor requires 2 arguments:

1. **pixelData**:  An array containing one or more arrays of equal length, consisting of strings composed of 0-255 integer values per 24-bit RGB color channel (e.g., `“255, 255, 255”`) or 32-bit RGBA color channel (e.g., `“255, 255, 255, 255”`).  Additionally, the strings may optionally contain any kind of descriptive text (e.g., `“Red: 255, G - 128, 64 for Blue, Transparency = 32”`) as only the number values within the string will be parsed in RGB / RGBA order.  Strings that contain more than 4 numbers will throw an error.

2. **pixelSize**:  The size of each color data unit in pixels.  This value represents the size of each perceived pixel that forms the pixel art.

![Code Output](./resources/source/images/readme/CodeMario.png)

## **Data Pixels Playground**
Data Pixels Playground is a lightweight, cross-platform, desktop application for **Windows**, **Mac** and **Linux**, which may be used to write and execute DataPixels.js instances for previewing and testing purposes.

The application features **built-in example code** via the *Help* menu as well as the ability to **parse pixel data from image files** to produce automatically generated code through the *File > Open Image File…* menu item or through drag-and-drop gestures.

Note: pixel color values that are automatically interpreted from image files with an embedded color space may differ slightly from the image’s intended color values.

![Application Screenshot](./resources/source/images/readme/ApplicationScreenshot.png)

## **Desktop Application Release Builds**
Creating release builds for **Windows**, **Mac** and/or **Linux** is a 2-step process: code compilation, then application packaging, both of which are accomplished by running command-line NPM scripts that execute Gulp tasks.

#### **Compilation**

Production code compilation can be executed by entering the following CLI command at the project **root folder** [*~/DataPixels/* ]:

```
npm run prod
```

For more detailed information concerning code compilation please refer to [**Project Foundation**](https://github.com/gmattie/Project-Foundation).

#### **Packaging**

Application packaging can be executed for either all or individual deployment targets by entering one of the following CLI commands at the project **build folder** [*~/DataPixels/resources/build/* ]:

```
npm run package
```

```
npm run package-linux
```

```
npm run package-mac
```

```
npm run package-windows
```

Note: In order to avoid problems with code signing and other build issues it is highly recommended to execute packaging scripts for an individual platform from its own operating system.

For more detailed information concerning application packaging please refer to [**Electron Packager**](https://github.com/electron-userland/electron-packager).

## **License**

[**MIT License**](./resources/build/license)

Copyright © 2017 Geoffrey Mattie