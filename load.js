"use strict"

const select = selector => document.querySelector(selector)

const selectAll = selector => document.querySelectorAll(selector)

const loadScript = _ => {
	let script = document.createElement("script")
	script.setAttribute("src","main.js")
	select("head").appendChild(script)
	select('h1').innerText = "A Simple Aesthetic Particle engine"
	select('.options').setAttribute('style','display:none;')
}

const canvas = select('canvas')


window.onresize = _ => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

window.onload = window.onresize

// look I'll fix this later lol.
const moveCursor = {
	left: ev => {
		const terminal = select('.terminal')
		const match = terminal
		.innerHTML
		.replace(/(.)<span class="cursor">(.*?)<\/span>/,'<span class="cursor">$1</span>$2')
		terminal.innerHTML = match 
	},
	right: ev => {
		const terminal = select('.terminal')
		const match = terminal
		.innerHTML
		.replace(/<span class="cursor">(.*?)<\/span>(.)/,'$1<span class="cursor">$2</span>')
		terminal.innerHTML = match 
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