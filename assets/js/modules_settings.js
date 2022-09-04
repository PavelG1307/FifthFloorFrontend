const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')


let actions = []
let value = 0

async function getActionEl(actions, i, placeholder) {
  let action = `
    <div class="if">
      <div class="row">
          <select id="type">
              <option value="0">></option>
              <option value="1"><</option>
          </select>
          <input type="text" id="value_${i}" placeholder="${placeholder}">
          <button id="btn" onclick="deleteTask(id)">x</button>
      </div>
    <select id="action">`
  for (const i in actions) {
    const action_true = actions[i].action_true + ' «' + actions[i].name + '»'
    const action_false = actions[i].action_false + ' «' + actions[i].name + '»'
    action += `<option value="${2*i}"> ${action_true} </option>`
    action += `<option value="${2*i + 1}"> ${action_false} </option>`
  }
  action += `</select></div>`
  return action
}

let count_actions = 0
async function addTask() {
  const button = document.getElementById('btn_add')
  const node = await getActionEl(actions, count_actions, value)
  console.log('asfsafnasfdaksjalkd')
  // button.insertAdjacentHTML('beforebegin', node);
  count_actions++
  if (count_actions > 1) {
    button.remove()
  }
}


async function getModule() {
  const res = await axios({
    method: 'get',
    url: url + '/module/' + id
  }).catch(e => fastMessage(e))
  if (res.data.success) {
    actions = res.data.actions
    value = res.data.data.last_value
    setData(res.data.data)
  } else {
    if (res.data.message === 'Авторизируйтесь!') {
      document.location.href = window.location.href = document.location.origin + '/auth.html';
      return
    }
    fastMessage(res.data.message || 'Ошибка на сервере')
  }
}

function setData(data) {
  document.getElementById('name').setAttribute('value', data.name)
  document.getElementById('room').setAttribute('value', data.location)
}

async function save() {
  const name = document.getElementById('name').value
  const location = document.getElementById('room').value
  const res = await axios({
    method: 'post',
    url: url + '/module/update',
    data: { id, name, location }
  }).catch(e => fastMessage(e))
  if (res.data.success) {
    goTo('modules')
  } else {
    // if (res.data.message === 'Авторизируйтесь!') {
    //   document.location.href = window.location.href = document.location.origin + '/auth.html';
    //   return
    // }

    fastMessage(res.data.message || 'Ошибка на сервере')
  }
}

function del() {
  wsApp.doSend({
    type: 'DELETE MODULE',
    module: id
  })
}

