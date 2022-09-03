var oReq = new XMLHttpRequest();
// const url = 'http://localhost:8080/api'
const url = 'https://fifthfloor.site/api'
const token2 = ((cookiename) => {
  let cookiestring = RegExp(cookiename + "=[^;]+").exec(document.cookie);
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
})('token')
axios.defaults.headers.get['Authorization'] = 'Bearer ' + token2
axios.defaults.headers.post['Authorization'] = 'Bearer ' + token2

async function goTo(url) {
  if (window.location.pathname == "/" + url) { } else {
    window.location.href = document.location.origin + '/' + url;
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