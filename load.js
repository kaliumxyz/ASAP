"use strict"

function select(selector) {
	return document.querySelector(selector)
}

function selectAll(selector) {
	return document.querySelectorAll(selector)
}

function replaceChar(string, substring, index) {
	return string.substr(0, index - 1) + substring + string.substr(index)
}

function loadScript() {
	let script = document.createElement("script")
	script.setAttribute("src", "main.js")
	select("head").appendChild(script)
	select('h1').innerText = "A Simple Aesthetic Particle engine"
	select('.options').setAttribute('style', 'display:none;')
	select('.terminal-ghost').setAttribute('style', 'display:none;')
}

const canvas = select('canvas')

const config = {
	bounds: true,
	gravity: "wiggly",
	collisions: "care"
}


window.onresize = _ => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	const terminal = select('.terminal-main')
	const ghost = select('.terminal-ghost')
	const match = replaceChar(
		terminal.innerText,
		`<span class="cursor">${terminal.innerText[currentPosition]}</span>`,
		currentPosition
		)
	ghost.innerHTML = match
}

window.onload = window.onresize

let currentPosition = 2

// look I'll fix this later lol.
const term = {Cursor:{
	left: ev => {
		const terminal = select('.terminal-main')
		const ghost = select('.terminal-ghost')
		const match = replaceChar(
			terminal.innerText,
			`<span class="cursor">${terminal.innerText[currentPosition]}</span>`,
			currentPosition--
			)
		ghost.innerHTML = match
	},
	right: ev => {
		const terminal = select('.terminal-main')
		const ghost = select('.terminal-ghost')
		const match = replaceChar(
			terminal.innerText,
			`<span class="cursor">${terminal.innerText[currentPosition]}</span>`,
			currentPosition++
			)
		ghost.innerHTML = match
	},
	enter: ev => {
		if(10 < currentPosition && 14 > currentPosition) {
			config.bounds != config.bounds
		}
		if(23 < currentPosition && 32 > currentPosition) {
			config.gravity = "wiggly"
		}
		if(32 < currentPosition && 46 > currentPosition) {
			config.gravity = "wigglyInverse"
		}
		if(48 < currentPosition && 57 > currentPosition) {
			config.gravity = "regular"
		}
		if(70 < currentPosition && 79 > currentPosition) {
			config.collisions = "boring"
		}
		if(79 < currentPosition && 86 > currentPosition) {
			config.collisions = "care"
		}
	}
},
}

const keys = []
keys[32] = loadScript
keys[37] = term.Cursor.left
// keys[38] = moveCursor
keys[39] = term.Cursor.right
// keys[40] = moveCursor
keys[13] = term.Cursor.enter

// call the function corresponding to the key.
window.onkeydown = e => keys[e.keyCode]()
window.onclick = loadScript

//document.querySelectorAll('.option').forEach(el => el.onclick = ev => el.setAttribute('class','active'))