const token = getCook('token')
console.log(token)
const showpercent = true;

let wsApp = (function(){
  const wsApp = {}
  const type_ws = "wss"
  const wsUrl = type_ws + '://' + document.location.hostname + "/api"
  let websocket;

  wsApp.init = function() {
    StartWebSocket(wsUrl);
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
      wsApp.doSend({
        type: "CONNECTED"
      })
    } else {
      goTo("/signin.html")
    }
  }

  function onClose(evt){
    document.getElementById('mb').classList.value = 'main_btn'
    console.log("DISCONNECTED")
    setTimeout(function(){StartWebSocket(wsUrl)}, 1000)
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
    message.token = token
    websocket.send(JSON.stringify(message))
    console.log('Send ' + JSON.stringify(message));
  }
  return wsApp
})();

function errorHandler(error) {
  switch (error) {
    case "Token invalid":
      console.log("Tokken invalid")
      // gocument.cookie = "token=undefined"
      goTo('signin.html')
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
  let cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}