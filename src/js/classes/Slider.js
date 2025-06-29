export class Slider {
  
  static els(sel, par = document) {
    return par.querySelectorAll(sel);
  }

  static el(sel, par = document) {
    return par.querySelector(sel);
  }

  static mod(n, m) {
    return (n % m + m) % m;
  }

  constructor(elPar) {
    this.elPar = elPar;
    this.elSlider = Slider.el(".slider__track", elPar);
    this.elsItems = Slider.els(".slider__item", elPar);
    this.sub = +elPar.dataset.items || 1;
    this.tot = Math.ceil(this.elsItems.length / this.sub);
    this.c = 0;

    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);

    Slider.el(".slider__button--prev", elPar).addEventListener("click", this.prev);
    Slider.el(".slider__button--next", elPar).addEventListener("click", this.next);

    this.anim();
  }

  anim() {
    this.elSlider.style.transform = `translateX(-${this.c * 100}%)`;
  }

  prev() {
    this.c = Slider.mod(this.c - 1, this.tot);
    this.anim();
  }

  next() {
    this.c = Slider.mod(this.c + 1, this.tot);
    this.anim();
  }

  static initAll() {
    Slider.els(".slider").forEach(elPar => {
      new Slider(elPar);
    });
  }
}
