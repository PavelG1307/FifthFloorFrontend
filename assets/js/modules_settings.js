const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

let mode = null
let actions = []
let value = 0
let count_actions = 0
let type_value = ''

async function addTask() {
  if (!(['info', 'protection'].includes(mode))) {
    return
  }
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
  const bool = type_value === 'bool'
  let action = `
    <div class="if" id="if_${i}">
      <div class="row">
          <select class="type ${bool ? 'bool' : ''}" value="${i}">
              <option value="0">${bool ? 'Сработал' : '>'}</option>
              <option value="1">${bool ? 'После срабатывания' : '<'}</option>
          </select>
          <input type="text" class="value  ${bool ? 'hidden' : ''}" value="${placeholder}">
          <button id="${i}" onclick="deleteTask(id)">x</button>
      </div>
    <select class="action">`
  for (let j = 0; j < actions.length; j++) {
    const act = actions[j].action + ' «' + actions[j].name + '»'
    action += `<option value="${j}"> ${act} </option>`
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
    mode = res.data.data.mode
    type_value = res.data.data.value_type
    await setData(res.data.data)
  } else {
    if (res.data.message === 'Авторизируйтесь!') {
      document.location.href = window.location.href = document.location.origin + '/auth.html';
      return
    }
    fastMessage(res.data.message || 'Ошибка на сервере')
  }
}

async function setData(data) {
  if (!(['info', 'protection'].includes(data.mode))) document.querySelector('#btn_add').remove()
  document.querySelector('.type').textContent = data.type
  document.getElementById('name').setAttribute('value', data.name)
  document.getElementById('room').setAttribute('value', data.location)
  if (data.actions) {
    let elem = ''
    for (const i in data.actions) {
      count_actions++
      elem += await setActionEl(data.actions[i], data.last_value, i)
    }
    const button = document.getElementById('btn_add')
    button.insertAdjacentHTML('beforebegin', elem);
    
    if (count_actions > 1) {
      button.classList.add('hidden')
    }
  }
}

async function save() {
  const acts = []
  const ifs = document.getElementsByClassName('if')
  for (let i = 0; i < ifs.length; i++) {
    const el = document.querySelectorAll('.if')[i]
    const condition = Number(el.querySelector('.type').value)
    let value2
    if (type_value === 'var') {
      value2 = Number(el.querySelector('.value').value)
    } else {
      value2 = null
    }
    const act = document.querySelectorAll('.if')[i].querySelector('.action').selectedOptions[0].value
    const action = {
      id: actions[act[0]].action_id,
      target_module: actions[act[0]].id_module,
    }
    acts.push(Object.assign({ condition, value: value2 }, action))
  }
  const name = document.getElementById('name').value
  const location = document.getElementById('room').value
  console.log({ id, name, location, actions: acts })
  const res = await axios({
    method: 'post',
    url: url + '/module/update',
    data: { id, name, location, actions: acts }
  }).catch(e => fastMessage(e))
  if (res.data.success) {
    goTo('modules')
  } else {
    fastMessage(res.data.message || 'Ошибка на сервере')
  }
}

function del() {
  wsApp.doSend({
    type: 'DELETE MODULE',
    module: id
  })
}

async function setActionEl(act, val, i) {
  const bool = type_value === 'bool'
  let action = `
    <div class="if" id="if_${i}">
      <div class="row">
          <select class="type ${bool ? 'bool' : ''}" value="${i}">
              <option value="0" ${act.condition === 0 ? 'selected' : ''}>${bool ? 'Сработал' : '>'}</option>
              <option value="1"  ${act.condition === 1 ? 'selected' : ''}>${bool ? 'После срабатывания' : '<'}</option>
          </select>
          <input type="text" class="value  ${bool ? 'hidden' : ''}" value="${act.value || ''}">
          <button id="${i}" onclick="deleteTask(id)">x</button>
      </div>
    <select class="action">`
  for (let j = 0; j < actions.length; j++) {
    const act_value = actions[j].action + ' «' + actions[j].name + '»'
    const this_act = actions[j].action_id === act.id && actions[j].id_module === act.target_module
    console.log(actions[j].action_id, act.id)
    action += `<option value="${j}" ${this_act ? 'selected' : ''}> ${act_value} </option>`
  }
  action += `</select></div>`
  return action
}

