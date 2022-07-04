let mode_sign_in = true

function SignIn() {
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

    console.log('Логин ', login, ' пароль ', password);
    const json_data = {
      type: mode_sign_in ? "SIGN IN" : "REGISTRATION",
      login: login,
      password: password,
      email: "test@yandex.ru",
      phone_number: "88005553535"
    };
    wsApp.doSend(json_data);
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

function HandleMessage(message) {
  document.cookie = `token=${message.token}; max-age=3600`
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