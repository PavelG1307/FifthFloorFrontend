let mode_sign_in = true

function SignIn() {
    var login = document.querySelector('#login').value;
    var password = document.getElementById("password").value;
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