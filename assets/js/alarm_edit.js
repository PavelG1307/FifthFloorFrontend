const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let id = urlParams.get('id')

function switchParam(id) {
  const button = document.getElementById(id) 
  button.classList.toggle('active')
  console.log(button)
  if (id === 'mode') {
    button.innerText = button.classList.contains('active') ? 'Выключить' : 'Включить'
  }
}

async function getRings() {
  const res = await getData(`/ring?id=${id}`, 'get', {})
  if (res) await setData(res.data)
}

async function setData(data) {
  console.log(data)
  if (isNaN(data) || (id !== 'new' && !data[0])) {
    fastMessage('Будильник не найден')
    return
  }
  if (id === 'new'){
    id = data
    const date = new Date()
    document.querySelector('#time').value = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2)
    return
  }
  if (data[0].active) document.querySelector('#mode').classList.add('active')
  if (data[0].sunrise) document.querySelector('#sunrise').classList.add('active')
  document.querySelector('#time').value = IntTimeToStr(data[0].time)
  document.querySelector('#music').selectedIndex = data[0].music
  console.log(data[0])
}
// function HandleMessage(req) {

//     } else if (req.type == 'SAVE RING') {
//         toast(req.state?"Будильник включен":"Будильник выключен")
//         document.location.href = './'
//     }
// }


async function del(){
  const res = await getData('/ring/visible', 'post', {state: false, id})
  if (res) goTo('alarm')
}


async function save() {
    const time = document.querySelector('#time').value
    const active = document.querySelector('#mode').classList.contains('active')
    const sunrise = document.querySelector('#sunrise').classList.contains('active')
    const music = document.querySelector('#music').value
    const type = (id === "new") ? 'post' : 'get'

    if (time == "") {
        fastMessage('Укажите время!')
        return
    }

    const res = await getData(`/ring/edit`, 'post',
    {
          time: StrTimeToInt(time),
          active,
          sunrise,
          music: Number(music),
          id: Number(id)
      })
      if(res) {
        goTo('alarm')
      }
}
