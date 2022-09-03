station_url = 'http://192.168.0.101'

let saveData = {}
let pass = 40
async function checkConnect(url, data, method){
    saveData = { url, data, method }
    if (pass<2) {
        pass++
        return null
    }
    pass = 0
    if (url) return await axios({ method: method || 'get', url: url || station_url, data }).catch(() => {})
    console.log(`Выполнен запрос: ${url || station_url} с параметрами ${JSON.stringify(data) || '(без)'} `)
    return zglushka(3)
}

let count = 0
function zglushka(n) {
    count = count<n ? count+1 : -1
    return count === -1
}

function next() {
    document.querySelector('#start').classList.add('hiden')
    document.querySelector('#info').classList.remove('hiden')
}


function connect() {
    const error = document.querySelector('#error').classList
    if (!error.contains('hiden')) { error.add('hiden') }
    document.querySelector('#info').classList.add('hiden')
    document.querySelector('#connecting').classList.remove('hiden')
    const {url, data, method } = saveData
    connecting(null, url, data, method)
}

function connecting( next, url, data, method ){
    const connecting = 'Подключение...'
    const animation = setInterval(async ()=>{
        const text = document.querySelector('.connecting')
        const res = await checkConnect(url, data, method)
        // const res = ''
        if (res) {
            clearInterval(animation)
            clearInterval(timeout)
            document.querySelectorAll('input').forEach( el => el.addEventListener('keydown', function(e) {
                if (e.keyCode === 13) {
                    send()
                }
            }))
            document.querySelector('#connecting').classList.add('hiden')
            console.log(next)
            if (next) next('')
            else document.querySelector('#input').classList.remove('hiden')
            if (url) 
            return res
        }
        if (text.innerText.length < connecting.length) {
            text.innerText += connecting[text.innerText.length]
        } else {
            text.innerText = ''
        }

    }, 500)
    const timeout = setTimeout(()=>{
        clearInterval(animation)
        document.querySelector('#connecting').classList.add('hiden')
        document.querySelector('#error').classList.remove('hiden')
        console.log('Не нашел(')
    }, 10000)
}

async function send() {
    const ssid = document.querySelector('#ssid').value
    const password = document.querySelector('#password').value
    if (!ssid || password.length < 8) {
        fastMessage('Некорректный SSID и/или пароль')
        return
    }
    const data = { ssid, password }
    // const res = await axios({
    //     url: station_url,
    //     methods: 'get',
    //     data  
    // }).catch(()=>{})
    res = { data: 'sfasfdasdfas' }
    if (!res) {
        fastMessage('Произошла ошибка :-( Попробуйте еще раз')
        return
    }
    const key = res.data
    document.querySelector('#input').classList.add('hiden')
    document.querySelector('#connecting').classList.remove('hiden')
    connecting(goTo, url + '/station/add', {key}, 'post')
}

