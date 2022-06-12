const tokken = "TOKKEN";
const showpercent = true;

let wsApp = (function(){
  const wsApp = {}
  // let wsUrl = "192.168.0.101:8800/"
  const wsUrl = "fifthfloor.ddns.net:8080"
  const type_ws = "wss"
  let outputfl;

  let websocket;

  wsApp.init = function() {
    outputfl = document.getElementById("container");
    TestWebSocket(type_ws + '://' + wsUrl);

  }

  function TestWebSocket(url){
    websocket = new WebSocket(url);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
    websocket.onerror = onError;
  }
  function onOpen(evt){
    console.log("CONNECTED")
    wsApp.doSend(JSON.stringify({tokken: tokken}))
  }
  function onClose(evt){
    document.getElementById('mb').classList.value = 'main_btn'
    console.log("DISCONNECTED")
  }
  function onMessage(evt){
    console.log("Getting data from server")
    ChangeStatus(JSON.parse(evt.data))
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

window.addEventListener("load", wsApp.init, false)

function goTo(url){
  window.location.href = url;
}