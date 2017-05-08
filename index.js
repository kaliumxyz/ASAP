const { app, BrowserWindow } = require('electron')

let win

function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
		frame: false,
		transparent: true,
		fullscreen: true,
		thickFrame: false,
		fullscreenable: true,
		})

	//win.setIgnoreMouseEvents(true)

	win.loadURL(`file://${__dirname}/app/index.html`)

	// Opens the DevTools.
	// win.webContents.openDevTools()

	win.on('closed', _ => {
		win = null
	})
	win.on('resize', _ => {
		win.setFullScreen(true)
	})
}

	// This method will be called when Electron has finished
	// initialization and is ready to create browser windows.
	// Some APIs can only be used after this event occurs.
	app.on('ready', createWindow)

	// Quit when all windows are closed.
	app.on('window-all-closed', _ => {
		app.quit()
	})