function SignIn() {
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;
    console.log('Логин ', login, ' пароль ', password);
    const json_data = {
      login: login,
      password: password,
      userId: 1
    };
    wsApp.doSend(JSON.stringify(json_data));
  }