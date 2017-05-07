"use strict"

const select = selector => document.querySelector(selector)

const selectAll = selector => document.querySelectorAll(selector)

const replaceChar = (string, substring, index) => string.substr(0, index - 1) + substring + string.substr(index)

const loadScript = _ => {
	let script = document.createElement("script")
	script.setAttribute("src", "main.js")
	select("head").appendChild(script)
	select('h1').innerText = "A Simple Aesthetic Particle engine"
	select('.options').setAttribute('style', 'display:none;')
	select('.terminal-ghost').remove()
}

const canvas = select('canvas')


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
const moveCursor = {
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
}


const keys = []
keys[32] = loadScript
keys[37] = moveCursor.left
// keys[38] = moveCursor
keys[39] = moveCursor.right
// keys[40] = moveCursor

// call the function corresponding to the key.
window.onkeydown = e => keys[e.keyCode]()
window.onclick = loadScript

//document.querySelectorAll('.option').forEach(el => el.onclick = ev => el.setAttribute('class','active'))