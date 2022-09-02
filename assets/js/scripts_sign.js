let mode_sign_in = true

async function SignIn() {
    const login = document.querySelector('#login').value;
    const password = document.querySelector("#password").value;
    if (login=="" || password==""){
      fastMessage('Введите логин и пароль')
      return
    }
    if (!mode_sign_in && password.length<8){
      fastMessage('Слишком короткий пароль')
      return
    }
    
    const json_data = {
      login: login,
      password: password,
      email: "test@yandex.ru",
      phone_number: "88005553535"
    };
    const res = await axios({
      method: 'get',
      url: url + '/auth/sign',
      params: json_data
    }).catch(e => console.log(e))
    if( res && res.data.success ) setToken(res.data.token)
    else fastMessage(res.data.message || 'Ошибка на сервере')
  }

function ChangeMode(){
  const button_change = document.querySelector('#but_login')
  const button = document.querySelector('button')
  mode_sign_in = !mode_sign_in
  if (!mode_sign_in) {
    button_change.innerHTML = 'Войти'
    button.innerHTML = 'Регистрация'
  } else {
    button_change.innerHTML = 'Регистрация'
    button.innerHTML = 'Вход'
  }
}

function setToken(token) {
  document.cookie = `token=${token}; max-age=3600`
  window.location.href = './'
}

