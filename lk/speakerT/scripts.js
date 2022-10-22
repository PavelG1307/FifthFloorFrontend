const valueEl = document.getElementById('value') 
const path = document.getElementById('path')
const indicator = document.getElementById('indicator')
let value = 0
function setLevel(level) {
  console.log(level)
  value = mapToPercent(level)
  valueEl.innerText = value
  path.style = `stroke-dashoffset: calc((1 - ${level} / 360) * 620);`
  indicator.style = `-webkit-transform: rotateZ(${level}deg); transform: rotateZ(${level}deg);`
}

// setLevel(350)

const wheel = document.getElementsByClassName('wheel')[0]
let isDrawing = false

const bg = document.querySelector('#icon')

wheel.addEventListener('mousedown', ()=>{
  return isDrawing = true;
})

wheel.addEventListener('touchstart', ()=>{
  return isDrawing = true;
})

wheel.addEventListener('mouseup', ()=>{
  return isDrawing = false;
})

wheel.addEventListener('touchend', ()=>{
  return isDrawing = false;
})

wheel.addEventListener('touchmove', getAngle)
wheel.addEventListener('mousemove', getAngle)

function getAngle(e) {
  let angle, center_x, center_y, delta_x, delta_y, pos_x, pos_y, touch
  if (isDrawing) {
    touch = 0;
    if (e?.originalEvent?.touches) {
      touch = e.originalEvent.touches[0]
    }
    center_x = (wheel.clientWidth / 2) + wheel.getBoundingClientRect().left;
    center_y = (wheel.clientHeight / 2) + wheel.getBoundingClientRect().top;
    pos_x = e.pageX || touch.pageX;
    pos_y = e.pageY || touch.pageY;
    delta_y = center_y - pos_y;
    delta_x = center_x - pos_x;
    angle = Math.atan2(delta_y, delta_x) * (180 / Math.PI);
    angle -= 90;
    if (angle < 0) {
      angle = 360 + angle;
    }
    angle = Math.round(angle);
    setLevel(angle)
  }
}

function mapToPercent(angle) {
  return Math.round(angle * 0.277777)
}
    