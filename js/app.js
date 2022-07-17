import '../styles/app.css'
import '../styles/credits.css'
import '../styles/loading.css'
import '../styles/player.css'

import { Loading, AudioPlayer, Credits, Video } from './Dom'

import Experience from './Experience'

console.log('🎉', 'Project generated using vite-three-starter')
console.log(':: https://github.com/Alex-DG/vite-three-starter ::')

/**
 * Dom
 */
document.querySelector('#app').innerHTML = `
    ${Loading}
    ${AudioPlayer}
    ${Credits}
    ${Video}
`

/**
 * Experience
 */
window.experience = new Experience({
  domElement: document.getElementById('experience'),
})
