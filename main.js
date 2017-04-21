'use strict'

const context = canvas.getContext('2d')

// Lets not hamper any further keypresses shall we?
window.onkeydown = e => e.keyCode===32?start():e

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

const settings = {

}

let pause = false


const mouse = {
    emit : ev => {
        let i = 1
        while (i--){
            particleArr.push(particle(ev.clientX,ev.clientY))
        }},
    pew : ev => {
        let i = 100
        while (i--){
            particleArr[i] = (particle(ev.clientX,ev.clientY))
        }
    },
    edit : ev => {
        pause = !pause 
        edit(ev.clientX,ev.clientY)
    }
}

const scroll = ev => {
    console.log(ev)
    scroller(ev.clientX,ev.clientY)
}

window.onclick = mouse.emit

// window.onmousewheel = scroll

const rand = i => {
    i = i || 1
    return i * Math.random()
}



// scroller window for picking mouse modes -fix this-
const scroller = (x,y) => {
    const picker = document.createElement("ul")
    let mode
    for (mode in mouse) {
        let item = document.createElement("li")
        item.innerText = mode
        picker.appendChild(item)
    }


    select('body').appendChild(picker)
    pause = !pause
}

// Editor
const edit = (x,y) => {
    const editor = document.createElement("code")
    editor.setAttribute('class','json')
    let particle = findParticle(x,y)
    console.log(particle)
    if(!particle)
    return
    editor.innerText = JSON.stringify(particle)
    select('body').appendChild(editor)
}

const findParticle = (x,y) => {
    let temp
        particleArr.forEach(particle => {
        if(x < particle.coords.x + particle.mass)
        if(x > particle.coords.x)
        if(y < particle.coords.y + particle.mass) 
        if(y > particle.coords.y)
        temp = particle
    })
    return temp || false
}

// Particle constructor.
const particle = (x,y) => { return {
    coords: {
        x: x || rand(canvas.width), 
        y: y || rand(canvas.height)
    },
    acc: {
        x: rand(2)-1,
        y: rand(2)-1
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
    game: _ => {
    context.fillStyle='#FFF'
    context.fillRect(0,0,canvas.width,canvas.height)
    particleArr.forEach( particle => {
        checkWithinBounds(particle)
        gravity.wiggly(particle)
        move(particle)
        render.square(particle)
    })

    }

}

// Moving stuff here.

const gravity = {
    wiggly: entity => {
    const force = 1
    particleArr.forEach(particle => {

        let x = particle.coords.x - entity.coords.x
        let y = particle.coords.y - entity.coords.y
        
        if (particle !== entity){
        particle.acc.x += force / x  
        particle.acc.y += force / y
        }
        // actually implement gravity pl0x
    })
}}

const move = particle => {
    particle.coords.x += particle.acc.x / particle.mass
    particle.coords.y += particle.acc.y / particle.mass
}

// collision stuff here.

const checkWithinBounds = entity => {
    if(entity.coords.x < 0)
    entity.coords.x = canvas.width
    if(entity.coords.x > canvas.width)
    entity.coords.x = 0
    if(entity.coords.y < 0) 
    entity.coords.y = canvas.height
    if(entity.coords.y > canvas.height)
    entity.coords.y = 0
}

const collide = entity => {
    particleArr.forEach(particle => entity.coords == particle.coords ? particle.color = "": "" )
}

// Saving stuff below.

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
    if (!pause)
    render.game()
}

start()
main()