const valueEl = document.getElementById('value') 
const path = document.getElementById('path')
const indicator = document.getElementById('indicator')
let value = 0
function setLevel(level) {
  value = mapToPercent(level)
  valueEl.innerText = value
  path.style = `stroke-dashoffset: calc((1 - ${level} / 360) * 620);`
  indicator.style = `-webkit-transform: rotateZ(${level}deg); transform: rotateZ(${level}deg);`
}

// setLevel(350)
function preventBehavior(e) {
  e.preventDefault(); 
};

document.addEventListener("touchmove", preventBehavior, {passive: false});

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

wheel.addEventListener('touchend', saveValue)
async function saveValue () {
  isDrawing = false
  const res = await getData('/station/speaker', 'post', { volume: value })
  if (res?.success) fastMessage('Громкость установлена')
}

wheel.addEventListener('touchmove', getAngle)
wheel.addEventListener('mousemove', getAngle)

function getAngle(e) {
  let angle, center_x, center_y, delta_x, delta_y, pos_x, pos_y, touch
  if (isDrawing) {
    touch = 0;
    if (e?.targetTouches) {
      touch = e.targetTouches[0]
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
  return Math.floor(angle * 0.277777)
}
function mapToAngle(percent) {
  return percent * 3.65
}
async function getValue () {
  const res = await getData('/station/status', 'get')
  if (res?.success) {
    const value = res?.data?.speaker
    console.log(value)
    const angle = mapToAngle(value)
    setLevel(angle)
  }
}

getValue()