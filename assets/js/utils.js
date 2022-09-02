var oReq = new XMLHttpRequest();
// const url = 'http://localhost:8080/api'
const url = 'https://' + document.location.hostname + "/api"
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

function fastMessage(text){
    new Toast({
        title: false,
        text: text,
        theme: 'warning',
        autohide: true,
        interval: 2000
      });
  }