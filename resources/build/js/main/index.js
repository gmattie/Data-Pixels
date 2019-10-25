//Imports
import { app, BrowserWindow, globalShortcut, ipcMain, Menu, shell } from "electron";
import * as C from "../support/constants.js";
import electronWindowState from "electron-window-state";
import path from "path";

/**
 * @description The <strong>index.js</strong> module is the entry point for the application and contains Inter-Process Communication (IPC) logic for Electron.
 * @requires electron
 * @requires constants
 * @requires electronWindowState
 * @requires path
 * @module
 * 
 */
app.on(C.Event.APPLICATION_READY, init);

 /**
 * @description An object containing the following members with module scope:
 * <ul>
 *     <li> Menu </li>
 *     <li> Window </li>
 *     <li> MenuItem 
 *         <ul>
 *             <li> LayoutHorizontal </li>
 *             <li> LayoutVertical </li>
 *             <li> Maximize </li>
 *             <li> ReflectHorizontal </li>
 *             <li> ReflectVertical </li>
 *             <li> Reset </li>
 *             <li> Restore </li>
 *             <li> Run </li>
 *             <li> ScaleDown </li>
 *             <li> ScaleUp </li>
 *         </ul>
 *     </li>
 * </ul>
 * 
 * @private
 * @constant
 * 
 */
const M = {

    Menu: undefined,
    Window: undefined,

    MenuItem: {

        LayoutHorizontal: undefined,
        LayoutVertical: undefined,
        Maximize: undefined,
        ReflectHorizontal: undefined,
        ReflectVertical: undefined,
        Reset: undefined,
        Restore: undefined,
        Run: undefined,
        ScaleDown: undefined,
        ScaleUp: undefined
    }
};


/**
 * @description Initializes the application.
 * @private
 * @function
 * 
 */
function init() {

    createWindow();
    createMenu();

    registerGlobalShortcuts();
    registerWindowEvents();
    registerIPCEvents();
    registerApplicationQuitEvents();
}

/**
 * @description Creates the main window of the application and manages window persistance.
 * @private
 * @function
 * 
 */
function createWindow() {

    const windowState = electronWindowState({
    
        defaultWidth: 1000,
        defaultHeight: 600
    });
    
    M.Window = new BrowserWindow({
        
        width: windowState.width,
        minWidth: 800,
        height: windowState.height,
        minHeight: 600,
        x: windowState.x,
        y: windowState.y,
        title: C.Label.APPLICATION_TITLE,
        icon: path.join(__dirname, C.FileSource.ICON),
        show: false,
        backgroundColor: "#000"
    });
    
    M.Window.once(C.Event.WINDOW_READY_TO_SHOW, () => M.Window.show());
    M.Window.loadFile(path.join(__dirname, C.FileSource.HTML));
    
    windowState.manage(M.Window);
}

/**
 * @description Creates the application menu bar with click and keyboard event handling for each menu item.
 * @private
 * @function
 * 
 */
