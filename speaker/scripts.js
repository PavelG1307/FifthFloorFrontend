let onlongtouch; 
let timer;
let touchduration = 200; //length of time we want the user to touch before we do something


document.getElementById('btnn').addEventListener("mouseup", ()=>touchend());
document.getElementById('btnn').addEventListener("mousedown", ()=>touchstart());

function touchstart() {
  timer = setTimeout(onlongtouch, touchduration); 
}

function touchend() {
    //stops short touches from firing the event
    if (timer)
        clearTimeout(timer); // clearTimeout, not cleartimeout..
}

onlongtouch = function() {
  document.getElementById('btnn').innerText = 'SUCCESS'
};