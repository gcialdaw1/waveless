export class HamburgerMenu {
  constructor({ hamburgerSelector, navSelector }) {
    this.hamburger = document.querySelector(hamburgerSelector);
    this.nav = document.querySelector(navSelector);
  }

  init() {
    if (!this.hamburger || !this.nav) return;

    this.hamburger.addEventListener('click', () => {
      this.nav.classList.toggle('is-active');
    });
  }
}