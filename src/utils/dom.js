import {camelCase, trim} from './common';

/**
 * create element
 * @param tagName
 * @param className
 * @param container
 * @param id
 * @returns {HTMLElement}
 */
const create = function (tagName, className, container, id) {
  const el = document.createElement(tagName);
  if (id) el.id = id;
  if (className) addClass(el, className);
  if (container) {
    container.appendChild(el);
  }
  return el;
};

/**
 * create canvas
 * @param width
 * @param height
 * @param Canvas
 * @returns {HTMLCanvasElement}
 */
const createCanvas = (width, height, Canvas) => {
  if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return canvas
  } else {
    // create a new canvas instance in node.js
    // the canvas class needs to have a default constructor without any parameter
    return new Canvas(width, height)
  }
};

/**
 * get element
 * @param id
 * @returns {HTMLElement}
 */
const getElement = function (id) {
  return typeof id === 'string' ? document.getElementById(id) : id;
};

/**
 * remove current element
 * @param node
 */
const remove = function (node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null;
};

/**
 * clear element child
 * @param el
 */
const empty = function (el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

/**
 * create hidden element
 * @param tagName
 * @param parent
 * @param id
 * @returns {HTMLElement}
 */
const createHidden = function (tagName, parent, id) {
  const element = document.createElement(tagName);
  element.style.display = 'none';
  if (id) {
    element.id = id;
  }
  if (parent) {
    parent.appendChild(element);
  }
  return element
};

/**
 * check element has class
 * @param el
 * @param cls
 * @returns {boolean}
 */
const hasClass = (el, cls) => {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};

/**
 * add class for element
 * @param el
 * @param cls
 */
const addClass = (el, cls) => {
  if (!el) return;
  let curClass = el.className;
  let classes = (cls || '').split(' ');
  for (let i = 0, j = classes.length; i < j; i++) {
    let clsName = classes[i];
    if (!clsName) continue;
    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

/**
 * remove element class
 * @param el
 * @param cls
 */
const removeClass = (el, cls) => {
  if (!el || !cls) return;
  const classes = cls.split(' ');
  let curClass = ' ' + el.className + ' ';
  for (let i = 0, j = classes.length; i < j; i++) {
    let clsName = classes[i];
    if (!clsName) continue;
    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
};

/**
 * get current element style
 * @param element
 * @param styleName
 * @returns {*}
 */
const getStyle = (element, styleName) => {
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    const computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};

/**
 * set dom style
 * @param element
 * @param styleName
 * @param value
 */
const setStyle = (element, styleName, value) => {
  if (!element || !styleName) return;
  if (typeof styleName === 'object') {
    for (let prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop])
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity') {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
};

export {
  create,
  createCanvas,
  getElement,
  remove,
  empty,
  createHidden,
  hasClass,
  addClass,
  removeClass,
  getStyle,
  setStyle
}
