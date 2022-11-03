let mode_sign_in = true
let login = null

async function SignIn() {
  login = document.querySelector('#login').value;
  const password = document.querySelector("#password").value;
  if (login === "") {
    fastMessage('Введите логин')
    return
  }
  if (!mode_sign_in && password.length < 8) {
    fastMessage('Слишком короткий пароль')
    return
  }
  if (!mode_sign_in && !String(document.querySelector('#email').value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
    fastMessage('Некорректный email')
    return
  }
  if (!mode_sign_in && document.querySelector('#phone').value.length !== 11) {
    fastMessage('Некорректный телефон')
    return
  }

  const json_data = {
    login: login,
    password: password,
    email: mode_sign_in ? null : document.querySelector('#email').value,
    phone: mode_sign_in ? null : document.querySelector('#phone').value
  };
  const res = await axios({
    method: mode_sign_in ? 'get' : 'post',
    url: url + '/auth/' + (mode_sign_in ? 'sign' : 'registration'),
    params: mode_sign_in ? json_data : {},
    data: mode_sign_in ? {} : json_data
  }).catch(e => console.log(e))
  console.log(res.data)
  if (res?.data?.success) {
    if (mode_sign_in) {
      if(!res.data?.token) {
        fastMessage('Ошибка')
        return
      }
      console.log(res)
      setToken(res.data.token)
    } else {
      document.querySelector('.container').classList.add('hidden')
      document.querySelector('.sms').classList.remove('hidden')
    }
  }
  else fastMessage(res.data.message || 'Ошибка на сервере')
}
document.getElementById('phone').addEventListener('input', function (e) {
  if (e.target.value === '8') {
    e.target.value = '7'
  } else if (e.target.value[0] === '8') {
    e.target.value = '7' + e.target.value.slice(1, 11)
  } else if (e.target.value[0] === '9') {
    e.target.value = '7' + e.target.value
  }
  if (e.target.value.length > 11) e.target.value = e.target.value.slice(0, 11)
}, false);

function ChangeMode() {
  const button_change = document.querySelector('#but_login')
  const button = document.querySelector('#sign')
  mode_sign_in = !mode_sign_in
  document.querySelector('.input').classList.toggle('auth')
  if (!mode_sign_in) {
    button_change.innerHTML = 'Войти'
    button.innerHTML = 'Регистрация'
  } else {
    button_change.innerHTML = 'Регистрация'
    button.innerHTML = 'Вход'
  }
}

document.querySelector('#code').addEventListener('input', e => {
  if (e.target.value.length > 4) {
    e.target.value = e.target.value.slice(0, 4)
  }
})


async function checkCode() {
  const code = document.querySelector('#code').value
  const res = await axios({
    method: 'get',
    url: url + '/auth/sign',
    params: { login, code }
  }).catch(e => console.log(e))
  if (res && res.data.success) setToken(res.data.token)
  else fastMessage(res.data.message || 'Ошибка на сервере')
}

function setToken(token) {
  console.log(token)
  document.cookie = `access_token=${token}; path=/; max-age=3600;`
  goTo('/')
}


document.querySelectorAll('input').forEach(el => el.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    SignIn()
  }
}))

function show_hide_password() {
  document.querySelector('.password-control').classList.toggle('view')
  const pass = document.querySelector('#password')
  const type_pass = pass.getAttribute('type') == 'password'
  pass.type = type_pass ? 'text' : 'password'
}