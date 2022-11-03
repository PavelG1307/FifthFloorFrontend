
async function getStatus() {
    const res = await getData('/station/status', 'get', {})
    if (res?.success) {
        setStatus(res.data)
    }
}
async function setStatus(data) {
    console.log(data)
    document.querySelector('#time').innerText = IntTimeToStr(data?.time)
    document.querySelector('#battery').innerText = BatteryCharge(data?.battery)
    document.querySelector('.connect_info').innerText = data.active
        ? 'Соединение установленно'
        : 'Станция не выходит на связь'
    document.querySelector('#main_btn').innerText = data.lamp > 0 ? 'Выключить свет' : 'Включить свет'
    document.querySelector('#guard_btn').innerText = data.lamp > 0 ? 'Снять с охраны' : 'Поставить на охрану'
    selectMode(`mode_${data.mode}`, true)
}

function BatteryCharge(val) {
    console.log(settings)
    if (settings?.app?.battery === 'percent') {
        const v = Math.floor((val - 6) / (8.2 - 6))
        return String(v >= 0 ? v : 0) + '%';
    } else {
        return String(val) + 'V';
    }
}

getStatus()

async function selectMode(id, noSend) {
    const activeEl = document.querySelector('.active')
    if (activeEl) {
        activeEl.classList.remove('active')
        if (activeEl.id === id || id === '0') {
            if (!noSend) await sendMode("0")
            return
        }
    }
    if (id !== '0') document.getElementById(id).classList.add('active')
    if (!noSend) await sendMode(id)
}

async function sendMode(mode) {
    await getData('/station/brightness', 'post', { mode })
}

document.querySelectorAll('.mode_container').forEach(el => {
    listenLongClick(el, () => fastMessage('В разработке'), 300, () => selectMode(el.id))
})
