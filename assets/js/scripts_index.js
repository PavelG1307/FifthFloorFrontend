var oReq = new XMLHttpRequest();

const stat = {
    "tokken": "TOKKEN2",
    "light": false,
    "speaker": false,
    "guard": false
}

function ChangeState(id){
    document.getElementById(id).classList.toggle('active')
    if (id == 'speaker') {
        stat.speaker = !stat.speaker
        wsApp.doSend({
            type: "SET SPEAKER",
            volume: stat.speaker
        })
    }
}

function ChangeStateMb(){
    stat.light = !stat.light
    const on_el = document.getElementById('on_btn').classList
    const off_el = document.getElementById('off_btn').classList
    if (stat.light){
        on_el.value = ''
        off_el.value = 'active'
    } else {
        on_el.value = 'active'
        off_el.value = ''
    }
    wsApp.doSend({
        type: "SET BRIGHTNESS",
        brightness: stat.light
    })
}

function long_press(event, url) {
    event = event || window.event;
    event.cancelBubble = true;
    goTo(url);
    return false;
}

function PutOnGuard(event){
    event = event || window.event;
    event.cancelBubble = true;
    wsApp.doSend({
        "type": "GUARD",
        "value": stat.guard
    })
    console.log("Change guard")
    return false
}

function HandleMessage(request) {
    if (request["type"] == "status") {
        const main_btn = document.getElementById('mb').classList
        if (request["active"]) {
        main_btn.value = 'main_btn active'
        } else {
        main_btn.value = 'main_btn yellow'
        }
        document.getElementById("time").innerHTML = IntTimeToStr(request["time"]);
        document.getElementById("battery").innerHTML = BatteryCharge(request["battery"]);
        if (request.lamp == 0) {
            stat.light = false
            document.getElementById('on_btn').classList.value = 'active'
            document.getElementById('off_btn').classList.value = ''
        } else {
            stat.light = true
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
            stat.speaker = true
            speaker.add('active')
        } else {
            stat.speaker = false
            speaker.remove('active')
        }
        const sensors = document.getElementById('sensors').classList
        if (request.guard){
            stat.guard = true
            sensors.value = 'btn active';
        } else {
            stat.guard = false
            sensors.value = 'btn yellow'
        }
    } else if (request.type === 'guard') {
        if (request.message === 'Success') {
            if (request.state) {
                data = 'Успешная постановка на охрану'
                stat.guard = true
                document.querySelector('#sensors').classList.value = 'btn active'
            } else {
                data = 'Успешное снятие с охраны'
                stat.guard = false
                document.querySelector('#sensors').classList.value = 'btn yellow'
            }
            new Toast({
                title: false,
                text: data,
                theme: 'light',
                autohide: true,
                interval: 10000
              });
        } else {
            new Toast({
                title: false,
                text: 'Ошибка',
                theme: 'warning',
                autohide: true,
                interval: 5000
              });
        }
    }
};

function IntTimeToStr(intTime) {
const hours = ('0' + String(Math.floor(intTime / 60))).slice(-2)
const minutes = ('0' + String(intTime % 60)).slice(-2)
return `${hours}:${minutes}`
}

function BatteryCharge(val) {
if (showpercent) {
    return String(Math.floor((val - 6)/(8.2 - 6))) + '%';
} else {
    return String(val) + 'V';
}
}



