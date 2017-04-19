"use strict"

const select = selector => document.querySelector(selector)

const loadScript = _ => {
	let script = document.createElement("script")
	script.setAttribute("src","main.js")
	select("head").appendChild(script)
}

const canvas = select('canvas')

window.onresize = _ => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

window.onload = window.onresize

// call load() if space is pressed.
window.onkeydown = e => e.keyCode===32 && loadScript()
