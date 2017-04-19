'use strict'
const canvas = select('canvas')
const context = canvas.getContext('2d')

window.onkeydown = e => e.keyCode===32 && console.log('test')


const rand = i => Math.random()

// Particle constructor.
const particle = _ => { return {
    coords: {x: rand(), y: rand()},
    acc: {x: rand(), y: rand()},
    color: `hsla(300,100%,40%,1)`,
    mass: 1
}}

const particleArr = []

const start = _ => {

    let i = 100

    while (i--)
        particleArr.push(particle())
    console.log(particleArr)

    
}

const main = _ => {
    console.log('test')
}

start()
window.setInterval( _ => main(), 33)
