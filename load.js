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
	collisions: "care",
	type: "square",
	G: 0.01
}



// terminal object
const term = {
	terminal: select('.terminal-main'),
	ghost: select('.terminal-ghost'),
	cursor: {
		left: ev => {
			if(term.cursor.position < 2)
			return
			term.cursor.location(--term.cursor.position)
		},
		right: ev => {
			if(term.cursor.position > term.terminal.innerText.length - 4)
			return
			term.cursor.location(++term.cursor.position)
		},
		up: ev => {

		},
		down: ev => {

		},
		enter: ev => {
			if(9 < term.cursor.position && 14 > term.cursor.position) {
				if(config.bounds)
				selectAll(".option-bounds").forEach(el => el.classList.toggle('active'))
				config.bounds != config.bounds
			}
			if(23 < term.cursor.position && 32 > term.cursor.position) {
				config.gravity = "wiggly"
			}
			if(32 < term.cursor.position && 46 > term.cursor.position) {
				config.gravity = "wigglyInverse"
			}
			if(48 < term.cursor.position && 57 > term.cursor.position) {
				config.gravity = "boring"
			}
			if(70 < term.cursor.position && 79 > term.cursor.position) {
				if(config.collisions !== "boring")
				selectAll(".option-collisions").forEach(el => el.classList.toggle('active'))
				config.collisions = "boring"
			}
			if(79 < term.cursor.position && 89 > term.cursor.position) {
				if(config.collisions !== "care")
				selectAll(".option-collisions").forEach(el => el.classList.toggle('active'))
				config.collisions = "care"
			}
			if(90 < term.cursor.position && 100 > term.cursor.position) {
				if(config.type !== "particle")
				selectAll(".option-type").forEach(el => el.classList.toggle('active'))
				config.type = "particle"
			}
			if(100 < term.cursor.position && 109 > term.cursor.position) {
				if(config.type !== "square")
				selectAll(".option-type").forEach(el => el.classList.toggle('active'))
				config.type = "square"
			}
		},
		location: l => {
			l = l || term.cursor.position
			const match = replaceChar(
				term.terminal.innerText,
				`<span class="cursor">${term.terminal.innerText[l++]}</span>`,
				l
				)
			term.ghost.innerHTML = match
		},
		position: 1
	},
	types: {
		bool: function (classname, value, item) {
			if(item !== value)
			selectAll(classname).forEach(el => el.classList.toggle('active'))
			item = value
		}
	}
}

window.onresize = _ => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	term.cursor.location()
}

window.onload = window.onresize

// the highest key number is 222, we need that many functions for our handler
const keys = new Array(222)
keys.fill(console.log)

// on space start
keys[32] = loadScript
// 37 = left, 72 = h
keys[37] = term.cursor.left
keys[72] = term.cursor.left
// 38 = up
// keys[38] = term.Cursor.up
// 39 = right arrow, 76 = l
keys[39] = term.cursor.right
keys[76] = term.cursor.right
// keys[40] = term.Cursor.down
keys[13] = term.cursor.enter

// call the function corresponding to the key
window.onkeydown = e => keys[e.keyCode](e)
window.onclick = loadScript

//document.querySelectorAll('.option').forEach(el => el.onclick = ev => el.setAttribute('class','active'))