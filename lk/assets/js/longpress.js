function listenLongClick(element, callbackLongClick, longpress, callbackClick) {
  element.addEventListener('touchstart', setTimer, true)
  element.addEventListener('mousedown', setTimer, true)
  function setTimer() {
    delay = setTimeout(callbackLongClick, longpress || 300);
  }  
  element.addEventListener('mouseup', () => clearTimeout(delay))
  element.addEventListener('touchend', () => clearTimeout(delay))
  element.addEventListener('mouseup', function (e) {
    // On mouse up, we know it is no longer a longpress
    clearTimeout(delay);
    if (callbackClick) callbackClick()
  })
}