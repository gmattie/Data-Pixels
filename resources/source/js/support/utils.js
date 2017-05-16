/**
 * @description The <strong>utils.js</strong> module contains a collection of helper functions.
 * @module
 *  
 */
export {
    
    cleanFileName,
    setSelectElementIndexByValue
};

/**
 * @description Converts a file name into a code-friendly string that does not contain illegal characters and/or begin with a number
 * @param {string} fileName - The name of the file to be parsed
 * @param {string} defaultName - The name of the returned string or prefixed to the return string if the fileName contains only illegal characters and/or begins with a number
 * @returns {string} A code-friendly string that does not contain illegal characters and/or begin with a number
 * 
 */
function cleanFileName(fileName, defaultName) {

    fileName = fileName.split(".")[0];
    fileName = fileName.replace(/([^a-z0-9$_]+)/gi, "");

    if (!fileName.length) {

        fileName = defaultName;
    }
    else if (!Number.isNaN(parseInt(fileName.charAt(0)))) {

        fileName = `${defaultName}${fileName}`;
    }
    else {

        fileName = fileName.charAt(0).toLowerCase() + fileName.slice(1);
    }

    return fileName;
}

/**
 * @description Sets the index of an HTMLSelectElement by a value from its HTMLOptionsCollection.  If the value is not found the HTMLSelectElement remains unchanged.
 * @param {Object} target - The target HTMLSelectElement.
 * @param {string} value - The value of an HTMLOptionElement which, if found, will be set as the HTMLSelectElement's selectedIndex.
 * 
 */
function setSelectElementIndexByValue(target, value) {

    return [...target.options].some((option, index) => {
        
        if (option.value == value) {

            target.selectedIndex = index;
            
            return;
        }
    });
}