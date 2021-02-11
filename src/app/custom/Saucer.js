import { gsap, Power3 } from 'gsap/all';

export default class Saucer {
  constructor() {
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
    return gsap.to(this._saucerElement, 2, {
      id: direction === 'in' ? 'flyIn' : 'flyOut',
      x: pixels,
      ease: Power3.easeOut,
    });
  }

  async toggleBeam(opacityValue, showOrHide) {
    const topBeam = gsap.to(this._beamTopElement, {
      id: showOrHide === 'show' ? 'showTopBeam' : 'hideTopBeam',
      opacity: opacityValue,
    });
    const bottomBeam = gsap.to(this._beamBottomElement, {
      id: showOrHide === 'show' ? 'showBottomBeam' : 'hideBottomBeam',
      opacity: opacityValue,
    });

    return Promise.all([topBeam, bottomBeam]);
  }

  static events() {
    return { FLY_IN: 'fly_in', FLY_AWAY: 'fly_away', BEAM_SHOW: 'beam_showed', BEAM_HIDE: 'beam_hide' };
  }
}
