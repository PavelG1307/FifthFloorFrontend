function AddDevice() {
    wsApp.doSend({
        type: "ADD STATION",
        key: "djakdfjaskd"
    })
    console.log('Add')
}

function HandleMessage(message) {
    if (!message.error) {
	window.location.href = './'
    }
}