function createMenu() {

    const menuTemplate = [
        {
            label: C.Label.MENU_ITEM_FILE,
    
                submenu: [
    
                    { label: C.Label.MENU_ITEM_IMPORT, click: () => { M.Window.webContents.send(C.Event.MENU_IMPORT_IMAGE_FILE); }},
                    { label: C.Label.MENU_ITEM_EXPORT, click: () => { M.Window.webContents.send(C.Event.MENU_EXPORT_DATA_PIXELS_FILE); }},
                    { label: C.Label.MENU_ITEM_RUN, accelerator: C.Keys.RUN, click: () => { M.Window.webContents.send(C.Event.MENU_RUN); }}
                ]
        },
        {
            label: C.Label.MENU_ITEM_EDIT,
                
                submenu: [
    
                    { role: C.Role.UNDO },
                    { role: C.Role.REDO },
                    { type: C.Type.SEPARATOR },
                    { role: C.Role.CUT },
                    { role: C.Role.COPY },
                    { role: C.Role.PASTE },
                    { type: C.Type.SEPARATOR },
                    { role: C.Role.SELECT_ALL },
                    { type: C.Type.SEPARATOR },
                    { role: C.Role.DELETE }
                ]
        },
        {
            label: C.Label.MENU_ITEM_VIEW,
    
                submenu: [
    
                    { label: C.Label.MENU_ITEM_LAYOUT_HORIZONTAL, click: () => { M.Window.webContents.send(C.Event.MENU_LAYOUT_HORIZONTAL); }},
                    { label: C.Label.MENU_ITEM_LAYOUT_VERTICAL, click: () => { M.Window.webContents.send(C.Event.MENU_LAYOUT_VERTICAL); }},
                    { type: C.Type.SEPARATOR },
                    { label: C.Label.MENU_ITEM_RESET, accelerator: C.Keys.RESET, click: () => { M.Window.webContents.send(C.Event.MENU_RESET); }},
                    { label: C.Label.MENU_ITEM_SCALE_UP, accelerator: C.Keys.SCALE_UP, click: () => { M.Window.webContents.send(C.Event.MENU_SCALE_UP); }},
                    { label: C.Label.MENU_ITEM_SCALE_DOWN, accelerator: C.Keys.SCALE_DOWN, click: () => { M.Window.webContents.send(C.Event.MENU_SCALE_DOWN); }},
                    { label: C.Label.MENU_ITEM_REFLECT_HORIZONTALLY, accelerator: C.Keys.REFLECT_HORIZONTALLY, click: () => { M.Window.webContents.send(C.Event.MENU_REFLECT_HORIZONTAL); }},
                    { label: C.Label.MENU_ITEM_REFLECT_VERTICALLY, accelerator: C.Keys.REFLECT_VERTICALLY, click: () => { M.Window.webContents.send(C.Event.MENU_REFLECT_VERTICAL); }}
                ]
        },
        {
            label: C.Label.MENU_ITEM_WINDOW,
    
                submenu: [
    
                    { role: C.Role.MINIMIZE },
                    { type: C.Type.SEPARATOR },
                    { label: C.Label.MENU_ITEM_MAXIMIZE, click: () => { M.Window.maximize(); }},
                    { label: C.Label.MENU_ITEM_RESTORE, click: () => { M.Window.restore(); }},
                    { type: C.Type.SEPARATOR },
                    { role: C.Role.TOGGLE_FULL_SCREEN }
                ]
        },
        {   
            label: C.Label.MENU_ITEM_HELP,
    
                submenu: [
    
                    {
                        label: C.Label.MENU_ITEM_CODE_EXAMPLES,
                        id: C.Label.MENU_ITEM_CODE_EXAMPLES,
                    
                            submenu: [
    
                                { label: C.Label.MENU_ITEM_CODE_EXAMPLES_BASIC, click: () => { M.Window.webContents.send(C.Event.MENU_EXAMPLE_BASIC); }},
                                { label: C.Label.MENU_ITEM_CODE_EXAMPLES_HEARTS, click: () => { M.Window.webContents.send(C.Event.MENU_EXAMPLE_HEARTS); }},
                                { label: C.Label.MENU_ITEM_CODE_EXAMPLES_MARIO_BROS, click: () => { M.Window.webContents.send(C.Event.MENU_EXAMPLE_MARIO_BROS); }}
                            ]
                    },
                    {
                        role: C.Role.TOGGLE_DEV_TOOLS, accelerator: C.Keys.TOGGLE_DEV_TOOLS
                    }
                ]
        }
    ];
    
    let menuOffset = 0;

    if (process.platform === C.Type.MAC_OS) {
    
        menuOffset = 1;
        
        menuTemplate.unshift({

            label: app.getName(),

            submenu: [

                { label: C.Label.MENU_ITEM_ABOUT, click: () => { M.Window.webContents.send(C.Event.MENU_ABOUT); }},
                { type: C.Type.SEPARATOR },
                { role: C.Role.SERVICES, submenu: [] },
                { type: C.Type.SEPARATOR },
                { role: C.Role.HIDE },
                { role: C.Role.HIDE_OTHERS },
                { role: C.Role.UNHIDE },
                { type: C.Type.SEPARATOR },
                { role: C.Role.QUIT }
            ]
        });
    
        menuTemplate[3].submenu.push(
    
            {type: C.Type.SEPARATOR },
            {role: C.Role.FRONT }
        );
    }
    else {
    
        menuTemplate[0].submenu.push(
    
            { type: C.Type.SEPARATOR },
            { label: C.Label.MENU_ITEM_SETTINGS, click: () => { M.Window.webContents.send(C.Event.MENU_SETTINGS); }},
            { type: C.Type.SEPARATOR },
            { role: C.Role.QUIT, accelerator: C.Keys.QUIT }
        );
    
        menuTemplate[4].submenu.unshift(
    
            { label: C.Label.MENU_ITEM_ABOUT, click: () => { M.Window.webContents.send(C.Event.MENU_ABOUT); }},
            { type: C.Type.SEPARATOR }
        );          
    }
    
    M.Menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(M.Menu);

    M.MenuItem.Run = M.Menu.items[0 + menuOffset].submenu.items[2];

    M.MenuItem.LayoutHorizontal = M.Menu.items[2 + menuOffset].submenu.items[0];
    M.MenuItem.LayoutVertical = M.Menu.items[2 + menuOffset].submenu.items[1];

    M.MenuItem.Reset = M.Menu.items[2 + menuOffset].submenu.items[3];
    M.MenuItem.ScaleUp = M.Menu.items[2 + menuOffset].submenu.items[4];
    M.MenuItem.ScaleDown = M.Menu.items[2 + menuOffset].submenu.items[5];
    M.MenuItem.ReflectHorizontal = M.Menu.items[2 + menuOffset].submenu.items[6];
    M.MenuItem.ReflectVertical = M.Menu.items[2 + menuOffset].submenu.items[7];

    M.MenuItem.Maximize = M.Menu.items[3 + menuOffset].submenu.items[2];
    M.MenuItem.Restore = M.Menu.items[3 + menuOffset].submenu.items[3];
    M.MenuItem.Restore.enabled = false;
}

