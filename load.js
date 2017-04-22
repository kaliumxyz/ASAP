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

// call loadScript() if space is pressed.
window.onkeydown = e => e.keyCode===32?loadScript():e
window.onclick = loadScript

//document.querySelectorAll('.option').forEach(el => el.onclick = ev => el.setAttribute('class','active'))