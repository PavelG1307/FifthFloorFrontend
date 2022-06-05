var oReq = new XMLHttpRequest();

function ChangeState(id){
    document.getElementById(id).classList.toggle('active')
}

function ChangeStateMb(){
        document.getElementById('on_btn').classList.toggle('active')
        document.getElementById('off_btn').classList.toggle('active')
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

function ChangeStatus(request) {
    const main_btn = document.getElementById('mb').classList
    if (request["active"]) {
      main_btn.value = 'main_btn active'
    } else {
      main_btn.value = 'main_btn yellow'
    }
    document.getElementById("time").innerHTML = IntTimeToStr(request["time"]);
    document.getElementById("battery").innerHTML = BatteryCharge(request["battery"]);
    if (request > 0) {
        document.getElementById('on_btn').classList.value = 'active'
        document.getElementById('off_btn').classList.value = ''
    } else {
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



