'use strict';

const context = canvas.getContext('2d');

// New keys, we assume the loader made the keys variable already, will need to chance once we split things.
keys[32] = start;
keys[49] = save;
keys[50] = load;
keys[80] = pause;
keys[77] = mouseNext;

/* TODO:
 * - unit testing.
 *   + basic is implemented
 * - something more fun, sync it up with a node server somehow?
 * - multiple particle types:
 *   - default (atoms?)
 *   - mist????
 *   - walls, immutable, indistructable.
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
 *   - touchscreen.
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
 * - Physics engine.
 *   - engine in webasm.
 */

/* Global variables.
 ********************/

const settings = {type: 'square'};

let actions = [];

let paused = false;


/* universal functions.
 ***********************/

/**
 * returns a random number
 * @param {Int} i 
 * @return {Int}
 */

function rand(i = 1) {
	return i * Math.random();
}

/* Anything relating to the mouse events.
 *****************************************/

const mouse = {
	clone: {
		clientX: 0,
		clientY: 0,
	},
	modus: {
		emit: ev => {
			return function () {
				particleArr.push(new Particle({x:mouse.clone.clientX, y:mouse.clone.clientY, type: config.type}));
			};
		},
		// bow: ev => {
		// 	return _ => {
		// 			//particleArr.push(particle(mouse.clone.clientX, mouse.clone.clientY))
		// 	}
		// },
		// create: ev => {
		// 	return function () {
		// 		particleArr.push(new Particle({x:mouse.clone.clientX, y:mouse.clone.clientY, type: config.type}))
		// 	}
		// },
		// blackHole : ev => {
		//     particleArr.push(particle(ev.clientX,ev.clientY,-100))
		// }
		// pew : ev => {
		//     let i = 10
		//     while (i--){
		//         particleArr[i] = (particle(ev.clientX,ev.clientY))
		//     }
		// },
		gravitate: function(ev) {
			return _ => {
				gravity.boring({
					coords: {
						x: mouse.clone.clientX,
						y: mouse.clone.clientY,
					},
					mass: 100000,
				});
			};
		},
		// edit : ev => {
		//     pause() 
		//     edit(ev.clientX,ev.clientY)
		// },
	},
	action: '',
};

/**
 * Change the mousemode to the next in the list.
 */

function mouseNext() {
	let flag;
	for (let mode in mouse.modus) {
		if (flag)
			return mouse.action = mouse.modus[mode];
		flag = mouse.modus[mode] === mouse.action;
	}
	return mouse.action = mouse.modus.emit;
}

mouse.action = mouse.modus.gravitate;

/**
 * Scroll event handler.
 * @param {scrollEvent} ev 
 */

function onScroll(ev) {
	console.log(ev);
	mouseNext();
	//scroller(ev.clientX,ev.clientY)
}

// This creates an... action emitter?
window.onmousedown = ev => actions.push(mouse.action(ev));

window.onmouseup = ev => actions.pop();

window.onmousemove = ev => mouse.clone = ev;

window.onclick = ev => mouse.clone = ev;

window.onscroll = onScroll;

/* Anything related to touch events.
 ************************************/

// Touchscreen handles very different from a mouse, make seperate actions!
const touch = {};

window.ontouchstart = window.onmousedown;

window.ontouchend = window.onmouseup;

//window.ontouchmove = ev => mouse.clone = ev;

// When does this even fire?
window.ontouchcancel = window.ontouchend;



// scroller window for picking mouse modes -fix this-
function scroller(x, y) {
	const picker = document.createElement('ul');
	let mode;
	for (mode in mouse.modus) {
		let item = document.createElement('li');
		item.innerText = mode;
		picker.appendChild(item);
	}


	select('body').appendChild(picker);
	pause();
}

// Editor because we need to be able to edit particle properties ingame :p.
function edit(x, y) {
	const editor = document.createElement('code');
	editor.setAttribute('class', 'json');
	let particle = findParticle(x, y);
	console.log(particle);
	if (!particle)
		return;
	editor.innerText = JSON.stringify(particle);
	select('body').appendChild(editor);
}

/**
 * Finds any particle at the X and Y coords given, returns the last particle found.
 * If no particles are found, returns false.
 * @param {Int} x 
 * @param {Int} y 
 */
function findParticle(x, y) {
	let temp;
	particleArr.forEach(particle => {
		if (x < particle.coords.x + particle.mass)
			if (x > particle.coords.x)
				if (y < particle.coords.y + particle.mass)
					if (y > particle.coords.y)
						temp = particle;
	});
	return temp || false;
}

/**
 * Particle constructor.
 */
class Particle {
	constructor(props = {x, y , mass, color, type}) {
		this.coords = {
			x: props.x || rand(canvas.width),
			y: props.y || rand(canvas.height)
		};
		this.vol = {
			x: rand(2) - 1,
			y: rand(2) - 1
		};
		this.color = props.color || `hsla(${rand(360)},100%,58%,1)`;
		this.mass = props.mass || 20 + rand(80);
		this.type = props.type || 'particle';
		this.shape = 'round';
	}
}

// location to store the refrences to the particles
let particleArr = [];

