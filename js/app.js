import '../styles/app.css'

// import './lib/p5/p5.min.js'
// import './lib/p5/addons/p5.sound.min.js'

import Experience from './Experience'

console.log('🎉', 'Project generated using vite-three-starter')
console.log(':: https://github.com/Alex-DG/vite-three-starter ::')

// import audioSrc from '../assets/audio/01.mp3'

// const sketch = window // for single sketch
// window.p5 = p5

// console.log({ p5 })

// sketch.setup = function () {
//   createCanvas(800, 600)
//   loadSound(audioSrc)
// }

// sketch.draw = function () {
//   background(100)
//   fill(255, 0, 0)
//   noStroke()
//   rectMode(CENTER)
//   rect(mouseX, mouseY, 50, 50)
// }

// sketch.mousePressed = function () {
//   console.log('here')
// }

/**
 * Documentations
 */
// document.querySelector('#app').innerHTML = `
//   <div class="container">
//     <h1>Vite Three Starter!</h1>
//     <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite | Documentation</a>
//     <a href="https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene" target="_blank">Three | Documentation</a>
//   </div>
// `

/**
 * Experience
 */
window.experience = new Experience({
  domElement: document.getElementById('experience'),
})
