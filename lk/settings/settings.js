function logout() {
    document.cookie = 'token='
    document.cookie = 'access_token=""; path=/; max-age=3600;'
    goTo('auth')
}

const settings = {}

function select(id, type, window) {
    const targetEl = document.getElementById(id)
    const selectedEl = document.getElementById(type).getElementsByClassName('select')
    selectedEl[0].classList.remove('select')
    targetEl.classList.add('select')
    settings[window][type] = id
}

function openSettings(id) {
    document.getElementsByClassName('container')[0].classList.add('hidden')
    document.getElementById(id).classList.remove('hidden')
}

async function closeSettings(id) {
    document.getElementsByClassName('container')[0].classList.remove('hidden')
    document.getElementById(id).classList.add('hidden')
    await saveSettings(id)
}

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
}

async function sendSupport(id) {
    const message = document.getElementById(id).value
    console.log('Ваше мнение очень важно для нас')
    settings.support.message = message
    closeSettings('support')
    fastMessage('Мы дадим вам ответ на электронную почту')
}

async function deactiveStation() {
    console.log('Отключил станцию')
}

async function saveSettings(type) {
    if (type in settings) {
        const data = { type, data: settings[type] }
        await getData('/settings', 'post', data)
    }
}

getSettings()