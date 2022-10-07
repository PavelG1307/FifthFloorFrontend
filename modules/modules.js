
function wsHandler(request) {
  if (request.type === "status") {
    setStatus(request.data.modules)
  }
}

async function getStatus() {
  const res = await getData('/module', 'get', {})
  console.log(res.data)
  setStatus(res.data)
}

function setStatus(modules) {
  const parrent = document.getElementById("container")
  parrent.innerHTML = ""
  for (const key in modules) {
    const sens = modules[key]
    const elem = document.createElement('div');
    const elem_cont = document.createElement('div');
    const elem_name = document.createElement('div');
    elem.setAttribute("id", sens.id_module);
    if (sens['mode'] !== 'managed') {
      elem.setAttribute("onclick", "openSettings(id)")
    } else {
      elem.setAttribute("onclick", "changeStatus(id)")
      // elem.setAttribute("oncontextmenu", `return long_press(event,${sens.id_module})`)
      listenLongClick(elem, ()=>{openSettings(id)}, 250)
    }
    let elem_value
    if ( sens.image ) {
      elem_value = document.createElement("img");
      elem_value.setAttribute("src", '../' + sens.image);
    } else {
      elem_value = document.createElement('div');
      elem_value.appendChild(document.createTextNode(sens.last_value + sens.units || ''));
      elem_value.classList.value = "value"
    }
    const elem_location = document.createElement('div');
    const elem_circle = document.createElement('div');
    elem_name.appendChild(document.createTextNode(sens["name"]));
    elem_location.appendChild(document.createTextNode(sens["location"]));
    if (sens["active"]) {
      elem.classList.value = "sensor active"
    } else {
      if (sens["type"] < 10 || (sens["type"] < 30 && sens["type"] >= 20)) {
        elem.classList.value = "sensor yellow"
      } else {
        elem.classList.value = "sensor"
      }
    }
    elem_name.classList.value = "name"
    elem_location.classList.value = "location"
    elem_circle.classList.value = "circle"
    elem_cont.classList.value = "sensor_container"

    elem_cont.appendChild(elem_name)
    elem_cont.appendChild(elem_value)
    elem_cont.appendChild(elem_location)
    elem_cont.appendChild(elem_circle)
    elem.appendChild(elem_cont)

    parrent.appendChild(elem);
  }
}

function changeStatus(id) {
  btn_module = document.getElementById(id).classList
  const res = getData('/module/set', 'post', {
    id,
    state: !btn_module.contains('active')
  })
  if (res) {
    btn_module.toggle('active')
  }
}

function openSettings(id) {
  window.location.href = `./settings/index.html?id=${id}`
}

// function long_press(event, id) {
//   event = event || window.event;
//   event.cancelBubble = true;
//   openSettings(id)
//   return false;
// }