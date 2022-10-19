function logout() {
    document.cookie = 'token='
    goTo('auth')
}

const settings = {
    app: {
        battery: 'percent',
        theme: 'dark'
    },
    account: {
        phone: 89009728125,
        email: 'julu13@yandex.ru',
        login: 'admin',
        password: null
    },
    station: {
        emergency_light: 'on_em_light',
        nightlight: 'on'
    }
}
function select(id, type, window) {
    const targetEl = document.getElementById(id)
    const selectedEl = document.getElementById(type).getElementsByClassName('select')
    selectedEl[0].classList.remove('select')
    targetEl.classList.add('select')
    settings[window][type] = id
    console.log(settings)
}

function openSettings(id) {
    document.getElementsByClassName('container')[0].classList.add('hidden')
    document.getElementById(id).classList.remove('hidden')
}

function closeSettings(id) {
    document.getElementsByClassName('container')[0].classList.remove('hidden')
    document.getElementById(id).classList.add('hidden')
}

fillPage()

function fillPage() {
    for (const i in Object.keys(settings)) {
        const window = Object.keys(settings)[i]
        for (const j in Object.keys(settings[window])) {
            const id = Object.keys(settings[window])[j]
            try {
                document.getElementById(id).value = settings[window][id]
                select(settings[window][id], id, window)
            } catch(e) {
            }
        }
    }
    document
}

async function sendSupport(id) {
    const message = document.getElementById(id).value
    console.log('Ваше мнение очень важно для нас')
    console.log(message)
    closeSettings('support')
    fastMessage('Мы дадим вам ответ на электронную почту')
}

async function deactiveStation() {
    console.log('Отключил станцию')
}