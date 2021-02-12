import { gsap } from 'gsap/all';
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
    if (direction === 'in') {
      return gsap.to(this._saucerElement, 2, {
        id: 'flyIn',
        x: pixels,
        onComplete: this.emit(Saucer.events.FLY_IN),
      });
    } else if (direction === 'out') {
      return gsap.to(this._saucerElement, 2, {
        id: 'flyOut',
        x: pixels,
        onComplete: this.emit(Saucer.events.FLY_AWAY),
      });
    }
  }

  async toggleBeam(opacityValue, showOrHide) {
    let timeline;

    if (showOrHide === 'show') {
      timeline = gsap.timeline();

      timeline.to(this._beamTopElement, {
        id: 'showTopBeam',
        opacity: opacityValue,
      }, 'beam');
      timeline.to(this._beamBottomElement, {
        id: 'showBottomBeam',
        opacity: opacityValue,
        onComplete: this.emit(Saucer.events.BEAM_SHOW),
      }, 'beam');
    } else if (showOrHide === 'hide') {
      timeline = gsap.timeline();

      timeline.to(this._beamTopElement, {
        id: 'hideTopBeam',
        opacity: opacityValue,
      }, 'beam');
      timeline.to(this._beamBottomElement, {
        id: 'hideBottomBeam',
        opacity: opacityValue,
        onComplete: this.emit(Saucer.events.BEAM_HIDE),
      }, 'beam');
    }

    return timeline;
  }

  static get events() {
    return { FLY_IN: 'fly_in', FLY_AWAY: 'fly_away', BEAM_SHOW: 'beam_showed', BEAM_HIDE: 'beam_hide' };
  }
}
