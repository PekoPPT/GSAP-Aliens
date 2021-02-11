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
    this.saucer = new Saucer();
    this.cow = new Cow();
    await this.saucer.moveTo(-835, 'in');
    await this.emit(Saucer.events.FLY_IN);
    await this.saucer.toggleBeam(0.6, 'show');
    await this.emit(Saucer.events.BEAM_SHOW);
    await this.cow.moveTo(-390);
    await this.cow.hide();
    await this.emit(Cow.events.ABDUCT_COMPLETED);
    await this.saucer.toggleBeam(0, 'hide');
    await this.emit(Saucer.events.BEAM_HIDE);
    await this.saucer.moveTo(-1800, 'out');
    await this.emit(Saucer.events.FLY_OUT);
  }
}
