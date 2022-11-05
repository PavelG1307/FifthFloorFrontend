const token = getCook('access_token')
const showpercent = true;

let wsApp = (function(){
  const wsApp = {}
  const type_ws = "wss"
  const wsUrl = 'ws://localhost:8080'
  // const wsUrl = 'wss://fifthfloor.site/ws'
  // const wsUrl = type_ws + '://' + document.location.hostname + "/ws"
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
    websocket.send(JSON.stringify({token}))
  }

  function onClose(evt){
    document.getElementById('mb').classList.value = 'main_btn'
    console.log("DISCONNECTED")
    setTimeout(function(){StartWebSocket(wsUrl)}, 1000)
  }

  function onMessage(evt){
    const message = JSON.parse(evt.data)
    // console.log(`Getting data: ${evt.data}`)
    if (message?.type === 'notification') {
      return fastMessage(message?.text)
    }
    if (message.success) {
      wsHandler(message)
      return
    }
  }

  function onError(evt){
    console.log(evt.data)
    fastMessage('Соединение разорвано!')
  }

  return wsApp
})();

window.addEventListener("load", wsApp.init, false)



