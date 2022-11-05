station_url = 'http://192.168.4.1/a'

let stationKey = null

if (!stationKey) {
  getData('/station/key', 'get').then((res) => {
    if (!res?.data.key) {
      fastMessage('Произошла ошибка :-( Попробуйте еще раз')
      return
    }
    stationKey = res.data.key
  })
}

let saveData = {}
let pass = 0
async function checkConnect(url, params, method) {
  saveData = { url, params, method }
  if (pass < 2) {
    pass++
    return { data: false }
  }
  pass = 0
  console.log(url)
  if (url) {
    const res = await axios({ method: method || 'get', url: url || station_ur, params: params || { active: 'q' } }).catch(() => { })
    console.log(res)
    return { success: !!res, data: res.data }
  }
  console.log(`Выполнен запрос: ${url || station_url} с параметрами ${JSON.stringify(data) || '(без)'} `)
  return { data: { success: true } }
}

let count = 0
async function zglushka(n) {
  count = count < n ? count + 1 : -1
  return count === -1
}

function next() {
  document.querySelector('#start').classList.add('hiden')
  document.querySelector('#info').classList.remove('hiden')
}


function connect() {
  const error = document.querySelector('#error').classList
  if (!error.contains('hiden')) { error.add('hiden') }
  document.querySelector('#info').classList.add('hiden')
  document.querySelector('#connecting').classList.remove('hiden')
  const { url, data, method } = saveData
  connecting( null, station_url, { active: 'q' }, 'get')
}

function connecting(next, url, data, method) {
  const connecting = 'Подключение...'
  const animation = setInterval(async () => {
    const text = document.querySelector('.connecting')
    const res = await checkConnect(url, data, method)
    console.log(res.data)
    // const res = ''
    if (res && res.success) {
      console.log('succeeesss');
      clearInterval(animation)
      clearInterval(timeout)
      document.querySelectorAll('input').forEach(el => el.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
          send()
        }
      }))
      document.querySelector('#connecting').classList.add('hiden')
      if (next) next('')
      else document.querySelector('#input').classList.remove('hiden')
      if (url)
        return res
    }
    if (text.innerText.length < connecting.length) {
      text.innerText += connecting[text.innerText.length]
    } else {
      text.innerText = ''
    }

  }, 750)
  const timeout = setTimeout(() => {
    clearInterval(animation)
    document.querySelector('#connecting').classList.add('hiden')
    document.querySelector('#error').classList.remove('hiden')
    console.log('Не нашел(')
  }, 10000)
}


async function send() {
  const ssid = document.querySelector('#ssid').value
  const password = document.querySelector('#password').value
  if (!ssid || password.length < 8) {
    fastMessage('Некорректный SSID и/или пароль')
    return
  }
  const params = { ssid, password, key: stationKey }
  const res = await axios({
    url: station_url,
    methods: 'get',
    params
  }).catch(() => { })
  if (!res) {
    fastMessage('Произошла ошибка :-( Попробуйте еще раз')
    return
  }
  document.querySelector('#input').classList.add('hiden')
  document.querySelector('#connecting').classList.remove('hiden')
  goTo('')
  // connecting(goTo, url + '/station/add', { key }, 'post')
}

