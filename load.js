"use strict"

/**
 * dotless querySelect method (context aware)
 * @param {String} selector 
 * @param {Node} parent 
 */
function select(selector, parent) {
	return parent ?	parent.querySelector(selector) :
			document.querySelector(selector)
}

/**
 * dotless querySelectAll method (context aware)
 * @param {String} selector 
 * @param {Node} parent 
 */
function selectAll(selector, parent) {
	return parent ?	parent.querySelectorAll(selector) :
			document.querySelectorAll(selector)
}

function replaceChar(string, substring, index) {
	return string.substr(0, index - 1) + substring + string.substr(index)
}

function loadScript() {
	let script = document.createElement("script")
	script.setAttribute("src", "main.js")
	select("head").appendChild(script)
	select('h1').innerText = "A Simple Aesthetic Particle engine"
	select('.terminal').setAttribute('style', 'display:none;')
}

const canvas = select('canvas')

const config = {
	bounds: false,
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
			if(term.cursor.position < 1)
			return
			term.cursor.location(--term.cursor.position)
		},
		right: ev => {
			if(term.cursor.position > term.terminal.innerText.length - 3)
			return
			term.cursor.location(++term.cursor.position)
		},
		up: ev => {

		},
		down: ev => {

		},
		enter: ev => {
			if(8 < term.cursor.position && 14 > term.cursor.position) {
				selectAll(".option-bounds").forEach(el => el.classList.toggle('active'))
				config.bounds =! config.bounds
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
			hyperHTML.hyper(term.ghost)`${
				match.split('\n').map(
					x => `<p class='line'>${x}</p>`
				)
			}`
			// hyperHTML.hyper(term.ghost)`${
			// 	term.lines.bool('a','b','c')
			// }`
		},
		loc: {x: 0, y: 0},
		position: 0,
		line: 0
	},
	lines: {
		bool: function (name, a, b) {
			return hyperHTML.wire()`<span class=${['line', name]}>${name}? <span class=${['option', a]} onclick=${function(){this.classList.toggle('active')}}>${a}</span>/<span class=${['option', b]}>${b}</span> </span>`
		},
		mutiple: function (name, ...options) {
			if(item !== value)
			selectAll(classname).forEach(el => el.classList.toggle('active'))
			item = value
		},
		slider: function (name) {
			return hyperHTML.wire(`<span class=${['line', name]}>${name} [<span>█████████████████████████████</span>] </span>`)
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