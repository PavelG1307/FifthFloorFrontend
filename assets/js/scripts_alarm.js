function HandleMessage(request){
    const container = document.getElementsByClassName('container')[0]
    container.innerHTML = ""
    for (key in request.rings) {
        const ring = request.rings[key]
        const {id,time, active} = ring
        const time_str = IntTimeToStr(time)
        const time_left = timeLeft(time)
        const class_active = active?" active":""
        const ring_el = `<div class="alarm${class_active}" id="${id}"><div class="alarm_container" onclick="onClickAlarm(${id})" oncontextmenu="return long_press(event, 'alarm/edit.html?id=${id}')"><div class="circle"></div><div class="time">${time_str}</div><div class="remains"><p>До будильника</p><p>${time_left}</p></div></div></div>`
        container.insertAdjacentHTML('beforeend', ring_el)
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

function onClickAlarm(id) {
    document.getElementById(id).classList.toggle(active)
}