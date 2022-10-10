async function select(id, noSend) {
  const activeEl = document.querySelector('.active')
  if (activeEl) {
    activeEl.classList.remove('active')
    if (activeEl.id === id || id === '0') {
      if (!noSend) await send("0")
      return
    }
  }
  if (id !== '0') document.getElementById(id).classList.add('active')
  if (!noSend) await send(id)
}

async function send(mode) {
  await getData('/station/brightness', 'post', { mode })
}

async function getMode() {
  document.querySelectorAll('.mode_container').forEach(el => {
    console.log(el);
    listenLongClick(el, () => goTo(`/mode/settings?${el.id}`), 300, () => select(el.id))
  })
  const res = await getData('/station/status', 'get')
  if (res) select(`${res.data.mode}`, true)
}
// select("3")
