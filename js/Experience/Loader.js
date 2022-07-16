class _Loader {
  constructor() {
    this.loading = true
    this.total = 2
    this.itemsLoaded = 0
  }

  hideLoading() {
    console.log('✅', 'Assets loaded')
    const player = document.querySelector('.player')
    player.classList.remove('loading')
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
