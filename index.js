const { app, BrowserWindow } = require('electron')

let win

function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({ width: 800, height: 600, frame: false, transparent: true, fullscreen: true, minimizable: false})

	//win.setIgnoreMouseEvents(true)

	win.loadURL(`file://${__dirname}/asap/index.html`)

	// Opens the DevTools.
	// win.webContents.openDevTools()

	win.on('closed', () => {
		win = null
	})}

	// This method will be called when Electron has finished
	// initialization and is ready to create browser windows.
	// Some APIs can only be used after this event occurs.
	app.on('ready', createWindow)

	// Quit when all windows are closed.
	app.on('window-all-closed', () => {
		app.quit()
	})