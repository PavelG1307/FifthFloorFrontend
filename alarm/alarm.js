

async function getRings() {
    const res = await axios({
        method: 'get',
        url: url + '/ring?visible=true'
      }).catch(e => fastMessage(e))
      if (res.data.success) {
        setData(res.data.data)
      } else {
        if (res.data.message === 'Авторизируйтесь!') {
          document.location.href = window.location.href = document.location.origin + '/auth.html';
          return
        }
        fastMessage(res.data.message || 'Ошибка на сервере')
      }
}

async function setData(data){
    const container = document.getElementsByClassName('container')[0]
    container.innerHTML = ""
    for (i in data) {
        const ring = data[i]
        const {id,time, active} = ring
        const time_str = IntTimeToStr(time)
        const time_left = timeLeft(time)
        const class_active = active?" active":""
        const ring_el = `<div class="alarm${class_active}" id="${id}"><div class="alarm_container" onclick="onClickAlarm(${id})" oncontextmenu="return long_press(event, 'alarm/edit?id=${id}')"><div class="circle"></div><div class="time">${time_str}</div><div class="remains"><p>До будильника</p><p>${time_left}</p></div></div></div>`
        container.insertAdjacentHTML('beforeend', ring_el)
    }
    if (data.length > 4) {
        document.querySelector('.add').classList.add('hidden')
    }
}

function timeLeft(time) {
    const date = new Date()
    const time_now = date.getHours()*60 + date.getMinutes()
    let time_left
    if (time_now < time) {
        time_left = time - time_now
    } else {
        time_left = time_now - time + 1440
    }
    if (time_left < 60) {
        return `${time_left} мин.`
    } else {
        return `${Math.floor(time_left/60)} ч. ${time_left%60} мин.`
    }
}

function IntTimeToStr(intTime) {
    const hours = ('0' + String(Math.floor(intTime / 60))).slice(-2)
    const minutes = ('0' + String(intTime % 60)).slice(-2)
    return `${hours}:${minutes}`
}

function long_press(event, url) {
    event = event || window.event;
    event.cancelBubble = true;
    goTo(url);
    return false;
}

function newRing(){
    const count = document.querySelectorAll('.alarm').length
    if (count < 5) document.location.href='./edit.html?id=new'
    else fastMessage('Максимальное количество будильников')
}

async function onClickAlarm(id) {
    const el_alarm = document.getElementById(id).classList
    const res = await getData('/ring/active', 'post', { id, state: !el_alarm.contains('active')})
    if (res) el_alarm.toggle('active')
}