function setLevel(level) {
  console.log(level)
  const path = document.getElementById('path')
  path.style = `stroke-dashoffset: calc((1 - ${level} / 360) * 620);`
  const indicator = document.getElementById('indicator')
  indicator.style = `-webkit-transform: rotateZ(${level}deg); transform: rotateZ(${level}deg);`
}

// setLevel(350)

const wheel = document.getElementsByClassName('wheel')[0]
let isDrawing = false;
let rect = wheel.getBoundingClientRect();
console.log(rect.x, rect.y);
let x = 142
let y = 138

// wheel.addEventListener('mousedown', (ev)=>{console.log(ev)})
// wheel.addEventListener('mousemove', (ev)=>{console.log(ev)});

wheel.addEventListener('click', move)
const move = (e) => {
  if (isDrawing) {
    const dy = e.offsetY - y 
    const dx = e.offsetX - x
    const an =  Math.atan(dy / dx)
    if (dx > 0) {
      deg_an = 90 + (an * 180) / Math.PI
    } else {
      deg_an = 270 + (an * 180) / Math.PI
    }
    // console.log(deg_an)
    setLevel(Math.floor(deg_an))
    // x = e.offsetX;
    // y = e.offsetY;
  }
}