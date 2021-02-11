import { gsap } from 'gsap/all';
import EventEmitter from 'eventemitter3';

export default class Cow extends EventEmitter {
  constructor() {
    super();
    this._coweElement = '';
    this.init();
  }

  async init() {
    this._coweElement = document.getElementsByClassName('cow');
  }

  static get events() {
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
      onComplete: this.emit(Cow.events.ABDUCT_COMPLETED)
    });
  }
}