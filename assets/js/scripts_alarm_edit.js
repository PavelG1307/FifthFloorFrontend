const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

function HandleMessage(req) {
    for (key in req.rings) {
        if (req.rings[key].id == id) {
            const ring = req.rings[key]
            document.querySelector('#time').value = IntTimeToStr(ring.time)
            document.querySelector('#active').checked = ring.active
            document.querySelector('#sunrise').checked = ring.sunrise
            document.querySelector('#music').selectedIndex = ring.music
        }
    }
}

function save() {
    const time = document.querySelector('#time').value
    
    const active = document.querySelector('#active').value
    const sunrise = document.querySelector('#sunrise').value
    const music = document.querySelector('#music').value
    const type = (id === "new")?"NEW RING":"EDIT RING"
    if (time == "") {
        error()
        return
    }
    wsApp.doSend({
        type: type,
        time: StrTimeToInt(time),
        active: active,
        sunrise: sunrise,
        music: music,
        id: id
    })
}

function error(){
    new Toast({
        title: false,
        text: 'Ошибка',
        theme: 'warning',
        autohide: true,
        interval: 5000
      });
}

function StrTimeToInt(strTime) {
    return Number(strTime.split(':')[0])*60+Number(strTime.split(':')[1])
}

function IntTimeToStr(intTime) {
    const hours = ('0' + String(Math.floor(intTime / 60))).slice(-2)
    const minutes = ('0' + String(intTime % 60)).slice(-2)
    return `${hours}:${minutes}`
}