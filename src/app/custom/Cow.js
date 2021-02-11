import { gsap } from 'gsap/all';

export default class Cow {
  constructor() {
    this._coweElement = '';
    this.init();
  }

  async init() {
    this._coweElement = document.getElementsByClassName('cow');
  }

  static events() {
    return { ABDUCT_COMPLETED: 'abduct_completed' };
  }

  async moveTo(pixels) {
    return gsap.to(this._coweElement, {
      id: 'cowAbduction',
      y: pixels,
    });
  }

  async hide() {
    return gsap.to(this._coweElement, {
      id: 'cowHide',
      opacity: 0,
    });
  }
}