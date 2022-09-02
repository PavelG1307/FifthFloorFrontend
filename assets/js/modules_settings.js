const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

async function getModule() {
  const res = await axios({
    method: 'get',
    url: url + '/module/' + id
  }).catch(e => fastMessage(e))
  if (res.data.success) {
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