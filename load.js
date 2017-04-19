"use strict"

const select = selector => document.querySelector(selector)

const load = _ => {
	let script = document.createElement("script")
	script.setAttribute("src","main.js")
	select("head").appendChild(script)
}

// call load() if space is pressed.
window.onkeydown = e => e.keyCode===32 && load()
