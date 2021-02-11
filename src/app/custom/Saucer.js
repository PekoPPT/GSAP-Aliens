import { gsap, Power3 } from 'gsap/all';
import EventEmitter from 'eventemitter3';

export default class Saucer extends EventEmitter {
  constructor() {
    super();
    this._saucerElement = '';
    this._beamTopElement = '';
    this._beamBottomElement = '';
    this.init();
  }

  async init() {
    this._saucerElement = document.getElementsByClassName('ufo');
    this._beamTopElement = document.getElementById('beam-top');
    this._beamBottomElement = document.getElementById('beam-bottom');
  }

  async moveTo(pixels, direction) {
    await gsap.to(this._saucerElement, 2, {
      id: direction === 'in' ? 'flyIn' : 'flyOut',
      x: pixels,
      ease: Power3.easeOut,
      onComplete: direction === 'in' ? this.emit(Saucer.events.FLY_IN) : this.emit(Saucer.events.FLY_AWAY),
    });
  }

  async toggleBeam(opacityValue, showOrHide) {
    const timeline = gsap.timeline({
      onComplete: showOrHide === 'show' ? this.emit(Saucer.events.BEAM_SHOW)
        : this.emit(Saucer.events.BEAM_HIDE),
    });

    timeline.to(this._beamTopElement, {
      id: showOrHide === 'show' ? 'showTopBeam' : 'hideTopBeam',
      opacity: opacityValue,
      duration: 1,
    });
    timeline.to(this._beamBottomElement, {
      id: showOrHide === 'show' ? 'showBottomBeam' : 'hideBottomBeam',
      opacity: opacityValue,
      duration: 1,
    });

    return timeline;
  }

  static get events() {
    return { FLY_IN: 'fly_in', FLY_AWAY: 'fly_away', BEAM_SHOW: 'beam_showed', BEAM_HIDE: 'beam_hide' };
  }
}
