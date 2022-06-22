var oReq = new XMLHttpRequest();

const stat = {
    "tokken": "TOKKEN2",
    "light": false,
    "speaker": false
}

function ChangeState(id){
    document.getElementById(id).classList.toggle('active')
}

function ChangeStateMb(){
    stat.light = !stat.light
    const on_el = document.getElementById('on_btn').classList
    const off_el = document.getElementById('off_btn').classList
    if (stat.light){
        on_el.value = 'active'
        off_el.value = ''
    } else {
        on_el.value = ''
        off_el.value = 'active'
    }
    wsApp.doSend(JSON.stringify({
        tokken: tokken,
        light: stat.light
    }))
}

var $j = jQuery.noConflict();

function long_press(event, url) {
    event = event || window.event;
    event.cancelBubble = true;
    goTo(url);
    return false;
}

function PutOnGuard(event){
    event = event || window.event;
    event.cancelBubble = true;
    console.log("Change guard")
    return false
}

function HandleMessage(request) {
    const main_btn = document.getElementById('mb').classList
    if (request["active"]) {
      main_btn.value = 'main_btn active'
    } else {
      main_btn.value = 'main_btn yellow'
    }
    document.getElementById("time").innerHTML = IntTimeToStr(request["time"]);
    document.getElementById("battery").innerHTML = BatteryCharge(request["battery"]);
    if (request > 0) {
        stat.light = true
        document.getElementById('on_btn').classList.value = 'active'
        document.getElementById('off_btn').classList.value = ''
    } else {
        stat.light = false
        document.getElementById('on_btn').classList.value = ''
        document.getElementById('off_btn').classList.value = 'active'
    }
  
    const alarm = document.getElementById('alarm').classList
    if (Object.keys(request.rings).length > 0){
        alarm.add('active')
    } else {
        alarm.remove('active')
    }
  
    const speaker = document.getElementById('speaker').classList
    if (request.speaker > 0) {
        speaker.add('active')
    } else {
        speaker.remove('active')
    }
    const sensors = document.getElementById('sensors').classList
    if (request.guard){
        sensors.value = 'btn active';
    } else {
        sensors.value = 'btn yellow'
    }
};

function IntTimeToStr(intTime) {
const hours = ('0' + String(Math.floor(intTime / 60))).slice(-2)
const minutes = ('0' + String(intTime % 60)).slice(-2)
return `${hours}:${minutes}`
}

function BatteryCharge(val) {
if (showpercent) {
    return String(Math.floor((val - 6)/(8.2 - 6)*100)) + '%';
} else {
    return String(val) + 'V';
}
}



