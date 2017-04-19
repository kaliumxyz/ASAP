'use strict'
const canvas = select('canvas')
const context = canvas.getContext('2d')

window.onkeydown = e => e.keyCode===32 && console.log('test')


const rand = i => {
    i = i || 1
    return i * Math.random()
}

// Particle constructor.
const particle = _ => { return {
    coords: {x: rand(1000), y: rand(1000)},
    acc: {x: rand(), y: rand()},
    color: `hsla(${rand(360)},100%,40%,1)`,
    mass: 20,
}}

const particleArr = []

const renderParticle = particle => {
    context.fillStyle = particle.color
    context.beginPath()
    context.arc(particle.coords.x,particle.coords.y,particle.mass,0,Math.PI*2)
    context.fill()
    context.closePath()
}

const gravity = (particle, entity) => {
    const force = 9.81
    const distance = {
        x: particle.coords.x - entity.coords.x,
        y: particle.coords.y - entity.coords.y,
    }
}

const start = _ => {
    let i = 100

    while (i--)
        particleArr.push(particle())
    console.log(particleArr)
}

const main = _ => {
    context.fillStyle="rgba(255,255,000,1)"
    context.fillRect(0,0,canvas.height,canvas.width)
    // console.log('test')
    particleArr.forEach( particle => {
        renderParticle(particle)
    })
}

start()

requestAnimationFrame(main);