//Dependencies
const electron = require("electron");
const electronWindowState = require("electron-window-state");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;
const ipcMain = electron.ipcMain;
const Menu = electron.Menu;
const shell = electron.shell;

//Debugging Options
const clearStorageData = false;
const openDevTools = false;

//Electron Application Setup
app.on("ready", () => {

    //Window
    const windowState = electronWindowState({

        defaultWidth: 1000,
        defaultHeight: 600
    });
    
    const window = new BrowserWindow({
        
        width: windowState.width,
        minWidth: 700,
        height: windowState.height,
        minHeight: 500,
        x: windowState.x,
        y: windowState.y,
        title: "Data Pixels Playground",
        icon: `${__dirname}/images/Application256.png`,
        backgroundColor: "#000000",
        show: false
    });

    window.once("ready-to-show", () => {

        window.show();
    });

    windowState.manage(window);

    window.loadURL(`${__dirname}/index.html`);

    //Menu
    const menuTemplate = [
        {
            label: "File",

                submenu: [

                    {label: "Import Image File...", click: () => { window.webContents.send("menuImportImageFile"); }},
                    {label: "Export DataPixels.js File", click: () => { window.webContents.send("menuExportDataPixelsFile"); }},
                    {label: "Run", click: () => { window.webContents.send("menuExecute"); }}
                ]
        },
        {
            label: "Edit",
                
                submenu: [

                    {role: "undo"},
                    {role: "redo"},
                    {type: "separator"},
                    {role: "cut"},
                    {role: "copy"},
                    {role: "paste"},
                    {type: "separator"},
                    {role: "selectall"},
                    {type: "separator"},
                    {role: "delete"}
                ]
        },
        {
            label: "View",

                submenu: [

                    {label: "Layout Horizontal", click: () => { window.webContents.send("menuLayoutHorizontal"); }},
                    {label: "Layout Vertical",   click: () => { window.webContents.send("menuLayoutVertical"); }}
                ]
        },
        {
            label: "Window",

                submenu: [

                    {role: "minimize"},
                    {type: "separator"},
                    {label: "Maximize", click: () => { window.maximize(); }},
                    {label: "Restore",  click: () => { window.restore(); }},
                    {type: "separator"},
                    {role: "togglefullscreen"}
                ]
        },
        {   
            label: "Help",

                submenu: [

                    {
                        label: "Code Examples",
                        id: "Code Examples",
                    
                            submenu: [

                                {label: "Basic", click: () => { window.webContents.send("menuExampleBasic"); }},
                                {label: "Hearts", click: () => { window.webContents.send("menuExampleHearts"); }},
                                {label: "Mario Bros", click: () => { window.webContents.send("menuExampleMarioBros"); }}
                            ]
                    },
                    {role: "toggledevtools"}
                ]
        }
    ];

    let macMenuIndex = 0;

    if (process.platform === "darwin") {

        macMenuIndex = 1;
        
        menuTemplate.unshift(

            {
                label: app.getName(),

                submenu: [

                    {label: "About", click: () => { window.webContents.send("menuAbout"); }},
                    {type: "separator"},
                    {role: "services", submenu: []},
                    {type: "separator"},
                    {role: "hide"},
                    {role: "hideothers"},
                    {role: "unhide"},
                    {type: "separator"},
                    {role: "quit"}
                ]
            }
        );
    }
    else {

        menuTemplate[0].submenu.push(

            {type: "separator"},
            {label: "Settings", click: () => { window.webContents.send("menuSettings"); }},
            {type: "separator"},
            {role: "quit"}
        );

        menuTemplate[4].submenu.unshift(

            {label: "About", click: () => { window.webContents.send("menuAbout"); }},
            {type: "separator"}
        );          
    }

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    //Menu Items Enabled State
    const runMenuItem = menu.items[0 + macMenuIndex].submenu.items[1];
    const layoutHorizontalMenuItem = menu.items[2 + macMenuIndex].submenu.items[0];
    const layoutVerticalMenuItem = menu.items[2 + macMenuIndex].submenu.items[1];
    const maximizeMenuItem = menu.items[3 + macMenuIndex].submenu.items[2];
    const restoreMenuItem = menu.items[3 + macMenuIndex].submenu.items[3];

    restoreMenuItem.enabled = false;

    window.on("maximize", () => {

        maximizeMenuItem.enabled = false;
        restoreMenuItem.enabled = true;
    });

    window.on("unmaximize", () => {

        maximizeMenuItem.enabled = true;
        restoreMenuItem.enabled = false;
    });

    window.on("enter-full-screen", () => {

        window.setMenuBarVisibility(false);
        window.setAutoHideMenuBar(true);
    });

    window.on("leave-full-screen", () => {

        window.setMenuBarVisibility(true);
        window.setAutoHideMenuBar(false);
    });

    //Register Escape Key To Exit Full Screen Mode
    globalShortcut.register("Escape", () => {

        if (window.isFullScreen()) {

            window.setFullScreen(false);
        }
    });

    //Synchronize Controls Between the Main Process and the Renderer Process
    window.webContents.on("did-finish-load", () => {

        ipcMain.on("updateExecuteButton", (event, disabled) => {

            runMenuItem.enabled = !disabled;
        });

        ipcMain.on("updateOrientation", (event, orientation) => {

            if (orientation === "vertical" || orientation === "horizontal") {

                layoutHorizontalMenuItem.enabled = (orientation === "vertical") ? true : false;
                layoutVerticalMenuItem.enabled = (orientation === "horizontal") ? true : false;
            }
        });
        
        window.webContents.send("executeButtonRequest");
        window.webContents.send("orientationRequest");
    });

    //Open Renderer Process HTML Links in Default Browser
    window.webContents.on("new-window", (event, url) => {

        event.preventDefault();
        shell.openExternal(url);
    });

    //Clear Storage Data
    if (clearStorageData) {

        window.webContents.session.clearStorageData();
    }

    //Open Developer Tools
    if (openDevTools) {

        window.webContents.openDevTools();
    }

    //Quit Application
    app.on("window-all-closed", () => {

        app.quit();
    });

    app.on("before-quit", () => {

        if (window.isFullScreen()) {

            window.setFullScreen(false);
        }
    });

    app.on("will-quit", () => {
        
        globalShortcut.unregisterAll();
    });
});