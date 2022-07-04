function HandleMessage(request){
    const container = document.getElementsByClassName('container')[0]
    for (key in request.rings) {
        ring = request.rings[key]
        const {id,time, active} = ring
        time_str = IntTimeToStr(time)
        time_left = timeLeft(time)
        ring_el = `<div class="alarm" id="${id}"><div class="alarm_container" onclick="document.location.href = './edit.html?id=${id}'"><div class="circle"></div><div class="time">${time_str}</div><div class="remains"><p>До будильника</p><p>${time_left} мин.</p></div></div></div>`
        container.insertAdjacentHTML('beforeend', ring_el)
    }
}

function timeLeft(time) {
    const date = new Date()
    const time_now = date.getHours()*60 + date.getMinutes()
    if (time_now > time) {
        const time_left = time_now - time
    } else {
        const time_left = time - time_now + 1440
    }
    if (time_left < 60) {
        return `${time_left} мин.`
    } else {
        return `${Math.round(time_left/60)} ч. ${time_left%60} мин.`
    }
}

function IntTimeToStr(intTime) {
    const hours = ('0' + String(Math.floor(intTime / 60))).slice(-2)
    const minutes = ('0' + String(intTime % 60)).slice(-2)
    return `${hours}:${minutes}`
}