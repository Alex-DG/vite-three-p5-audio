class _Loader {
  constructor() {
    this.loading = true
    this.total = 2
    this.itemsLoaded = 0
  }

  hideLoading() {
    console.log('✅', 'Assets loaded')

    // Enable audio player
    const player = document.querySelector('.player')
    player.classList.remove('loading')

    // Hide loading layout
    const loadingLayout = document.querySelector('.loading-layout')
    loadingLayout.classList.add('hide')
    setTimeout(() => {
      loadingLayout.style.display = 'none'
    }, 500)
  }

  loaded() {
    this.itemsLoaded++

    if (this.itemsLoaded === this.total) {
      this.loading = false
      this.hideLoading()
    }
  }
}

const Loader = new _Loader()
export default Loader
