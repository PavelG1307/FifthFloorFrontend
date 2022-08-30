let mode_sign_in = true

function SignIn() {
    const url = 'https://fifthfloor.site/api'
    var login = document.querySelector('#login').value;
    var password = document.getElementById("password").value;
    if (login=="" || password==""){
      error('Введите логин и пароль')
      return
    }
    if (!mode_sign_in && password.length<8){
      error('Слишком короткий пароль')
      return
    }

    const json_data = {
      login: login,
      password: password,
      email: "test@yandex.ru",
      phone_number: "88005553535"
    };
    console.log(json_data)
    axios({
      method: 'get',
      url: url + '/sign',
      params: json_data
    }).then(res => setToken(res.data.token)).catch(e => console.log(e))
    // wsApp.doSend(json_data);
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

function error(text){
  new Toast({
      title: false,
      text: text,
      theme: 'warning',
      autohide: true,
      interval: 2000
    });
}