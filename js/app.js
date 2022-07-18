import '../styles/app.css'

import { Loading } from './Dom/Loading'
import { Player } from './Dom/Player'
import { Credits } from './Dom/Credits'
import { Video } from './Dom/Video'
import { Text } from './Dom/Text'

import Experience from './Experience'

console.log('🎉', 'Project generated using vite-three-starter')
console.log(':: https://github.com/Alex-DG/vite-three-starter ::')

/**
 * Dom
 */
document.querySelector('#app').innerHTML = `
 ${Loading}
 ${Player}
 ${Credits}
 ${Video}
 ${Text}
`

/**
 * P5js
 */
const sketch = window
window.p5 = p5

/**
 * Experience
 */
window.experience = new Experience({
  domElement: document.getElementById('experience'),
  sketch,
})
