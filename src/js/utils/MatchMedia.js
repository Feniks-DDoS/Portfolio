import PxToRem from "./pxToRem.js";

const MatchMedia = { 
  get laptop() {
    return window.matchMedia(`(max-width: ${PxToRem(1440.98)}rem)`).matches
  },
   get tablet() {
    return window.matchMedia(`(max-width: ${PxToRem(1023.98)}rem)`).matches
  },
  get mobile() {
    return window.matchMedia(`(max-width: ${PxToRem(767.98)}rem)`).matches
  },
}

export default MatchMedia