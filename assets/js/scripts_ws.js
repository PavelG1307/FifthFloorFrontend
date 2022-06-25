const token = getCook('token')
console.log(token)
const showpercent = true;

let wsApp = (function(){
  const wsApp = {}
  const wsUrl = document.location.hostname + "/api"
  const type_ws = "ws"
  let websocket;

  wsApp.init = function() {
    StartWebSocket(type_ws + '://' + wsUrl);
  }

  function StartWebSocket(url){
    websocket = new WebSocket(url);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
    websocket.onerror = onError;
  }
  
  function onOpen(evt){
    console.log("CONNECTED")
    if (token && token !='undefined'){
      wsApp.doSend(JSON.stringify({
        type: "CONNECTED",
        token: token
      }))
    } else {
      // goTo("signin.html")
    }
  }

  function onClose(evt){
    document.getElementById('mb').classList.value = 'main_btn'
    console.log("DISCONNECTED")
  }

  function onMessage(evt){
    const message = JSON.parse(evt.data)
    console.log(`Getting data: ${evt.data}`)
    if (message.error) {
      errorHandler(message.error)
      return
    }
    HandleMessage(message)
  }

  function onError(evt){
    console.log(evt.data)
  }

  wsApp.doSend = function(message){
    console.log('Send ' + message);
    websocket.send(message)
  }
  return wsApp
})();

function errorHandler(error) {
  switch (error) {
    case "Token invalid":
      console.log("Tokken invalid")
      // gocument.cookie = "token=undefined"
      // goTo('signin.html')
      break
    
    case "Station not found":
      goTo('new_station.html')
      break

    default:
      console.log('error')
  }
}

window.addEventListener("load", wsApp.init, false)

function goTo(url){
  if (window.location.pathname == "/" + url){} else {
	console.log(window.location.pathname)
	console.log('/'+ url)
	window.location.href = url;
  }
}

function getCook(cookiename) 
  {
  // Get name followed by anything except a semicolon
  let cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}