// Overly big render object, might be smarter to do this as a function instead.
const render = {
	particle: (particle, fill) => {
		context.fillStyle = particle.color;
		context.beginPath();
		context.arc(particle.coords.x, particle.coords.y, particle.mass, 0, Math.PI * 2);

		// Take a second look at below.
		fill || context.fill();
		context.closePath();
	},
	square: particle => {
		context.fillStyle = particle.color;
		context.fillRect(particle.coords.x, particle.coords.y, particle.mass, particle.mass);
		context.fill();
	},
	point: (coords = {x:50, y: 50}) => {
		
	},
	game: _ => {
		context.fillStyle = '#FFF';
		context.fillRect(0, 0, canvas.width, canvas.height);
		particleArr.forEach(particle => {
			// make this a function that the particle has or refrences which contains these functions to allow for costum behaviour
			gravity[config.gravity](particle);
			collisions[config.collisions](particle);
			checkWithinBounds(particle);
			move(particle);
			render[particle.type](particle);
		});

	}

};

/* Anything and everything related to moving stuff around.
 **********************************************************/


const gravity = {
	boring: entity => {
		particleArr.forEach(particle => {
			if (particle !== entity) {
				let x = particle.coords.x - entity.coords.x;
				let y = particle.coords.y - entity.coords.y;
				let r = x * x + y * y;
				let force = ((entity.mass + particle.mass) / r) * config.G;
				particle.vol.x -= force * x;
				particle.vol.y -= force * y;
			}

		});
	},
	wigglyInverse: entity => {
		let force = 1;
		particleArr.forEach(particle => {
			if (particle !== entity) {
				let xDistance = particle.coords.x - entity.coords.x;
				let yDistance = particle.coords.y - entity.coords.y;
				force *= entity.mass;
				particle.vol.x += force / xDistance;
				particle.vol.y += force / yDistance;
			}
		});
	},
	wiggly: entity => {
		let force = 1;
		particleArr.forEach(particle => {
			if (particle !== entity) {
				let x = particle.coords.x - entity.coords.x;
				let y = particle.coords.y - entity.coords.y;
				// force *= entity.mass
				particle.vol.x -= force / x;
				particle.vol.y -= force / y;
			}
		});
	},
};

function move(particle) {
	particle.coords.x += particle.vol.x / particle.mass;
	particle.coords.y += particle.vol.y / particle.mass;
}

/* code relating to collisions here :D. 
 ***************************************/

function checkWithinBounds(entity) {
	if(config.bounds){
		if (entity.coords.x < 0) {
			entity.vol.x *= -1;
			entity.coords.x++;
		}
		if (entity.coords.x + entity.mass > canvas.width) {
			entity.vol.x *= -1;
			entity.coords.x--;
		}
		if (entity.coords.y < 0) {
			entity.vol.y *= -1;
			entity.coords.y++;
		}
		if (entity.coords.y + entity.mass > canvas.height) {
			entity.vol.y *= -1;
			entity.coords.y--;
		}
	} else {
		if (entity.coords.x + entity.mass < 0)
			entity.coords.x = canvas.width;
		if (entity.coords.x > canvas.width)
			entity.coords.x = 0 - entity.mass;
		if (entity.coords.y + entity.mass < 0)
			entity.coords.y = canvas.height;
		if (entity.coords.y > canvas.height)
			entity.coords.y = 0 - entity.mass;
	}
}

const collisions = {
	boring: entity => {
		particleArr.forEach(particle => {
			// don't allow particles to collide with themselves
			if (particle !== entity) {
				const x = entity.coords.x + entity.vol.x / entity.mass;
				const y = entity.coords.y + entity.vol.y / entity.mass;
				if (x < particle.coords.x + particle.mass)
					if (x > particle.coords.x - entity.mass)
						if (y < particle.coords.y + particle.mass)
							if (y > particle.coords.y - entity.mass) {
								entity.vol.x *= -1;
								entity.vol.y *= -1;
								const volX = (entity.vol.x + particle.vol.x) / 2;
								const volY = (entity.vol.y + particle.vol.y) / 2;
								entity.vol.x = volX;
								entity.vol.y = volY;

								// comment out the two lines below for a cool effect
								// particle.vol.x = volX;
								// particle.vol.y = volY;
							}
			}
		});
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
								const volX = (entity.vol.x + particle.vol.x) / 2;
								const volY = (entity.vol.y + particle.vol.y) / 2;
								entity.vol.x = volX;
								entity.vol.y = volY;
								particle.vol.x = volX;
								particle.vol.y = volY;
							}
		});

	}
};

function pause() {
	paused = !paused;
}

/* saving and loading to and from the local storage.
 ****************************************************/

function save() {
	localStorage.setItem('particles', JSON.stringify(particleArr));
}

function load() {
	particleArr = JSON.parse(localStorage.getItem('particles'));
}

/* Essentials for running the program.
 **************************************/

function start() {
	let i = 20;

	particleArr = [];

	while (i--)
		particleArr.push(new Particle({type: config.type}));
	// console.log(particleArr)
}

function main() {
	// Rate at which it runs doesn't matter.
	requestAnimationFrame(main);
	// If we want something to be done every frame, add it here.
	actions.forEach(action => {
		action();
	});
	if (!paused)
		render.game();
}

start();
main();
