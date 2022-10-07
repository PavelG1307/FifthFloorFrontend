let delay
function listenLongClick(element, callback, longpress) {
  element.addEventListener('touchstart', setTimer, true)
  element.addEventListener('mousedown', setTimer, true)
  function setTimer() {
    delay = setTimeout(callback, longpress || 300);
  }  
  element.addEventListener('mouseup', () => clearTimeout(delay))
  element.addEventListener('touchend', () => clearTimeout(delay))
  element.addEventListener('mouseup', function (e) {
    // On mouse up, we know it is no longer a longpress
    clearTimeout(delay);
  })
}