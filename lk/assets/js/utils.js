var oReq = new XMLHttpRequest();
const dev = document.location.hostname === '127.0.0.1'
const url = false ? 'http://localhost:8080/api' : 'https://fifthfloor.site/api'

const cookiestring = RegExp('token=[^;]+').exec(document.cookie);
const token2 =  decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
const config = { Authorization: `Bearer ${token2}` }


async function goTo(url) {
  if (window.location.pathname !== "/" + url) {
    window.location.href = document.location.origin + '/lk/' + url;
  }
}

function getCook(cookiename) {
  const cookiestring = RegExp(cookiename + "=[^;]+").exec(document.cookie);
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
}

function fastMessage(text) {
  new Toast({
    title: false,
    text: text,
    theme: 'warning',
    autohide: true,
    interval: 2000
  });
}

function IntTimeToStr(intTime) {
  const hours = ('0' + String(Math.floor(intTime / 60))).slice(-2)
  const minutes = ('0' + String(intTime % 60)).slice(-2)
  return `${hours}:${minutes}`
}

function StrTimeToInt(strTime) {
    return Number(strTime.split(':')[0])*60+Number(strTime.split(':')[1])
}

async function getData(path, method, data) {
  const handlError = {
    'Авторизируйтесь!': '/lk/auth',
    'Станция не найдена': '/lk/station/new'
  }
  const res = await axios({
    method,
    url: url + (path || ''),
    data,
    headers: config
  }).catch(e => fastMessage(e))
  if (res.data && res.data.success) {
    return res.data
  } else {
    const message = res.data.message
    if (message in handlError) {
      document.location.href = window.location.href = document.location.origin + handlError[message];
      return
    }
    fastMessage(message || 'Ошибка на сервере')
  }
}

settings = {}

async function getSettings() {
  const res = await getData('/settings', 'get', {})
  if (res.success) {
      Object.assign(settings, res.data)
      try {
        if (fillPage) fillPage()
      } catch {}
  }
}

function redirect() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    if (document.location.pathname.includes('/pc/lk')) {
      document.location.href = document.location.origin + '/lk'
    }
  } else {
    if (!document.location.pathname.includes('/pc/lk')) {
      document.location.href = document.location.origin + '/pc/lk'
    }
  }
}
redirect()
