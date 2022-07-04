function HandleMessage(request){
    const container = document.getElementsByClassName('container')[0]
    for (key in request.rings) {
        ring = request.rings[key]
        const {id,time, active} = ring
        timestr = IntTimeToStr(time)
        const time_left = 25
        ring_el = `<div class="alarm" id="${id}"><div class="alarm_container" onclick="document.location.href = './edit.html?id=${id}'"><div class="circle"></div><div class="time">${time_str}</div><div class="remains"><p>До будильника</p><p>${time_left} мин.</p></div></div></div>`
        container.insertAdjacentHTML('beforeend', ring_el)
    }
}

function IntTimeToStr(intTime) {
    const hours = ('0' + String(Math.floor(intTime / 60))).slice(-2)
    const minutes = ('0' + String(intTime % 60)).slice(-2)
    return `${hours}:${minutes}`
}