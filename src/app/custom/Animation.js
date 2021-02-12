import Cow from './Cow';
import Saucer from './Saucer';
import EventEmitter from 'eventemitter3';
import gsap from 'gsap/gsap-core';

export default class Animation extends EventEmitter {
  constructor() {
    super();
    this.saucer = '';
    this.cow = '';
  }

  async start() {
    const that = this;

    this.saucer = new Saucer();
    this.cow = new Cow();
    this.saucer.addListener('beam_showed', function () { that.cow.moveTo(); });
    this.cow.addListener('abduct_completed', function () { that.saucer.toggleBeam(); });
    this.saucer.addListener('beam_hide', function () { that.saucer.moveTo(); });

    await this.saucer.moveTo();

  }
}