/**
 * @description Registers the application's keyboard shortcuts with event handling.
 * @private
 * @function
 * 
 */
function registerGlobalShortcuts() {

    globalShortcut.register(C.Keys.ESCAPE, () => {

        if (M.Window.isFullScreen()) {

            M.Window.setFullScreen(false);
        }
    });
}

/**
 * @description Registers event listening and handling of the application window.
 * @private
 * @function
 * 
 */
function registerWindowEvents() {

    M.Window.on(C.Event.WINDOW_MAXIMIZE, () => {

        M.MenuItem.Maximize.enabled = false;
        M.MenuItem.Restore.enabled = true;
    });

    M.Window.on(C.Event.WINDOW_UNMAXIMIZE, () => {

        M.MenuItem.Maximize.enabled = true;
        M.MenuItem.Restore.enabled = false;
    });

    M.Window.on(C.Event.WINDOW_ENTER_FULL_SCREEN, () => {

        M.Window.setMenuBarVisibility(false);
        M.Window.setAutoHideMenuBar(true);
    });

    M.Window.on(C.Event.WINDOW_LEAVE_FULL_SCREEN, () => {

        M.Window.setMenuBarVisibility(true);
        M.Window.setAutoHideMenuBar(false);
    });
}

/**
 * @description Registers event listening and handling of the application's Inter-Process Communication (IPC).
 * @private
 * @function
 * 
 */
function registerIPCEvents() {

    M.Window.webContents.on(C.Event.WINDOW_DID_FINISH_LOAD, () => {

        ipcMain.on(C.Event.UPDATE_EXECUTE_BUTTON, (event, disabled) => M.MenuItem.Run.enabled = !disabled);       
        ipcMain.on(C.Event.UPDATE_ORIENTATION, (event, orientation) => {
            
            if (orientation === C.Orientation.VERTICAL || orientation === C.Orientation.HORIZONTAL) {
                
                M.MenuItem.LayoutHorizontal.enabled = (orientation === C.Orientation.VERTICAL) ? true : false;
                M.MenuItem.LayoutVertical.enabled = (orientation === C.Orientation.HORIZONTAL) ? true : false;
            }
        });

        ipcMain.on(C.Event.UPDATE_FRAME_VIEW_HAS_IMAGE, (event, image) => {

            M.MenuItem.Reset.enabled = image;
            M.MenuItem.ScaleUp.enabled = image;
            M.MenuItem.ScaleDown.enabled = image;
            M.MenuItem.ReflectHorizontal.enabled = image;
            M.MenuItem.ReflectVertical.enabled = image;
        });
        
        M.Window.webContents.send(C.Event.REQUEST_EXECUTE_BUTTON);
        M.Window.webContents.send(C.Event.REQUEST_FRAME_VIEW_HAS_IMAGE);
        M.Window.webContents.send(C.Event.REQUEST_ORIENTATION);
    });

    M.Window.webContents.on(C.Event.WINDOW_NEW, (event, url) => {

        event.preventDefault();
        shell.openExternal(url);
    });
}

/**
 * @description Registers event listening and handling for exiting the application.
 * @private
 * @function
 * 
 */
function registerApplicationQuitEvents() {

    app.on(C.Event.APPLICATION_WINDOW_ALL_CLOSED, () => app.quit());
    app.on(C.Event.APPLICATION_WILL_QUIT, () => globalShortcut.unregisterAll());
    app.on(C.Event.APPLICATION_BEFORE_QUIT, () => {

        if (M.Window.isFullScreen()) {

            M.Window.setFullScreen(false);
        }
    });
}