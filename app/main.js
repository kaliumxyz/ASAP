'use strict'

const context = canvas.getContext('2d')

// New keys, we assume the loader made the keys variable already, will need to chance once we split things.
keys[32] = start
keys[49] = save
keys[50] = load
keys[80] = pause
keys[77] = mouseNext

/* TODO:
 * - unit testing.
 * - something more fun, sync it up with a node server somehow?
 * - multiple particle types:
 *   -  default (atoms?)
 *   -  mist????
 * - more shiny good stuff.
 * - GUI
 * - actual particle behaviour:
 *   - point gravity.
 *   - motion.
 *   - containment.
 *   - collicions.
 *   - steering behaviour:
 *     - AI in a particle engine? yes, go fuck yourself if you don't know about steering behaviour.
 *     - seriously go feel a wicked degree of shame mate.
 * - mouse / pointer modes:
 *   - create / emit.
 *   - gravitate.
 *   - contain.
 *   - grab.
 *   - editor.
 *     - json.
 *     - aspects? some drag and pull system, freeze, selecting, etc.
 *   - create gravity well. 
 * - Adding title randomizer.
 * - Add angles.
 */

/* Global variables.
 ********************/

const settings = {}

let actions = []

let paused = false


/* universal functions.
 ***********************/

function rand(i) {
	i = i || 1
	return i * Math.random()
}

/* Anything relating to the mouse
 *********************************/

const mouse = {
	clone: {
		clientX: 0,
		clientY: 0,
	},
	modus: {
		emit: ev => {
			return _ => {
					particleArr.push(particle(mouse.clone.clientX, mouse.clone.clientY))
			}
		},
		// blackHole : ev => {
		//     particleArr.push(particle(ev.clientX,ev.clientY,-100))
		// }
		// pew : ev => {
		//     let i = 10
		//     while (i--){
		//         particleArr[i] = (particle(ev.clientX,ev.clientY))
		//     }
		// },
		gravitate: ev => {
			return _ => {
				gravity.wiggly({
					coords: {
						x: ev.clientX,
						y: ev.clientY,
					},
					mass: 1000000000000,
				})
			}
		},
		// edit : ev => {
		//     pause() 
		//     edit(ev.clientX,ev.clientY)
		// },
	},
	action: '',
}

function mouseNext() {
	let flag
	for (let mode in mouse.modus) {
		if (flag)
			return mouse.action = mouse.modus[mode]
		flag = mouse.modus[mode] === window.onclick
	}
	return mouse.action = mouse.modus.emit
}

mouse.action = mouse.modus.emit


const scroll = ev => {
	console.log(ev)
	mouseNext()
	//scroller(ev.clientX,ev.clientY)
}

window.onmousedown = ev => actions.push(mouse.action(ev))

window.onmouseup = ev => actions.pop()

window.onmousemove = ev => mouse.clone = ev

window.onclick = ev => mouse.clone = ev

// Great way to create emittors but nothing more, lets swap to using a mouse object.
//window.onmousedown = ev => actions.push(mouse.emit(ev))

//window.onmouseup = ev => actions.pop()

//window.onmousewheel = scroll




// scroller window for picking mouse modes -fix this-
function scroller(x, y) {
	const picker = document.createElement("ul")
	let mode
	for (mode in mouse.modus) {
		let item = document.createElement("li")
		item.innerText = mode
		picker.appendChild(item)
	}


	select('body').appendChild(picker)
	pause()
}

// Editor because we need to be able to edit particle properties ingame :p.
function edit(x, y) {
	const editor = document.createElement("code")
	editor.setAttribute('class', 'json')
	let particle = findParticle(x, y)
	console.log(particle)
	if (!particle)
		return
	editor.innerText = JSON.stringify(particle)
	select('body').appendChild(editor)
}

// Location and acceleration, its not that hard to have both :p.
function findParticle(x, y) {
	let temp
	particleArr.forEach(particle => {
		if (x < particle.coords.x + particle.mass)
		if (x > particle.coords.x)
		if (y < particle.coords.y + particle.mass)
		if (y > particle.coords.y)
		temp = particle
	})
	return temp || false
}

