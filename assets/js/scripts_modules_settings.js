const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

function HandleMessage(request) {
    if (request.type == 'status') {
        for (const key in request.modules){
            if (request.modules[key].id_module == id) {
                document.getElementById('name').setAttribute('value', request.modules[key].name)
                document.getElementById('room').setAttribute('value', request.modules[key].location)
                break
            }
        }
    } else {
        if (request.message == "Success") {
            document.location.href = './'
        }
    }
}

function save() {
    wsApp.doSend({
        type: 'UPDATE MODULE',
        module: id,
        name: document.getElementById('name').value,
        location: document.getElementById('room').value
    })
}

function del() {
    wsApp.doSend({
        type: 'DELETE MODULE',
        module: id
    })
}