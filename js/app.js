import '../styles/app.css'

import Experience from './Experience'

console.log('🎉', 'Project generated using vite-three-starter')
console.log(':: https://github.com/Alex-DG/vite-three-starter ::')

/**
 * Experience
 */
window.experience = new Experience({
  domElement: document.getElementById('experience'),
})
