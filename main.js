'use strict'
const context = canvas.getContext('2d')

// Lets not hamper any further keypresses shall we?
window.onkeydown = e => e.keyCode===32?start():e

/* TODO:
 * - unit testing.
 * - something more fun, sync it up with a node server somehow?
 * - multiple particle types.
 * - more shiny good stuff.
 * - GUI
 * - actual particle behaviour (lol)
 *   - gravity?
 *   - motion.
 */


const rand = i => {
    i = i || 1
    return i * Math.random()
}

// Particle constructor.
const particle = _ => { return {
    coords: {
        x: rand(canvas.width), 
        y: rand(canvas.height)
    },
    acc: {
        x: rand(),
        y: rand()
    },
    color: `hsla(${rand(360)},100%,58%,1)`,
    mass: 20 + rand(20),
    type: 'particle',
    // It might be a wise move to let the behaviour be independent of the looks.
    shape: 'round', 
}}

// A place to store all these particles... I need to sanitize the naming conventions.
let particleArr = []

// Overly big render object, might be smarter to do this as a function instead.
const render = { 
    particle : (particle, fill) => {
        context.fillStyle = particle.color
        context.beginPath()
        context.arc(particle.coords.x,particle.coords.y,particle.mass,0,Math.PI*2)

        // Take a second look at below.
        fill || context.fill()
        context.closePath()
    },
    square : particle => {
        context.fillStyle = particle.color
        context.fillRect(particle.coords.x,particle.coords.y, particle.mass,  particle.mass)
        context.fill()
    },
    

}

const gravity = (particle, entity) => {
    const force = 9.81
    const distance = {
        x: particle.coords.x - entity.coords.x,
        y: particle.coords.y - entity.coords.y,
    }
    // logic here :p.
}


const save = _ => localStorage.setItem('particles', JSON.stringify(particleArr))

const load = _ => particleArr = JSON.parse(localStorage.getItem('particles'))


// Stuff for running the darn thing.

const start = _ => {
    let i = 100

    particleArr = []

    while (i--)
        particleArr.push(particle())
    console.log(particleArr)
}

const main = _ => {
    // Rate at which it runs doesn't matter.
    requestAnimationFrame(main)
    context.fillStyle='#FFF'
    context.fillRect(0,0,canvas.width,canvas.height)
    particleArr.forEach( particle => {
        render.square(particle)
    })
}

start()
main()