//Imports
const electron = require('electron')
const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;

//Init variables
let win;
let currentsite;



function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        // Set parameters
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        icon: __dirname + "build/icon.ico"
    })
    // and load the index.html of the app.
    win.loadURL('https://notify.moe/');
    currentsite = "notify";

    // Open the DevTools.
    // win.webContents.openDevTools()
}

function togglesites() {
    if (currentsite == "notify") {
        currentsite = "twist";
        return "https://twist.moe/"
    } else {
        currentsite = "notify"
        return "https://notify.moe/"
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {



    //Show Window
    createWindow();
    //Define Menus
    const template = [{
        label: 'Anime Notifier',
        submenu: [{
            label: 'Exit',
            click: function() {
                app.quit();
            }
        }]
    }, {
        label: 'Toggle Sites',
        submenu: [{
            label: 'Load Anime Twist',
            click: function() {
                win.loadURL('https://twist.moe/');
                currentsite = "twist";
            }
        }, {
            label: 'Load Anime Notifier',
            click: function() {
                win.loadURL('https://notify.moe/');
                currentsite = "notify";
            }
        }]
    }, {
        label: "Navigation",
        submenu: [{
            label: "Go Back",
            click: function() {
                win.webContents.goBack()
            }
        }]
    }, {
        label: "About",
        submenu: [{
            label: 'Platform: ' + process.platform
        }, {
            label: "Architecture: " + process.arch
        }, {
            label: "Electron v" + process.versions.electron
        }, {
            label: "Chrome v" + process.versions.chrome
        }, {
            label: "Node.js v" + process.versions.node
        }]
    }]
    //Apply menu
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    globalShortcut.register('CommandOrControl+Shift+I', () => {
        win.webContents.openDevTools();
    })
    globalShortcut.register('CommandOrControl+X', () => {
        win.loadURL(togglesites());
    })
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.