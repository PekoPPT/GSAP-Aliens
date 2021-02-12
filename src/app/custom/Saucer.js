import { gsap } from 'gsap/all';
import EventEmitter from 'eventemitter3';

export default class Saucer extends EventEmitter {
  constructor() {
    super();
    this._saucerElement = '';
    this._beamTopElement = '';
    this._beamBottomElement = '';
    this.sauserMoved = false;
    this.beamShowed = false;
    this.init();
  }

  async init() {
    this._saucerElement = document.getElementsByClassName('ufo');
    this._beamTopElement = document.getElementById('beam-top');
    this._beamBottomElement = document.getElementById('beam-bottom');
  }

  async moveTo() {
    const that = this;

    if (!this.sauserMoved) {
      gsap.to(this._saucerElement, {
        id: 'flyIn',
        x: -835,
        onComplete() {
          that.emit(Saucer.events.FLY_IN);
          that.toggleBeam();

          return;
        },
      });
      this.sauserMoved = true;
    } else {
      gsap.to(this._saucerElement, {
        id: 'flyOut',
        x: -1800,
        onComplete() {
          that.emit(Saucer.events.FLY_OUT);
        },
      });
    }
  }

  async toggleBeam() {
    const that = this;

    const timeline = gsap.timeline({
    });

    if (!this.beamShowed) {

      timeline.to(this._beamTopElement, {
        id: 'showTopBeam',
        opacity: 0.6,
      }, 'beam');

      timeline.to(this._beamBottomElement, {
        id: 'showBottomBeam',
        opacity: 0.6,
        onComplete() { that.emit(Saucer.events.BEAM_SHOW); },

      }, 'beam');

      this.beamShowed = !this.beamShowed;

    } else {

      timeline.to(this._beamTopElement, {
        id: 'hideTopBeam',
        opacity: 0,
      }, 'beam');

      timeline.to(this._beamBottomElement, {
        id: 'hideBottomBeam',
        opacity: 0,
        onComplete() { that.emit(Saucer.events.BEAM_HIDE); },
      }, 'beam');
    }
  }

  static get events() {
    return { FLY_IN: 'fly_in', FLY_AWAY: 'fly_away', BEAM_SHOW: 'beam_showed', BEAM_HIDE: 'beam_hide' };
  }
}
