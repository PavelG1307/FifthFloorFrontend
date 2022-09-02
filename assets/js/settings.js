function logout() {
    document.cookie = 'token='
    goTo('auth.html')
}