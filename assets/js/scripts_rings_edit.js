function HandleMessage(req) {

}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

function save() {
    const time = document.querySelector('#time').value
    const active = document.querySelector('#active').value
    const sunrise = document.querySelector('#sunrise').value
    const music = document.querySelector('#music').value
    console.log({
        time: time,
        active: active,
        sunrise: sunrise,
        music: music
    })
}