//Imports
const electron = require('electron')
const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;

//Init variables
let win;
let currentsite;
let darkmodestate;

const windowsintrourl = 'https://raw.githack.com/TechAdvancedCyborg/ElectronAnimeNotifier/master/build/windows.html'
const linuxintrourl = 'https://raw.githack.com/TechAdvancedCyborg/ElectronAnimeNotifier/master/build/linux.html'
const darwinintrourl = 'https://raw.githack.com/TechAdvancedCyborg/ElectronAnimeNotifier/master/build/apple.html'



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

    if (process.platform == 'linux') {
        win.loadURL(linuxintrourl);
    } else if (process.platform == 'darwin') {
        win.loadURL(darwinintrourl);
    } else {
        win.loadURL(windowsintrourl);
    }
    setTimeout(function() {
        win.loadURL('https://notify.moe/');
        currentsite = "notify";
        darkmodeenable();
    }, 4000);
    // Open the DevTools.
    // win.webContents.openDevTools()
}

function darkmodeenable() {
    if (darkmodestate) {
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--bg-color\",\"hsl(0%,0%,96%)\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--text-color\",\"hsl(0%,0%,24%)\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--anime-list-item-name-color\",\"rgb(215, 38, 15)\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--text-color-l\",\"23.5%\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--tip-bg-color\",\"#ffffff\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--ui-background\",\"hsl(0,0%,100%)\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--link-color\",\"rgb(240, 73, 50)\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--link-hover-color\",\"rgb(240,73,50)\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--button-color\",\"rgb(240,73,50)\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--sidebar-background\",\"rgba(0,0,0,0)\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--tab-active-background\",\"rgba(100,100,100,1)\")");
        darkmodestate = false;
    } else {
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--bg-color\",\"rgb(46, 46, 46)\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--text-color\",\"rgb(230, 230, 230)\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--anime-list-item-name-color\",\"rgb(230, 230, 230)\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--text-color-l\",\"90%\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--tip-bg-color\",\"#111111\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--ui-background\",\"hsl(0,0%,25%)\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--link-color\",\"hsl(45,100%,66%)\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--link-hover-color\",\"hsl(45,100%,66%)\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--button-color\",\"hsl(45,100%,66%)\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--sidebar-background\",\"rgba(0,0,0,0.45)\")");
        win.webContents.executeJavaScript("document.getElementsByTagName(\"body\")[0].style.setProperty(\"--tab-active-background\",\"rgba(0,0,0,0.45)\")");
        darkmodestate = true;
    }
}

function togglesites() {
    if (currentsite == "notify") {
        currentsite = "twist";
        return "https://twist.moe/"
    } else {
        currentsite = "notify";
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
            accelerator: 'CommandOrControl+Q',
            click: function() {
                app.quit();
            }
        },{ type: "separator" }, {
            label: "Toggle Dark Mode",
            accelerator : 'CommandOrControl+D',
            click: function() {
                darkmodeenable();
            }
        }]
    },{
      label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]
    }, {
        label: 'Toggle Sites',
        submenu: [{
            label: 'Load Anime Twist',
            click: function() {
                darkmodestate = false;
                win.loadURL('https://twist.moe/');
                currentsite = "twist";
            }
        }, {
            label: 'Load Anime Notifier',
            click: function() {
                darkmodestate = false;
                win.loadURL('https://notify.moe/');
                currentsite = "notify";
                setTimeout(function() {
                    darkmodeenable();
                }, 1000);
            }
        }]
    }, {
        label: "Navigation",
        submenu: [{
            label: "Go Back",
            click: function() {
                win.webContents.goBack()
            }
        }, { type: "separator" },{
            label: "Reload",
            accelerator : 'CommandOrControl+R',
            click: function() {
                win.reload();
                darkmodestate = false;
                setTimeout(function() {
                    darkmodeenable();
                }, 1000);
            }
        }]
    }, {
        label: "About",
        submenu: [{
            label: 'Platform: ' + process.platform
        }, {
            label: "Architecture: " + process.arch
        }, { type: "separator" },{
            label: "App v" + app.getVersion()
        }, { type: "separator" },{
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
        darkmodestate = false;
        win.loadURL(togglesites());
        setTimeout(function() {
            darkmodeenable();
        }, 1000);
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
