const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

function HandleMessage(req) {
    for (key in req.ring) {
        if (req.ring[key].id === id) {
            const ring = req.ring[key]
            document.querySelector('#time').value = IntTimeToStr(ring.time)
            document.querySelector('#active').value = ring.active
            document.querySelector('#sunrise').value = ring.sunrise
            document.querySelector('#music').value = ring.music
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
        time: time,
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

function IntTimeToStr(intTime) {
    const hours = ('0' + String(Math.floor(intTime / 60))).slice(-2)
    const minutes = ('0' + String(intTime % 60)).slice(-2)
    return `${hours}:${minutes}`
}