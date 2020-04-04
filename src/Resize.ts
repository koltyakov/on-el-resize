export class Resize {

  private attachEvent = document['attachEvent'];
  private isIE = navigator.userAgent.match(/Trident/);

  public addResizeListener = (element: HTMLElement, fn: () => void): void => {
    if (!element['__resizeListeners__']) {
      element['__resizeListeners__'] = [];
      if (this.attachEvent) {
        element['__resizeTrigger__'] = element;
        element['attachEvent']('onresize', this.resizeListener);
      } else {
        if (getComputedStyle(element).position === 'static') element.style.position = 'relative';
        const obj = element['__resizeTrigger__'] = document.createElement('object');
        obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
        obj['__resizeElement__'] = element;
        obj.onload = this.objectLoad; // .bind(this);
        obj.type = 'text/html';
        if (this.isIE) {
          element.appendChild(obj);
        }
        obj.data = 'about:blank';
        if (!this.isIE) {
          element.appendChild(obj);
        }
      }
    }
    element['__resizeListeners__'].push(fn);
  }

  public removeResizeListener = (element: HTMLElement, fn: () => void): void => {
    element['__resizeListeners__'].splice(element['__resizeListeners__'].indexOf(fn), 1);
    if (!element['__resizeListeners__'].length) {
      if (this.attachEvent) {
        element['detachEvent']('onresize', this.resizeListener);
      } else {
        element['__resizeTrigger__'].contentDocument.defaultView.removeEventListener('resize', this.resizeListener);
        element['__resizeTrigger__'] = !element.removeChild(element['__resizeTrigger__']);
      }
    }
  }

  private requestFrame = (() => {
    const rafFallback = (fn: () => void) => window.setTimeout(fn, 20);
    const raf = window.requestAnimationFrame || window['mozRequestAnimationFrame'] || window.webkitRequestAnimationFrame || rafFallback;
    return (fn: () => void) => raf(fn);
  })();

  private cancelFrame = (() => {
    const cancel = window.cancelAnimationFrame || window['mozCancelAnimationFrame'] || window.webkitCancelAnimationFrame || window.clearTimeout;
    return (id) => cancel(id);
  })();

  private resizeListener = (e): void => {
    const win = e.target || e.srcElement;
    if (win.__resizeRAF__) {
      this.cancelFrame(win.__resizeRAF__);
    }
    win.__resizeRAF__ = this.requestFrame(() => {
      const trigger = win['__resizeTrigger__'];
      trigger['__resizeListeners__'].forEach(fn => {
        fn.call(trigger, e);
      });
    });
  }

  private objectLoad = (ev: Event): void => {
    const el = ev.target;
    el['contentDocument'].defaultView['__resizeTrigger__'] = el['__resizeElement__'];
    el['contentDocument'].defaultView.addEventListener('resize', this.resizeListener);
  }

}
