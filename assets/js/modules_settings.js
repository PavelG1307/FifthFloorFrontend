const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')


let actions = []
let value = 0
let count_actions = 0

async function addTask() {
  const button = document.getElementById('btn_add')
  const node = await getActionEl(actions, count_actions, value)
  // console.log('asfsafnasfdaksjalkd')
  button.insertAdjacentHTML('beforebegin', node);
  count_actions++
  if (count_actions > 1) {
    button.classList.add('hidden')
  }
}

async function deleteTask(i) {
  document.getElementById('if_' + i).remove()
  count_actions--
  if (count_actions === 1) {
    document.getElementById('btn_add').classList.remove('hidden')
  }
}

async function getActionEl(actions, i, placeholder) {
  let action = `
    <div class="if" id="if_${i}">
      <div class="row">
          <select class="type" value="${i}">
              <option value="0">></option>
              <option value="1"><</option>
          </select>
          <input type="text" class="value" value="${placeholder}">
          <button id="${i}" onclick="deleteTask(id)">x</button>
      </div>
    <select class="action">`
  console.log(actions)
  for (let j = 0; j < actions.length; j++) {
    const act = actions[j].action + ' «' + actions[j].name + '»'
    console.log(act)
    action += `<option value="${actions[j].action_id}"> ${act} </option>`
  }
  action += `</select></div>`
  return action
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
  document.querySelector('.type').textContent = data.type
  document.getElementById('name').setAttribute('value', data.name)
  document.getElementById('room').setAttribute('value', data.location)
}

async function save() {
  const acts = []
  const ifs = document.getElementsByClassName('if')
  for (let i = 0; i < ifs.length; i++) {
    const el = document.querySelectorAll('.if')[i]
    const condition = el.querySelector('.type').value
    const value2 = el.querySelector('.value').value
    const act = document.querySelectorAll('.if')[i].querySelector('.action').selectedOptions[0].value
    const action = {
      id: actions[act[0]].action_id,
      target_module: actions[act[0]].id_module,
      state: Boolean(act[1])
    }
    acts.push({ condition, value2, action })
  }
  const name = document.getElementById('name').value
  const location = document.getElementById('room').value
  console.log({ id, name, location, acts })
  // const res = await axios({
  //   method: 'post',
  //   url: url + '/module/update',
  //   data: { id, name, location, actions }
  // }).catch(e => fastMessage(e))
  // if (res.data.success) {
  //   goTo('modules')
  // } else {
  //   fastMessage(res.data.message || 'Ошибка на сервере')
  // }
}

function del() {
  wsApp.doSend({
    type: 'DELETE MODULE',
    module: id
  })
}

