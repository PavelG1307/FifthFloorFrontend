const tokken = "TOKKEN"

let wsApp = (function(){
  let wsApp = {}
  let wsUrl = "ws://192.168.0.101:8800/"
  let outputfl;

  let websocket;

  wsApp.init = function() {
    outputfl = document.getElementById("container");
    TestWebSocket();
  }

  function TestWebSocket(){
    websocket = new WebSocket(wsUrl);
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
    console.log(evt.data)
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

function ChangeStatus(request) {
  if (request["active"]) {
      document.getElementById('mb').classList.value = 'main_btn active'
  } else {
      document.getElementById('mb').classList.value = 'main_btn yellow'
  }
  document.getElementById("time").innerHTML = request["time"];
  document.getElementById("battery").innerHTML = request["battery"];
  if (request > 0) {
      document.getElementById('on_btn').classList.value = 'active'
      document.getElementById('off_btn').classList.value = ''
  } else {
      document.getElementById('on_btn').classList.value = ''
      document.getElementById('off_btn').classList.value = 'active'
  }
  if (Object.keys(request.rings).length > 0){
      document.getElementById('alarm').classList.add('active')
  } else {
      document.getElementById('alarm').classList.remove('active')
  }
  if (request.speaker > 0) {
      document.getElementById('speaker').classList.add('active')
  } else {
      document.getElementById('speaker').classList.remove('active')
  }
};

