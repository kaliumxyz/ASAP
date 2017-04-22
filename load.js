"use strict"

const select = selector => document.querySelector(selector)

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

function moveCursor() {

}

const keys = []
keys[32] = loadScript
keys[37] = moveCursor 
keys[38] = moveCursor
keys[39] = moveCursor
keys[40] = moveCursor

// call the function corresponding to the key.
window.onkeydown = e => keys[e.keyCode]() && e
window.onclick = loadScript

//document.querySelectorAll('.option').forEach(el => el.onclick = ev => el.setAttribute('class','active'))