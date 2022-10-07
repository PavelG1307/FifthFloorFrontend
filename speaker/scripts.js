// let onlongtouch; 
// let timer;
// let touchduration = 200; //length of time we want the user to touch before we do something


document.getElementById('btnn')
// document.getElementById('btnn').addEventListener("mousedown", ()=>touchstart());

// function touchstart() {
//   timer = setTimeout(onlongtouch, touchduration); 
// }

// function touchend() {
//     //stops short touches from firing the event
//     if (timer)
//         clearTimeout(timer); // clearTimeout, not cleartimeout..
// }

// onlongtouch = function() {
//   document.getElementById('btnn').innerText = 'SUCCESS'
// };



const button = document.getElementById('btnn');
let startpos = -1
button.onmousedown = function (ev) {
    if (startpos < 0) {
        startpos = button.offsetWidth
    }
    // button.style.position = 'absolute'
  moveAt(ev);
  document.body.appendChild(button);
  button.style.zIndex = 1000;
  function moveAt(e) {
    const marg = 2 * e.pageX - button.offsetWidth / 2 - startpos
    if (marg<100 && marg>-100) {
        button.style.marginLeft = marg + 'px';
    }
    // button.style.top = e.pageY - button.offsetHeight / 2 + 'px';
  }
  document.onmousemove = function(ev) {
    moveAt(ev);
  }
  
}

button.onmouseup = function() {
  document.onmousemove = null;
  document.onmousedown = null;
  startpos = -1
  button.style.marginLeft = 0
}