// Particle constructor.
const particle = (x, y, mass) => {
	return {
		coords: {
			x: x || rand(canvas.width),
			y: y || rand(canvas.height)
		},
		acc: {
			x: rand(2) - 1,
			y: rand(2) - 1
		},
		color: `hsla(${rand(360)},100%,58%,1)`,
		mass: mass || 20 + rand(80),
		type: 'particle',
		// It might be a wise move to let the behaviour be independent of the looks.
		shape: 'round',
	}
}

// A place to store all these particles... I need to sanitize the naming conventions.
let particleArr = []

// Overly big render object, might be smarter to do this as a function instead.
const render = {
	particle: (particle, fill) => {
		context.fillStyle = particle.color
		context.beginPath()
		context.arc(particle.coords.x, particle.coords.y, particle.mass, 0, Math.PI * 2)

		// Take a second look at below.
		fill || context.fill()
		context.closePath()
	},
	square: particle => {
		context.fillStyle = particle.color
		context.fillRect(particle.coords.x, particle.coords.y, particle.mass, particle.mass)
		context.fill()
	},
	game: _ => {
		context.fillStyle = '#FFF'
		context.fillRect(0, 0, canvas.width, canvas.height)
		particleArr.forEach(particle => {
			checkWithinBounds(particle)
			gravity.wiggly(particle)
			move(particle)
			collisions.care(particle)
			render.square(particle)
		})

	}

}

/* Anything and everything related to moving stuff around.
 **********************************************************/

const gravity = {
	boring: entity => {

	},
	wigglyRepell: entity => {
		const force = 1
		particleArr.forEach(particle => {
			if (particle !== entity) {
				let xDistance = particle.coords.x - entity.coords.x
				let yDistance = particle.coords.y - entity.coords.y
				force * entity.mass
				particle.acc.x += force / xDistance
				particle.acc.y += force / yDistance
			}
		})
	},
	wiggly: entity => {
		const force = 1
		particleArr.forEach(particle => {
			if (particle !== entity) {
				let x = particle.coords.x - entity.coords.x
				let y = particle.coords.y - entity.coords.y
				particle.acc.x -= force / x
				particle.acc.y -= force / y
			}
		})
	}
}

const move = particle => {
	particle.coords.x += particle.acc.x / particle.mass
	particle.coords.y += particle.acc.y / particle.mass
}

/* code relating to collisions here :D. 
 ***************************************/

const checkWithinBounds = entity => {
	if (entity.coords.x + entity.mass < 0)
		entity.coords.x = canvas.width
	if (entity.coords.x > canvas.width)
		entity.coords.x = 0 - entity.mass
	if (entity.coords.y + entity.mass < 0)
		entity.coords.y = canvas.height
	if (entity.coords.y > canvas.height)
		entity.coords.y = 0 - entity.mass
}

const collisions = {
	boring: entity => {

	},
	care: entity => {
		particleArr.forEach(particle => {
			if (particle !== entity)
			if (entity.coords.x < particle.coords.x + particle.mass)
			if (entity.coords.x > particle.coords.x - entity.mass)
			if (entity.coords.y < particle.coords.y + particle.mass)
			if (entity.coords.y > particle.coords.y - entity.mass) {
				// entity.coords.x *= -1
				// entity.coords.y *= -1
				const accX = (entity.acc.x + particle.acc.x) / 2
				const accY = (entity.acc.y + particle.acc.y) / 2
				entity.acc.x = accX
				entity.acc.y = accY
				particle.acc.x = accX
				particle.acc.y = accY
			}
		})

	}
}

function pause() {
	paused = !paused
}

/* saving and loading to and from the local storage.
 ****************************************************/

function save() {
	localStorage.setItem('particles', JSON.stringify(particleArr))
}

function load() {
	particleArr = JSON.parse(localStorage.getItem('particles'))
}

/* Essentials for running the program.
 **************************************/

function start() {
	let i = 100

	particleArr = []

	while (i--)
		particleArr.push(particle())
	console.log(particleArr)
}

function main() {
	// Rate at which it runs doesn't matter.
	requestAnimationFrame(main)
	// If we want something to be done every frame, add it here.
	actions.forEach(action => action())
	if (!paused)
		render.game()
}

start()
main()