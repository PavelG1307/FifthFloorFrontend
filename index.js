const stat = {
  "light": false,
  "speaker": false,
  "guard": false
}

function ChangeState(id) {
  
  if (id == 'speaker') {
    const res = getData('/station/speaker', 'post', 
    {
      'volume': !stat.speaker ? 100 : 0
    })
    if (res) {
      stat.speaker = !stat.speaker
      document.getElementById(id).classList.toggle('active')
    }
  }
  
}

async function ChangeStateMb() {
  stat.light = !stat.light
  const on_el = document.getElementById('on_btn').classList
  const off_el = document.getElementById('off_btn').classList
  const res = await getData('/station/brightness', 'post', 
    {
      "brightness": stat.light ? 100 : 0
    })
    if (res) {
      if (stat.light) {
        on_el.value = ''
        off_el.value = 'active'
      } else {
        on_el.value = 'active'
        off_el.value = ''
      }
    }
}

function long_press(event, url) {
  // event = event || window.event;
  // event.cancelBubble = true;
  // goTo(url);
  // return false;
}

listenLongClick(document.getElementById('speaker'), ()=>{goTo('./speaker')}, 250)
listenLongClick(document.getElementById('sensors'), ()=>{PutOnGuard()}, 250)

function PutOnGuard(event) {
  event = event || window.event;
  event.cancelBubble = true;
  wsApp.doSend({
    "type": "GUARD",
    "value": !stat.guard
  })
  return false
}

function error(error) {
  console.log(error)
  if (error === 'Токен не верен') {
    goTo('signin.html')
  }
}

async function getStatus() {
  const res = await getData('/station/status', 'get', {})
  if (res) {
    setStatus(res.data)
  }
}

function wsHandler(request) {
  if (request["type"] == "status") {
    setStatus(request.data)
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
}

function setStatus(status) {
  const main_btn = document.getElementById('mb').classList
  if (status["active"]) {
    main_btn.value = 'main_btn active'
  } else {
    main_btn.value = 'main_btn yellow'
  }
  document.getElementById("time").innerHTML = IntTimeToStr(status["time"]);
  document.getElementById("battery").innerHTML = BatteryCharge(status["battery"]);
  const off = status.lamp === 0
  stat.light = off
  document.getElementById('on_btn').classList.value = off ? 'active' : ''
  document.getElementById('off_btn').classList.value = !off ? 'active' : ''
  const alarm = document.getElementById('alarm').classList
  if (status.rings && status.rings[0]) {
    alarm.add('active')
  } else {
    alarm.remove('active')
  }

  const speaker = document.getElementById('speaker').classList
  stat.speaker = status.speaker > 0
  if (stat.speaker) {
    speaker.add('active')
  } else {
    speaker.remove('active')
  }
  const sensors = document.getElementById('sensors').classList
  stat.guard = status.guard
  sensors.value = status.guard ? 'btn active' : 'btn yellow';
};

function BatteryCharge(val) {
  if (showpercent) {
    const v = Math.floor((val - 6) / (8.2 - 6))
    return String( v >= 0 ? v : 0) + '%';
  } else {
    return String(val) + 'V';
  }
}
getStatus()


